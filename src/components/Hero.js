import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Mail } from 'lucide-react';
import profileImg from '../assets/profile123.jpg';
import { Typewriter } from 'react-simple-typewriter';
import TechStackCarousel from './TechStackCarousel';
import Particles from 'react-tsparticles';

const Hero = () => {
  const scrollToAbout = () => {
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
  };

    // Profile image ref (no tilt)
    const profileRef = useRef(null);

  return (
  <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-dark-800 pt-24 pb-24">
      {/* Modern Animated Background */}
      <Particles
        className="absolute inset-0 -z-10"
        options={{
          background: { color: { value: '#f8fafc' } },
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: 'repulse' }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 } },
          },
          particles: {
            color: { value: ['#06b6d4', '#0ea5e9', '#6366f1', '#f59e42'] },
            links: { enable: true, color: '#38bdf8', distance: 150, opacity: 0.2, width: 1 },
            move: { enable: true, speed: 1.5, outModes: { default: 'bounce' } },
            number: { value: 40 },
            opacity: { value: 0.5 },
            shape: { type: 'circle' },
            size: { value: { min: 2, max: 6 } },
          },
          detectRetina: true,
        }}
      />

      {/* Content */}
  <div className="relative z-20 section-padding">
        <div className="container-custom flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto text-center md:text-left gap-8 md:gap-16">
          {/* Profile Picture with 3D Tilt */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-shrink-0 mb-8 md:mb-0 relative"
          >
            <div ref={profileRef} className="relative shadow-2xl rounded-full">
              <img
                src={profileImg}
                alt="Nirmal Koswatta profile"
                className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full object-cover border-4 border-white/20 dark:border-primary-500/30"
                style={{ 
                  boxShadow: '0 20px 60px rgba(14, 165, 233, 0.3), 0 8px 20px rgba(0, 0, 0, 0.2)',
                  filter: 'brightness(1.05) contrast(1.1)'
                }}
              />
            </div>
          </motion.div>

          {/* Greeting and Content Right */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 80 }}
            className="flex-1 max-w-3xl"
          >
            {/* Enhanced Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-6"
            >
              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-2 leading-tight"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="text-gray-800 dark:text-white">Hi, I'm </span>
                <span className="gradient-text bg-gradient-to-r from-primary-400 via-primary-500 to-cyan-500 bg-clip-text text-transparent relative">
                  Kosa
                  {/* Subtle underline effect */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-cyan-500 rounded-full opacity-60"
                  />
                </span>
              </motion.h1>
            </motion.div>

            {/* Tech Stack Carousel */}
            <div className="mb-8">
              <TechStackCarousel />
            </div>
            {/* Enhanced Subtitle with glass effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-8"
            >
              <div className="glass-effect rounded-2xl p-6 border border-white/20 dark:border-white/10 backdrop-blur-lg bg-white/80 dark:bg-dark-800/80">
                <p className="text-2xl sm:text-3xl lg:text-4xl text-gray-700 dark:text-gray-200 font-light h-16 flex items-center justify-center md:justify-start">
                  <Typewriter
                    words={['Associate DevOps Engineer', 'Kubernetes & AWS', 'CI/CD & Cloud Infrastructure', 'Prometheus & Grafana', 'DevSecOps & Security Automation', 'Terraform & GitHub Actions']}
                    loop={0}
                    cursor
                    cursorStyle='|'
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1500}
                  />
                </p>
              </div>
            </motion.div>

            {/* Enhanced Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mb-10"
            >
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto md:mx-0">
                Junior DevOps Engineer at Zuse Technologies with hands-on experience as an Intern DevSecOps Engineer at Fortude. 
                Specializing in CI/CD pipeline automation, Infrastructure as Code (Terraform), system observability (Grafana & Prometheus), 
                and database reliability.
              </p>
            </motion.div>

            {/* Enhanced Motivation Quote with premium styling */}
            {/* ...removed personal motto/quote section... */}

            {/* Enhanced CTA Buttons */}
              <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-12 sm:gap-6 justify-center md:justify-start items-center"
            >
              {/* Primary CTA */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
                className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white font-semibold rounded-2xl transition-all duration-500 shadow-lg hover:shadow-2xl"
                style={{ boxShadow: '0 10px 30px rgba(14, 165, 233, 0.3)' }}
              >
                {/* Button background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Button content */}
                <div className="relative z-10 flex items-center gap-3">
                  <Mail className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>Get In Touch</span>
                </div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 -top-full bg-gradient-to-b from-transparent via-white/20 to-transparent group-hover:top-full transition-all duration-1000"></div>
              </motion.button>

              {/* Secondary CTA */}
              <motion.a
                href="/Nirmal Koswatta ADE CV.pdf"
                download="Nirmal Koswatta ADE CV.pdf"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden px-8 py-4 border-2 border-gray-300 dark:border-white/30 text-gray-700 dark:text-white font-semibold rounded-2xl hover:border-primary-400 transition-all duration-500 backdrop-blur-sm glass-effect bg-white/80 dark:bg-dark-800/80"
              >
                {/* Button background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Button content */}
                <div className="relative z-10 flex items-center gap-3">
                  <Download className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                  <span>Download CV</span>
                </div>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={scrollToAbout}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="group flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-primary-400 transition-all duration-300"
        >
          <span className="text-sm mb-3 font-medium tracking-wide">Scroll Down</span>
          <div className="relative">
            <ChevronDown className="w-6 h-6 transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-primary-400/20 rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero; 