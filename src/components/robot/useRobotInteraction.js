import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ANCHORS, otherAnchor, getBoxSize, isMobileViewport } from './robotAnchors';

// Section id -> subtle idle pose bias (radians). Purely additive to the
// robot's idle animation, applied smoothly in useFrame via damping.
const SECTION_BIAS = {
  home: { rotY: 0, rotX: 0 },
  about: { rotY: 0.12, rotX: -0.03 },
  skills: { rotY: -0.14, rotX: 0.02 },
  architecture: { rotY: 0.1, rotX: 0.04 },
  projects: { rotY: -0.16, rotX: -0.02 },
  experience: { rotY: 0.08, rotX: 0.03 },
  certificates: { rotY: -0.1, rotX: 0 },
  telemetry: { rotY: 0.14, rotX: -0.03 },
  contact: { rotY: 0, rotX: 0.05 },
};

export const ROBOT_STATE = {
  IDLE: 'IDLE',
  HOVER: 'HOVER',
  INTERACTING: 'INTERACTING',
  ANTICIPATING: 'ANTICIPATING',
  JUMPING: 'JUMPING',
  SETTLING: 'SETTLING',
  COOLDOWN: 'COOLDOWN',
};

/**
 * Owns all high-frequency robot interaction data as refs (never React state)
 * plus the discrete jump/react animation timeline (GSAP-owned). Per-frame
 * idle/look/scroll interpolation is read out of these refs inside useFrame
 * in CloudRobotModel - this hook never touches Object3D transforms itself,
 * it only owns the *targets* + the DOM wrapper's screen position.
 */
export default function useRobotInteraction(wrapperRef) {
  const stateRef = useRef(ROBOT_STATE.IDLE);
  const anchorRef = useRef('right');
  const pointerRef = useRef({ x: 0, y: 0 }); // normalized -1..1, damped target
  const sectionBiasRef = useRef({ rotY: 0, rotX: 0 });
  const motionRef = useRef({
    squash: 1,
    leanX: 0,
    leanZ: 0,
    arc: 0,
    eyeBoost: 0,
  });
  const reducedMotionRef = useRef(false);
  const mobileRef = useRef(isMobileViewport());
  const timelineRef = useRef(null);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleMouseMove = (e) => {
      if (mobileRef.current) return;
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      mobileRef.current = isMobileViewport();
    };
    window.addEventListener('resize', handleResize);

    // Section-aware idle pose bias via IntersectionObserver - avoids
    // per-scroll-pixel React state updates.
    const sectionIds = Object.keys(SECTION_BIAS);
    const targets = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          sectionBiasRef.current = SECTION_BIAS[visible.target.id] || { rotY: 0, rotX: 0 };

          // Contact holds a form/CTA in the same bottom-corner region the
          // robot occupies - fade it back so it never obstructs input.
          const el = wrapperRef.current;
          if (el) {
            gsap.to(el, {
              opacity: visible.target.id === 'contact' ? 0.35 : 1,
              duration: 0.5,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }
        }
      },
      { threshold: [0.3, 0.5, 0.7] }
    );
    targets.forEach((t) => observer.observe(t));

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      timelineRef.current?.kill();
    };
  }, [wrapperRef]);

  // Distance (px) the wrapper must translate to cross from the right-side
  // anchor to the left-side one. Base CSS position never changes - only
  // `transform: translateX()` moves the box, so the jump can be animated as
  // a real slide across the screen instead of an instant left/right swap.
  const travelDistance = () => {
    const box = getBoxSize();
    const margin = 16; // matches the 1rem CSS margin on both sides
    return Math.max(0, window.innerWidth - box - margin * 2);
  };

  // Places the wrapper at the current anchor without animation (initial mount / resize).
  const applyAnchorInstant = useCallback((anchor) => {
    const el = wrapperRef.current;
    if (!el) return;
    const box = getBoxSize();
    el.style.width = `${box}px`;
    el.style.height = `${box}px`;
    el.style.right = '1rem';
    el.style.left = 'auto';
    gsap.set(el, { x: anchor === 'left' ? -travelDistance() : 0 });
  }, [wrapperRef]);

  const canInteract = () =>
    stateRef.current === ROBOT_STATE.IDLE || stateRef.current === ROBOT_STATE.HOVER;

  const triggerJump = useCallback(() => {
    if (!canInteract()) return; // guards double-trigger / stacking
    const el = wrapperRef.current;
    if (!el) return;

    const reduced = reducedMotionRef.current;
    const nextAnchor = otherAnchor(anchorRef.current);
    const motion = motionRef.current;

    if (reduced) {
      // Respect reduced motion: swap anchor instantly, skip the jump show.
      anchorRef.current = nextAnchor;
      applyAnchorInstant(nextAnchor);
      return;
    }

    timelineRef.current?.kill();
    const tl = gsap.timeline({
      onStart: () => {
        stateRef.current = ROBOT_STATE.INTERACTING;
      },
      onComplete: () => {
        stateRef.current = ROBOT_STATE.COOLDOWN;
        gsap.delayedCall(0.25, () => {
          if (stateRef.current === ROBOT_STATE.COOLDOWN) {
            stateRef.current = ROBOT_STATE.IDLE;
          }
        });
      },
    });
    timelineRef.current = tl;

    // 1. Acknowledge (compress + eye flash) 100-180ms
    tl.to(motion, { squash: 0.9, eyeBoost: 1, duration: 0.14, ease: 'power2.out' });
    // 2. Anticipation (lean away from jump direction) 100-160ms
    tl.to(
      motion,
      {
        leanX: nextAnchor === 'right' ? -0.18 : 0.18,
        squash: 1.08,
        duration: 0.14,
        ease: 'power2.out',
      },
      '>-0.02'
    );
    // 3. Jump: slide the DOM wrapper across the screen to the new anchor,
    // synced with a 3D arc/lean so it reads as one continuous hop, not a
    // teleport-then-wiggle.
    tl.call(() => {
      stateRef.current = ROBOT_STATE.JUMPING;
      anchorRef.current = nextAnchor;
    });
    tl.to(
      el,
      {
        x: nextAnchor === 'left' ? -travelDistance() : 0,
        duration: 0.5,
        ease: 'power2.inOut',
      },
      '<'
    );
    tl.to(
      motion,
      {
        arc: 1,
        leanX: nextAnchor === 'right' ? 0.22 : -0.22,
        duration: 0.5,
        ease: 'power1.inOut',
      },
      '<'
    );
    tl.to(motion, { arc: 0, duration: 0.01 }, '>');
    // 4. Settle: overshoot + spring back 250-450ms
    tl.call(() => {
      stateRef.current = ROBOT_STATE.SETTLING;
    });
    tl.to(
      motion,
      { leanX: 0, squash: 1, eyeBoost: 0, duration: 0.4, ease: 'elastic.out(1, 0.55)' },
      '>-0.05'
    );

    return tl;
  }, [applyAnchorInstant, wrapperRef]);

  const handlePointerEnter = useCallback(() => {
    if (stateRef.current === ROBOT_STATE.IDLE) stateRef.current = ROBOT_STATE.HOVER;
  }, []);

  const handlePointerLeave = useCallback(() => {
    if (stateRef.current === ROBOT_STATE.HOVER) stateRef.current = ROBOT_STATE.IDLE;
  }, []);

  return {
    stateRef,
    anchorRef,
    pointerRef,
    sectionBiasRef,
    motionRef,
    reducedMotionRef,
    mobileRef,
    applyAnchorInstant,
    triggerJump,
    handlePointerEnter,
    handlePointerLeave,
    ANCHORS,
  };
}
