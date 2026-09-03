import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';

// Orbiting cloud/infra satellite node - purely decorative, skipped on mobile.
const OrbitingNode = ({ radius, speed, offset, size = 0.13, color = '#38bdf8', wireColor = '#60a5fa' }) => {
  const nodeRef = useRef();
  useFrame((state) => {
    if (!nodeRef.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    nodeRef.current.position.set(Math.cos(t) * radius, Math.sin(t * 2) * 0.18, Math.sin(t) * radius);
    nodeRef.current.rotation.x = t * 1.4;
    nodeRef.current.rotation.y = t * 1.8;
  });
  return (
    <group ref={nodeRef}>
      <RoundedBox args={[size, size, size]} radius={size * 0.28} smoothness={3}>
        <meshPhysicalMaterial color={color} emissive={color} emissiveIntensity={0.7} roughness={0.15} metalness={0.85} clearcoat={0.6} />
      </RoundedBox>
      <mesh scale={1.3}>
        <boxGeometry args={[size, size, size]} />
        <meshBasicMaterial color={wireColor} wireframe transparent opacity={0.3} />
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
        <torusGeometry args={[radius, 0.008, 12, 64]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.45} transparent opacity={0.28} roughness={0.2} />
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
  const eyeLeftCore = useRef();
  const eyeRightCore = useRef();
  const thrusterGlow = useRef();
  const groundGlow = useRef();
  const leftArm = useRef();
  const rightArm = useRef();
  const entrance = useRef(0);
  const idleSeed = useRef(Math.random() * Math.PI * 2);

  const isHigh = quality === 'high';

  useFrame((state, rawDelta) => {
    if (!rootGroup.current || !chassisGroup.current || !headGroup.current) return;
    const delta = Math.min(rawDelta, 1 / 30); // clamp to avoid huge jumps on tab-switch
    const t = state.clock.elapsedTime;
    const { pointerRef, sectionBiasRef, motionRef, reducedMotionRef } = motion;
    const m = motionRef.current;
    const reduced = reducedMotionRef.current;

    // Entrance: gentle rise + fade-in scale on first ~0.9s, gentle overshoot settle.
    entrance.current = Math.min(1, entrance.current + delta / 0.9);
    const entranceEase = 1 - Math.pow(1 - entrance.current, 3);
    const entranceOvershoot = entrance.current < 1 ? Math.sin(entrance.current * Math.PI) * 0.04 : 0;

    // Calm idle breathing - subtle, never cartoon bobbing.
    const breathe = reduced ? 0 : Math.sin(t * 1.1) * 0.032;
    rootGroup.current.position.y = breathe + (entranceEase - 1) * 0.45;
    const squashScale = 0.96 + entranceEase * 0.04 * (0.95 + m.squash * 0.05) + entranceOvershoot;
    rootGroup.current.scale.setScalar(squashScale);

    // Slow, near-imperceptible full-body sway for a "quietly alive" feel.
    rootGroup.current.rotation.y = reduced ? 0 : Math.sin(t * 0.25 + idleSeed.current) * 0.035;

    // Jump arc (screen-space move is handled by the DOM wrapper; this adds
    // a small vertical hop + lean so the jump reads as physical motion).
    const arcHeight = reduced ? 0 : Math.sin(m.arc * Math.PI) * 0.32;
    rootGroup.current.position.y += arcHeight;

    // Body lean during anticipation/jump/settle, owned by GSAP via motionRef.
    const targetBodyRotZ = m.leanX * 0.6;
    chassisGroup.current.rotation.z = damp(chassisGroup.current.rotation.z, targetBodyRotZ, 6, delta);

    // Cursor awareness: head + eyes only, clamped + damped (never full body).
    const pointerTargetY = reduced ? 0 : clamp(pointerRef.current.x, -1, 1) * 0.32;
    const pointerTargetX = reduced ? 0 : clamp(-pointerRef.current.y, -1, 1) * 0.18;
    const sectionBias = sectionBiasRef.current || { rotY: 0, rotX: 0 };

    // Occasional slow micro-glance drift layered under cursor tracking.
    const microGlance = reduced ? 0 : Math.sin(t * 0.18 + idleSeed.current) * 0.05;

    const targetHeadY = clamp(pointerTargetY + sectionBias.rotY + microGlance, -0.5, 0.5) + m.leanX * 0.35;
    const targetHeadX = clamp(pointerTargetX + sectionBias.rotX, -0.3, 0.3);

    headGroup.current.rotation.y = damp(headGroup.current.rotation.y, targetHeadY, 5, delta);
    headGroup.current.rotation.x = damp(headGroup.current.rotation.x, targetHeadX, 5, delta);

    // Whole-chassis follows section bias very subtly (composition shift).
    const targetChassisY = sectionBias.rotY * 0.4;
    chassisGroup.current.rotation.y = damp(chassisGroup.current.rotation.y, targetChassisY, 3, delta);

    // Arms sway gently opposite the body lean - reads as a natural counterbalance.
    if (leftArm.current && rightArm.current) {
      const armSwing = Math.sin(t * 1.1 + idleSeed.current) * 0.05 - m.leanX * 0.4;
      leftArm.current.rotation.z = damp(leftArm.current.rotation.z, 0.08 + armSwing, 5, delta);
      rightArm.current.rotation.z = damp(rightArm.current.rotation.z, -0.08 + armSwing, 5, delta);
    }

    // Eye glow: idle pulse + interaction boost.
    const idlePulse = 1.0 + Math.sin(t * 3.4) * 0.25;
    const eyeIntensity = idlePulse + m.eyeBoost * 1.4;
    if (eyeLeft.current) eyeLeft.current.material.emissiveIntensity = eyeIntensity;
    if (eyeRight.current) eyeRight.current.material.emissiveIntensity = eyeIntensity;
    if (eyeLeftCore.current) eyeLeftCore.current.material.opacity = 0.7 + m.eyeBoost * 0.3;
    if (eyeRightCore.current) eyeRightCore.current.material.opacity = 0.7 + m.eyeBoost * 0.3;
    if (visorGlow.current) visorGlow.current.material.emissiveIntensity = 0.4 + Math.sin(t * 1.4) * 0.12 + m.eyeBoost * 0.35;
    if (thrusterGlow.current) thrusterGlow.current.scale.setScalar(1 + Math.sin(t * 7) * 0.08 + m.eyeBoost * 0.15);
    if (groundGlow.current) {
      groundGlow.current.material.opacity = (0.16 + Math.sin(t * 1.1) * 0.03 + m.eyeBoost * 0.1) * entranceEase;
      groundGlow.current.scale.setScalar(1 + arcHeight * 0.6);
    }
  });

  const seg = isHigh ? 32 : 18;

  return (
    <group ref={rootGroup} scale={1.05} position={[0, -0.35, 0]}>
      {isHigh && (
        <>
          <OrbitalRing radius={1.55} tilt={[Math.PI / 3, Math.PI / 6, 0]} speed={0.3} color="#38bdf8" />
          <OrbitalRing radius={1.75} tilt={[-Math.PI / 4, Math.PI / 4, 0]} speed={-0.24} color="#818cf8" />
          <OrbitingNode radius={1.55} speed={0.55} offset={0} size={0.13} color="#f59e0b" wireColor="#fbbf24" />
          <OrbitingNode radius={1.75} speed={-0.45} offset={Math.PI / 2} size={0.12} color="#06b6d4" wireColor="#38bdf8" />
          <OrbitingNode radius={1.65} speed={0.7} offset={Math.PI} size={0.11} color="#3b82f6" wireColor="#60a5fa" />
        </>
      )}

      {/* Soft grounding glow beneath the robot - subtle sense of weight/presence */}
      <mesh ref={groundGlow} position={[0, -0.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.62, 32]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.16} depthWrite={false} />
      </mesh>

      <group ref={chassisGroup}>
        {/* Head */}
        <group ref={headGroup} position={[0, 0.56, 0]}>
          <mesh>
            <sphereGeometry args={[0.46, seg, seg]} />
            <meshPhysicalMaterial
              color="#0f172a"
              emissive="#0284c7"
              emissiveIntensity={0.2}
              roughness={0.22}
              metalness={0.75}
              clearcoat={0.5}
              clearcoatRoughness={0.25}
            />
          </mesh>

          {/* Face plate - rounded so it reads as a friendly visor, not a shoebox */}
          <group position={[0, -0.06, 0.24]}>
            <RoundedBox args={[0.56, 0.34, 0.18]} radius={0.09} smoothness={4}>
              <meshPhysicalMaterial color="#020617" emissive="#0f172a" roughness={0.15} metalness={0.9} clearcoat={0.4} />
            </RoundedBox>
            <mesh ref={visorGlow} position={[0, 0.01, 0.1]}>
              <RoundedBox args={[0.46, 0.2, 0.02]} radius={0.06} smoothness={3}>
                <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.5} roughness={0.05} metalness={0.85} />
              </RoundedBox>
            </mesh>

            {/* Eyes: soft glowing lens with bright core - friendlier than hard capsules */}
            <group position={[-0.13, 0.01, 0.13]}>
              <mesh ref={eyeLeft}>
                <sphereGeometry args={[0.052, seg, seg]} />
                <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.5} />
              </mesh>
              <mesh ref={eyeLeftCore} position={[0, 0, 0.03]}>
                <sphereGeometry args={[0.024, 12, 12]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
              </mesh>
            </group>
            <group position={[0.13, 0.01, 0.13]}>
              <mesh ref={eyeRight}>
                <sphereGeometry args={[0.052, seg, seg]} />
                <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.5} />
              </mesh>
              <mesh ref={eyeRightCore} position={[0, 0, 0.03]}>
                <sphereGeometry args={[0.024, 12, 12]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
              </mesh>
            </group>
          </group>

          {isHigh && (
            <>
              <mesh position={[0, 0.34, 0]}>
                <cylinderGeometry args={[0.012, 0.016, 0.14, 10]} />
                <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.7} />
              </mesh>
              <mesh position={[0, 0.41, 0]}>
                <sphereGeometry args={[0.036, 14, 14]} />
                <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.6} />
              </mesh>
            </>
          )}
        </group>

        {/* Neck - closes the visible gap between head and torso */}
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.1, 0.13, 0.16, seg]} />
          <meshPhysicalMaterial color="#111827" roughness={0.3} metalness={0.8} clearcoat={0.3} />
        </mesh>

        {/* Torso - rounded, more organic than a raw box */}
        <group position={[0, -0.02, 0]}>
          <RoundedBox args={[0.6, 0.62, 0.4]} radius={0.14} smoothness={4}>
            <meshPhysicalMaterial
              color="#0b0f19"
              emissive="#0284c7"
              emissiveIntensity={0.08}
              roughness={0.28}
              metalness={0.75}
              clearcoat={0.45}
              clearcoatRoughness={0.3}
            />
          </RoundedBox>
          <mesh position={[0, 0.08, 0.21]}>
            <circleGeometry args={[0.115, seg]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={1.1} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0.08, 0.215]}>
            <ringGeometry args={[0.07, 0.105, seg]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
          </mesh>
          {isHigh && (
            <>
              <mesh position={[-0.16, 0.18, 0.21]}>
                <sphereGeometry args={[0.018, 10, 10]} />
                <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={1.6} />
              </mesh>
              <mesh position={[-0.16, 0.11, 0.21]}>
                <sphereGeometry args={[0.018, 10, 10]} />
                <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.6} />
              </mesh>
            </>
          )}
        </group>

        {/* Arms - shoulder joint + capsule, pivoted so the swing looks natural */}
        <group ref={leftArm} position={[-0.36, 0.2, 0]}>
          <mesh position={[0, -0.02, 0]}>
            <sphereGeometry args={[0.075, seg, seg]} />
            <meshPhysicalMaterial color="#1e293b" roughness={0.25} metalness={0.8} clearcoat={0.3} />
          </mesh>
          <mesh position={[-0.03, -0.2, 0]} rotation={[0, 0, 0.06]}>
            <capsuleGeometry args={[0.055, 0.28, 8, seg]} />
            <meshPhysicalMaterial color="#1e293b" roughness={0.25} metalness={0.8} clearcoat={0.3} />
          </mesh>
        </group>
        <group ref={rightArm} position={[0.36, 0.2, 0]}>
          <mesh position={[0, -0.02, 0]}>
            <sphereGeometry args={[0.075, seg, seg]} />
            <meshPhysicalMaterial color="#1e293b" roughness={0.25} metalness={0.8} clearcoat={0.3} />
          </mesh>
          <mesh position={[0.03, -0.2, 0]} rotation={[0, 0, -0.06]}>
            <capsuleGeometry args={[0.055, 0.28, 8, seg]} />
            <meshPhysicalMaterial color="#1e293b" roughness={0.25} metalness={0.8} clearcoat={0.3} />
          </mesh>
        </group>

        {/* Lower body taper + thruster */}
        <mesh position={[0, -0.42, 0]}>
          <cylinderGeometry args={[0.24, 0.16, 0.22, seg]} />
          <meshPhysicalMaterial color="#0d1220" roughness={0.3} metalness={0.75} clearcoat={0.3} />
        </mesh>
        <group position={[0, -0.62, 0]}>
          <mesh>
            <cylinderGeometry args={[0.15, 0.075, 0.1, seg]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh ref={thrusterGlow} position={[0, -0.08, 0]}>
            <coneGeometry args={[0.12, 0.22, seg]} rotation={[Math.PI, 0, 0]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2} transparent opacity={0.7} />
          </mesh>
        </group>
      </group>

      {/* Invisible, slightly-larger interaction collider so touch targets
          are forgiving without affecting visible geometry. */}
      <mesh visible={false} onPointerDown={(e) => e.stopPropagation()}>
        <sphereGeometry args={[1.15, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
};

export default CloudRobotModel;
