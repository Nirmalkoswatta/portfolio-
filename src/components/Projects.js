import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Code, Database, Globe } from 'lucide-react';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: 'Fruit App (React + Firebase)',
      description: 'A modern fruit management app built with React, Firebase, and SCSS. Features smooth animations, authentication, and real-time data. Deployed on Firebase.',
      technologies: ['React', 'Firebase', 'SCSS'],
      features: ['Authentication', 'CRUD Operations', 'Real-time Sync', 'Modern Animations', 'Deployed on Firebase'],
      image: '🍏',
      github: 'https://github.com/Nirmalkoswatta/fruitapp-react-firebase',
      live: 'https://getfruitapp-kosa.web.app/login',
      category: 'Full Stack'
    },
    {
      title: 'Record Management System',
      description: 'A record management system using React, Redux, and Firebase for real-time data and authentication.',
      technologies: ['React', 'Redux', 'Firebase'],
      features: ['User Authentication', 'Record CRUD', 'Real-time Sync', 'Role-based Access'],
      image: '📋',
      github: 'https://github.com/Nirmalkoswatta/Record-management-',
      live: 'https://record-management-c97e4.web.app',
      category: 'Full Stack'
    },
    {
      title: 'Feedback & Notification System',
      description: 'Feedback collection and notification system using React, EmailJS, and TailwindCSS. Smooth UI and email notifications.',
      technologies: ['React', 'EmailJS', 'TailwindCSS'],
      features: ['Email Notifications', 'Responsive Design', 'Smooth Animations', 'User Feedback'],
      image: '📧',
      github: 'https://github.com/Nirmalkoswatta/Feedback-Notification',
      live: '#',
      category: 'Frontend'
    },
    {
      title: 'Service Booking System Application',
      description: 'A service booking platform using Angular, Spring Boot, and SCSS. Includes user dashboard and admin panel.',
      technologies: ['Angular', 'Spring Boot', 'SCSS'],
      features: ['Service Booking', 'User Dashboard', 'Admin Panel', 'Payment Integration'],
      image: '📅',
      github: 'https://github.com/Nirmalkoswatta/Employe-Management-Systemm',
      live: '#',
      category: 'Full Stack'
    },
    {
      title: 'Fruit App (CRUD)',
      description: 'A CRUD fruit app using Laravel, PHP, SQL, and Tailwind CSS. Manage fruit inventory and sales.',
      technologies: ['Laravel', 'PHP', 'SQL', 'TailwindCSS'],
      features: ['CRUD Operations', 'Inventory Management', 'Responsive UI'],
      image: '🍉',
      github: 'https://github.com/Nirmalkoswatta/FRUIT-APP-LARAVEL-',
      live: '#',
      category: 'Full Stack'
    }
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Full Stack':
        return <Code className="w-4 h-4" />;
      case 'Frontend':
        return <Globe className="w-4 h-4" />;
      case 'Backend':
        return <Database className="w-4 h-4" />;
      default:
        return <Code className="w-4 h-4" />;
    }
  };

  return (
    <section id="projects" className="section-padding bg-gray-50 dark:bg-dark-800">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my recent projects demonstrating my skills in full-stack development and modern web technologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative bg-white dark:bg-dark-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 card-hover"
            >
              {/* Project Image/Icon */}
              <div className="h-48 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <span className="text-6xl">{project.image}</span>
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Category Badge */}
                <div className="flex items-center gap-2 mb-3">
                  {getCategoryIcon(project.category)}
                  <span className="text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30 px-2 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-dark-700 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Key Features:
                  </h4>
                  <ul className="space-y-1">
                    {project.features.map((feature) => (
                      <li key={feature} className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary-500 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </motion.a>
                  
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 border border-primary-500 text-primary-500 text-sm font-medium rounded-lg hover:bg-primary-500 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Interested in seeing more of my work?
          </p>
          <motion.a
            href="https://github.com/Nirmalkoswatta"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 