import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending, DoubleSide } from 'three';

// Puff-of-smoke burst fired at jump takeoff/landing. A fixed pool of plain
// spheres (cheap: meshBasicMaterial, no lighting cost) reused across bursts -
// nothing is created/destroyed per frame, only repositioned/faded. Additive
// blending + a bright core color makes it read clearly against both light
// and dark page backgrounds instead of blending into them.
const SMOKE_COUNT_HIGH = 10;
const SMOKE_COUNT_LOW = 6;

const SmokePuffs = ({ smokeRef, quality, originY = -0.8 }) => {
  const count = quality === 'high' ? SMOKE_COUNT_HIGH : SMOKE_COUNT_LOW;
  const meshRefs = useRef(Array.from({ length: count }, () => React.createRef()));
  const particles = useRef(
    Array.from({ length: count }, () => ({
      age: 999,
      lifetime: 0.7,
      vx: 0,
      vy: 0,
      vz: 0,
      x: 0,
      y: 0,
      z: 0,
      baseScale: 1,
    }))
  );
  const ringRef = useRef();
  const ringState = useRef({ age: 999, lifetime: 0.45 });
  const lastBurstId = useRef(smokeRef.current.burstId);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 1 / 30);
    const burst = smokeRef.current;

    if (burst.burstId !== lastBurstId.current) {
      lastBurstId.current = burst.burstId;
      const originX = burst.edge === 'left' ? 0.24 : -0.24; // puff kicks off from the trailing side
      particles.current.forEach((p) => {
        p.age = 0;
        p.lifetime = 0.6 + Math.random() * 0.4;
        p.x = originX + (Math.random() - 0.5) * 0.2;
        p.y = originY + Math.random() * 0.1;
        p.z = (Math.random() - 0.5) * 0.2;
        p.vx = (Math.random() - 0.5) * 0.5 - originX * 0.6;
        p.vy = 0.35 + Math.random() * 0.35;
        p.vz = (Math.random() - 0.5) * 0.5;
        p.baseScale = 0.75 + Math.random() * 0.6;
      });
      ringState.current.age = 0;
      if (ringRef.current) {
        ringRef.current.position.set(originX, originY - 0.05, 0);
        ringRef.current.visible = true;
      }
    }

    particles.current.forEach((p, i) => {
      const mesh = meshRefs.current[i]?.current;
      if (!mesh) return;
      if (p.age >= p.lifetime) {
        mesh.visible = false;
        return;
      }
      p.age += delta;
      p.x += p.vx * delta;
      p.y += p.vy * delta;
      p.z += p.vz * delta;
      const progress = p.age / p.lifetime;
      mesh.visible = true;
      mesh.position.set(p.x, p.y, p.z);
      const scale = p.baseScale * 0.22 * (1 + progress * 2.4);
      mesh.scale.setScalar(scale);
      mesh.material.opacity = (1 - progress) * 0.75;
    });

    // Quick expanding ring - a punchy landing/takeoff flash for extra "wow".
    if (ringRef.current) {
      const rs = ringState.current;
      if (rs.age < rs.lifetime) {
        rs.age += delta;
        const rp = rs.age / rs.lifetime;
        ringRef.current.scale.setScalar(0.3 + rp * 1.6);
        ringRef.current.material.opacity = (1 - rp) * 0.6;
      } else {
        ringRef.current.visible = false;
      }
    }
  });

  return (
    <group>
      {meshRefs.current.map((ref, i) => (
        <mesh ref={ref} key={i} visible={false}>
          <sphereGeometry args={[1, 10, 10]} />
          <meshBasicMaterial
            color="#bfe4ff"
            transparent
            opacity={0}
            depthWrite={false}
            blending={AdditiveBlending}
          />
        </mesh>
      ))}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
        <ringGeometry args={[0.22, 0.3, 32]} />
        <meshBasicMaterial
          color="#7dd3fc"
          transparent
          opacity={0}
          depthWrite={false}
          side={DoubleSide}
          blending={AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

export default SmokePuffs;
