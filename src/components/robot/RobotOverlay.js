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
 * Hero-scoped robot character. Lives inside a `position: relative` box
 * (sized via `className`) and jumps left/right - via a real teleport, not a
 * slide - only within that box. Scrolls away with the rest of the Hero
 * section like any other content; does not persist across the page.
 */
const RobotOverlay = ({ className = '' }) => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [webglOk] = useState(() => supportsWebGL());
  const [mobile, setMobile] = useState(() => isMobileViewport());

  const controller = useRobotInteraction(wrapperRef, containerRef);
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
    <div ref={containerRef} className={`relative ${className}`}>
      <div
        ref={wrapperRef}
        className="absolute top-1/2 -translate-y-1/2 z-10 pointer-events-auto touch-none"
        style={{ width: 240, height: 240 }}
        role="button"
        aria-label="Interactive robot mascot - click to see it teleport"
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
    </div>
  );
};

export default RobotOverlay;
