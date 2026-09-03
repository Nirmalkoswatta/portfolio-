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
        camera={{ position: [0, 0, 4.4], fov: 42 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerDown={onInteract}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[6, 8, 6]} intensity={1.6} color="#ffffff" />
        <directionalLight position={[-6, -3, -4]} intensity={0.5} color="#38bdf8" />
        <pointLight position={[0, 3, 3]} intensity={1.1} color="#38bdf8" distance={9} />
        {quality === 'high' && (
          <pointLight position={[-3, 1, 2]} intensity={0.6} color="#818cf8" distance={7} />
        )}

        <CloudRobotModel motion={motion} quality={quality} />
      </Canvas>
    </Suspense>
  );
};

export default RobotCanvas;
