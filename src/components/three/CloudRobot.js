import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

// Orbiting Cloud Infrastructure Satellite Node
const OrbitingNode = ({ radius, speed, offset, size = 0.14, color = '#38bdf8', wireColor = '#60a5fa' }) => {
  const nodeRef = useRef();

  useFrame((state) => {
    if (!nodeRef.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    const x = Math.cos(t) * radius;
    const z = Math.sin(t) * radius;
    const y = Math.sin(t * 2) * 0.25;

    nodeRef.current.position.set(x, y, z);
    nodeRef.current.rotation.x = t * 1.5;
    nodeRef.current.rotation.y = t * 2;
  });

  return (
    <group ref={nodeRef}>
      {/* Outer container block */}
      <mesh>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      {/* Outer cyber wireframe shell */}
      <mesh scale={1.35}>
        <boxGeometry args={[size, size, size]} />
        <meshBasicMaterial color={wireColor} wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

// Gyroscopic Holographic Orbital Ring
const OrbitalRing = ({ radius, tilt = [0, 0, 0], speed = 0.5, color = '#38bdf8' }) => {
  const ringRef = useRef();

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z = state.clock.elapsedTime * speed;
  });

  return (
    <group rotation={tilt}>
      <mesh ref={ringRef}>
        <torusGeometry args={[radius, 0.012, 16, 64]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          transparent
          opacity={0.35}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
};

// Floating Cloud Particle Core
const AmbientCloudPuff = ({ position, scale = 1, speed = 0.6, color = '#1e293b' }) => {
  const puffRef = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!puffRef.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    puffRef.current.position.y = position[1] + Math.sin(t) * 0.08;
    puffRef.current.position.x = position[0] + Math.cos(t * 0.8) * 0.04;
  });

  return (
    <mesh ref={puffRef} position={position} scale={scale}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive="#0284c7"
        emissiveIntensity={0.15}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
};

const CloudRobot = ({ mousePosition = { x: 0, y: 0 } }) => {
  const rootGroup = useRef();
  const chassisGroup = useRef();
  const visorGlow = useRef();
  const eyeLeft = useRef();
  const eyeRight = useRef();
  const thrusterGlow = useRef();

  useFrame((state) => {
    if (!rootGroup.current || !chassisGroup.current) return;
    const t = state.clock.elapsedTime;

    // Smooth floating hovering motion
    rootGroup.current.position.y = Math.sin(t * 1.5) * 0.16;
    rootGroup.current.position.x = Math.cos(t * 0.9) * 0.06;

    // Responsive banking toward mouse pointer
    const targetRotY = (mousePosition.x || 0) * 0.45;
    const targetRotX = -(mousePosition.y || 0) * 0.25;
    const targetRollZ = -(mousePosition.x || 0) * 0.15;

    chassisGroup.current.rotation.y += (targetRotY - chassisGroup.current.rotation.y) * 0.06;
    chassisGroup.current.rotation.x += (targetRotX - chassisGroup.current.rotation.x) * 0.06;
    chassisGroup.current.rotation.z += (targetRollZ - chassisGroup.current.rotation.z) * 0.06;

    // Cyber eye glow pulse
    if (eyeLeft.current && eyeRight.current) {
      const pulse = 1.0 + Math.sin(t * 5) * 0.4;
      eyeLeft.current.material.emissiveIntensity = pulse;
      eyeRight.current.material.emissiveIntensity = pulse;
    }

    // Visor subtle hue pulse
    if (visorGlow.current) {
      visorGlow.current.material.emissiveIntensity = 0.5 + Math.sin(t * 2) * 0.2;
    }

    // Thruster plasma pulsation
    if (thrusterGlow.current) {
      thrusterGlow.current.scale.setScalar(1 + Math.sin(t * 10) * 0.15);
    }
  });

  return (
    <group ref={rootGroup} scale={1.4} position={[0, -0.05, 0]}>
      {/* ================= GYROSCOPIC CLOUD ORBITAL RINGS ================= */}
      <OrbitalRing radius={1.7} tilt={[Math.PI / 3, Math.PI / 6, 0]} speed={0.4} color="#38bdf8" />
      <OrbitalRing radius={1.9} tilt={[-Math.PI / 4, Math.PI / 4, 0]} speed={-0.3} color="#818cf8" />
      <OrbitalRing radius={1.5} tilt={[Math.PI / 2.2, 0, Math.PI / 8]} speed={0.5} color="#06b6d4" />

      {/* ================= ORBITING CLOUD / K8S SATELLITE PODS ================= */}
      {/* AWS Cloud Node (Amber) */}
      <OrbitingNode radius={1.7} speed={0.7} offset={0} size={0.16} color="#f59e0b" wireColor="#fbbf24" />
      {/* Kubernetes Pod Node (Cyan) */}
      <OrbitingNode radius={1.9} speed={-0.6} offset={Math.PI / 2} size={0.15} color="#06b6d4" wireColor="#38bdf8" />
      {/* Docker Container Node (Blue) */}
      <OrbitingNode radius={1.5} speed={0.9} offset={Math.PI} size={0.14} color="#3b82f6" wireColor="#60a5fa" />
      {/* Terraform IaC Node (Purple) */}
      <OrbitingNode radius={1.8} speed={-0.5} offset={Math.PI * 1.5} size={0.13} color="#a855f7" wireColor="#c084fc" />

      {/* ================= MAIN ROBOT CHASSIS & CLOUD AURA ================= */}
      <group ref={chassisGroup}>
        {/* ---- Top Cloud Crown Dome ---- */}
        <group position={[0, 0.48, 0]}>
          {/* Central Cloud Dome */}
          <mesh>
            <sphereGeometry args={[0.52, 32, 32]} />
            <meshStandardMaterial
              color="#0f172a"
              emissive="#0284c7"
              emissiveIntensity={0.25}
              roughness={0.15}
              metalness={0.85}
            />
          </mesh>

          {/* Cloud Puffs Forming Cyber Silhouette */}
          <AmbientCloudPuff position={[0.42, 0.08, -0.05]} scale={1.15} speed={0.8} />
          <AmbientCloudPuff position={[-0.4, 0.1, 0.05]} scale={1.1} speed={0.9} />
          <AmbientCloudPuff position={[0.08, 0.28, -0.15]} scale={1.0} speed={0.7} />
          <AmbientCloudPuff position={[-0.2, 0.22, 0.18]} scale={0.85} speed={1.1} />
          <AmbientCloudPuff position={[0.25, 0.18, 0.18]} scale={0.85} speed={1.0} />
        </group>

        {/* ---- Sleek Cyber Visor & Head Core ---- */}
        <group position={[0, 0.18, 0.22]}>
          {/* Head Outer Shell (Aerodynamic Rounded Box) */}
          <mesh>
            <boxGeometry args={[0.62, 0.38, 0.42]} />
            <meshStandardMaterial
              color="#020617"
              emissive="#0f172a"
              roughness={0.1}
              metalness={0.95}
            />
          </mesh>

          {/* Curved Visor Screen */}
          <mesh ref={visorGlow} position={[0, 0.02, 0.22]}>
            <boxGeometry args={[0.52, 0.24, 0.03]} />
            <meshStandardMaterial
              color="#0284c7"
              emissive="#0284c7"
              emissiveIntensity={0.6}
              roughness={0.05}
              metalness={0.9}
            />
          </mesh>

          {/* Left Cyber Eye (Glow Cyan Core) */}
          <mesh ref={eyeLeft} position={[-0.13, 0.02, 0.245]}>
            <capsuleGeometry args={[0.04, 0.06, 8, 16]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={1.8}
            />
          </mesh>

          {/* Right Cyber Eye (Glow Cyan Core) */}
          <mesh ref={eyeRight} position={[0.13, 0.02, 0.245]}>
            <capsuleGeometry args={[0.04, 0.06, 8, 16]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={1.8}
            />
          </mesh>

          {/* Holographic HUD Scanline in Visor */}
          <mesh position={[0, -0.05, 0.24]}>
            <boxGeometry args={[0.36, 0.012, 0.005]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.8} />
          </mesh>

          {/* Cyber Antenna / Cloud Uplink Beacon */}
          <mesh position={[0, 0.28, 0]}>
            <cylinderGeometry args={[0.015, 0.02, 0.18, 12]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[0, 0.38, 0]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2.0} />
          </mesh>
        </group>

        {/* ---- Central Cloud Container Engine (Torso) ---- */}
        <group position={[0, -0.26, 0]}>
          {/* Main Torso Block */}
          <mesh>
            <boxGeometry args={[0.66, 0.44, 0.46]} />
            <meshStandardMaterial
              color="#0b0f19"
              emissive="#0284c7"
              emissiveIntensity={0.1}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>

          {/* Glowing Central Pod Core Window (Kubernetes Engine) */}
          <mesh position={[0, 0.04, 0.24]}>
            <circleGeometry args={[0.13, 32]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#0284c7"
              emissiveIntensity={1.5}
              roughness={0.1}
            />
          </mesh>
          {/* Inner Reactor Ring */}
          <mesh position={[0, 0.04, 0.245]}>
            <ringGeometry args={[0.08, 0.12, 32]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
          </mesh>

          {/* Status LEDs on Torso */}
          <mesh position={[-0.18, 0.12, 0.24]}>
            <sphereGeometry args={[0.022, 12, 12]} />
            <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={2.0} />
          </mesh>
          <mesh position={[-0.18, 0.04, 0.24]}>
            <sphereGeometry args={[0.022, 12, 12]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={2.0} />
          </mesh>
          <mesh position={[-0.18, -0.04, 0.24]}>
            <sphereGeometry args={[0.022, 12, 12]} />
            <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={2.0} />
          </mesh>

          {/* Right-side Telemetry Bar */}
          <mesh position={[0.18, 0.04, 0.24]}>
            <boxGeometry args={[0.02, 0.16, 0.01]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.2} />
          </mesh>
        </group>

        {/* ---- Streamlined Robotic Arms & Tool Grippers ---- */}
        {/* Left Arm */}
        <group position={[-0.44, -0.16, 0]}>
          <mesh>
            <capsuleGeometry args={[0.055, 0.28, 8, 16]} />
            <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Glowing Wrist Ring */}
          <mesh position={[0, -0.18, 0]}>
            <torusGeometry args={[0.065, 0.015, 12, 24]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.5} />
          </mesh>
        </group>

        {/* Right Arm */}
        <group position={[0.44, -0.16, 0]}>
          <mesh>
            <capsuleGeometry args={[0.055, 0.28, 8, 16]} />
            <meshStandardMaterial color="#1e293b" roughness={0.2} metalness={0.8} />
          </mesh>
          {/* Glowing Wrist Ring */}
          <mesh position={[0, -0.18, 0]}>
            <torusGeometry args={[0.065, 0.015, 12, 24]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.5} />
          </mesh>
        </group>

        {/* ---- Bottom Cloud Plasma Thruster ---- */}
        <group position={[0, -0.52, 0]}>
          <mesh>
            <cylinderGeometry args={[0.16, 0.08, 0.12, 24]} />
            <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Plasma Flare */}
          <mesh ref={thrusterGlow} position={[0, -0.09, 0]}>
            <coneGeometry args={[0.14, 0.28, 24]} rotation={[Math.PI, 0, 0]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={2.5}
              transparent
              opacity={0.8}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
};

export default CloudRobot;
