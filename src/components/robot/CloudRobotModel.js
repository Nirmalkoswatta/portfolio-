import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { AdditiveBlending, DoubleSide } from 'three';

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const damp = (current, target, lambda, delta) =>
  current + (target - current) * (1 - Math.exp(-lambda * delta));

// Shared material presets - keeps the "premium consumer tech" look (matte
// plastic + gentle clearcoat, no chrome, no neon) consistent across parts.
const shellProps = { color: '#f4f7fb', roughness: 0.32, metalness: 0.06, clearcoat: 0.55, clearcoatRoughness: 0.2 };
const accentProps = { color: '#3b82f6', emissive: '#1d4ed8', emissiveIntensity: 0.22, roughness: 0.3, metalness: 0.1, clearcoat: 0.5, clearcoatRoughness: 0.2 };
const darkProps = { color: '#0b1220', roughness: 0.25, metalness: 0.35, clearcoat: 0.6, clearcoatRoughness: 0.15 };
const faceProps = { color: '#04070d', roughness: 0.1, metalness: 0.2, clearcoat: 1, clearcoatRoughness: 0.05 };

const Shell = (props) => <meshPhysicalMaterial {...shellProps} {...props} />;
const Accent = (props) => <meshPhysicalMaterial {...accentProps} {...props} />;
const Dark = (props) => <meshPhysicalMaterial {...darkProps} {...props} />;

// Puff-of-smoke burst fired at jump takeoff/landing. A fixed pool of plain
// spheres (cheap: meshBasicMaterial, no lighting cost) reused across bursts -
// nothing is created/destroyed per frame, only repositioned/faded. Additive
// blending + a bright core color makes it read clearly against both light
// and dark page backgrounds instead of blending into them.
const SMOKE_COUNT_HIGH = 10;
const SMOKE_COUNT_LOW = 6;

