import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import CloudRobot from './CloudRobot';

// 2D Fallback for environments where WebGL is disabled
const Robot2DFallback = () => (
  <div className="w-full h-full flex items-center justify-center relative select-none p-4">
    <div className="relative w-72 h-72 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
      
      {/* 2D stylized CloudOps Robot */}
      <div className="relative z-10 flex flex-col items-center animate-float">
        <div className="relative w-52 h-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 border-2 border-blue-500/50 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/25">
          <div className="absolute -top-4 left-7 w-18 h-18 bg-slate-800 rounded-full border-t-2 border-blue-400/40" />
          <div className="absolute -top-6 right-9 w-22 h-22 bg-slate-800 rounded-full border-t-2 border-blue-400/40" />
          
          {/* Visor */}
          <div className="relative z-20 w-32 h-14 bg-slate-950 rounded-xl border border-blue-400/80 flex items-center justify-around px-4 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
            <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8] animate-pulse" />
            <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8] animate-pulse" />
          </div>
        </div>

        {/* Chassis */}
        <div className="w-36 h-20 bg-slate-900 border border-slate-700/90 rounded-2xl mt-1 flex flex-col items-center justify-center p-2 shadow-xl">
          <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-400 flex items-center justify-center mb-1">
            <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
          </div>
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
    <div className="w-full h-full min-h-[400px] sm:min-h-[460px] lg:min-h-[520px] relative overflow-hidden flex items-center justify-center">
      <Suspense fallback={<Robot2DFallback />}>
        <Canvas
          camera={{ position: [0, 0, 4.3], fov: 45 }}
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        >
          {/* Ambient & Key Lights */}
          <ambientLight intensity={1.4} />
          <directionalLight position={[8, 10, 8]} intensity={2.0} color="#ffffff" />
          <directionalLight position={[-8, -5, -6]} intensity={1.0} color="#38bdf8" />
          
          {/* Point lights for glowing cyber accents */}
          <pointLight position={[0, 4, 3]} intensity={1.8} color="#38bdf8" distance={10} />
          <pointLight position={[-4, 2, 2]} intensity={1.2} color="#06b6d4" distance={8} />
          <pointLight position={[4, -2, 2]} intensity={1.2} color="#f59e0b" distance={8} />
          <pointLight position={[0, -4, 2]} intensity={1.5} color="#818cf8" distance={8} />

          {/* Next-Gen 3D CloudOps Robot */}
          <CloudRobot mousePosition={mousePosition} />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default RobotScene;
