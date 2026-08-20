import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import { FaReact, FaPython, FaDocker, FaServer, FaShieldAlt } from 'react-icons/fa';
import { SiGrafana, SiPrometheus, SiTerraform, SiGithubactions, SiOracle } from 'react-icons/si';
import { Cpu, Rocket } from 'lucide-react';

const Skills = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Unified skills data with official icons, hex colors, and detailed descriptions
  const skillsData = [
    { name: 'Grafana', icon: SiGrafana, color: '#F46800', category: 'Monitoring & Observability', description: 'Designing real-time interactive dashboards, alert management, and metric visualization across cloud infrastructure and microservices.' },
    { name: 'Prometheus', icon: SiPrometheus, color: '#E6522C', category: 'Monitoring & Metrics', description: 'Time-series metric collection, target discovery, custom alert rules, and system health monitoring.' },
    { name: 'Terraform', icon: SiTerraform, color: '#844FBA', category: 'Infrastructure as Code', description: 'Declarative IaC provisioning, multi-environment infrastructure state management, and cloud resource automation.' },
    { name: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF', category: 'CI/CD Automation', description: 'Building end-to-end continuous integration and delivery pipelines, matrix testing, and automated release deployment.' },
    { name: 'Coolify', icon: FaServer, color: '#6366F1', category: 'PaaS & Deployment', description: 'Self-hosted PaaS management, automated application staging, containerized deployments, and server orchestration.' },
    { name: 'Oracle DB', icon: SiOracle, color: '#F80000', category: 'Database Management', description: 'Enterprise relational database administration, query optimization, schema migrations, and high-availability database setups.' },
    { name: 'DevSecOps', icon: FaShieldAlt, color: '#10B981', category: 'Security & Automation', description: 'Embedding SAST/DAST, dependency auditing, secret detection, and automated security gates into CI/CD pipelines.' },
    { name: 'Docker', icon: FaDocker, color: '#2496ED', category: 'Containerization', description: 'Container runtime management, multi-stage builds, microservice isolation, and Docker Compose orchestration.' },
    { name: 'CI/CD Pipelines', icon: Rocket, color: '#EC4899', category: 'DevOps', description: 'Automating build, test, scan, and release cycles to achieve continuous deployment with zero downtime.' },
    { name: 'AWS Cloud', icon: Cpu, color: '#FF9900', category: 'Cloud Infrastructure', description: 'Cloud infrastructure management, EC2, S3, RDS, IAM policies, and cloud cost optimization.' },
    { name: 'React', icon: FaReact, color: '#61DAFB', category: 'Frontend Engineering', description: 'Building modern responsive web interfaces with React hooks, state management, and SPA architecture.' },
    { name: 'Python', icon: FaPython, color: '#3776AB', category: 'Backend & Scripting', description: 'Automation scripting, backend web APIs, data processing, and DevOps automation scripts.' },
  ];

  return (
  <section id="skills" className="section-padding bg-gray-50 dark:bg-dark-800 relative z-20 overflow-visible" style={{ scrollMarginTop: '88px' }}>
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container-custom relative z-30">
        {/* Header */}
  <ScrollReveal className="text-center mb-16" amount={0.15} delay={0}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="gradient-text">Skills & Expertise</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Click on any skill card to see detailed information about my expertise and experience level.
          </p>
  </ScrollReveal>

        {/* Skills Grid */}
        <ScrollReveal amount={0.12} delay={0.1} className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {skillsData.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSkill(skill)}
                  className="group relative cursor-pointer"
                >
                  <div className={`p-6 rounded-2xl text-white transform transition-all duration-300 shadow-lg hover:shadow-2xl`} style={{ background: skill.color }}>
                    <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{skill.name}</h3>
                    <p className="text-white/80 text-sm">{skill.category}</p>
                    <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl scale-110 transition-all duration-300 -z-10`} style={{ background: skill.color }}></div>
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
  </ScrollReveal>

        {/* Selected Skill Details */}
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-16"
          >
            <div className="max-w-2xl mx-auto glass-effect rounded-3xl p-8 border border-white/20 backdrop-blur-lg bg-white/80 dark:bg-dark-800/80">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg`} style={{ background: selectedSkill.color }}>
                  <selectedSkill.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    {selectedSkill.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {selectedSkill.category}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
                {selectedSkill.description}
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-dark-700 dark:hover:bg-dark-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl transition-colors duration-200"
                >
                  Close
                </button>
                <button
                  onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
                  className="flex-1 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg"
                >
                  Let's Work Together
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Additional Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            <span className="gradient-text">Learning & Exploring</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Kubernetes', icon: '⚙️', color: 'from-blue-600 to-indigo-700' },
              { name: 'Cloud Security', icon: '🔒', color: 'from-emerald-500 to-teal-700' },
              { name: 'Ansible', icon: '🛠️', color: 'from-red-500 to-red-700' },
              { name: 'GitLab CI', icon: '🦊', color: 'from-orange-500 to-amber-600' },
              { name: 'Linux Admin', icon: '🐧', color: 'from-slate-600 to-slate-800' },
              { name: 'ArgoCD', icon: '🐙', color: 'from-cyan-500 to-blue-600' },
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative"
              >
                <div className={`p-6 rounded-2xl bg-gradient-to-br ${skill.color} text-white text-center transform transition-all duration-300 shadow-lg hover:shadow-xl`}>
                  <div className="text-3xl mb-3">{skill.icon}</div>
                  <h4 className="font-semibold text-sm">{skill.name}</h4>
                  
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-20 blur-xl scale-110 transition-all duration-300 -z-10`}></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <div className="glass-effect rounded-3xl p-12 border border-white/20 backdrop-blur-lg max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              With this diverse skill set spanning frontend, backend, and emerging technologies, 
              I'm ready to tackle any challenge and bring your ideas to life.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              Let's Collaborate
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 