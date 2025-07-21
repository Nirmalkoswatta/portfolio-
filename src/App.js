import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Lottie from 'lottie-react';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

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
    AOS.init({ duration: 900, once: true, offset: 60 });
  }, [darkMode]);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  // Particle options
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);
  const particlesOptions = {
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'repulse' },
        resize: true,
      },
      modes: {
        repulse: { distance: 80, duration: 0.4 },
      },
    },
    particles: {
      color: { value: '#a1c4fd' },
      links: { enable: true, color: '#a1c4fd', distance: 120, opacity: 0.2, width: 1 },
      collisions: { enable: false },
      move: { direction: 'none', enable: true, outModes: 'out', random: false, speed: 0.5, straight: false },
      number: { density: { enable: true, area: 800 }, value: 40 },
      opacity: { value: 0.25 },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  if (isLoading) {
    let lottieData = null;
    try {
      lottieData = require('./assets/lottie-dev.json');
    } catch (e) {
      lottieData = null;
    }
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-4">
            {lottieData ? (
              <Lottie animationData={lottieData} loop={true} />
            ) : (
              <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            )}
          </div>
          <h2 className="text-xl font-semibold text-white">Loading Portfolio...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors duration-300 animated-gradient-bg relative overflow-hidden">
      {/* Floating Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesOptions}
        className="fixed inset-0 w-full h-full z-0 pointer-events-none"
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}
      />
      {/* Main Content */}
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div data-aos="fade-up"><Hero /></div>
          <div data-aos="fade-up" data-aos-delay="100"><About /></div>
          <div data-aos="fade-up" data-aos-delay="200"><Skills /></div>
          <div data-aos="fade-up" data-aos-delay="300"><Projects /></div>
          <div data-aos="fade-up" data-aos-delay="400"><Timeline /></div>
          <div data-aos="fade-up" data-aos-delay="500"><Contact /></div>
          <div data-aos="fade-up" data-aos-delay="600"><Footer /></div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App; 