import anime from 'animejs';
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Download, Mail } from 'lucide-react';
import profileImg from '../assets/profile1.jpg';
import { Typewriter } from 'react-simple-typewriter';

const Hero = () => {
  const scrollToAbout = () => {
    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
  };
  const blobRef = useRef();
  useEffect(() => {
    const morphs = [
      'M44.8,-62.2C56.7,-54.2,63.7,-37.2,65.2,-21.2C66.7,-5.2,62.7,9.8,56.2,23.2C49.7,36.6,40.7,48.4,28.7,56.2C16.7,64,1.7,67.8,-13.2,68.2C-28.1,68.6,-43,65.6,-54.2,56.2C-65.4,46.8,-72.9,31,-74.2,15.1C-75.5,-0.8,-70.6,-16.8,-62.1,-29.2C-53.6,-41.6,-41.5,-50.4,-28.1,-58.1C-14.7,-65.8,0,-72.4,14.7,-72.2C29.4,-72,44.8,-62.2,44.8,-62.2Z',
      'M38.2,-54.2C50.2,-45.2,59.7,-33.2,62.2,-20.2C64.7,-7.2,60.2,6.8,54.2,20.2C48.2,33.6,40.7,46.4,28.7,54.2C16.7,62,0.7,64.8,-13.2,64.2C-27.1,63.6,-40.9,59.6,-52.2,50.2C-63.5,40.8,-72.3,26,-73.2,11.1C-74.1,-3.8,-67.1,-18.8,-57.1,-30.2C-47.1,-41.6,-34.1,-49.4,-20.7,-56.1C-7.3,-62.8,6.5,-68.4,20.2,-67.2C33.9,-66,47.8,-57.2,38.2,-54.2Z',
      'M44.8,-62.2C56.7,-54.2,63.7,-37.2,65.2,-21.2C66.7,-5.2,62.7,9.8,56.2,23.2C49.7,36.6,40.7,48.4,28.7,56.2C16.7,64,1.7,67.8,-13.2,68.2C-28.1,68.6,-43,65.6,-54.2,56.2C-65.4,46.8,-72.9,31,-74.2,15.1C-75.5,-0.8,-70.6,-16.8,-62.1,-29.2C-53.6,-41.6,-41.5,-50.4,-28.1,-58.1C-14.7,-65.8,0,-72.4,14.7,-72.2C29.4,-72,44.8,-62.2,44.8,-62.2Z'
    ];
    anime({
      targets: blobRef.current,
      d: [
        { value: morphs[1] },
        { value: morphs[2] },
        { value: morphs[0] },
      ],
      duration: 9000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
    });
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* SVG Blob Morphing */}
      <svg viewBox="0 0 200 200" className="absolute -top-24 -left-24 w-96 h-96 z-0 opacity-40" xmlns="http://www.w3.org/2000/svg">
        <path ref={blobRef} fill="#6a82fb" d="M44.8,-62.2C56.7,-54.2,63.7,-37.2,65.2,-21.2C66.7,-5.2,62.7,9.8,56.2,23.2C49.7,36.6,40.7,48.4,28.7,56.2C16.7,64,1.7,67.8,-13.2,68.2C-28.1,68.6,-43,65.6,-54.2,56.2C-65.4,46.8,-72.9,31,-74.2,15.1C-75.5,-0.8,-70.6,-16.8,-62.1,-29.2C-53.6,-41.6,-41.5,-50.4,-28.1,-58.1C-14.7,-65.8,0,-72.4,14.7,-72.2C29.4,-72,44.8,-62.2,44.8,-62.2Z" />
      </svg>
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="absolute inset-0 opacity-20">
          <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <g fill="none" fillRule="evenodd">
              <g fill="#0ea5e9" fillOpacity="0.05">
                <circle cx="30" cy="30" r="2"/>
              </g>
            </g>
          </svg>
        </div>
        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-4 h-4 bg-primary-500 rounded-full opacity-30"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-32 w-6 h-6 bg-primary-400 rounded-full opacity-20"
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-32 left-1/4 w-3 h-3 bg-primary-300 rounded-full opacity-40"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center max-w-5xl mx-auto text-center md:text-left">
        {/* Profile Picture Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex-shrink-0 mb-8 md:mb-0 md:mr-12 flex justify-center"
        >
          <img
            src={profileImg}
            alt="Nirmal Koswatta profile"
            className="w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover border-4 border-primary-500 shadow-lg dark:border-primary-700 bg-white dark:bg-dark-800"
            style={{ boxShadow: '0 4px 24px rgba(14, 165, 233, 0.15)' }}
          />
        </motion.div>

        {/* Greeting and Content Right */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          {/* Greeting */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="text-white">Hi, I'm </span>
            <span className="gradient-text">Kosa</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 font-light h-12"
          >
            <Typewriter
              words={['Full Stack Developer', 'UI/UX Enthusiast', 'React Expert', 'DevOps Learner']}
              loop={0}
              cursor
              cursorStyle='|'
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1200}
            />
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto md:mx-0 leading-relaxed"
          >
            Passionate about creating innovative solutions and building the future through code. 
            Currently pursuing Computer Science at SLIIT CityUNI with a focus on modern web technologies.
          </motion.p>

          {/* Motivation Quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-12 p-6 glass-effect rounded-2xl max-w-3xl mx-auto md:mx-0"
          >
            <p className="text-lg text-gray-300 italic">
              "I stopped chasing people, and started building my future."
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
              Get In Touch
            </motion.button>

            <motion.a
              href="/Nirmal Koswatta CV.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-4 border-2 border-primary-500 text-primary-500 font-semibold rounded-lg hover:bg-primary-500 hover:text-white transition-all duration-300 ml-0 sm:ml-16"
            >
              <Download className="w-5 h-5" />
              Download CV
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToAbout}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-gray-400 hover:text-primary-500 transition-colors"
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <ChevronDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 