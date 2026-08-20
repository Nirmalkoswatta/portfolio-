import React from 'react';
import { motion } from 'framer-motion';
// using framer-motion whileInView; no intersection observer needed
import { ExternalLink, Github, Code, Database, Globe, Star } from 'lucide-react';

const Projects = () => {
  const projects = [
    // 1. CI/CD Monitoring Dashboard
    {
      title: 'CI/CD Monitoring Dashboard',
      description: 'A comprehensive monitoring dashboard built with React for tracking build and deployment status. Features real-time integration with GitHub Actions and automated Slack alerts for failed builds, positioning expertise in pipeline automation and monitoring.',
      technologies: ['React', 'GitHub Actions', 'Slack API', 'CI/CD', 'Netlify'],
      features: ['Real-time Build Status', 'GitHub Actions Integration', 'Slack Notifications', 'Pipeline Monitoring', 'Automated Alerts'],
      image: '📊',
      github: 'https://github.com/Nirmalkoswatta/Monitoring-Dashboard',
      live: 'https://ci-cd-monitoring-dashboard.netlify.app/',
      category: 'Full Stack'
    },
    // 2. Record Management System (React + Redux)
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
    // 3. Cloud Expense Optimizer
    {
      title: 'Cloud Expense Optimizer',
      description: 'A full-stack web app to analyze and reduce AWS cloud costs. FastAPI backend scans AWS resources (EC2, S3, RDS), calculates usage and savings, and provides actionable recommendations. Angular + SCSS frontend presents interactive dashboards, region selection, and instant cost-saving suggestions. Features smooth animations, responsive design, and a fixed footer crediting the creator.',
      technologies: ['Angular', 'SCSS', 'FastAPI', 'Python', 'AWS EC2', 'AWS S3', 'AWS RDS'],
      features: [
        'AWS Resource Scanning (EC2, S3, RDS)',
        'Cost & Usage Analysis',
        'Monthly Savings Recommendations',
        'Interactive Angular Dashboard',
        'Region Selection & Scan Trigger',
        'Responsive Design',
        'Smooth Animations',
        'Fixed Footer Credit'
      ],
      image: '☁️',
      github: 'https://github.com/Nirmalkoswatta/Cloud-Expense-Optimizer',
      live: '',
      category: 'Full Stack'
    },
    // 4. KOSAHOSPITAL
    {
      title: 'KOSAHOSPITAL',
      description: 'A modern, full-stack Angular web application for hospital management. Features secure Firebase authentication, Firestore database integration, role-based dashboards (Admin, Doctor, Patient, Employee), animated UI with background video, real-time notifications, and responsive, user-friendly forms for managing patients, doctors, and staff.',
      technologies: ['Angular', 'Firebase Auth', 'Firestore', 'RxJS', 'TypeScript', 'SCSS'],
      features: [
        'Role-based Dashboards (Admin, Doctor, Patient, Employee)',
        'Secure Firebase Authentication',
        'Firestore Database Integration',
        'Animated UI with Background Video',
        'Real-time Notifications',
        'Responsive Forms',
        'Patient/Doctor/Staff Management'
      ],
      image: '🏥',
      github: 'https://github.com/Nirmalkoswatta/kosahospital',
      live: 'https://kosahospital-f3501.web.app/login',
      category: 'Full Stack'
    },
    // 4. Student Management System
    {
      title: 'Student Management System',
      description: 'A modern student management app built with Angular, SCSS, and Firebase. Features real-time backend, authentication, and smooth UI. Deployed on Firebase.',
      technologies: ['Angular', 'SCSS', 'Firebase'],
      features: ['Authentication', 'Student CRUD', 'Real-time Backend', 'Modern Animations', 'Deployed on Firebase'],
      image: '🎓',
      github: 'https://github.com/Nirmalkoswatta/student-management-system',
      live: 'https://record-management-system-e4074.web.app/login',
      category: 'Full Stack'
    },
    // 5. Fruit App (React + Firebase)
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
    // 6. Currency Converter
    {
      title: 'Currency Converter',
      description: 'A real-time currency converter application built with vanilla JavaScript and ExchangeRate API. Convert between multiple currencies with live exchange rates and responsive design.',
      technologies: ['JavaScript', 'ExchangeRate API', 'HTML', 'CSS'],
      features: ['Real-time Exchange Rates', 'Multiple Currency Support', 'Responsive Design', 'Live API Integration'],
      image: '💱',
      github: 'https://github.com/Nirmalkoswatta/-Currency-Converter',
      live: 'https://nirmalkoswatta.github.io/-Currency-Converter/',
      category: 'Frontend'
    },
    // 7. Todo App
    {
      title: 'Todo App',
      description: 'A simple and responsive To-Do List app built with React and TypeScript. It allows users to add, complete, delete, and filter tasks. All tasks are stored in localStorage to persist across sessions. This project demonstrates clean code structure, component-based architecture, and strong type safety using TypeScript.',
      technologies: ['React', 'TypeScript', 'localStorage', 'CSS'],
      features: ['Add & Delete Tasks', 'Mark Complete/Incomplete', 'Filter Tasks', 'Persistent Storage', 'Responsive Design'],
      image: '✅',
      github: 'https://github.com/Nirmalkoswatta/Todo-app',
      live: 'https://nirmalkoswatta.github.io/Todo-app/',
      category: 'Frontend'
    },
    // 8. Pharmacy Inventory Management System
    {
      title: 'Pharmacy Inventory Management System',
      description: 'Enterprise-grade pharmacy inventory system with React frontend, Node.js GraphQL backend, MongoDB database, and complete DevOps pipeline with Docker and Kubernetes.',
      technologies: ['React', 'Node.js', 'GraphQL', 'MongoDB', 'Docker', 'Kubernetes'],
      features: ['Medicine Management', 'Real-time Stock Tracking', 'Supplier Management', 'Order Management', 'DevOps Pipeline'],
      image: '💊',
      github: 'https://github.com/Nirmalkoswatta/pharmacy-inventory',
      live: '#',
      category: 'Full Stack'
    },
    // 9. Snake Game (Python)
    {
      title: 'Snake Game (Python)',
      description: 'Classic Snake game implementation using Python and Pygame. Features score tracking, collision detection, and smooth gameplay mechanics.',
      technologies: ['Python', 'Pygame'],
      features: ['Score System', 'Collision Detection', 'Smooth Controls', 'Game Over Logic'],
      image: '🐍',
      github: 'https://github.com/Nirmalkoswatta/snakegame-phython',
      live: '#',
      category: 'Game Development'
    },
    // 10. Patient Management System
    {
      title: 'Patient Management System',
      description: 'A comprehensive healthcare management system built with Django and Python. Features patient records, appointment scheduling, and medical history tracking.',
      technologies: ['Django', 'Python', 'SQLite', 'HTML/CSS'],
      features: ['Patient Records', 'Appointment Management', 'Medical History', 'Admin Dashboard'],
      image: '🏥',
      github: 'https://github.com/Nirmalkoswatta/patient-management-system',
      live: '#',
      category: 'Full Stack'
    },
    // 11. Service Booking System Application
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
    // 12. Feedback & Notification System
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
    // 13. MediCare Plus (Java Swing Application)
    {
      title: 'MediCare Plus (Java Swing Application)',
      description: 'A comprehensive Java Swing-based desktop application designed to automate and streamline the operations of small healthcare facilities. Replaces manual processes with an efficient system for patient records, doctor scheduling, pharmacy inventory, and appointment booking.',
      technologies: ['Java Swing', 'JDBC', 'MySQL', 'SQLite'],
      features: [
        'Patient Management',
        'Doctor Scheduling',
        'Pharmacy Inventory Control',
        'Appointment Booking',
        'Reports Generation',
        'Notifications (SMS/Email)'
      ],
      image: '🩺',
      github: 'https://github.com/Nirmalkoswatta/The-Debuggers',
      live: '',
      category: 'Desktop'
    },
    // 14. Personal Portfolio (SvelteKit + SCSS)
    {
      title: 'Personal Portfolio (SvelteKit + SCSS)',
      description: 'A modern, immersive, and easy-to-update personal portfolio built with SvelteKit and SCSS modules. Features hero/about, featured projects, live GitHub feed, social links, responsive design, dark mode, Svelte animations, Tabler Icons, contact form, SEO/accessibility best practices, and reusable components. Data abstracted in /src/lib/data.js.',
      technologies: ['SvelteKit', 'SCSS', 'Tabler Icons', 'EmailJS', 'Netlify Forms'],
      features: [
        'Hero & About Sections',
        'Featured Projects',
        'Live GitHub Feed (Top 5 by Stars)',
        'Social Links',
        'Responsive Design',
        'Dark Mode Toggle',
        'Svelte Animations',
        'Contact Form',
        'SEO & Accessibility',
        'Reusable Components',
        'SCSS Modules (BEM)',
        'Ready for Netlify/Vercel'
      ],
      image: '💻',
      github: 'https://github.com/Nirmalkoswatta/SvelteKit-project',
      live: '',
      category: 'Frontend'
    },
    // 15. Car Modification Parts Application
    {
      title: 'Car Modification Parts Application',
      description: 'Front-end UI only Android application for car modification parts. Built using Java for Android. Focuses on modern, user-friendly interface for browsing and selecting car parts.',
      technologies: ['Java', 'Android'],
      features: [
        'Modern Android UI',
        'Car Parts Catalog',
        'User-friendly Navigation',
        'Responsive Layouts'
      ],
      image: '🚗',
      github: 'https://github.com/Nirmalkoswatta/Car-modification-parts-application',
      live: '',
      category: 'Mobile'
    },
    // 16. Fruit App (CRUD)
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
  // ...existing code...
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Full Stack':
        return <Code className="w-4 h-4" />;
      case 'Frontend':
        return <Globe className="w-4 h-4" />;
      case 'Backend':
        return <Database className="w-4 h-4" />;
      case 'Game Development':
        return <Star className="w-4 h-4" />;
      default:
        return <Code className="w-4 h-4" />;
    }
  };

  return (
  <section id="projects" className="section-padding bg-gray-50 dark:bg-dark-800 relative z-20" style={{ scrollMarginTop: '88px' }}>
  <div className="container-custom relative z-30">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
          style={{ scrollMarginTop: '64px' }}
        >
          <h2 className="text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my recent projects demonstrating my skills in full-stack development and modern web technologies.
          </p>
    </motion.div>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              className="group bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-dark-700"
            >
              {/* Project Image/Icon */}
              <div className="h-48 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center relative overflow-hidden">
                <span className="text-6xl">{project.image}</span>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Category Badge */}
                <div className="flex items-center gap-2 mb-3">
                  {getCategoryIcon(project.category)}
                  <span className="text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-dark-700 px-3 py-1 rounded-full"
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
                    {project.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200 shadow-md"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                  
                  {project.live !== '#' ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-primary-500 text-primary-500 text-sm font-medium rounded-lg hover:bg-primary-500 hover:text-white transition-all duration-200"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  ) : (
                    <div className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 text-gray-400 text-sm font-medium rounded-lg cursor-not-allowed">
                      <ExternalLink className="w-4 h-4" />
                      Coming Soon
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Interested in seeing more of my work?
          </p>
          <a
            href="https://github.com/Nirmalkoswatta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <Github className="w-5 h-5" />
            View All Projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 