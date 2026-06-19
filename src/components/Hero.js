import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Mail, ShieldCheck, ServerCog } from 'lucide-react';
import profileImg from '../assets/propic.jpg';
import { Typewriter } from 'react-simple-typewriter';

const Hero = () => {
  const scrollToAbout = () => {
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
  };

  const highlights = [
    'DevOps Intern at Fortude',
    'AWS, Kubernetes, CI/CD',
    'DevSecOps and Observability'
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-dark-800">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-24 left-12 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-16 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 section-padding pt-28">
        <div className="container-custom grid lg:grid-cols-[0.8fr_1.2fr] items-center gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary-500/30 to-emerald-500/30 blur-2xl"></div>
              <img
                src={profileImg}
                alt="Nirmal Koswatta"
                className="relative w-44 h-44 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-full object-cover border-4 border-white/60 dark:border-dark-700 shadow-2xl"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/80 dark:bg-dark-900/70 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 text-sm font-semibold">
              <ShieldCheck className="w-4 h-4" />
              Open to Associate DevOps, Cloud, and Security roles
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-5 text-gray-900 dark:text-white">
              Nirmal Koswatta
              <span className="block gradient-text mt-2">Associate DevOps Engineer</span>
            </h1>

            <div className="mb-6 min-h-[48px]">
              <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-200 font-medium">
                <Typewriter
                  words={[
                    'Kubernetes and AWS focused',
                    'CI/CD automation minded',
                    'DevSecOps and reliability driven',
                    'Cloud observability hands-on'
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={60}
                  deleteSpeed={35}
                  delaySpeed={1500}
                />
              </p>
            </div>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto lg:mx-0 mb-8">
              DevOps-focused engineer with hands-on experience in AWS, Kubernetes, GitHub Actions, container security,
              Grafana, New Relic, and production reliability. I build and improve deployment workflows with a security-first,
              automation-first mindset.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 mb-10">
              {highlights.map((item) => (
                <div key={item} className="flex items-center justify-center lg:justify-start gap-2 px-4 py-3 rounded-xl bg-white/80 dark:bg-dark-900/70 border border-gray-200 dark:border-dark-700 text-sm font-semibold text-gray-700 dark:text-gray-200">
                  <ServerCog className="w-4 h-4 text-primary-500" />
                  {item}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-semibold rounded-xl shadow-lg"
              >
                <Mail className="w-5 h-5" />
                Contact Me
              </motion.button>

              <motion.a
                href="/NIRMAL KOSWATTA CV.pdf"
                download
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-3 px-7 py-4 border-2 border-gray-300 dark:border-white/20 text-gray-800 dark:text-white font-semibold rounded-xl bg-white/80 dark:bg-dark-900/70"
              >
                <Download className="w-5 h-5" />
                Download CV
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-gray-600 dark:text-gray-300 hover:text-primary-500"
      >
        <span className="text-sm mb-2 font-medium">Explore</span>
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </motion.button>
    </section>
  );
};

export default Hero;
