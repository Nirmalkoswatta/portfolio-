import React from 'react';

// Static/CSS fallback used when WebGL is unavailable or the 3D scene fails.
const Robot2DFallback = () => (
  <div className="w-full h-full flex items-center justify-center relative select-none pointer-events-none">
    <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-3xl" />
    <div className="relative z-10 flex flex-col items-center">
      <div className="relative w-28 h-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 border-2 border-blue-500/40 rounded-full flex items-center justify-center shadow-xl">
        <div className="relative z-20 w-20 h-8 bg-slate-950 rounded-lg border border-blue-400/70 flex items-center justify-around px-3">
          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8]" />
          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#38bdf8]" />
        </div>
      </div>
      <div className="w-20 h-12 bg-slate-900 border border-slate-700/80 rounded-xl mt-1 flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-blue-500/20 border border-blue-400" />
      </div>
    </div>
  </div>
);

export default Robot2DFallback;
