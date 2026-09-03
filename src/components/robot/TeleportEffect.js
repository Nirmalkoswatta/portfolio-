import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, DoubleSide } from 'three';

// Sci-fi teleport flash: a quick expanding double-ring + a vertical light
// beam, fired at the origin (dematerialize) and again at the destination
// (rematerialize) via `teleportFxRef`'s burst counter. Both live at local
// (0, groundY, 0) - the DOM wrapper itself is what actually moves between
// the two triggers, so one pooled effect naturally reads as "here, then
// there" without any extra positioning logic.
const TeleportEffect = ({ teleportFxRef, groundY = -1.3 }) => {
  const ringOuterRef = useRef();
  const ringInnerRef = useRef();
  const beamRef = useRef();
  const state = useRef({ age: 999, lifetime: 0.4 });
  const lastBurstId = useRef(teleportFxRef.current.burstId);

  useFrame((frameState, rawDelta) => {
    const delta = Math.min(rawDelta, 1 / 30);
    const burst = teleportFxRef.current;

    if (burst.burstId !== lastBurstId.current) {
      lastBurstId.current = burst.burstId;
      state.current.age = 0;
    }

    const s = state.current;
    const active = s.age < s.lifetime;
    if (active) s.age += delta;

    if (ringOuterRef.current) {
      ringOuterRef.current.visible = active;
      if (active) {
        const p = s.age / s.lifetime;
        ringOuterRef.current.scale.setScalar(0.15 + p * 1.4);
        ringOuterRef.current.material.opacity = (1 - p) * 0.75;
      }
    }
    if (ringInnerRef.current) {
      ringInnerRef.current.visible = active;
      if (active) {
        const p = Math.min(1, (s.age / s.lifetime) * 1.6);
        ringInnerRef.current.scale.setScalar(0.1 + p * 0.55);
        ringInnerRef.current.material.opacity = (1 - p) * 0.9;
      }
    }
    if (beamRef.current) {
      beamRef.current.visible = active;
      if (active) {
        const p = s.age / s.lifetime;
        beamRef.current.material.opacity = (1 - p) * 0.5;
        beamRef.current.scale.y = 1 + p * 0.6;
      }
    }
  });

  return (
    <group position={[0, groundY, 0]}>
      <mesh ref={ringOuterRef} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
        <ringGeometry args={[0.5, 0.62, 40]} />
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0} depthWrite={false} side={DoubleSide} blending={AdditiveBlending} />
      </mesh>
      <mesh ref={ringInnerRef} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
        <ringGeometry args={[0.28, 0.36, 32]} />
        <meshBasicMaterial color="#bfe4ff" transparent opacity={0} depthWrite={false} side={DoubleSide} blending={AdditiveBlending} />
      </mesh>
      <mesh ref={beamRef} position={[0, 0.9, 0]} visible={false}>
        <cylinderGeometry args={[0.28, 0.02, 1.8, 16, 1, true]} />
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0} depthWrite={false} side={DoubleSide} blending={AdditiveBlending} />
      </mesh>
    </group>
  );
};

export default TeleportEffect;
