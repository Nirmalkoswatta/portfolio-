import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Globe, Cpu, Palette, Settings, Star, Zap } from 'lucide-react';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Enhanced skills data with icons
  const skillsData = [
    { 
      name: 'React', 
      color: 'from-cyan-400 to-cyan-600', 
      icon: Code,
      category: 'Frontend',
      description: 'Building dynamic user interfaces with React hooks and modern patterns'
    },
    { 
      name: 'JavaScript', 
      color: 'from-yellow-400 to-yellow-600', 
      icon: Zap,
      category: 'Frontend',
      description: 'Modern ES6+ JavaScript programming and async operations'
    },
    { 
      name: 'Angular', 
      color: 'from-red-500 to-red-700', 
      icon: Globe,
      category: 'Frontend',
      description: 'TypeScript-based web framework for large applications'
    },
    { 
      name: 'Java Spring', 
      color: 'from-red-400 to-red-600', 
      icon: Database,
      category: 'Backend',
      description: 'Enterprise Java applications with Spring Boot framework'
    },
    { 
      name: 'SpringBoot', 
      color: 'from-green-500 to-green-700', 
      icon: Settings,
      category: 'Backend',
      description: 'Microservices and enterprise Java development framework'
    },
    { 
      name: 'Node.js', 
      color: 'from-green-400 to-green-600', 
      icon: Settings,
      category: 'Backend',
      description: 'Server-side JavaScript development with Express and APIs'
    },
    { 
      name: 'PHP', 
      color: 'from-purple-500 to-purple-700', 
      icon: Code,
      category: 'Backend',
      description: 'Server-side scripting and web development'
    },
    { 
      name: 'Laravel', 
      color: 'from-red-600 to-orange-600', 
      icon: Database,
      category: 'Backend',
      description: 'PHP framework for elegant web application development'
    },
    { 
      name: 'MySQL', 
      color: 'from-blue-400 to-blue-600', 
      icon: Database,
      category: 'Database',
      description: 'Relational database design and optimization'
    },
    { 
      name: 'Firebase', 
      color: 'from-orange-400 to-orange-600', 
      icon: Database,
      category: 'Database',
      description: 'Real-time database and cloud hosting solutions'
    },
    { 
      name: 'Redux', 
      color: 'from-purple-400 to-purple-600', 
      icon: Settings,
      category: 'Frontend',
      description: 'Predictable state container for JavaScript applications'
    },
    { 
      name: 'TailwindCSS', 
      color: 'from-teal-400 to-teal-600', 
      icon: Palette,
      category: 'Frontend',
      description: 'Utility-first CSS framework for rapid UI development'
    },
    { 
      name: 'CSS', 
      color: 'from-blue-500 to-blue-700', 
      icon: Palette,
      category: 'Frontend',
      description: 'Styling and layout for modern web applications'
    },
    { 
      name: 'SCSS', 
      color: 'from-pink-500 to-pink-700', 
      icon: Palette,
      category: 'Frontend',
      description: 'Enhanced CSS with variables, nesting, and mixins'
    },
    { 
      name: 'AWS', 
      color: 'from-orange-500 to-yellow-500', 
      icon: Cpu,
      category: 'Cloud',
      description: 'Amazon Web Services cloud computing platform'
    },
    { 
      name: 'Azure', 
      color: 'from-blue-600 to-cyan-600', 
      icon: Cpu,
      category: 'Cloud',
      description: 'Microsoft cloud computing services and solutions'
    },
    { 
      name: 'Docker', 
      color: 'from-blue-400 to-cyan-500', 
      icon: Settings,
      category: 'DevOps',
      description: 'Containerization platform for application deployment'
    },
    { 
      name: 'Kubernetes', 
      color: 'from-blue-600 to-indigo-700', 
      icon: Cpu,
      category: 'DevOps',
      description: 'Container orchestration and management platform'
    },
    { 
      name: 'GitHub', 
      color: 'from-gray-700 to-gray-900', 
      icon: Code,
      category: 'DevOps',
      description: 'Version control and collaborative software development'
    },
    { 
      name: 'GitHub Actions', 
      color: 'from-gray-600 to-black', 
      icon: Settings,
      category: 'DevOps',
      description: 'CI/CD automation and workflow management'
    },
    { 
      name: 'Netlify', 
      color: 'from-teal-500 to-cyan-600', 
      icon: Globe,
      category: 'Deployment',
      description: 'Modern web deployment and hosting platform'
    },
    { 
      name: 'Bash', 
      color: 'from-gray-800 to-black', 
      icon: Code,
      category: 'Tools',
      description: 'Command-line scripting and system automation'
    },
    { 
      name: 'Android Studio', 
      color: 'from-green-600 to-green-800', 
      icon: Globe,
      category: 'Mobile',
      description: 'Android application development environment'
    },
  ];

  return (
    <section id="skills" className="section-padding bg-gray-50 dark:bg-dark-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="gradient-text">Skills & Expertise</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Click on any skill card to see detailed information about my expertise and experience level.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {skillsData.map((skill, index) => {
            const Icon = skill.icon;
            
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSkill(skill)}
                className="group relative cursor-pointer"
              >
                <div className={`p-6 rounded-2xl bg-gradient-to-br ${skill.color} text-white transform transition-all duration-300 shadow-lg hover:shadow-2xl`}>
                  {/* Icon */}
                  <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Skill Name */}
                  <h3 className="text-lg font-bold mb-2">{skill.name}</h3>
                  
                  {/* Category */}
                  <p className="text-white/80 text-sm">{skill.category}</p>
                  
                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-30 blur-xl scale-110 transition-all duration-300 -z-10`}></div>
                  
                  {/* Click Indicator */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Skill Details */}
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-16"
          >
            <div className="max-w-2xl mx-auto glass-effect rounded-3xl p-8 border border-white/20 backdrop-blur-lg bg-white/80 dark:bg-dark-800/80">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedSkill.color} flex items-center justify-center shadow-lg`}>
                  <selectedSkill.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {selectedSkill.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {selectedSkill.category}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
                {selectedSkill.description}
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-dark-700 dark:hover:bg-dark-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl transition-colors duration-200"
                >
                  Close
                </button>
                <button
                  onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
                  className="flex-1 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg"
                >
                  Let's Work Together
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Additional Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text">Learning & Exploring</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'TypeScript', icon: '📝', color: 'from-blue-500 to-blue-700' },
              { name: 'Next.js', icon: '⚡', color: 'from-gray-700 to-gray-900' },
              { name: 'Docker', icon: '🐳', color: 'from-blue-400 to-cyan-500' },
              { name: 'AWS', icon: '☁️', color: 'from-orange-400 to-orange-600' },
              { name: 'GraphQL', icon: '🔗', color: 'from-pink-500 to-purple-600' },
              { name: 'Kubernetes', icon: '⚙️', color: 'from-blue-600 to-indigo-700' },
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative"
              >
                <div className={`p-6 rounded-2xl bg-gradient-to-br ${skill.color} text-white text-center transform transition-all duration-300 shadow-lg hover:shadow-xl`}>
                  <div className="text-3xl mb-3">{skill.icon}</div>
                  <h4 className="font-semibold text-sm">{skill.name}</h4>
                  
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-20 blur-xl scale-110 transition-all duration-300 -z-10`}></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <div className="glass-effect rounded-3xl p-12 border border-white/20 backdrop-blur-lg max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              With this diverse skill set spanning frontend, backend, and emerging technologies, 
              I'm ready to tackle any challenge and bring your ideas to life.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              Let's Collaborate
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 