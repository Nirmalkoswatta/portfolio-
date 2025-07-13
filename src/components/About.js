import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, GraduationCap, Code } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const personalInfo = [
    { icon: Calendar, label: 'Birthday', value: '27 Jan 2003' },
    { icon: MapPin, label: 'Location', value: 'Sri Lanka' },
    { icon: GraduationCap, label: 'Education', value: 'Computer Science Undergraduate' },
    { icon: Code, label: 'Field', value: 'Software Engineering' },
  ];

  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-dark-800">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get to know me better - my background, interests, and what drives me in the world of technology.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold mb-6">Personal Information</h3>
            
            <div className="grid gap-4">
              {personalInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center space-x-4 p-4 bg-white dark:bg-dark-700 rounded-lg shadow-sm"
                >
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                    <info.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{info.label}</p>
                    <p className="font-medium">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Key Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl"
            >
              <h4 className="font-semibold mb-3 text-primary-800 dark:text-primary-300">What I'm Passionate About</h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• Building scalable web applications with modern technologies</li>
                <li>• Exploring AI and machine learning applications</li>
                <li>• Contributing to open-source projects</li>
                <li>• Continuous learning and skill development</li>
              </ul>
            </motion.div>
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold mb-6">My Journey</h3>
            
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                I'm a passionate Software Engineering student at SLIIT CityUNI, deeply interested in 
                creating innovative solutions that make a difference. My journey in technology began 
                with curiosity and has evolved into a commitment to building the future through code.
              </p>
              
              <p>
                Currently pursuing my Computer Science degree, I specialize in full-stack development 
                with expertise in modern frameworks like React, Angular, and Spring Boot. I believe in 
                writing clean, maintainable code and creating user experiences that are both beautiful 
                and functional.
              </p>
              
              <p>
                Beyond coding, I'm fascinated by the potential of AI and its applications in solving 
                real-world problems. I'm always eager to learn new technologies and contribute to 
                projects that push the boundaries of what's possible.
              </p>
            </div>

            {/* Current Focus */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="p-6 glass-effect rounded-xl"
            >
              <h4 className="font-semibold mb-3 text-primary-600 dark:text-primary-400">
                Currently Working On
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Expanding my knowledge in DevOps practices, exploring cloud technologies, and 
                working on projects that combine my passion for web development with emerging 
                technologies like AI and machine learning.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 