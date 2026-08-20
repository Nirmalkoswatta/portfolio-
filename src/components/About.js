import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
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
    { icon: GraduationCap, label: 'Education', value: 'BSc (Hons) Computer Science (UoB)' },
    { icon: Code, label: 'Field', value: 'DevOps & DevSecOps Engineering' },
  ];

  return (
  <section ref={ref} id="about" className="section-padding bg-gray-50 dark:bg-dark-800 relative z-30" style={{ scrollMarginTop: '88px' }}>
      <div className="container-custom">
  <ScrollReveal className="text-center mb-16" amount={0.15} delay={0}>
          <h2 className="text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Junior DevOps Engineer passionate about continuous integration, infrastructure automation, system observability, and cloud security.
          </p>
  </ScrollReveal>

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
              <h4 className="font-semibold mb-3 text-primary-800 dark:text-primary-300">Core Expertise & Passions</h4>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 list-disc list-inside">
                <li>Automating CI/CD deployment pipelines with GitHub Actions & Coolify</li>
                <li>Infrastructure as Code (IaC) provisioning using Terraform</li>
                <li>System observability and metrics monitoring via Prometheus & Grafana</li>
                <li>Shifting security left with automated SAST/DAST & vulnerability scans</li>
                <li>Enterprise database management with Oracle DB & SQL databases</li>
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
                I am a Junior DevOps Engineer at <a href="https://zuse.lk/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">Zuse Technologies</a>, currently pursuing my Computer Science degree at SLIIT CityUNI. 
                My focus lies at the intersection of modern software development, automated infrastructure, and proactive monitoring.
              </p>
              
              <p>
                Previously, I served as an Intern DevSecOps Engineer at <a href="https://fortude.co/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">Fortude</a>, where I gained deep hands-on experience embedding automated security scanning (SAST/DAST), secret detection, and vulnerability management directly into enterprise CI/CD pipelines.
              </p>
              
              <p>
                Today at Zuse Technologies, I architect continuous integration and continuous deployment pipelines, manage Infrastructure as Code with Terraform, manage enterprise Oracle DB setups, and build real-time monitoring ecosystems using Grafana and Prometheus.
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
                Deploying automated GitHub Actions & Coolify workflows, optimizing Prometheus & Grafana alerting metrics, provisioning cloud resources via Terraform, and managing Oracle DB reliability.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 