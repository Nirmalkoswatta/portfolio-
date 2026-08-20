import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';

// Layout & Effects
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import GridBackground from './components/effects/GridBackground';
import BootSequence from './components/effects/BootSequence';
import TerminalEasterEgg from './components/effects/TerminalEasterEgg';
import CursorFollower from './components/motion/CursorFollower';

// Sections
import Hero from './components/hero/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import EngineeringStack from './components/sections/EngineeringStack';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Certificates from './components/sections/Certificates';
import Observability from './components/sections/Observability';
import Contact from './components/sections/Contact';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [isBootComplete, setIsBootComplete] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-[#0a0a0a] text-slate-100 selection:bg-blue-500/20 selection:text-white relative`}>
      {/* Short Boot Sequence (~800ms) */}
      {!isBootComplete && (
        <BootSequence onComplete={() => setIsBootComplete(true)} />
      )}

      {/* Subtle Canvas Grid & Atmospheric Ambient Glow */}
      <GridBackground />

      {/* Desktop Custom Precision Cursor */}
      <CursorFollower />

      {/* Floating Pill Navbar */}
      <Navbar
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Experience Flow */}
      <main className="relative z-10 space-y-12">
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
        <About />
        <Skills />
        <EngineeringStack />
        <Projects />
        <Experience />
        <Certificates />
        <Observability />
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Interactive Terminal Overlay Easter Egg */}
      <TerminalEasterEgg
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />
    </div>
  );
}

export default App;
