import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import CloudRobotModel from './CloudRobotModel';
import Robot2DFallback from './Robot2DFallback';

/**
 * Lighting + Canvas shell. Kept deliberately minimal: 2 directional-ish
 * lights + 2 accent point lights, no postprocessing/bloom/shadows - matches
 * the existing calm/premium theme and keeps GPU cost low.
 */
const RobotCanvas = ({ motion, quality, onPointerEnter, onPointerLeave, onInteract }) => {
  const dpr = quality === 'high' ? [1, 2] : [1, 1.25];

  return (
    <Suspense fallback={<Robot2DFallback />}>
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0.05, 5.4], fov: 38 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerDown={onInteract}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[4, 6, 5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-4, 1, -4]} intensity={0.4} color="#bfe0fc" />
        <pointLight position={[0, 1.5, 3]} intensity={0.5} color="#ffffff" distance={8} />
        {quality === 'high' && (
          /* Soft rim light from behind - separates the character from the
             page and catches the clearcoat highlight, kept subtle (no neon). */
          <pointLight position={[0, 1.2, -3.2]} intensity={0.6} color="#bfe0fc" distance={8} />
        )}

        <CloudRobotModel motion={motion} quality={quality} />
      </Canvas>
    </Suspense>
  );
};

export default RobotCanvas;
