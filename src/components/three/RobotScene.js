import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CloudRobot from './CloudRobot';

// 2D Fallback for mobile / low performance or reduced motion
const Robot2DFallback = () => (
  <div className="w-full h-full flex items-center justify-center relative select-none">
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-3xl animate-pulse" />
      
      {/* 2D stylized SVG Cloud Robot */}
      <div className="relative z-10 flex flex-col items-center animate-float">
        {/* Cloud Aura */}
        <div className="relative w-44 h-24 bg-gradient-to-br from-slate-800 to-slate-900 border border-blue-500/30 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/10">
          <div className="absolute -top-3 left-6 w-16 h-16 bg-slate-800/90 rounded-full border-t border-blue-400/20" />
          <div className="absolute -top-5 right-8 w-20 h-20 bg-slate-800/90 rounded-full border-t border-blue-400/20" />
          
          {/* Eyes in visor */}
          <div className="relative z-20 w-24 h-10 bg-slate-950/90 rounded-xl border border-blue-500/40 flex items-center justify-around px-3">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_8px_#38bdf8] animate-pulse" />
            <div className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_8px_#38bdf8] animate-pulse" />
          </div>
        </div>

        {/* Small chassis */}
        <div className="w-28 h-16 bg-slate-900 border border-slate-700/60 rounded-xl mt-1 flex flex-col items-center justify-center p-2 shadow-lg">
          <div className="w-16 h-2 bg-slate-950 rounded border border-blue-500/30 mb-1 flex items-center px-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
          <div className="flex gap-2 text-[8px] font-mono text-blue-400">
            <span>AWS</span>
            <span>K8S</span>
            <span>CI/CD</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const RobotScene = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check mobile or small screen
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Test WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setIsWebGLSupported(false);
    } catch (e) {
      setIsWebGLSupported(false);
    }

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  if (!isWebGLSupported || isMobile) {
    return <Robot2DFallback />;
  }

  return (
    <div className="w-full h-full min-h-[380px] md:min-h-[460px] relative">
      <Suspense fallback={<Robot2DFallback />}>
        <Canvas
          camera={{ position: [0, 0, 4.2], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          {/* Lighting */}
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 8, 5]} intensity={1.2} color="#ffffff" />
          <pointLight position={[-4, -2, -2]} intensity={0.8} color="#3b82f6" />
          <pointLight position={[3, 3, 2]} intensity={0.6} color="#06b6d4" />
          <pointLight position={[0, -3, 2]} intensity={0.4} color="#8b5cf6" />

          {/* 3D Robot */}
          <CloudRobot mousePosition={mousePosition} />

          {/* Orbit Controls with limited damping and range */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 2.5}
            maxAzimuthAngle={Math.PI / 4}
            minAzimuthAngle={-Math.PI / 4}
            rotateSpeed={0.4}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default RobotScene;