const SmokePuffs = ({ smokeRef, quality }) => {
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
        p.y = -0.8 + Math.random() * 0.1;
        p.z = (Math.random() - 0.5) * 0.2;
        p.vx = (Math.random() - 0.5) * 0.5 - originX * 0.6;
        p.vy = 0.35 + Math.random() * 0.35;
        p.vz = (Math.random() - 0.5) * 0.5;
        p.baseScale = 0.75 + Math.random() * 0.6;
      });
      ringState.current.age = 0;
      if (ringRef.current) {
        ringRef.current.position.set(originX, -0.85, 0);
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

// One articulated arm: shoulder ball -> thin connector -> elbow -> forearm -> hand.
const Arm = React.forwardRef(({ side = 1, seg }, ref) => (
  <group ref={ref} position={[side * 0.4, 0.14, 0]}>
    <mesh>
      <sphereGeometry args={[0.075, seg, seg]} />
      <Accent />
    </mesh>
    <mesh position={[side * 0.02, -0.12, 0]} rotation={[0, 0, side * 0.15]}>
      <cylinderGeometry args={[0.028, 0.032, 0.16, seg]} />
      <Dark />
    </mesh>
    <mesh position={[side * 0.045, -0.22, 0]}>
      <sphereGeometry args={[0.05, seg, seg]} />
      <Accent />
    </mesh>
    <mesh position={[side * 0.065, -0.35, 0]} rotation={[0, 0, side * 0.08]}>
      <capsuleGeometry args={[0.058, 0.16, 6, seg]} />
      <Accent emissiveIntensity={0.15} />
    </mesh>
    {/* hand */}
    <group position={[side * 0.08, -0.47, 0]}>
      <mesh>
        <sphereGeometry args={[0.058, seg, seg]} />
        <Dark />
      </mesh>
      {[-0.03, 0, 0.03].map((z, i) => (
        <mesh key={i} position={[side * 0.045, -0.035, z]}>
          <sphereGeometry args={[0.016, 8, 8]} />
          <Dark />
        </mesh>
      ))}
    </group>
  </group>
));

/**
 * Rounded white/blue companion character. Reads interaction targets from
 * `motion` (refs bundle, see useRobotInteraction) and owns all per-frame
 * transform mutation - composed each frame from idle breathing + cursor
 * look + section bias + GSAP-driven jump motion + eye blink.
 */
const CloudRobotModel = ({ motion, quality = 'high' }) => {
  const rootGroup = useRef();
  const chassisGroup = useRef();
  const headGroup = useRef();
  const eyeLeft = useRef();
  const eyeRight = useRef();
  const mouthGlow = useRef();
  const bandGlow = useRef();
  const groundGlow = useRef();
  const leftArm = useRef();
  const rightArm = useRef();
  const entrance = useRef(0);
  const idleSeed = useRef(Math.random() * Math.PI * 2);
  const nextBlinkAt = useRef(2 + Math.random() * 3);
  const blinkPhase = useRef(0); // 0 = open, 1 = fully closed

  const isHigh = quality === 'high';
  const seg = isHigh ? 28 : 16;

  useFrame((state, rawDelta) => {
    if (!rootGroup.current || !chassisGroup.current || !headGroup.current) return;
    const delta = Math.min(rawDelta, 1 / 30);
    const t = state.clock.elapsedTime;
    const { pointerRef, sectionBiasRef, motionRef, reducedMotionRef } = motion;
    const m = motionRef.current;
    const reduced = reducedMotionRef.current;

    // Entrance: gentle rise + soft overshoot settle.
    entrance.current = Math.min(1, entrance.current + delta / 0.9);
    const entranceEase = 1 - Math.pow(1 - entrance.current, 3);
    const entranceOvershoot = entrance.current < 1 ? Math.sin(entrance.current * Math.PI) * 0.035 : 0;

    // Calm idle breathing.
    const breathe = reduced ? 0 : Math.sin(t * 1.05) * 0.03;
    rootGroup.current.position.y = breathe + (entranceEase - 1) * 0.45;
    rootGroup.current.scale.setScalar(0.98 + entranceEase * 0.02 * (0.96 + m.squash * 0.04) + entranceOvershoot);
    // Idle sway, plus a light in-flight spin while jumping (GSAP-owned `spin`
    // target: -1..1) for a touch of playfulness during the hop.
    const idleSway = reduced ? 0 : Math.sin(t * 0.22 + idleSeed.current) * 0.03;
    rootGroup.current.rotation.y = idleSway + (reduced ? 0 : m.spin * 0.5);

    // Jump arc (screen-space travel handled by the DOM wrapper).
    const arcHeight = reduced ? 0 : Math.sin(m.arc * Math.PI) * 0.3;
    rootGroup.current.position.y += arcHeight;

    // Body lean during anticipation/jump/settle (GSAP-owned target).
    chassisGroup.current.rotation.z = damp(chassisGroup.current.rotation.z, m.leanX * 0.55, 6, delta);

    // Cursor awareness: head + eyes only, clamped + damped.
    const pointerTargetY = reduced ? 0 : clamp(pointerRef.current.x, -1, 1) * 0.3;
    const pointerTargetX = reduced ? 0 : clamp(-pointerRef.current.y, -1, 1) * 0.16;
    const sectionBias = sectionBiasRef.current || { rotY: 0, rotX: 0 };
    const microGlance = reduced ? 0 : Math.sin(t * 0.17 + idleSeed.current) * 0.045;

    const targetHeadY = clamp(pointerTargetY + sectionBias.rotY + microGlance, -0.45, 0.45) + m.leanX * 0.3;
    const targetHeadX = clamp(pointerTargetX + sectionBias.rotX, -0.26, 0.26);
    headGroup.current.rotation.y = damp(headGroup.current.rotation.y, targetHeadY, 5, delta);
    headGroup.current.rotation.x = damp(headGroup.current.rotation.x, targetHeadX, 5, delta);

    chassisGroup.current.rotation.y = damp(chassisGroup.current.rotation.y, sectionBias.rotY * 0.35, 3, delta);

    // Arms settle gently, counter-swaying against body lean.
    if (leftArm.current && rightArm.current) {
      const sway = Math.sin(t * 1.05 + idleSeed.current) * 0.035 - m.leanX * 0.35;
      leftArm.current.rotation.z = damp(leftArm.current.rotation.z, 0.1 + sway, 5, delta);
      rightArm.current.rotation.z = damp(rightArm.current.rotation.z, -0.1 + sway, 5, delta);
    }

    // Blink: quick close/open envelope on an unpredictable timer - reads as
    // alive without being distracting.
    if (!reduced) {
      if (t >= nextBlinkAt.current) {
        const BLINK_DURATION = 0.14;
        const progress = clamp((t - nextBlinkAt.current) / BLINK_DURATION, 0, 1);
        blinkPhase.current = Math.sin(progress * Math.PI); // closes then reopens
        if (progress >= 1) nextBlinkAt.current = t + 2.5 + Math.random() * 4;
      } else {
        blinkPhase.current = 0;
      }
    } else {
      blinkPhase.current = 0;
    }
    const eyeScaleY = Math.max(0.08, 1 - blinkPhase.current * 0.92);
    if (eyeLeft.current) eyeLeft.current.scale.y = eyeScaleY;
    if (eyeRight.current) eyeRight.current.scale.y = eyeScaleY;

    // Subtle eye/face glow: idle pulse + interaction boost.
    const idlePulse = 0.85 + Math.sin(t * 2.4) * 0.12;
    const glowBoost = idlePulse + m.eyeBoost * 0.9;
    if (eyeLeft.current) eyeLeft.current.material.emissiveIntensity = glowBoost;
    if (eyeRight.current) eyeRight.current.material.emissiveIntensity = glowBoost;
    if (mouthGlow.current) mouthGlow.current.material.emissiveIntensity = 0.5 + m.eyeBoost * 0.6;
    if (bandGlow.current) bandGlow.current.material.emissiveIntensity = 0.28 + Math.sin(t * 1.2) * 0.06 + m.eyeBoost * 0.25;
    if (groundGlow.current) {
      groundGlow.current.material.opacity = (0.14 + Math.sin(t * 1.1) * 0.03 + m.eyeBoost * 0.08) * entranceEase;
      groundGlow.current.scale.setScalar(1 + arcHeight * 0.6);
    }
  });

  return (
    <group ref={rootGroup} scale={1.12} position={[0, -0.32, 0]}>
      {/* Soft grounding glow - gives the character a sense of weight/presence */}
      <mesh ref={groundGlow} position={[0, -1.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.6, 32]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.14} depthWrite={false} />
      </mesh>

      {/* Takeoff/landing smoke puffs */}
      <SmokePuffs smokeRef={motion.smokeRef} quality={quality} />

      <group ref={chassisGroup}>
        {/* ===== HEAD ===== */}
        <group ref={headGroup} position={[0, 0.62, 0]}>
          {/* Headphone-style accent band arcing over the head */}
          <mesh ref={bandGlow} position={[0, 0.16, 0]}>
            <torusGeometry args={[0.42, 0.022, 10, 40, Math.PI]} />
            <Accent emissiveIntensity={0.3} />
          </mesh>
          <mesh position={[-0.42, 0.16, 0]}>
            <sphereGeometry args={[0.055, seg, seg]} />
            <Shell />
          </mesh>
          <mesh position={[0.42, 0.16, 0]}>
            <sphereGeometry args={[0.055, seg, seg]} />
            <Shell />
          </mesh>

          {/* Rounded helmet shell */}
          <RoundedBox args={[0.62, 0.56, 0.5]} radius={0.22} smoothness={4}>
            <Shell />
          </RoundedBox>

          {/* Glossy face display */}
          <group position={[0, -0.02, 0.235]}>
            <RoundedBox args={[0.46, 0.34, 0.05]} radius={0.13} smoothness={4}>
              <Dark {...faceProps} />
            </RoundedBox>

            <mesh ref={eyeLeft} position={[-0.1, 0.02, 0.03]}>
              <sphereGeometry args={[0.045, seg, seg]} />
              <meshStandardMaterial color="#7dd3fc" emissive="#38bdf8" emissiveIntensity={0.9} />
            </mesh>
            <mesh ref={eyeRight} position={[0.1, 0.02, 0.03]}>
              <sphereGeometry args={[0.045, seg, seg]} />
              <meshStandardMaterial color="#7dd3fc" emissive="#38bdf8" emissiveIntensity={0.9} />
            </mesh>

            {/* small smile */}
            <mesh ref={mouthGlow} position={[0, -0.09, 0.03]} rotation={[0, 0, Math.PI]}>
              <torusGeometry args={[0.045, 0.008, 8, 20, Math.PI]} />
              <meshStandardMaterial color="#7dd3fc" emissive="#38bdf8" emissiveIntensity={0.5} />
            </mesh>
          </group>
        </group>

        {/* Neck */}
        <mesh position={[0, 0.32, 0]}>
          <cylinderGeometry args={[0.09, 0.11, 0.1, seg]} />
          <Dark />
        </mesh>

        {/* ===== TORSO ===== */}
        <group position={[0, -0.06, 0]} scale={[1, 1.12, 0.92]}>
          <mesh>
            <sphereGeometry args={[0.4, seg, seg]} />
            <Shell />
          </mesh>
          {/* horizontal accent band */}
          <mesh position={[0, -0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.395, 0.055, 10, 40]} />
            <Accent emissiveIntensity={0.16} />
          </mesh>
          {/* small status dot */}
          <mesh position={[0, 0.16, 0.36]}>
            <sphereGeometry args={[0.024, 12, 12]} />
            <meshStandardMaterial color="#7dd3fc" emissive="#38bdf8" emissiveIntensity={1.2} />
          </mesh>
        </group>

        {/* ===== ARMS ===== */}
        <Arm ref={leftArm} side={-1} seg={seg} />
        <Arm ref={rightArm} side={1} seg={seg} />

        {/* ===== LOWER BODY ===== */}
        <mesh position={[0, -0.48, 0]}>
          <sphereGeometry args={[0.28, seg, seg, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
          <Shell />
        </mesh>
        <mesh position={[0, -0.66, 0]}>
          <coneGeometry args={[0.2, 0.28, seg]} />
          <Accent emissiveIntensity={0.18} />
        </mesh>
        <mesh position={[0, -0.79, 0]}>
          <sphereGeometry args={[0.045, seg, seg]} />
          <meshStandardMaterial color="#7dd3fc" emissive="#38bdf8" emissiveIntensity={1} />
        </mesh>
      </group>

      {/* Invisible, slightly-larger interaction collider for forgiving hit area. */}
      <mesh visible={false} onPointerDown={(e) => e.stopPropagation()}>
        <sphereGeometry args={[1.1, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
};

export default CloudRobotModel;
