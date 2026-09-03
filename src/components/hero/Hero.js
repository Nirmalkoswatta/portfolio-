import React from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Github, Linkedin } from 'lucide-react';
import TextReveal from './TextReveal';
import StatusIndicator from './StatusIndicator';
import RobotOverlay from '../robot/RobotOverlay';

const Hero = ({ onOpenTerminal }) => {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Typography, Narrative & CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6 text-left relative z-10"
        >
          {/* System Status Indicator */}
          <StatusIndicator onOpenTerminal={onOpenTerminal} />

          {/* Large Headline */}
          <div className="space-y-2">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white uppercase leading-[1.08]">
              NIRMAL <br />
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-400 dark:to-indigo-400 bg-clip-text text-transparent">
                KOSWATTA
              </span>
            </h1>
            <p className="font-mono text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              ASSOCIATE DEVOPS ENGINEER
            </p>
          </div>

          {/* Evolving Statement */}
          <TextReveal />

          {/* Core Focus Narrative */}
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl font-sans">
            Associate DevOps Engineer focused on AWS cloud architecture, Kubernetes container orchestration, CI/CD pipeline automation (GitHub Actions), Infrastructure as Code (Terraform), and end-to-end observability with Prometheus &amp; Grafana.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5"
              data-cursor="PROJECTS"
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="/Nirmal Koswatta ADE CV.pdf"
              download="Nirmal Koswatta ADE CV.pdf"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 font-medium text-sm transition-all duration-300 backdrop-blur-sm hover:-translate-y-0.5 shadow-sm"
              data-cursor="CV"
            >
              <Download className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              <span>Download CV</span>
            </a>

            <div className="flex items-center gap-2 pl-2">
              <a
                href="https://github.com/Nirmalkoswatta"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-all hover:-translate-y-0.5 shadow-sm"
                aria-label="GitHub Profile"
                data-cursor="GITHUB"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/nirmal-koswatta/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-slate-300 dark:hover:border-slate-700 transition-all hover:-translate-y-0.5 shadow-sm"
                aria-label="LinkedIn Profile"
                data-cursor="LINKEDIN"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Technology Chips */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] text-slate-500 uppercase mr-1">STACK:</span>
            {['AWS', 'Azure', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions', 'Grafana', 'Prometheus', 'DevSecOps', 'Oracle DB'].map((tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Interactive Robot Character */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="lg:col-span-5 w-full flex items-center justify-center"
        >
          <RobotOverlay className="w-full h-[340px] sm:h-[400px] lg:h-[460px]" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
