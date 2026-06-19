import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, GraduationCap, ServerCog, ShieldCheck, Activity } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const personalInfo = [
    { icon: Calendar, label: 'Availability', value: 'Associate DevOps / Cloud / Security' },
    { icon: MapPin, label: 'Location', value: 'Matale, Sri Lanka' },
    { icon: GraduationCap, label: 'Education', value: 'BSc (Hons) Computer Science' },
    { icon: ServerCog, label: 'Current Role', value: 'DevOps Intern at Fortude' },
  ];

  const focusAreas = [
    {
      icon: ServerCog,
      title: 'Cloud Infrastructure',
      text: 'Hands-on exposure to AWS, Kubernetes, Docker, GitHub Actions, and deployment workflows.'
    },
    {
      icon: Activity,
      title: 'Observability',
      text: 'Monitoring application health and performance with Grafana dashboards and New Relic telemetry.'
    },
    {
      icon: ShieldCheck,
      title: 'DevSecOps',
      text: 'CI/CD security reviews, hosted runner risk analysis, RFC documentation, and distroless container hardening.'
    }
  ];

  return (
    <section id="about" className="section-padding bg-gray-50 dark:bg-dark-800">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            I am building my career around reliable cloud platforms, secure delivery pipelines, and operational discipline.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold">Candidate Snapshot</h3>
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold">DevOps Profile</h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                I am a DevOps-focused computer science undergraduate and current DevOps intern at Fortude, working with
                cloud infrastructure, containerized applications, CI/CD workflows, monitoring, and reliability practices.
              </p>
              <p>
                My strongest career direction is the intersection of DevOps, security, and cloud. I have reviewed GitHub
                Actions workflows for security risks, documented threats and mitigations, and addressed container security
                issues by moving toward distroless images and reduced attack surface.
              </p>
              <p>
                I also bring a software engineering foundation through React, Node.js, MongoDB, Spring Boot, Laravel, and
                Python projects, which helps me understand what developers need from build, deployment, and runtime systems.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 pt-2">
              {focusAreas.map((area, index) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="p-5 rounded-xl bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-600"
                >
                  <area.icon className="w-7 h-7 text-primary-500 mb-3" />
                  <h4 className="font-semibold mb-2">{area.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{area.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
