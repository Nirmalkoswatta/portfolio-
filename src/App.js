import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';

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
  }, [darkMode]);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const loadingSteps = [
    'Provisioning cloud profile',
    'Checking CI/CD pipeline',
    'Loading observability stack'
  ];

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
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center overflow-hidden relative px-6">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-16 right-10 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl shadow-2xl p-6 sm:p-8"
        >
          <div className="flex items-center justify-between mb-7">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-emerald-300 font-semibold">DevOps Portfolio</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">Booting Nirmal Koswatta</h2>
            </div>
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-2xl border border-primary-400/40"></div>
              <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-primary-500 to-emerald-500 animate-pulse"></div>
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent border-t-emerald-300 border-r-primary-400 animate-spin"></div>
            </div>
          </div>

          <div className="space-y-3 mb-7">
            {loadingSteps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.15 + index * 0.15 }}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3"
              >
                <span className="text-sm text-gray-200">{step}</span>
                <span className="text-xs font-semibold text-emerald-300">OK</span>
              </motion.div>
            ))}
          </div>

          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-primary-400 via-cyan-300 to-emerald-400"
            />
          </div>
          <p className="mt-4 text-sm text-gray-400 font-mono">deploy --target=associate-devops --status=ready</p>
        </motion.div>
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
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certificates />
          <Timeline />
          <Contact />
          <Footer />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App; 
