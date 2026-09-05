import React, { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   RobotMascot — Hero-section robot (absolute right side)
   • Waves on mount / page refresh
   • Idle float animation
   • Click to toggle chat bubble
   • Eyes follow the cursor
───────────────────────────────────────────── */

const RobotMascot = () => {
  const [isWaving, setIsWaving] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleText, setBubbleText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const robotRef = useRef(null);
  const waveTimerRef = useRef(null);
  const [msgIndex, setMsgIndex] = useState(0);

  const messages = [
    "Hey there! 👋 I'm Byte, Nirmal's robot buddy!",
    "Welcome to Nirmal's portfolio! 🚀",
    "Check out the cool DevOps projects! 🛠️",
    "AWS • K8s • CI/CD • Terraform 💡",
    "Need a DevOps engineer? Hit Contact! 📩",
  ];

  // Wave on mount
  useEffect(() => {
    const delay = setTimeout(() => triggerWave(), 900);
    return () => clearTimeout(delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Eye follow mouse
  useEffect(() => {
    const handleMouse = (e) => {
      if (!robotRef.current) return;
      const rect = robotRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
      const dist = 3;
      setEyePos({ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const triggerWave = () => {
    setIsWaving(false);
    setTimeout(() => setIsWaving(true), 10);
    clearTimeout(waveTimerRef.current);
    waveTimerRef.current = setTimeout(() => setIsWaving(false), 2600);
  };

  const handleClick = () => {
    triggerWave();
    const nextIndex = (msgIndex + 1) % messages.length;
    if (!showBubble) {
      setBubbleText(messages[msgIndex]);
      setShowBubble(true);
    } else {
      setMsgIndex(nextIndex);
      setBubbleText(messages[nextIndex]);
    }
  };

  const handleBubbleClose = (e) => {
    e.stopPropagation();
    setShowBubble(false);
  };

  return (
    <>
      <style>{`
        @keyframes rb-float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
        @keyframes rb-hover-float {
          0%, 100% { transform: translateY(-2px) scale(1.04); }
          50%       { transform: translateY(-18px) scale(1.04); }
        }
        @keyframes rb-wave {
          0%   { transform: rotate(0deg)   translateY(0); }
          10%  { transform: rotate(-55deg) translateY(-10px); }
          25%  { transform: rotate(-10deg) translateY(-2px); }
          40%  { transform: rotate(-60deg) translateY(-12px); }
          55%  { transform: rotate(-8deg)  translateY(-2px); }
          70%  { transform: rotate(-50deg) translateY(-9px); }
          85%  { transform: rotate(-5deg)  translateY(-1px); }
          100% { transform: rotate(0deg)  translateY(0); }
        }
        @keyframes rb-blink {
          0%, 88%, 100% { transform: scaleY(1); }
          94%            { transform: scaleY(0.07); }
        }
        @keyframes rb-chest {
          0%, 100% { opacity: 0.85; }
          50%       { opacity: 1; }
        }
        @keyframes rb-antenna {
          0%, 78%, 100% { opacity: 1; }
          88%            { opacity: 0.05; }
        }
        @keyframes rb-shadow {
          0%, 100% { transform: scaleX(1);    opacity: 0.3; }
          50%       { transform: scaleX(0.8);  opacity: 0.15; }
        }
        @keyframes rb-scan {
          0%   { transform: translateY(0); }
          100% { transform: translateY(36px); }
        }
        @keyframes rb-bubble-in {
          0%   { opacity: 0; transform: scale(0.7) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        .rb-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          user-select: none;
          filter: drop-shadow(0 12px 32px rgba(59,130,246,0.38));
          position: relative;
        }
        .rb-anim {
          animation: rb-float 3.8s ease-in-out infinite;
        }
        .rb-anim.hov {
          animation: rb-hover-float 3.2s ease-in-out infinite;
        }
        .rb-eye {
          animation: rb-blink 4.5s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .rb-ant {
          animation: rb-antenna 2.3s ease-in-out infinite;
          filter: drop-shadow(0 0 6px #3b82f6);
        }
        .rb-chest-circ {
          animation: rb-chest 2s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        .rb-arm-r {
          transform-origin: 156px 118px;
        }
        .rb-arm-r.wave {
          animation: rb-wave 2.6s ease-in-out forwards;
        }
        .rb-gnd {
          animation: rb-shadow 3.8s ease-in-out infinite;
          transform-origin: center;
        }
        .rb-scan-line {
          animation: rb-scan 1.8s linear infinite;
        }

        .rb-bubble {
          position: absolute;
          bottom: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          border: 1px solid rgba(59,130,246,0.45);
          border-radius: 14px 14px 14px 4px;
          padding: 11px 34px 11px 13px;
          width: 200px;
          color: #e2e8f0;
          font-size: 12.5px;
          font-family: 'Inter', system-ui, sans-serif;
          line-height: 1.55;
          box-shadow: 0 4px 24px rgba(59,130,246,0.22);
          animation: rb-bubble-in 0.3s cubic-bezier(0.34,1.56,0.64,1) both;
          white-space: normal;
          z-index: 20;
        }
        .rb-bubble-x {
          position: absolute;
          top: 6px; right: 8px;
          background: none; border: none;
          color: #475569; cursor: pointer;
          font-size: 12px; line-height: 1; padding: 2px 4px;
          border-radius: 4px;
          transition: color 0.2s, background 0.2s;
        }
        .rb-bubble-x:hover { color: #ef4444; background: rgba(239,68,68,0.1); }
        .rb-bubble-hint {
          font-size: 9.5px; color: #3b82f6;
          margin-top: 6px;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.04em;
        }
        .rb-label {
          font-size: 10px;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.1em;
          color: #475569;
          margin-top: 4px;
          transition: color 0.3s;
        }
        .rb-wrap:hover .rb-label { color: #3b82f6; }
      `}</style>

      <div
        ref={robotRef}
        className="rb-wrap"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        aria-label="Byte — robot mascot. Click to interact."
      >
        {/* Chat bubble */}
        {showBubble && (
          <div className="rb-bubble">
            <button className="rb-bubble-x" onClick={handleBubbleClose} aria-label="Close">✕</button>
            {bubbleText}
            <div className="rb-bubble-hint">[ click to cycle ]</div>
          </div>
        )}

        {/* Robot SVG */}
        <div className={`rb-anim${isHovered ? ' hov' : ''}`}>
          <svg
            width="160"
            height="230"
            viewBox="0 0 200 270"
            xmlns="http://www.w3.org/2000/svg"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <filter id="rb-eye-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="rb-chest-glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="7" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Ground shadow */}
            <ellipse className="rb-gnd" cx="105" cy="264" rx="55" ry="7" fill="rgba(59,130,246,0.2)" />

            {/* Antenna */}
            <rect x="102" y="22" width="6" height="22" rx="3" fill="#9ca3af" />
            <circle className="rb-ant" cx="105" cy="18" r="7" fill="#60a5fa" />
            <circle cx="105" cy="16" r="3" fill="#bfdbfe" opacity="0.7" />

            {/* Head */}
            <rect x="66" y="40" width="78" height="62" rx="14" fill="#d1d5db" />
            <circle cx="68" cy="64" r="4" fill="#9ca3af" />
            <circle cx="142" cy="64" r="4" fill="#9ca3af" />
            {/* Visor */}
            <clipPath id="rb-vc"><rect x="74" y="50" width="62" height="38" rx="8" /></clipPath>
            <rect x="74" y="50" width="62" height="38" rx="8" fill="#0f172a" />
            <rect
              className="rb-scan-line"
              x="74" y="50" width="62" height="2"
              fill="rgba(96,165,250,0.5)"
              clipPath="url(#rb-vc)"
            />
            {/* Eyes */}
            <circle className="rb-eye" cx={88 + eyePos.x} cy={69 + eyePos.y} r="8" fill="#3b82f6" filter="url(#rb-eye-glow)" />
            <circle className="rb-eye" cx={122 + eyePos.x} cy={69 + eyePos.y} r="8" fill="#3b82f6" filter="url(#rb-eye-glow)" />
            <circle cx={90 + eyePos.x} cy={67 + eyePos.y} r="2.5" fill="white" opacity="0.7" />
            <circle cx={124 + eyePos.x} cy={67 + eyePos.y} r="2.5" fill="white" opacity="0.7" />

            {/* Neck */}
            <rect x="96" y="102" width="18" height="12" rx="5" fill="#9ca3af" />

            {/* Torso */}
            <rect x="62" y="112" width="86" height="82" rx="14" fill="#e5e7eb" />
            <rect x="73" y="122" width="64" height="54" rx="9" fill="#1e293b" />
            <circle className="rb-chest-circ" cx="105" cy="149" r="14" fill="#3b82f6" filter="url(#rb-chest-glow)" />
            <circle cx="105" cy="149" r="8" fill="#93c5fd" opacity="0.65" />
            <circle cx="101" cy="145" r="3.5" fill="white" opacity="0.5" />
            <rect x="76" y="130" width="4" height="22" rx="2" fill="#334155" />
            <rect x="130" y="130" width="4" height="22" rx="2" fill="#334155" />
            {[0, 9, 18].map((i) => (
              <rect key={i} x={88 + i} y="165" width="6" height="3" rx="1.5" fill="#334155" />
            ))}

            {/* Left arm (idle) */}
            <circle cx="56" cy="120" r="10" fill="#9ca3af" />
            <rect x="40" y="116" width="18" height="38" rx="9" fill="#d1d5db" />
            <circle cx="49" cy="156" r="7" fill="#9ca3af" />
            <rect x="43" y="154" width="14" height="30" rx="6" fill="#e5e7eb" />
            <ellipse cx="50" cy="188" rx="9" ry="6" fill="#9ca3af" />
            {[-5, -1, 3, 7].map((fx) => (
              <rect key={fx} x={47 + fx} y="183" width="4" height="10" rx="2" fill="#6b7280" />
            ))}

            {/* Right arm (waves) */}
            <g className={`rb-arm-r${isWaving ? ' wave' : ''}`}>
              <circle cx="154" cy="120" r="10" fill="#9ca3af" />
              <rect x="152" y="116" width="18" height="38" rx="9" fill="#d1d5db" />
              <circle cx="161" cy="156" r="7" fill="#9ca3af" />
              <rect x="155" y="154" width="14" height="30" rx="6" fill="#e5e7eb" />
              <ellipse cx="162" cy="188" rx="9" ry="6" fill="#9ca3af" />
              {[-5, -1, 3, 7].map((fx) => (
                <rect key={fx} x={159 + fx} y="183" width="4" height="10" rx="2" fill="#6b7280" />
              ))}
            </g>

            {/* Waist */}
            <rect x="78" y="192" width="54" height="14" rx="7" fill="#9ca3af" />

            {/* Left leg */}
            <rect x="74" y="204" width="26" height="32" rx="8" fill="#d1d5db" />
            <circle cx="87" cy="237" r="8" fill="#9ca3af" />
            <rect x="80" y="234" width="18" height="28" rx="6" fill="#e5e7eb" />
            <ellipse cx="89" cy="263" rx="16" ry="6" fill="#374151" />

            {/* Right leg */}
            <rect x="110" y="204" width="26" height="32" rx="8" fill="#d1d5db" />
            <circle cx="123" cy="237" r="8" fill="#9ca3af" />
            <rect x="116" y="234" width="18" height="28" rx="6" fill="#e5e7eb" />
            <ellipse cx="125" cy="263" rx="16" ry="6" fill="#374151" />
          </svg>
        </div>

        <span className="rb-label">BYTE // v1.0</span>
      </div>
    </>
  );
};

export default RobotMascot;
