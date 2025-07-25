import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, ExternalLink, Award, Shield, Cloud } from 'lucide-react';

const Certificates = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const certificates = [
    {
      title: 'CISCO Introduction to Cybersecurity',
      issuer: 'Cisco Networking Academy',
      date: 'July 2025',
      description: 'Comprehensive introduction to cybersecurity fundamentals, including threat landscape, security principles, and best practices.',
      icon: Shield,
      type: 'certificate',
      downloadUrl: '/CISCO Introduction to Cybersecurity.pdf',
      verifyUrl: 'https://www.netacad.com/courses/cyberops-associate?courseLang=en-US',
      skills: ['Cybersecurity', 'Network Security', 'Threat Analysis', 'Security Principles'],
      color: 'from-blue-500 to-blue-700'
    },
    {
      title: 'Introduction to Azure Management and Governance',
      issuer: 'Microsoft Learn',
      date: 'July 2025',
      description: 'Microsoft Azure fundamentals covering cloud management, governance, and best practices for Azure services.',
      icon: Cloud,
      type: 'badge',
      downloadUrl: null,
      verifyUrl: 'https://learn.microsoft.com/en-us/users/nirmalkoswatta-4419/',
      skills: ['Azure', 'Cloud Computing', 'Cloud Governance', 'Azure Management'],
      color: 'from-blue-600 to-purple-600'
    }
  ];

  const getCertificateIcon = (type) => {
    switch (type) {
      case 'certificate':
        return <Award className="w-8 h-8" />;
      case 'badge':
        return <Shield className="w-8 h-8" />;
      default:
        return <Award className="w-8 h-8" />;
    }
  };

  return (
    <section id="certificates" className="section-padding bg-gray-50 dark:bg-dark-800">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            Certificates & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Professional certifications and badges that showcase my commitment to continuous learning and expertise in various technologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative bg-white dark:bg-dark-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-dark-700"
            >
              {/* Certificate Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${cert.color} text-white`}>
                    <cert.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-2">
                      {cert.type.charAt(0).toUpperCase() + cert.type.slice(1)}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                      {cert.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Issued by: {cert.issuer}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    {cert.date}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {cert.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {cert.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-dark-800 text-gray-700 dark:text-gray-300 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {cert.downloadUrl && (
                  <motion.a
                    href={cert.downloadUrl}
                    download
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 flex-1 justify-center"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </motion.a>
                )}
                
                <motion.a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2 border-2 border-primary-500 text-primary-500 font-medium rounded-lg hover:bg-primary-500 hover:text-white transition-all duration-300 ${
                    cert.downloadUrl ? 'flex-1' : 'w-full'
                  } justify-center`}
                >
                  <ExternalLink className="w-4 h-4" />
                  {cert.type === 'certificate' ? 'View Course' : 'View Profile'}
                </motion.a>
              </div>

              {/* Decorative Background */}
              <div className={`absolute -top-2 -right-2 w-24 h-24 bg-gradient-to-br ${cert.color} opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity duration-300`}></div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="p-8 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl border border-primary-200 dark:border-primary-800">
            <h3 className="text-xl font-semibold mb-4 text-primary-800 dark:text-primary-300">
              Continuous Learning Journey
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              I'm committed to staying current with industry trends and continuously expanding my skill set through professional certifications and hands-on learning experiences.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;
