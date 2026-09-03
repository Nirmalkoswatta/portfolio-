import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Orbiting cloud/infra satellite node - purely decorative, skipped on mobile.
const OrbitingNode = ({ radius, speed, offset, size = 0.14, color = '#38bdf8', wireColor = '#60a5fa' }) => {
  const nodeRef = useRef();
  useFrame((state) => {
    if (!nodeRef.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    nodeRef.current.position.set(Math.cos(t) * radius, Math.sin(t * 2) * 0.2, Math.sin(t) * radius);
    nodeRef.current.rotation.x = t * 1.5;
    nodeRef.current.rotation.y = t * 2;
  });
  return (
    <group ref={nodeRef}>
      <mesh>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh scale={1.35}>
        <boxGeometry args={[size, size, size]} />
        <meshBasicMaterial color={wireColor} wireframe transparent opacity={0.35} />
      </mesh>
    </group>
  );
};

const OrbitalRing = ({ radius, tilt = [0, 0, 0], speed = 0.5, color = '#38bdf8' }) => {
  const ringRef = useRef();
  useFrame((state) => {
    if (ringRef.current) ringRef.current.rotation.z = state.clock.elapsedTime * speed;
  });
  return (
    <group rotation={tilt}>
      <mesh ref={ringRef}>
        <torusGeometry args={[radius, 0.01, 12, 56]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.3} roughness={0.2} />
      </mesh>
    </group>
  );
};

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const damp = (current, target, lambda, delta) =>
  current + (target - current) * (1 - Math.exp(-lambda * delta));

/**
 * The character itself. Reads interaction targets from `motion` (a bundle of
 * refs, see useRobotInteraction) and owns ALL per-frame transform mutation -
 * single source of truth for position/rotation/scale, composed each frame
 * from: idle breathing + cursor look + section bias + GSAP-driven jump motion.
 */
const CloudRobotModel = ({ motion, quality = 'high' }) => {
  const rootGroup = useRef();
  const chassisGroup = useRef();
  const headGroup = useRef();
  const visorGlow = useRef();
  const eyeLeft = useRef();
  const eyeRight = useRef();
  const thrusterGlow = useRef();
  const entrance = useRef(0);

  const isHigh = quality === 'high';

  useFrame((state, rawDelta) => {
    if (!rootGroup.current || !chassisGroup.current || !headGroup.current) return;
    const delta = Math.min(rawDelta, 1 / 30); // clamp to avoid huge jumps on tab-switch
    const t = state.clock.elapsedTime;
    const { pointerRef, sectionBiasRef, motionRef, reducedMotionRef } = motion;
    const m = motionRef.current;
    const reduced = reducedMotionRef.current;

    // Entrance: gentle rise + fade-in scale on first ~0.9s.
    entrance.current = Math.min(1, entrance.current + delta / 0.9);
    const entranceEase = 1 - Math.pow(1 - entrance.current, 3);

    // Calm idle breathing - subtle, never cartoon bobbing.
    const breathe = reduced ? 0 : Math.sin(t * 1.1) * 0.035;
    rootGroup.current.position.y = breathe + (entranceEase - 1) * 0.4;
    rootGroup.current.scale.setScalar(0.85 + entranceEase * 0.15 * (0.94 + m.squash * 0.06));

    // Jump arc (screen-space move is handled by the DOM wrapper; this adds
    // a small vertical hop + lean so the jump reads as physical motion).
    const arcHeight = reduced ? 0 : Math.sin(m.arc * Math.PI) * 0.3;
    rootGroup.current.position.y += arcHeight;

    // Body lean during anticipation/jump/settle, owned by GSAP via motionRef.
    const targetBodyRotZ = m.leanX * 0.6;
    chassisGroup.current.rotation.z = damp(chassisGroup.current.rotation.z, targetBodyRotZ, 6, delta);

    // Cursor awareness: head + eyes only, clamped + damped (never full body).
    const pointerTargetY = reduced ? 0 : clamp(pointerRef.current.x, -1, 1) * 0.32;
    const pointerTargetX = reduced ? 0 : clamp(-pointerRef.current.y, -1, 1) * 0.18;
    const sectionBias = sectionBiasRef.current || { rotY: 0, rotX: 0 };

    const targetHeadY = clamp(pointerTargetY + sectionBias.rotY, -0.5, 0.5) + m.leanX * 0.35;
    const targetHeadX = clamp(pointerTargetX + sectionBias.rotX, -0.3, 0.3);

    headGroup.current.rotation.y = damp(headGroup.current.rotation.y, targetHeadY, 5, delta);
    headGroup.current.rotation.x = damp(headGroup.current.rotation.x, targetHeadX, 5, delta);

    // Whole-chassis follows section bias very subtly (composition shift).
    const targetChassisY = sectionBias.rotY * 0.4;
    chassisGroup.current.rotation.y = damp(chassisGroup.current.rotation.y, targetChassisY, 3, delta);

    // Eye glow: idle pulse + interaction boost.
    const idlePulse = 1.0 + Math.sin(t * 4) * 0.3;
    const eyeIntensity = idlePulse + m.eyeBoost * 1.2;
    if (eyeLeft.current) eyeLeft.current.material.emissiveIntensity = eyeIntensity;
    if (eyeRight.current) eyeRight.current.material.emissiveIntensity = eyeIntensity;
    if (visorGlow.current) visorGlow.current.material.emissiveIntensity = 0.45 + Math.sin(t * 1.6) * 0.15 + m.eyeBoost * 0.3;
    if (thrusterGlow.current) thrusterGlow.current.scale.setScalar(1 + Math.sin(t * 8) * 0.1 + m.eyeBoost * 0.15);
  });

  return (
    <group ref={rootGroup} scale={0.85} position={[0, -0.4, 0]}>
      {isHigh && (
        <>
          <OrbitalRing radius={1.5} tilt={[Math.PI / 3, Math.PI / 6, 0]} speed={0.35} color="#38bdf8" />
          <OrbitalRing radius={1.7} tilt={[-Math.PI / 4, Math.PI / 4, 0]} speed={-0.28} color="#818cf8" />
          <OrbitingNode radius={1.5} speed={0.6} offset={0} size={0.14} color="#f59e0b" wireColor="#fbbf24" />
          <OrbitingNode radius={1.7} speed={-0.5} offset={Math.PI / 2} size={0.13} color="#06b6d4" wireColor="#38bdf8" />
          <OrbitingNode radius={1.6} speed={0.8} offset={Math.PI} size={0.12} color="#3b82f6" wireColor="#60a5fa" />
        </>
      )}

      <group ref={chassisGroup}>
        {/* Head + cloud crown */}
        <group ref={headGroup} position={[0, 0.48, 0]}>
          <mesh>
            <sphereGeometry args={[0.5, isHigh ? 32 : 16, isHigh ? 32 : 16]} />
            <meshStandardMaterial color="#0f172a" emissive="#0284c7" emissiveIntensity={0.22} roughness={0.15} metalness={0.85} />
          </mesh>

          <group position={[0, -0.3, 0.22]}>
            <mesh>
              <boxGeometry args={[0.6, 0.36, 0.4]} />
              <meshStandardMaterial color="#020617" emissive="#0f172a" roughness={0.1} metalness={0.95} />
            </mesh>
            <mesh ref={visorGlow} position={[0, 0.02, 0.21]}>
              <boxGeometry args={[0.5, 0.22, 0.03]} />
              <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.55} roughness={0.05} metalness={0.9} />
            </mesh>
            <mesh ref={eyeLeft} position={[-0.13, 0.02, 0.235]}>
              <capsuleGeometry args={[0.038, 0.055, 6, 12]} />
              <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.6} />
            </mesh>
            <mesh ref={eyeRight} position={[0.13, 0.02, 0.235]}>
              <capsuleGeometry args={[0.038, 0.055, 6, 12]} />
              <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.6} />
            </mesh>
          </group>

          <mesh position={[0, 0.28, 0]}>
            <cylinderGeometry args={[0.014, 0.018, 0.16, 10]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[0, 0.36, 0]}>
            <sphereGeometry args={[0.04, 12, 12]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.8} />
          </mesh>
        </group>

        {/* Torso */}
        <group position={[0, -0.26, 0]}>
          <mesh>
            <boxGeometry args={[0.64, 0.42, 0.44]} />
            <meshStandardMaterial color="#0b0f19" emissive="#0284c7" emissiveIntensity={0.1} roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.04, 0.23]}>
            <circleGeometry args={[0.12, isHigh ? 28 : 16]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={1.3} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0.04, 0.235]}>
            <ringGeometry args={[0.075, 0.11, isHigh ? 28 : 16]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.85} />
          </mesh>
          {isHigh && (
            <>
              <mesh position={[-0.17, 0.11, 0.23]}>
                <sphereGeometry args={[0.02, 10, 10]} />
                <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={1.8} />
              </mesh>
              <mesh position={[-0.17, 0.04, 0.23]}>
                <sphereGeometry args={[0.02, 10, 10]} />
                <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.8} />
              </mesh>
            </>
          )}
        </group>

        {/* Arms */}
        <mesh position={[-0.42, -0.42, 0]}>
          <capsuleGeometry args={[0.05, 0.26, 6, 12]} />
          <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
        </mesh>
        <mesh position={[0.42, -0.42, 0]}>
          <capsuleGeometry args={[0.05, 0.26, 6, 12]} />
          <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
        </mesh>

        {/* Thruster */}
        <group position={[0, -0.66, 0]}>
          <mesh>
            <cylinderGeometry args={[0.15, 0.075, 0.1, isHigh ? 24 : 12]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh ref={thrusterGlow} position={[0, -0.08, 0]}>
            <coneGeometry args={[0.13, 0.24, isHigh ? 24 : 12]} rotation={[Math.PI, 0, 0]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2.2} transparent opacity={0.75} />
          </mesh>
        </group>
      </group>

      {/* Invisible, slightly-larger interaction collider so touch targets
          are forgiving without affecting visible geometry. */}
      <mesh visible={false} onPointerDown={(e) => e.stopPropagation()}>
        <sphereGeometry args={[1.1, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
};

export default CloudRobotModel;
