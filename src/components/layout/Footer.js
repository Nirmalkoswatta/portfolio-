import React from 'react';
import { Github, Linkedin, ArrowUp, Terminal } from 'lucide-react';

const Footer = ({ onOpenTerminal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 text-slate-600 dark:text-slate-400 font-sans text-xs transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center border-b border-slate-200 dark:border-slate-900 pb-8">
          {/* Brand */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-white font-mono font-bold text-[10px]">
                NK
              </div>
              <span className="font-display font-bold text-slate-900 dark:text-white text-sm">Nirmal Koswatta</span>
            </div>
            <p className="text-slate-500 text-xs">
              Associate DevOps Engineer • Cloud, CI/CD, Kubernetes &amp; Observability.
            </p>
          </div>

          {/* Nav Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 font-mono text-[11px] text-slate-600 dark:text-slate-400">
            <a href="#about" className="hover:text-blue-600 dark:hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-blue-600 dark:hover:text-white transition-colors">Skills</a>
            <a href="#architecture" className="hover:text-blue-600 dark:hover:text-white transition-colors">Architecture</a>
            <a href="#projects" className="hover:text-blue-600 dark:hover:text-white transition-colors">Projects</a>
            <a href="#experience" className="hover:text-blue-600 dark:hover:text-white transition-colors">Experience</a>
            <a href="#certificates" className="hover:text-blue-600 dark:hover:text-white transition-colors">Certificates</a>
            <a href="#contact" className="hover:text-blue-600 dark:hover:text-white transition-colors">Contact</a>
          </div>

          {/* Socials & Actions */}
          <div className="flex items-center justify-center md:justify-end gap-3">
            <button
              onClick={onOpenTerminal}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm"
              title="Launch Terminal CLI"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <a
              href="https://github.com/Nirmalkoswatta"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/nirmal-koswatta/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-sm"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors ml-2 shadow-sm"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 text-slate-500 font-mono text-[10px]">
          <span>© {currentYear} Nirmal Koswatta. All rights reserved.</span>
          <div className="flex items-center gap-3">
            <span>ENGINEERED WITH REACT &amp; THREE.JS</span>
            <span>•</span>
            <span>DEPLOYED ON VERCEL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
