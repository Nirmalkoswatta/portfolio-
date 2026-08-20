import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Floating infrastructure node
const FloatingNode = ({ position, color = '#3b82f6', size = 0.12, speed = 1 }) => {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.y = position[1] + Math.sin(t) * 0.15;
    ref.current.position.x = position[0] + Math.cos(t * 0.7) * 0.05;
    ref.current.rotation.y = t * 0.5;
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        transparent
        opacity={0.8}
        roughness={0.3}
        metalness={0.7}
      />
    </mesh>
  );
};

// Connection line between nodes
const ConnectionLine = ({ start, end, color = '#3b82f6' }) => {
  const ref = useRef();

  const geometry = useMemo(() => {
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [start, end]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
  });

  return (
    <line ref={ref} geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.15} />
    </line>
  );
};

// Data packet traveling along a connection
const DataPacket = ({ start, end, speed = 0.8, color = '#3b82f6' }) => {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = ((state.clock.elapsedTime * speed + offset) % (Math.PI * 2)) / (Math.PI * 2);
    ref.current.position.x = start[0] + (end[0] - start[0]) * t;
    ref.current.position.y = start[1] + (end[1] - start[1]) * t;
    ref.current.position.z = start[2] + (end[2] - start[2]) * t;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.8}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
};

// Cloud shape helper
const CloudBody = ({ position = [0, 0, 0] }) => {
  const groupRef = useRef();

  return (
    <group ref={groupRef} position={position}>
      {/* Main body */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial
          color="#1a1f35"
          roughness={0.4}
          metalness={0.6}
          transparent
          opacity={0.95}
        />
      </mesh>
      {/* Cloud puffs */}
      <mesh position={[0.35, 0.1, 0]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshStandardMaterial color="#1a1f35" roughness={0.4} metalness={0.6} transparent opacity={0.9} />
      </mesh>
      <mesh position={[-0.3, 0.15, 0.1]}>
        <sphereGeometry args={[0.28, 12, 12]} />
        <meshStandardMaterial color="#1a1f35" roughness={0.4} metalness={0.6} transparent opacity={0.9} />
      </mesh>
      <mesh position={[0.1, 0.3, -0.1]}>
        <sphereGeometry args={[0.25, 12, 12]} />
        <meshStandardMaterial color="#1a1f35" roughness={0.4} metalness={0.6} transparent opacity={0.9} />
      </mesh>
    </group>
  );
};

// The Robot
const CloudRobot = ({ mousePosition = { x: 0, y: 0 } }) => {
  const groupRef = useRef();
  const headRef = useRef();
  const eyeLeftRef = useRef();
  const eyeRightRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Idle floating / breathing
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.12;
    groupRef.current.position.x = Math.cos(t * 0.5) * 0.04;

    // Gentle rotation toward mouse
    const targetRotY = (mousePosition.x || 0) * 0.15;
    const targetRotX = -(mousePosition.y || 0) * 0.08;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.03;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.03;

    // Head slight movement
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 1.2) * 0.05 + targetRotY * 0.3;
      headRef.current.rotation.z = Math.sin(t * 0.9) * 0.02;
    }

    // Eye pulse
    if (eyeLeftRef.current && eyeRightRef.current) {
      const pulse = 0.5 + Math.sin(t * 3) * 0.3;
      eyeLeftRef.current.material.emissiveIntensity = pulse;
      eyeRightRef.current.material.emissiveIntensity = pulse;
    }
  });

  return (
    <group ref={groupRef} scale={1.4}>
      {/* Cloud aura / upper body */}
      <CloudBody position={[0, 0.6, 0]} />

      {/* Head */}
      <group ref={headRef} position={[0, 0.2, 0.3]}>
        {/* Head shell */}
        <mesh>
          <boxGeometry args={[0.45, 0.35, 0.35]} />
          <meshStandardMaterial
            color="#141824"
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
        {/* Visor */}
        <mesh position={[0, 0, 0.18]}>
          <boxGeometry args={[0.38, 0.18, 0.02]} />
          <meshStandardMaterial
            color="#0a1628"
            roughness={0.1}
            metalness={0.9}
            transparent
            opacity={0.9}
          />
        </mesh>
        {/* Left eye */}
        <mesh ref={eyeLeftRef} position={[-0.08, 0.02, 0.19]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={0.6}
          />
        </mesh>
        {/* Right eye */}
        <mesh ref={eyeRightRef} position={[0.08, 0.02, 0.19]}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={0.6}
          />
        </mesh>
        {/* Antenna */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.15, 6]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* Torso */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[0.5, 0.4, 0.35]} />
        <meshStandardMaterial
          color="#141824"
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>

      {/* Chest panel — terminal screen */}
      <mesh position={[0, -0.12, 0.18]}>
        <boxGeometry args={[0.32, 0.2, 0.01]} />
        <meshStandardMaterial
          color="#0a1628"
          emissive="#3b82f6"
          emissiveIntensity={0.05}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Status LEDs on chest */}
      {[[-0.1, -0.05, 0.19], [0, -0.05, 0.19], [0.1, -0.05, 0.19]].map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.015, 6, 6]} />
          <meshStandardMaterial
            color={['#22c55e', '#3b82f6', '#f59e0b'][i]}
            emissive={['#22c55e', '#3b82f6', '#f59e0b'][i]}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}

      {/* Arms */}
      {/* Left arm */}
      <group position={[-0.35, -0.1, 0]}>
        <mesh>
          <boxGeometry args={[0.08, 0.25, 0.08]} />
          <meshStandardMaterial color="#1a1f35" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Hand / tool */}
        <mesh position={[0, -0.16, 0]}>
          <boxGeometry args={[0.1, 0.06, 0.1]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.15} roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      {/* Right arm */}
      <group position={[0.35, -0.1, 0]}>
        <mesh>
          <boxGeometry args={[0.08, 0.25, 0.08]} />
          <meshStandardMaterial color="#1a1f35" roughness={0.4} metalness={0.7} />
        </mesh>
        <mesh position={[0, -0.16, 0]}>
          <boxGeometry args={[0.1, 0.06, 0.1]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.15} roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      {/* Floating infrastructure nodes */}
      <FloatingNode position={[1.0, 0.5, -0.3]} color="#3b82f6" size={0.1} speed={0.8} />
      <FloatingNode position={[-0.9, 0.7, 0.2]} color="#06b6d4" size={0.08} speed={1.2} />
      <FloatingNode position={[0.7, -0.3, 0.5]} color="#8b5cf6" size={0.09} speed={0.6} />
      <FloatingNode position={[-0.6, -0.2, -0.5]} color="#22c55e" size={0.07} speed={1.0} />
      <FloatingNode position={[0.4, 1.0, 0.3]} color="#f59e0b" size={0.06} speed={0.9} />

      {/* Connection lines */}
      <ConnectionLine start={[1.0, 0.5, -0.3]} end={[0.35, 0.05, 0]} color="#3b82f6" />
      <ConnectionLine start={[-0.9, 0.7, 0.2]} end={[-0.35, 0.05, 0]} color="#06b6d4" />
      <ConnectionLine start={[0.7, -0.3, 0.5]} end={[0.35, -0.15, 0.18]} color="#8b5cf6" />
      <ConnectionLine start={[-0.6, -0.2, -0.5]} end={[-0.35, -0.15, 0]} color="#22c55e" />

      {/* Data packets */}
      <DataPacket start={[1.0, 0.5, -0.3]} end={[0.35, 0.05, 0]} speed={0.5} color="#3b82f6" />
      <DataPacket start={[-0.9, 0.7, 0.2]} end={[-0.35, 0.05, 0]} speed={0.7} color="#06b6d4" />
    </group>
  );
};

export default CloudRobot;
