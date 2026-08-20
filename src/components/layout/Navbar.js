import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Github, Linkedin, Terminal } from 'lucide-react';

const Navbar = ({ darkMode, toggleTheme, onOpenTerminal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Telemetry', href: '#telemetry' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Simple active section detection
      const sections = ['home', 'about', 'skills', 'architecture', 'projects', 'experience', 'certificates', 'telemetry', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 transition-all duration-300 pointer-events-none">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between gap-4 px-4 py-2 rounded-full border transition-all duration-300 ${
            isScrolled
              ? 'bg-slate-950/85 dark:bg-slate-950/85 backdrop-blur-md border-slate-800 shadow-2xl shadow-black/40 py-2'
              : 'bg-slate-900/60 dark:bg-slate-900/60 backdrop-blur-sm border-slate-800/80'
          } max-w-5xl w-full`}
        >
          {/* Logo */}
          <button
            onClick={() => scrollToSection('#home')}
            className="flex items-center gap-2 group cursor-pointer"
            data-cursor="HOME"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center font-mono font-bold text-xs text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              NK
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="font-display font-semibold text-xs text-slate-200 group-hover:text-white tracking-tight">
                Nirmal Koswatta
              </span>
              <span className="font-mono text-[9px] text-blue-400 tracking-wider">
                DEVOPS // CLOUD
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                  data-cursor="NAV"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-blue-500/15 border border-blue-500/30 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-2">
            {/* Terminal Launch Icon */}
            <button
              onClick={onOpenTerminal}
              className="p-1.5 rounded-full text-slate-400 hover:text-blue-400 hover:bg-slate-800/60 transition-colors border border-transparent hover:border-slate-700"
              title="Open Terminal"
              data-cursor="CLI"
            >
              <Terminal className="w-4 h-4" />
            </button>

            {/* GitHub */}
            <a
              href="https://github.com/Nirmalkoswatta"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
              aria-label="GitHub Profile"
              data-cursor="GITHUB"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/nirmal-koswatta/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full text-slate-400 hover:text-blue-400 hover:bg-slate-800/60 transition-colors"
              aria-label="LinkedIn Profile"
              data-cursor="LINKEDIN"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full text-slate-400 hover:text-amber-400 hover:bg-slate-800/60 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-full text-slate-300 hover:bg-slate-800/60"
              aria-label="Toggle navigation drawer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-6 pt-24"
          >
            <div className="space-y-3">
              <div className="font-mono text-xs text-blue-400 uppercase tracking-widest px-3 mb-2">
                SYSTEM NAVIGATION
              </div>
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-4 py-3 rounded-xl text-lg font-display font-medium text-slate-200 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all"
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="flex gap-4">
                <a
                  href="https://github.com/Nirmalkoswatta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-white"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/nirmal-koswatta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-blue-400"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <button
                  onClick={onOpenTerminal}
                  className="p-2 text-slate-400 hover:text-emerald-400"
                >
                  <Terminal className="w-5 h-5" />
                </button>
              </div>

              <a
                href="/Nirmal Koswatta ADE CV.pdf"
                download="Nirmal Koswatta ADE CV.pdf"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-semibold"
              >
                DOWNLOAD CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
