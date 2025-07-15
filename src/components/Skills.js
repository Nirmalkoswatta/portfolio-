import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: 'Frontend Development',
      skills: [
        { name: 'HTML', level: 90, color: 'from-orange-500 to-orange-600' },
        { name: 'CSS', level: 85, color: 'from-blue-500 to-blue-600' },
        { name: 'SCSS', level: 80, color: 'from-pink-500 to-pink-600' },
        { name: 'JavaScript', level: 88, color: 'from-yellow-500 to-yellow-600' },
        { name: 'React', level: 95, color: 'from-cyan-500 to-cyan-600' },
        { name: 'Angular', level: 80, color: 'from-red-500 to-red-600' },
        { name: 'TailwindCSS', level: 90, color: 'from-teal-500 to-teal-600' },
        { name: 'Redux', level: 75, color: 'from-purple-500 to-purple-600' },
        { name: 'Android Studio', level: 70, color: 'from-green-500 to-green-600' },
      ]
    },
    {
      title: 'Backend Development',
      skills: [
        { name: 'Java (Spring Boot)', level: 85, color: 'from-red-600 to-red-700' },
        { name: 'Node.js', level: 80, color: 'from-green-500 to-green-600' },
        { name: 'Firebase', level: 75, color: 'from-orange-400 to-orange-500' },
        { name: 'PHP', level: 80, color: 'from-indigo-500 to-indigo-600' },
        { name: 'Laravel', level: 75, color: 'from-red-500 to-red-600' },
        { name: 'MySQL', level: 80, color: 'from-blue-600 to-blue-700' },
        { name: 'MongoDB', level: 75, color: 'from-green-600 to-green-700' },
      ]
    },
    {
      title: 'Other Skills',
      skills: [
        { name: 'Git', level: 85, color: 'from-orange-600 to-orange-700' },
        { name: 'DevOps Basics', level: 70, color: 'from-blue-500 to-blue-600' },
        { name: 'REST APIs', level: 85, color: 'from-green-500 to-green-600' },
        { name: 'EmailJS', level: 80, color: 'from-purple-500 to-purple-600' },
        { name: 'Animations', level: 75, color: 'from-pink-500 to-pink-600' },
        { name: 'AI Interest', level: 70, color: 'from-indigo-500 to-indigo-600' },
      ]
    }
  ];

  return (
    <section id="skills" className="section-padding bg-white dark:bg-dark-900">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and expertise across various technologies.
          </p>
        </motion.div>

        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="bg-gray-50 dark:bg-dark-800 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-semibold mb-8 text-center">
                {category.title}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3 }}
                        className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-semibold mb-8">Learning & Growing</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              'Cloud Technologies',
              'Machine Learning',
              'Microservices',
              'Docker & Kubernetes',
              'GraphQL',
              'TypeScript',
              'Next.js',
              'AWS/Azure'
            ].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="p-4 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg border border-primary-200 dark:border-primary-800"
              >
                <span className="text-sm font-medium text-primary-800 dark:text-primary-300">
                  {skill}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 