import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootLines = [
  { text: 'INITIALIZING CLOUD ENVIRONMENT', delay: 0 },
  { text: 'LOADING CORE SYSTEMS', delay: 200, status: '✓' },
  { text: 'CONNECTING NETWORK', delay: 400, status: '✓' },
  { text: 'STARTING OBSERVABILITY', delay: 600, status: '✓' },
  { text: 'LOADING DEPLOYMENT ENGINE', delay: 800, status: '✓' },
  { text: 'SYSTEM READY', delay: 1000, final: true },
];

const BootSequence = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState([]);
  const [isExiting, setIsExiting] = useState(false);

  // Respect reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' 
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    bootLines.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
      }, line.delay);
    });

    // Start exit after last line
    setTimeout(() => {
      setIsExiting(true);
    }, 1200);

    // Complete
    setTimeout(() => {
      onComplete?.();
    }, 1600);
  }, [onComplete, prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: 'var(--bg-primary)' }}
          aria-hidden="true"
        >
          <div className="w-full max-w-md px-8">
            <div className="space-y-2">
              {visibleLines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <span
                    className="font-mono text-xs tracking-wider"
                    style={{
                      color: line.final ? 'var(--accent)' : 'var(--text-tertiary)',
                      fontWeight: line.final ? '600' : '400',
                    }}
                  >
                    {line.text}
                  </span>
                  {line.status && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15 }}
                      className="text-xs"
                      style={{ color: 'var(--success)' }}
                    >
                      {line.status}
                    </motion.span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress line */}
            <motion.div
              className="mt-6 h-px w-full overflow-hidden rounded-full"
              style={{ background: 'var(--border)' }}
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full"
                style={{ background: 'var(--accent)' }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequence;
