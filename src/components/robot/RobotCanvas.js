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
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 7, 5]} intensity={1.7} color="#ffffff" />
        <directionalLight position={[-5, 2, -6]} intensity={0.9} color="#38bdf8" />
        <pointLight position={[0, 2.5, 3]} intensity={1} color="#38bdf8" distance={9} />
        {quality === 'high' && (
          <>
            <pointLight position={[-3, 1, 2]} intensity={0.5} color="#818cf8" distance={7} />
            {/* Rim light from behind - separates the robot from the page and
                catches the clearcoat highlight on the shoulders/head. */}
            <pointLight position={[0, 1.5, -3.5]} intensity={1.1} color="#7dd3fc" distance={8} />
          </>
        )}

        <CloudRobotModel motion={motion} quality={quality} />
      </Canvas>
    </Suspense>
  );
};

export default RobotCanvas;
