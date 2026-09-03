import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import RobotCanvas from './RobotCanvas';
import Robot2DFallback from './Robot2DFallback';
import RobotErrorBoundary from './RobotErrorBoundary';
import useRobotInteraction from './useRobotInteraction';
import { isMobileViewport } from './robotAnchors';

const supportsWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
};

/**
 * The one persistent robot instance for the whole site. Fixed-position,
 * bottom corner, small enough to never cover copy/CTAs/nav, jumps between
 * left/right on click/tap. Mounted once in App.js - never remounted per
 * section, so the character stays continuous across scroll.
 */
const RobotOverlay = () => {
  const wrapperRef = useRef(null);
  const [webglOk] = useState(() => supportsWebGL());
  const [mobile, setMobile] = useState(() => isMobileViewport());

  const controller = useRobotInteraction(wrapperRef);
  const { applyAnchorInstant, triggerJump, handlePointerEnter, handlePointerLeave, anchorRef } = controller;

  useEffect(() => {
    applyAnchorInstant(anchorRef.current);
    // Entrance: understated rise + fade rather than an instant appearance.
    if (wrapperRef.current) {
      gsap.fromTo(
        wrapperRef.current,
        { opacity: 0, y: 24, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, delay: 0.15, ease: 'power3.out' }
      );
    }

    const handleResize = () => {
      setMobile(isMobileViewport());
      applyAnchorInstant(anchorRef.current);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInteract = (e) => {
    e?.stopPropagation?.();
    triggerJump();
  };

  return (
    <div
      ref={wrapperRef}
      className="fixed bottom-4 sm:bottom-6 z-30 pointer-events-auto touch-none"
      style={{ width: 200, height: 200 }}
      role="button"
      aria-label="Interactive robot mascot - click to see it move"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerJump();
        }
      }}
    >
      {webglOk ? (
        <RobotErrorBoundary fallback={<Robot2DFallback />}>
          <RobotCanvas
            motion={controller}
            quality={mobile ? 'low' : 'high'}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
            onInteract={handleInteract}
          />
        </RobotErrorBoundary>
      ) : (
        <div onClick={handleInteract} className="w-full h-full">
          <Robot2DFallback />
        </div>
      )}
    </div>
  );
};

export default RobotOverlay;
