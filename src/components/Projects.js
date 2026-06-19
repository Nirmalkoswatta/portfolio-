import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Activity, Box, ExternalLink, Github, GitPullRequest, ServerCog, ShieldCheck } from 'lucide-react';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: 'CI/CD Monitoring Dashboard',
      description: 'A React dashboard for tracking build and deployment health with GitHub Actions visibility and Slack alerting for failed workflows.',
      technologies: ['React', 'GitHub Actions', 'Slack API', 'Netlify', 'CI/CD'],
      features: ['Build status visibility', 'Deployment monitoring', 'Slack failure alerts', 'Pipeline health tracking'],
      icon: Activity,
      github: 'https://github.com/Nirmalkoswatta/Monitoring',
      live: '#',
      category: 'DevOps Monitoring'
    },
    {
      title: 'VR-Enhanced Car Modification Parts Finder',
      description: 'Final year platform using ML and WebXR/3D previews to recommend compatible vehicle modification parts, designed with containerized and cloud-ready architecture.',
      technologies: ['React', 'Node.js', 'MongoDB', 'TensorFlow', 'Three.js', 'Docker', 'Cloud'],
      features: ['97.83% model accuracy', 'Vehicle detection', 'VR part preview', 'Budget-aware recommendations'],
      icon: Box,
      github: 'https://github.com/Nirmalkoswatta/finalyearproject',
      live: '#',
      category: 'Cloud-Ready Full Stack'
    },
    {
      title: 'LogicHeart Puzzle Game Platform',
      description: 'Full-stack puzzle platform with OTP authentication, timed difficulty levels, leaderboards, and admin management.',
      technologies: ['React', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Vercel'],
      features: ['OTP authentication', 'JWT authorization', 'Leaderboard rankings', 'Admin dashboard'],
      icon: ShieldCheck,
      github: 'https://github.com/Nirmalkoswatta/logicheart',
      live: 'https://logicheart.vercel.app/',
      category: 'Secure Full Stack'
    },
    {
      title: 'Record Management System',
      description: 'CRUD-based record management system with React, Node.js, MongoDB, and Firebase hosting for practical deployment experience.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Firebase Hosting'],
      features: ['CRUD workflows', 'Hosted deployment', 'Responsive interface', 'Data management'],
      icon: ServerCog,
      github: 'https://github.com/Nirmalkoswatta/record-management-system',
      live: 'https://record-management-c97e4.web.app/',
      category: 'Hosted Web App'
    }
  ];

  const getCategoryIcon = (Icon) => <Icon className="w-4 h-4" />;

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
            Relevant <span className="gradient-text">Project Evidence</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Projects selected for DevOps, cloud, security, automation, deployment, and production-readiness signals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                whileHover={{ y: -6 }}
                className="group bg-white dark:bg-dark-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-dark-700"
              >
                <div className="h-36 bg-gradient-to-br from-primary-500 to-emerald-600 flex items-center justify-center relative overflow-hidden">
                  <Icon className="w-16 h-16 text-white" />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {getCategoryIcon(project.icon)}
                    <span className="text-xs font-semibold text-primary-700 dark:text-primary-300 bg-primary-100 dark:bg-primary-900/30 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-5 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-dark-700 px-3 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Why it matters:</h4>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {project.features.map((feature) => (
                        <li key={feature} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                          <GitPullRequest className="w-3.5 h-3.5 text-primary-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                    {project.live !== '#' ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-primary-500 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-lg hover:bg-primary-500 hover:text-white transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live
                      </a>
                    ) : (
                      <a
                        href="https://github.com/Nirmalkoswatta"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 dark:border-dark-600 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-lg hover:border-primary-500 hover:text-primary-500 transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Profile
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/Nirmalkoswatta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
          >
            <Github className="w-5 h-5" />
            View GitHub Portfolio
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
