import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Activity, Cloud, Code, Database, GitBranch, Lock, ServerCog, Terminal } from 'lucide-react';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillGroups = [
    {
      title: 'DevOps & Infrastructure',
      icon: ServerCog,
      color: 'from-sky-500 to-blue-700',
      skills: ['Docker', 'Kubernetes', 'Argo CD', 'GitHub Actions', 'Ansible', 'GitOps']
    },
    {
      title: 'Cloud Platforms',
      icon: Cloud,
      color: 'from-orange-500 to-amber-600',
      skills: ['AWS', 'Azure', 'Netlify', 'Firebase', 'CloudFormation foundations']
    },
    {
      title: 'Security & DevSecOps',
      icon: Lock,
      color: 'from-red-500 to-rose-700',
      skills: ['CI/CD security', 'Container hardening', 'Distroless images', 'Runner risk review', 'AuthN/AuthZ']
    },
    {
      title: 'Monitoring & Observability',
      icon: Activity,
      color: 'from-emerald-500 to-teal-700',
      skills: ['Grafana', 'Prometheus', 'New Relic', 'Application health', 'Performance bottlenecks']
    },
    {
      title: 'Automation & Workflow',
      icon: Terminal,
      color: 'from-slate-600 to-slate-900',
      skills: ['Bash', 'n8n', 'Release workflows', 'Deployment validation', 'RFC documentation']
    },
    {
      title: 'Version Control',
      icon: GitBranch,
      color: 'from-gray-700 to-black',
      skills: ['Git', 'GitHub', 'Pull requests', 'Repository hygiene', 'Workflow reviews']
    },
    {
      title: 'Programming',
      icon: Code,
      color: 'from-violet-500 to-indigo-700',
      skills: ['JavaScript', 'Java', 'PHP', 'Python', 'Bash', 'TypeScript']
    },
    {
      title: 'App & Data Stack',
      icon: Database,
      color: 'from-cyan-500 to-blue-600',
      skills: ['React', 'Redux', 'Node.js', 'MongoDB', 'Spring Boot', 'Laravel', 'MySQL']
    }
  ];

  const priorities = [
    'Secure CI/CD workflows',
    'Cloud-native deployment',
    'Observability-led troubleshooting',
    'Containerized application delivery'
  ];

  return (
    <section id="skills" className="section-padding bg-gray-50 dark:bg-dark-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-24 left-20 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            DevOps <span className="gradient-text">Skill Stack</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Tooling and practices aligned to associate DevOps, cloud operations, platform support, and DevSecOps roles.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {skillGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="bg-white dark:bg-dark-900 rounded-2xl border border-gray-200 dark:border-dark-700 overflow-hidden shadow-lg"
              >
                <div className={`h-2 bg-gradient-to-r ${group.color}`}></div>
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center mb-5`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{group.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-dark-700 px-3 py-1.5 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
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
          className="grid md:grid-cols-4 gap-4"
        >
          {priorities.map((priority) => (
            <div key={priority} className="p-5 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 text-center">
              <p className="font-semibold text-primary-800 dark:text-primary-200">{priority}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
