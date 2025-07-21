import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [lightPos, setLightPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const smokeRef = useRef(null);

  useEffect(() => {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
    
    // Apply theme to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, [darkMode]);

  // Mouse-following light effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setLightPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Simple smoke effect using canvas
  useEffect(() => {
    const canvas = smokeRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 40 + Math.random() * 40,
      alpha: 0.08 + Math.random() * 0.08,
      dx: -0.2 + Math.random() * 0.4,
      dy: -0.1 + Math.random() * 0.2,
    }));
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.save();
        ctx.globalAlpha = p.alpha;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        grad.addColorStop(0, '#fff');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < -p.r) p.x = window.innerWidth + p.r;
        if (p.x > window.innerWidth + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = window.innerHeight + p.r;
        if (p.y > window.innerHeight + p.r) p.y = -p.r;
      }
      animationFrameId = requestAnimationFrame(draw);
    }
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white">Loading Portfolio...</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors duration-300 relative overflow-hidden">
      {/* Smoke Canvas */}
      <canvas
        ref={smokeRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}
      />
      {/* Mouse-following Light */}
      <div
        className="pointer-events-none z-10"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 10,
          mixBlendMode: 'lighten',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: lightPos.x - 150,
            top: lightPos.y - 150,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(14,165,233,0.18) 0%, rgba(14,165,233,0.04) 80%, transparent 100%)',
            pointerEvents: 'none',
            filter: 'blur(8px)',
            transition: 'left 0.1s, top 0.1s',
          }}
        />
      </div>
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Timeline />
          <Contact />
          <Footer />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App; 