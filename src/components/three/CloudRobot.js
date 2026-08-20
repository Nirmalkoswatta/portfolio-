import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Floating infrastructure node block
const InfrastructureNode = ({ position, color = '#38bdf8', label = 'NODE', speed = 1, size = 0.2 }) => {
  const meshRef = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.18;
    meshRef.current.position.x = position[0] + Math.cos(t * 0.7) * 0.08;
    meshRef.current.rotation.x = t * 0.4;
    meshRef.current.rotation.y = t * 0.6;
  });

  return (
    <group ref={meshRef} position={position}>
      <mesh>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* Wireframe outer shell */}
      <mesh scale={1.2}>
        <boxGeometry args={[size, size, size]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

// Glowing data beam cylinder connecting robot to node
const DataBeam = ({ start, end, color = '#38bdf8' }) => {
  const beamRef = useRef();

  const { position, rotation, length } = useMemo(() => {
    const vStart = new THREE.Vector3(...start);
    const vEnd = new THREE.Vector3(...end);
    const distance = vStart.distanceTo(vEnd);
    const position = vStart.clone().add(vEnd).multiplyScalar(0.5);

    const orientation = new THREE.Matrix4();
    orientation.lookAt(vStart, vEnd, new THREE.Vector3(0, 1, 0));
    const rotation = new THREE.Euler().setFromRotationMatrix(orientation);

    return { position: [position.x, position.y, position.z], rotation: [rotation.x, rotation.y, rotation.z], length: distance };
  }, [start, end]);

  useFrame((state) => {
    if (!beamRef.current) return;
    beamRef.current.material.opacity = 0.25 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
  });

  return (
    <mesh ref={beamRef} position={position} rotation={rotation}>
      <cylinderGeometry args={[0.012, 0.012, length, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  );
};

// Traveling packet particle
const FlowingPacket = ({ start, end, color = '#ffffff', speed = 1.2 }) => {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * 5, []);

  useFrame((state) => {
    if (!ref.current) return;
    const progress = ((state.clock.elapsedTime * speed + offset) % 2) / 2;
    ref.current.position.x = start[0] + (end[0] - start[0]) * progress;
    ref.current.position.y = start[1] + (end[1] - start[1]) * progress;
    ref.current.position.z = start[2] + (end[2] - start[2]) * progress;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.035, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

const CloudRobot = ({ mousePosition = { x: 0, y: 0 } }) => {
  const robotGroup = useRef();
  const eyeLeft = useRef();
  const eyeRight = useRef();
  const headGroup = useRef();

  useFrame((state) => {
    if (!robotGroup.current) return;
    const t = state.clock.elapsedTime;

    // Smooth hover & gentle breathing
    robotGroup.current.position.y = Math.sin(t * 1.2) * 0.14;
    robotGroup.current.position.x = Math.cos(t * 0.8) * 0.06;

    // Pointer-following rotation with soft spring
    const targetRotY = (mousePosition.x || 0) * 0.35;
    const targetRotX = -(mousePosition.y || 0) * 0.2;
    robotGroup.current.rotation.y += (targetRotY - robotGroup.current.rotation.y) * 0.05;
    robotGroup.current.rotation.x += (targetRotX - robotGroup.current.rotation.x) * 0.05;

    // Subtle head tilt
    if (headGroup.current) {
      headGroup.current.rotation.y = Math.sin(t * 1.5) * 0.06;
      headGroup.current.rotation.z = Math.cos(t * 1.2) * 0.03;
    }

    // Eye glow pulse
    if (eyeLeft.current && eyeRight.current) {
      const pulse = 0.7 + Math.sin(t * 4) * 0.3;
      eyeLeft.current.material.emissiveIntensity = pulse;
      eyeRight.current.material.emissiveIntensity = pulse;
    }
  });

  return (
    <group ref={robotGroup} scale={1.5} position={[0, -0.1, 0]}>
      {/* ================= CLOUD AURA BODY ================= */}
      <group position={[0, 0.45, 0]}>
        {/* Main cloud sphere */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.55, 24, 24]} />
          <meshStandardMaterial
            color="#1e293b"
            emissive="#0f172a"
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        {/* Cloud puffs */}
        <mesh position={[0.42, 0.1, -0.05]}>
          <sphereGeometry args={[0.36, 16, 16]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[-0.4, 0.12, 0.05]}>
          <sphereGeometry args={[0.34, 16, 16]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[0.1, 0.32, -0.1]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.7} />
        </mesh>
      </group>

      {/* ================= ROBOT HEAD & VISOR ================= */}
      <group ref={headGroup} position={[0, 0.22, 0.32]}>
        {/* Head chassis */}
        <mesh>
          <boxGeometry args={[0.52, 0.36, 0.38]} />
          <meshStandardMaterial
            color="#0f172a"
            emissive="#1e293b"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Visor display */}
        <mesh position={[0, 0.02, 0.2]}>
          <boxGeometry args={[0.42, 0.2, 0.02]} />
          <meshStandardMaterial
            color="#0284c7"
            emissive="#0369a1"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Left Glowing Cyan Eye */}
        <mesh ref={eyeLeft} position={[-0.1, 0.02, 0.22]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={1.2}
          />
        </mesh>

        {/* Right Glowing Cyan Eye */}
        <mesh ref={eyeRight} position={[0.1, 0.02, 0.22]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={1.2}
          />
        </mesh>

        {/* Antenna rod */}
        <mesh position={[0, 0.26, 0]}>
          <cylinderGeometry args={[0.015, 0.015, 0.16, 8]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.6} />
        </mesh>
        {/* Antenna beacon bulb */}
        <mesh position={[0, 0.35, 0]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.5} />
        </mesh>
      </group>

      {/* ================= TORSO & TERMINAL PANEL ================= */}
      <group position={[0, -0.22, 0]}>
        {/* Torso block */}
        <mesh>
          <boxGeometry args={[0.55, 0.42, 0.4]} />
          <meshStandardMaterial
            color="#0f172a"
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>

        {/* Chest status panel */}
        <mesh position={[0, 0.02, 0.21]}>
          <boxGeometry args={[0.36, 0.22, 0.02]} />
          <meshStandardMaterial
            color="#020617"
            emissive="#1e293b"
            roughness={0.1}
          />
        </mesh>

        {/* Status indicator LEDs */}
        <mesh position={[-0.1, 0.04, 0.23]}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={1.5} />
        </mesh>
        <mesh position={[0, 0.04, 0.23]}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.5} />
        </mesh>
        <mesh position={[0.1, 0.04, 0.23]}>
          <sphereGeometry args={[0.022, 8, 8]} />
          <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1.5} />
        </mesh>
      </group>

      {/* ================= ARMS & THRUSTERS ================= */}
      {/* Left arm */}
      <group position={[-0.38, -0.15, 0]}>
        <mesh>
          <boxGeometry args={[0.1, 0.32, 0.12]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[0.12, 0.08, 0.14]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Right arm */}
      <group position={[0.38, -0.15, 0]}>
        <mesh>
          <boxGeometry args={[0.1, 0.32, 0.12]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[0.12, 0.08, 0.14]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* ================= FLOATING INFRASTRUCTURE NODES ================= */}
      {/* Node 1: AWS (Amber / Orange) */}
      <InfrastructureNode position={[1.2, 0.6, -0.2]} color="#f59e0b" size={0.16} speed={0.9} />
      {/* Node 2: Kubernetes (Cyan / Blue) */}
      <InfrastructureNode position={[-1.1, 0.7, 0.3]} color="#06b6d4" size={0.15} speed={1.1} />
      {/* Node 3: Docker (Blue) */}
      <InfrastructureNode position={[0.9, -0.4, 0.4]} color="#38bdf8" size={0.14} speed={0.8} />
      {/* Node 4: Terraform / IaC (Purple) */}
      <InfrastructureNode position={[-0.8, -0.3, -0.4]} color="#a855f7" size={0.13} speed={1.0} />

      {/* ================= DATA BEAMS & FLOWING PACKETS ================= */}
      <DataBeam start={[1.2, 0.6, -0.2]} end={[0.4, 0.1, 0]} color="#f59e0b" />
      <DataBeam start={[-1.1, 0.7, 0.3]} end={[-0.4, 0.1, 0]} color="#06b6d4" />
      <DataBeam start={[0.9, -0.4, 0.4]} end={[0.4, -0.2, 0]} color="#38bdf8" />
      <DataBeam start={[-0.8, -0.3, -0.4]} end={[-0.4, -0.2, 0]} color="#a855f7" />

      <FlowingPacket start={[1.2, 0.6, -0.2]} end={[0.4, 0.1, 0]} color="#f59e0b" speed={1.2} />
      <FlowingPacket start={[-1.1, 0.7, 0.3]} end={[-0.4, 0.1, 0]} color="#06b6d4" speed={1.4} />
      <FlowingPacket start={[0.9, -0.4, 0.4]} end={[0.4, -0.2, 0]} color="#38bdf8" speed={1.0} />
      <FlowingPacket start={[-0.8, -0.3, -0.4]} end={[-0.4, -0.2, 0]} color="#a855f7" speed={1.3} />
    </group>
  );
};

export default CloudRobot;
