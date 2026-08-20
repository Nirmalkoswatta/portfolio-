import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const statements = [
  'I automate infrastructure.',
  'I ship resilient systems.',
  'I build production-ready cloud platforms.',
  'I engineer scalable CI/CD pipelines.'
];

const TextReveal = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % statements.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-8 md:h-10 overflow-hidden relative flex items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl font-medium text-slate-300 flex items-center gap-2 font-display"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span>{statements[index]}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TextReveal;
