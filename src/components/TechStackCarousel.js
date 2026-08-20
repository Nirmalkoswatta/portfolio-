import React, { useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import techStack from './techStackData';

const TechStackCarousel = () => {
  const controls = useAnimation();
  const carouselRef = useRef(null);

  // Animate carousel on hover
  const handleMouseEnter = () => {
    controls.start({ x: -180 * (techStack.length - 4) });
  };
  const handleMouseLeave = () => {
    controls.start({ x: 0 });
  };

  return (
    <div className="w-full overflow-hidden py-6">
      <motion.div
        className="flex gap-8 cursor-pointer"
        ref={carouselRef}
        animate={controls}
        transition={{ type: 'spring', stiffness: 40, damping: 10 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ willChange: 'transform' }}
      >
        {techStack.map((tech, idx) => (
          <motion.div
            key={tech.name}
            className="flex flex-col items-center justify-center bg-white/80 dark:bg-dark-700/80 rounded-2xl shadow-lg p-4 min-w-[140px] hover:scale-110 transition-transform duration-300 border border-gray-200 dark:border-gray-700"
            whileHover={{ scale: 1.15, rotate: [0, 5, -5, 0] }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <tech.icon size={48} color={tech.color} className="mb-2 drop-shadow-lg" />
            <span className="font-semibold text-gray-700 dark:text-gray-200 text-lg">{tech.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechStackCarousel;
