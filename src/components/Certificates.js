import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, ExternalLink, Award, Shield, Cloud, Calendar, CheckCircle, Star, Zap } from 'lucide-react';

const Certificates = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const certificates = [
    {
      title: 'Application Security in DevSecOps',
      issuer: 'LinkedIn Learning',
      date: 'August 2025',
      description: 'Advanced course covering application security practices in DevSecOps environments, including security integration in CI/CD pipelines and secure development practices.',
      icon: Shield,
      type: 'Professional Certificate',
      downloadUrl: '/certificates/CertificateOfCompletion_Application Security in DevSecOps.pdf',
      verifyUrl: 'https://www.linkedin.com/learning/certificates/6ccf8db251f89d38b4de2f203fd192fbf334f62ef9a54864e64e25fb8080ba0c',
      skills: ['Application Security', 'DevSecOps', 'CI/CD Security', 'Secure Development'],
      color: 'from-red-500 via-orange-500 to-yellow-600',
      bgPattern: 'bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10',
      iconBg: 'bg-gradient-to-r from-red-500 to-orange-600',
      credentialId: 'LI-DEVSEC-2025-001',
      level: 'Advanced',
      hours: '25+'
    },
    {
      title: 'AWS DevOps Best Practices for Beginners',
      issuer: 'LinkedIn Learning',
      date: '2025',
      description: 'Foundational AWS DevOps practices covering delivery workflows, cloud operations, deployment automation, and reliability-oriented engineering habits.',
      icon: Cloud,
      type: 'Professional Certificate',
      downloadUrl: '/certificates/CertificateOfCompletion_AWS DevOps Best Practices for Beginners.pdf',
      verifyUrl: 'https://www.linkedin.com/learning/',
      skills: ['AWS DevOps', 'Cloud Operations', 'Deployment Practices', 'Reliability'],
      color: 'from-orange-500 via-amber-500 to-yellow-600',
      bgPattern: 'bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/10 dark:to-yellow-900/10',
      iconBg: 'bg-gradient-to-r from-orange-500 to-amber-600',
      credentialId: 'LI-AWS-DEVOPS-2025',
      level: 'Beginner',
      hours: '10+'
    },
    {
      title: 'DevOps Foundations',
      issuer: 'LinkedIn Learning',
      date: '2025',
      description: 'Core DevOps concepts including collaboration, automation, continuous delivery, deployment pipelines, and operational feedback loops.',
      icon: Award,
      type: 'Professional Certificate',
      downloadUrl: '/certificates/CertificateOfCompletion_DevOps Foundations.pdf',
      verifyUrl: 'https://www.linkedin.com/learning/',
      skills: ['DevOps Culture', 'Automation', 'Continuous Delivery', 'Operations'],
      color: 'from-indigo-500 via-blue-500 to-cyan-600',
      bgPattern: 'bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-indigo-900/10 dark:to-cyan-900/10',
      iconBg: 'bg-gradient-to-r from-indigo-500 to-cyan-600',
      credentialId: 'LI-DEVOPS-FOUNDATIONS-2025',
      level: 'Beginner',
      hours: '10+'
    },
    {
      title: 'DevOps Foundations: Containers',
      issuer: 'LinkedIn Learning',
      date: '2025',
      description: 'Container fundamentals focused on image-based delivery, runtime isolation, repeatable deployments, and containerized application workflows.',
      icon: Cloud,
      type: 'Professional Certificate',
      downloadUrl: '/certificates/CertificateOfCompletion_DevOps Foundations Containers.pdf',
      verifyUrl: 'https://www.linkedin.com/learning/',
      skills: ['Containers', 'Docker Foundations', 'Image Delivery', 'Runtime Isolation'],
      color: 'from-sky-500 via-blue-500 to-indigo-600',
      bgPattern: 'bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-sky-900/10 dark:to-indigo-900/10',
      iconBg: 'bg-gradient-to-r from-sky-500 to-indigo-600',
      credentialId: 'LI-CONTAINERS-2025',
      level: 'Beginner',
      hours: '10+'
    },
    {
      title: 'Ethical Hacking: SQL Injection',
      issuer: 'LinkedIn Learning',
      date: '2025',
      description: 'Security training focused on SQL injection concepts, application risk awareness, and defensive thinking for secure software delivery.',
      icon: Shield,
      type: 'Professional Certificate',
      downloadUrl: '/certificates/CertificateOfCompletion_Ethical Hacking SQL Injection.pdf',
      verifyUrl: 'https://www.linkedin.com/learning/',
      skills: ['SQL Injection', 'Ethical Hacking', 'Application Security', 'Threat Awareness'],
      color: 'from-rose-500 via-red-500 to-orange-600',
      bgPattern: 'bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-900/10 dark:to-orange-900/10',
      iconBg: 'bg-gradient-to-r from-rose-500 to-orange-600',
      credentialId: 'LI-SQLI-2025',
      level: 'Intermediate',
      hours: '10+'
    },
    {
      title: 'Introduction to AWS CloudFormation',
      issuer: 'AWS Training',
      date: 'August 2025',
      description: 'Fundamentals of AWS CloudFormation, including infrastructure as code, stack management, and automation best practices.',
      icon: Cloud,
      type: 'Professional Certificate',
      downloadUrl: '/certificates/CertificateOfCompletion_Introduction to AWS CloudFormation.pdf',
      verifyUrl: 'https://www.linkedin.com/learning/certificates/26f2d1757dd8873669e527253d5edc307d47da7ad0ce674c2ba6742266908430?trk=share_certificate',
      skills: ['AWS', 'CloudFormation', 'Infrastructure as Code', 'Automation'],
      color: 'from-yellow-400 via-orange-400 to-blue-500',
      bgPattern: 'bg-gradient-to-br from-yellow-50 to-blue-50 dark:from-yellow-900/10 dark:to-blue-900/10',
      iconBg: 'bg-gradient-to-r from-yellow-400 to-blue-500',
      credentialId: 'AWS-CF-2025-001',
      level: 'Beginner',
      hours: '10+'
    },
    {
      title: 'Introduction to IoT and Digital Transformation',
      issuer: 'Cisco Networking Academy',
      date: 'August 2025',
      description: 'Comprehensive introduction to Internet of Things (IoT) concepts and digital transformation strategies in modern business environments.',
      icon: Zap,
      type: 'Professional Certificate',
      downloadUrl: '/certificates/Introduction_to_IoT_certificate_nirmalkoza-gmail-com_6c909743-86c7-4c08-92f0-3e8fbab6ab74.pdf',
      verifyUrl: 'https://www.netacad.com/',
      skills: ['IoT', 'Digital Transformation', 'Connected Devices', 'Industry 4.0'],
      color: 'from-emerald-500 via-teal-500 to-cyan-600',
      bgPattern: 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10',
      iconBg: 'bg-gradient-to-r from-emerald-500 to-teal-600',
      credentialId: 'CISCO-IOT-2025-002',
      level: 'Intermediate',
      hours: '20+'
    },
    {
      title: 'CISCO Introduction to Cybersecurity',
      issuer: 'Cisco Networking Academy',
      date: 'July 2025',
      description: 'Comprehensive introduction to cybersecurity fundamentals, including threat landscape, security principles, and best practices.',
      icon: Shield,
      type: 'Professional Certificate',
      downloadUrl: '/certificates/CISCO Introduction to Cybersecurity.pdf',
      verifyUrl: 'https://www.netacad.com/courses/cyberops-associate?courseLang=en-US',
      skills: ['Cybersecurity', 'Network Security', 'Threat Analysis', 'Security Principles'],
      color: 'from-cyan-500 via-blue-500 to-indigo-600',
      bgPattern: 'bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/10 dark:to-blue-900/10',
      iconBg: 'bg-gradient-to-r from-cyan-500 to-blue-600',
      credentialId: 'CISCO-CYB-2025-001',
      level: 'Intermediate',
      hours: '20+'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="certificates" className="section-padding bg-white dark:bg-dark-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234F46E5' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-full mb-6"
          >
            <Award className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">Cloud, Security, and DevOps Learning</span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-primary-600 to-primary-800 dark:from-gray-100 dark:via-primary-400 dark:to-primary-300 bg-clip-text text-transparent">
              DevOps Certifications
            </span>
            <br />
            <span className="gradient-text">& Achievements</span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Certificates that support my target path in DevSecOps, cloud infrastructure, automation, and cybersecurity.
          </motion.p>
        </motion.div>

        {/* Certificates Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-16"
        >
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              variants={cardVariants}
              className="group relative"
            >
              {/* Main Card */}
              <div className={`relative ${cert.bgPattern} backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}>
                {/* Floating Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={inView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                  className="absolute -top-4 -right-4 z-10"
                >
                  <div className={`${cert.iconBg} p-3 rounded-2xl shadow-lg border-4 border-white dark:border-dark-900`}>
                    <cert.icon className="w-8 h-8 text-white" />
                  </div>
                </motion.div>

                {/* Certificate Header */}
                <div className="relative z-10 mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                        className="flex items-center gap-3 mb-3"
                      >
                        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-green-600 rounded-full shadow-sm">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </span>
                        <span className="px-3 py-1 text-xs font-semibold text-primary-700 dark:text-primary-300 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                          {cert.type}
                        </span>
                      </motion.div>

                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                        className="text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-2"
                      >
                        {cert.title}
                      </motion.h3>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                        className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400"
                      >
                        <span className="font-semibold">{cert.issuer}</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {cert.date}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Certificate Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.7 }}
                  className="space-y-6 mb-8"
                >
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                    {cert.description}
                  </p>

                  {/* Meta Information */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50/50 dark:bg-dark-800/30 rounded-2xl border border-gray-200/30 dark:border-gray-700/30">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary-600 dark:text-primary-400">{cert.level}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Difficulty Level</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary-600 dark:text-primary-400">{cert.hours}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">Learning Hours</div>
                    </div>
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: index * 0.2 + 0.8 + skillIndex * 0.1 }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <Zap className="w-3 h-3 text-primary-500" />
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.9 }}
                  className="flex gap-3"
                >
                  <AnimatePresence>
                    {cert.downloadUrl && (
                      <motion.a
                        href={cert.downloadUrl}
                        download
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 flex-1 justify-center group/btn"
                      >
                        <Download className="w-5 h-5 group-hover/btn:animate-bounce" />
                        Download Certificate
                      </motion.a>
                    )}
                  </AnimatePresence>
                  
                  <motion.a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-6 py-3 border-2 border-primary-500 text-primary-600 dark:text-primary-400 font-semibold rounded-xl hover:bg-primary-500 hover:text-white transition-all duration-300 ${
                      cert.downloadUrl ? 'flex-1' : 'w-full'
                    } justify-center group/btn`}
                  >
                    <ExternalLink className="w-5 h-5 group-hover/btn:rotate-45 transition-transform duration-300" />
                    {cert.type === 'Professional Certificate' ? 'View Course' : 'View Profile'}
                  </motion.a>
                </motion.div>

                {/* Credential ID */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 + 1.0 }}
                  className="mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50"
                >
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Credential ID: {cert.credentialId}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span>Verified</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="relative p-12 bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-primary-900/10 dark:via-dark-800 dark:to-primary-900/10 rounded-3xl border border-primary-200/50 dark:border-primary-800/50 shadow-xl overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-transparent" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-primary-500/10 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-primary-400/10 to-transparent rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl mb-6 shadow-lg"
              >
                <Star className="w-10 h-10 text-white" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-primary-700 dark:from-gray-100 dark:to-primary-300 bg-clip-text text-transparent"
              >
                Committed to Excellence
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8"
              >
                My learning path is intentionally aligned with associate DevOps, cloud, and security roles: secure delivery, infrastructure automation, cloud governance, and operational awareness.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span>Industry Recognized</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                  <span>Continuously Updated</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                  <span>Practical Experience</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;
