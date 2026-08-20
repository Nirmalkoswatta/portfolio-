import React from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({ children, className = '', delay = 0, amount = 0.15 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
