import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import CloudRobot from './CloudRobot';

// High-fidelity 2D Fallback for environments where WebGL is disabled
const Robot2DFallback = () => (
  <div className="w-full h-full flex items-center justify-center relative select-none p-4">
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Outer ambient glow */}
      <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
      
      {/* 2D stylized SVG Cloud Robot */}
      <div className="relative z-10 flex flex-col items-center animate-float">
        {/* Cloud Aura */}
        <div className="relative w-48 h-28 bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-blue-500/40 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/20">
          <div className="absolute -top-3 left-6 w-16 h-16 bg-slate-800 rounded-full border-t-2 border-blue-400/30" />
          <div className="absolute -top-5 right-8 w-20 h-20 bg-slate-800 rounded-full border-t-2 border-blue-400/30" />
          
          {/* Eyes in visor */}
          <div className="relative z-20 w-28 h-12 bg-slate-950 rounded-xl border border-blue-500/60 flex items-center justify-around px-4">
            <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8] animate-pulse" />
            <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8] animate-pulse" />
          </div>
        </div>

        {/* Small chassis */}
        <div className="w-32 h-16 bg-slate-900 border border-slate-700/80 rounded-xl mt-1 flex flex-col items-center justify-center p-2 shadow-lg">
          <div className="flex gap-2 text-[9px] font-mono font-bold text-blue-400">
            <span>AWS</span>
            <span>•</span>
            <span>K8S</span>
            <span>•</span>
            <span>CI/CD</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const RobotScene = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!isClient) {
    return <Robot2DFallback />;
  }

  return (
    <div className="w-full h-full min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] relative overflow-hidden flex items-center justify-center">
      <Suspense fallback={<Robot2DFallback />}>
        <Canvas
          camera={{ position: [0, 0, 4.0], fov: 45 }}
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          {/* Bright, high-contrast studio lighting */}
          <ambientLight intensity={1.2} />
          <directionalLight position={[6, 8, 6]} intensity={1.8} color="#ffffff" />
          <directionalLight position={[-6, -4, -4]} intensity={0.8} color="#38bdf8" />
          <pointLight position={[0, 4, 3]} intensity={1.5} color="#38bdf8" />
          <pointLight position={[-4, 2, 2]} intensity={1.0} color="#06b6d4" />
          <pointLight position={[4, -2, 2]} intensity={1.0} color="#f59e0b" />

          {/* 3D Robot */}
          <CloudRobot mousePosition={mousePosition} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default RobotScene;
