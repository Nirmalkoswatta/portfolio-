import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ANCHORS, otherAnchor, getBoxSize, isMobileViewport } from './robotAnchors';

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
 * plus the discrete teleport animation timeline (GSAP-owned). Per-frame
 * idle/look interpolation is read out of these refs inside useFrame in
 * GLBRobotModel - this hook never touches Object3D transforms itself, it
 * only owns the *targets* + the DOM wrapper's position within its container.
 *
 * `containerRef` is the Hero-scoped positioned ancestor (position: relative)
 * that the wrapper (position: absolute) jumps left/right within - the robot
 * lives only inside that box, not the whole viewport.
 */
export default function useRobotInteraction(wrapperRef, containerRef) {
  const stateRef = useRef(ROBOT_STATE.IDLE);
  const anchorRef = useRef('right');
  const pointerRef = useRef({ x: 0, y: 0 }); // normalized -1..1, damped target
  const motionRef = useRef({
    squash: 1,
    leanX: 0,
    leanZ: 0,
    teleport: 1, // 1 = fully materialized, 0 = fully dematerialized (mid-teleport)
    eyeBoost: 0,
  });
  // Fire-and-forget triggers for GLBRobotModel's teleport ring flash - a
  // counter bump (+ which edge it happened at), no React state involved.
  const teleportFxRef = useRef({ burstId: 0, edge: 'right' });
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

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      timelineRef.current?.kill();
    };
  }, []);

  // Distance (px) the wrapper must translate to cross from the right-side
  // anchor to the left-side one, measured against the Hero-scoped container
  // (not the viewport) so the robot only ever moves within its own box.
  const travelDistance = () => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const box = getBoxSize();
    const margin = 16; // matches the 1rem CSS margin on both sides
    return Math.max(0, containerWidth - box - margin * 2);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      // Respect reduced motion: swap anchor instantly, skip the teleport show.
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
    // 2. Anticipation (lean, crouch) 120-160ms
    tl.to(motion, { leanX: nextAnchor === 'right' ? -0.16 : 0.16, squash: 1.08, duration: 0.14, ease: 'power2.out' }, '>-0.02');

    // 3. Dematerialize at the origin position - a real teleport, not a slide.
    tl.call(() => {
      stateRef.current = ROBOT_STATE.JUMPING;
      teleportFxRef.current = { burstId: teleportFxRef.current.burstId + 1, edge: anchorRef.current };
    });
    tl.to(motion, { teleport: 0, squash: 0.15, duration: 0.22, ease: 'power2.in' });

    // 4. Instant relocation, invisible mid-effect (teleport === 0).
    tl.call(() => {
      anchorRef.current = nextAnchor;
      gsap.set(el, { x: nextAnchor === 'left' ? -travelDistance() : 0 });
    });

    // 5. Rematerialize at the destination with a flash + a little pop-in overshoot.
    tl.call(() => {
      stateRef.current = ROBOT_STATE.SETTLING;
      teleportFxRef.current = { burstId: teleportFxRef.current.burstId + 1, edge: nextAnchor };
    });
    tl.to(motion, { teleport: 1, squash: 1, duration: 0.32, ease: 'back.out(2)' });
    // 6. Settle: lean/eye glow back to calm.
    tl.to(motion, { leanX: 0, eyeBoost: 0, duration: 0.35, ease: 'elastic.out(1, 0.6)' }, '>-0.1');

    return tl;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    motionRef,
    teleportFxRef,
    reducedMotionRef,
    mobileRef,
    applyAnchorInstant,
    triggerJump,
    handlePointerEnter,
    handlePointerLeave,
    ANCHORS,
  };
}
