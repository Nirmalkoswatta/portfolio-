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
  const [isBootComplete, setIsBootComplete] = useState(() => {
    try {
      return sessionStorage.getItem('boot-complete') === 'true';
    } catch {
      return false;
    }
  });
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Initialize theme from localStorage or default dark
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Theme toggle handler
  const toggleTheme = () => {
    setDarkMode((prev) => {
      const nextTheme = !prev;
      if (nextTheme) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return nextTheme;
    });
  };

  // Initialize ultra-smooth Lenis scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.6,
      infinite: false,
    });

    document.documentElement.classList.add('lenis', 'lenis-smooth');
    window.__lenis = lenis;

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      delete window.__lenis;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 selection:bg-blue-500/20 selection:text-blue-500 relative transition-colors duration-300">
      {/* Skip link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-blue-600 focus:text-white focus:font-mono focus:text-xs focus:font-semibold"
      >
        Skip to content
      </a>

      {/* Short Boot Sequence (plays once per browser session) */}
      {!isBootComplete && (
        <BootSequence
          onComplete={() => {
            setIsBootComplete(true);
            try {
              sessionStorage.setItem('boot-complete', 'true');
            } catch {
              // sessionStorage unavailable (private mode) — replay is harmless
            }
          }}
        />
      )}

      {/* Canvas Grid & Ambient Glow */}
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
      <main id="main-content" className="relative z-10 space-y-12">
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
