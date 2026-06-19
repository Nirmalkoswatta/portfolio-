import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, GraduationCap, Rocket, ShieldCheck, Target } from 'lucide-react';

const Timeline = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const timelineItems = [
    {
      year: 'Dec 2025 - Present',
      title: 'DevOps Intern / Trainee',
      subtitle: 'Fortude PVT. LTD',
      description: 'Hands-on DevOps role focused on monitoring, cloud infrastructure, Kubernetes deployments, reliability, and security improvements.',
      icon: Briefcase,
      status: 'current',
      achievements: [
        'Monitored application health with Grafana and New Relic',
        'Worked with AWS services for cloud infrastructure and deployments',
        'Assisted with Kubernetes-based containerized application management',
        'Helped identify performance bottlenecks and reliability improvements'
      ]
    },
    {
      year: '2025',
      title: 'DevSecOps and CI/CD Security Work',
      subtitle: 'Pipeline security and container hardening',
      description: 'Reviewed CI/CD workflows and documented security risks with mitigation strategies for production-grade delivery pipelines.',
      icon: ShieldCheck,
      status: 'completed',
      achievements: [
        'Reviewed GitHub Actions workflows for hosted runner security risks',
        'Prepared RFC-style documentation for threats and mitigations',
        'Addressed root-user container risk using distroless image practices',
        'Validated security fixes through test environment deployments'
      ]
    },
    {
      year: '2023 - Present',
      title: 'BSc (Hons) Computer Science',
      subtitle: 'University of Bedfordshire',
      description: 'Computer science degree path with software engineering foundations and a growing specialization in DevOps, cloud, and secure delivery.',
      icon: GraduationCap,
      status: 'current',
      achievements: [
        'Final year undergraduate',
        'Built cloud-ready full-stack and AI-assisted systems',
        'Applied software engineering knowledge to deployment and infrastructure problems'
      ]
    },
    {
      year: '2025 - Completed',
      title: 'Higher National Diploma in IT',
      subtitle: 'SLIIT City University',
      description: 'Completed HND in IT with practical exposure to application development, databases, and modern web systems.',
      icon: GraduationCap,
      status: 'completed',
      achievements: [
        'Built React, Angular, Node.js, MongoDB, and Firebase projects',
        'Strengthened software development fundamentals',
        'Created a base for DevOps and platform engineering work'
      ]
    },
    {
      year: 'Career Direction',
      title: 'Associate DevOps / Cloud / Security Engineer',
      subtitle: 'Target role',
      description: 'Focused on joining teams that value automation, secure delivery, observability, and dependable cloud infrastructure.',
      icon: Rocket,
      status: 'future',
      achievements: [
        'Secure CI/CD pipelines',
        'Kubernetes and AWS operations',
        'Cloud monitoring and incident response',
        'Infrastructure automation and platform reliability'
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'current':
        return 'border-primary-500 bg-primary-50 dark:bg-primary-900/20';
      case 'completed':
        return 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20';
      case 'future':
        return 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20';
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
        return 'Target';
      default:
        return 'Milestone';
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
            Career <span className="gradient-text">Timeline</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A practical path from software engineering foundations into cloud operations, DevSecOps, and reliability engineering.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-dark-700"></div>

          <div className="space-y-12">
            {timelineItems.map((item, index) => (
              <motion.div
                key={`${item.year}-${item.title}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-white dark:bg-dark-900 border-4 border-primary-500 rounded-full z-10"></div>

                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} ml-16 md:ml-0`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`p-6 rounded-2xl border-2 ${getStatusColor(item.status)} transition-all duration-300`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                          <item.icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                          <p className="text-primary-600 dark:text-primary-400 font-medium">{item.subtitle}</p>
                        </div>
                      </div>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-dark-600">
                        {getStatusText(item.status)}
                      </span>
                    </div>

                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">{item.year}</span>
                    <p className="text-gray-600 dark:text-gray-300 my-4 leading-relaxed">{item.description}</p>

                    <ul className="space-y-2">
                      {item.achievements.map((achievement) => (
                        <li key={achievement} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-primary-50 to-emerald-50 dark:from-primary-900/20 dark:to-emerald-900/20 rounded-2xl border border-primary-200 dark:border-primary-800">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Target className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              <h3 className="text-2xl font-bold text-primary-800 dark:text-primary-300">Recruiter Summary</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Best fit: associate DevOps, cloud support, platform operations, or junior DevSecOps roles where I can contribute
              to CI/CD reliability, Kubernetes operations, AWS infrastructure, observability, and secure deployment practices.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Timeline;
