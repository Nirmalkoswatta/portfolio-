import React from 'react';

const StatusIndicator = ({ onOpenTerminal }) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Availability Status Badge */}
      <button
        onClick={onOpenTerminal}
        className="group relative inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-slate-800 bg-slate-900/80 backdrop-blur-md hover:border-blue-500/40 hover:bg-slate-800/80 transition-all duration-300 shadow-sm cursor-pointer"
        title="Click to launch interactive Terminal"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="font-mono text-xs font-semibold tracking-wider text-slate-300 group-hover:text-white uppercase transition-colors">
          AVAILABLE FOR ASSOCIATE DEVOPS ENGINEER ROLES
        </span>
        <span className="hidden sm:inline-block font-mono text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">
          CLI: &gt;_
        </span>
      </button>

      {/* Mini HUD indicators */}
      <div className="hidden lg:flex items-center gap-2 font-mono text-[11px] text-slate-500 border-l border-slate-800 pl-3">
        <span className="flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-blue-400" />
          AWS
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-cyan-400" />
          K8S
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-emerald-400" />
          CI/CD
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-purple-400" />
          IAC
        </span>
      </div>
    </div>
  );
};

export default StatusIndicator;
