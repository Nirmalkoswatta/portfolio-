import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Code, Rocket, Target } from 'lucide-react';

const Timeline = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timelineItems = [
    {
      year: '2023 - Present',
      title: 'Computer Science Undergraduate',
      subtitle: 'SLIIT CityUNI',
      description: 'Pursuing Software Engineering degree with focus on modern web technologies and full-stack development.',
      icon: GraduationCap,
      status: 'current',
      achievements: [
        'Learning advanced programming concepts',
        'Working on real-world projects',
        'Exploring AI and machine learning'
      ]
    },
    {
      year: '2023 - Present',
      title: 'Full Stack Development',
      subtitle: 'Personal Projects & Learning',
      description: 'Developed multiple full-stack applications using React, Angular, Spring Boot, and various databases.',
      icon: Code,
      status: 'completed',
      achievements: [
        'Built Pet Clinic Record System',
        'Created E-commerce Platform',
        'Developed Service Booking App'
      ]
    },
    {
      year: '2023 - Present',
      title: 'Frontend Development',
      subtitle: 'Web Technologies',
      description: 'Started learning modern frontend frameworks and technologies including React, Angular, and TailwindCSS.',
      icon: Code,
      status: 'completed',
      achievements: [
        'Mastered HTML, CSS, JavaScript',
        'Learned React and Angular',
        'Implemented responsive designs'
      ]
    },
    {
      year: '2024 - Future',
      title: 'DevOps & Cloud Engineering',
      subtitle: 'Career Vision',
      description: 'Planning to expand expertise in DevOps practices, cloud technologies, and scalable system architecture.',
      icon: Rocket,
      status: 'future',
      achievements: [
        'Docker & Kubernetes',
        'AWS/Azure Cloud Services',
        'CI/CD Pipelines',
        'Microservices Architecture'
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'current':
        return 'border-primary-500 bg-primary-50 dark:bg-primary-900/20';
      case 'completed':
        return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      case 'future':
        return 'border-purple-500 bg-purple-50 dark:bg-purple-900/20';
      default:
        return 'border-gray-300 bg-gray-50 dark:bg-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'current':
        return 'Current';
      case 'completed':
        return 'Completed';
      case 'future':
        return 'Planned';
      default:
        return 'Unknown';
    }
  };

  return (
    <section id="timeline" className="section-padding bg-white dark:bg-dark-900">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A timeline of my educational and professional development, from learning to building and future aspirations.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-dark-700"></div>

          <div className="space-y-12">
            {timelineItems.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-white dark:bg-dark-900 border-4 border-primary-500 rounded-full z-10"></div>

                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} ml-16 md:ml-0`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`p-6 rounded-2xl border-2 ${getStatusColor(item.status)} transition-all duration-300`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                          <item.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {item.title}
                          </h3>
                          <p className="text-primary-600 dark:text-primary-400 font-medium">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        item.status === 'current' 
                          ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300'
                          : item.status === 'completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                      }`}>
                        {getStatusText(item.status)}
                      </span>
                    </div>

                    {/* Year */}
                    <div className="mb-3">
                      <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                        {item.year}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Achievements */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Key Achievements:
                      </h4>
                      <ul className="space-y-1">
                        {item.achievements.map((achievement, achievementIndex) => (
                          <motion.li
                            key={achievementIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.2 + achievementIndex * 0.1 + 0.3 }}
                            className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"
                          >
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future Vision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl border border-primary-200 dark:border-primary-800">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Target className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              <h3 className="text-2xl font-bold text-primary-800 dark:text-primary-300">
                Future Vision
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              My goal is to become a proficient DevOps engineer, combining my full-stack development skills 
              with cloud technologies and automation practices. I aim to build scalable, efficient systems 
              that can handle real-world challenges and contribute to innovative solutions in the tech industry.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline; 