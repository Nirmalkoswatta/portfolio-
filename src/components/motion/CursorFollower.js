import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CursorFollower = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on pointer fine desktop devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor]');
      if (target) {
        setIsHovered(true);
        const text = target.getAttribute('data-cursor') || '';
        setCursorText(text);
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-blue-400 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      />

      {/* Expanded Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-blue-400/60 bg-blue-500/10 pointer-events-none z-[9998] flex items-center justify-center backdrop-blur-[1px]"
        animate={{
          x: isHovered ? position.x - 24 : position.x - 14,
          y: isHovered ? position.y - 24 : position.y - 14,
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          opacity: isHovered ? 1 : 0.4,
          borderColor: isHovered ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.3)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.2 }}
      >
        {cursorText && (
          <span className="font-mono text-[9px] font-bold text-white tracking-widest uppercase">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
};

export default CursorFollower;
