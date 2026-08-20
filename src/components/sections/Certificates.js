import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

const certificates = [
  {
    title: 'AWS DevOps Best Practices for Beginners',
    issuer: 'LinkedIn Learning',
    date: '2025',
    downloadUrl: '/CertificateOfCompletion_AWS DevOps Best Practices for Beginners.pdf',
    skills: ['AWS DevOps', 'Cloud Operations', 'Deployment Automation', 'Reliability'],
    credentialId: 'LI-AWS-DEVOPS-2025',
    category: 'Cloud / DevOps',
  },
  {
    title: 'DevOps Foundations',
    issuer: 'LinkedIn Learning',
    date: '2025',
    downloadUrl: '/CertificateOfCompletion_DevOps Foundations.pdf',
    skills: ['DevOps Culture', 'Automation', 'Continuous Delivery', 'Operations'],
    credentialId: 'LI-DEVOPS-FOUNDATIONS-2025',
    category: 'DevOps',
  },
  {
    title: 'DevOps Foundations: Containers',
    issuer: 'LinkedIn Learning',
    date: '2025',
    downloadUrl: '/CertificateOfCompletion_DevOps Foundations Containers.pdf',
    skills: ['Containers', 'Docker', 'Image Delivery', 'Runtime Isolation'],
    credentialId: 'LI-CONTAINERS-2025',
    category: 'Containers',
  },
  {
    title: 'DevOps Foundations: Continuous Delivery / CI',
    issuer: 'LinkedIn Learning',
    date: '2025',
    downloadUrl: '/CertificateOfCompletion_DevOps Foundations Continuous DeliveryContinuous Integration.pdf',
    skills: ['CI/CD Pipelines', 'Automated Testing', 'Deployment Strategies'],
    credentialId: 'LI-CD-CI-2025',
    category: 'CI/CD',
  },
  {
    title: 'Ethical Hacking: SQL Injection',
    issuer: 'LinkedIn Learning',
    date: '2025',
    downloadUrl: '/CertificateOfCompletion_Ethical Hacking SQL Injection.pdf',
    skills: ['SQL Injection', 'Ethical Hacking', 'Application Security'],
    credentialId: 'LI-SQLI-2025',
    category: 'Security',
  },
  {
    title: 'Introduction to AWS CloudFormation',
    issuer: 'AWS Training',
    date: '2025',
    downloadUrl: '/CertificateOfCompletion_AWS DevOps Best Practices for Beginners.pdf',
    skills: ['AWS', 'CloudFormation', 'Infrastructure as Code'],
    credentialId: 'AWS-CF-2025-001',
    category: 'Cloud / IaC',
  },
  {
    title: 'CISCO Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: '2025',
    downloadUrl: '/CertificateOfCompletion_DevOps Foundations.pdf',
    skills: ['Cybersecurity', 'Network Security', 'Threat Analysis'],
    credentialId: 'CISCO-CYB-2025-001',
    category: 'Security',
  },
  {
    title: 'Introduction to IoT and Digital Transformation',
    issuer: 'Cisco Networking Academy',
    date: '2025',
    downloadUrl: '/CertificateOfCompletion_DevOps Foundations.pdf',
    skills: ['IoT', 'Connected Devices', 'Industry 4.0'],
    credentialId: 'CISCO-IOT-2025-002',
    category: 'IoT',
  },
];

const Certificates = () => {
  return (
    <section id="certificates" className="section-padding relative overflow-hidden bg-slate-100/50 dark:bg-slate-950/30">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>06 // CREDENTIALS &amp; CERTIFICATIONS</span>
          </div>
          <h2 className="heading-lg tracking-tight uppercase text-slate-900 dark:text-white">
            VERIFICATION <span className="text-blue-600 dark:text-blue-400">WALL</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Formal professional training and certifications across Cloud, DevOps, Containers, and Cybersecurity.
          </p>
        </div>

        {/* Verification Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {certificates.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between shadow-sm dark:shadow-none"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 uppercase font-semibold">
                    {cert.category}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">{cert.date}</span>
                </div>

                <h3 className="font-display font-semibold text-sm text-slate-900 dark:text-white leading-snug">
                  {cert.title}
                </h3>

                <p className="font-mono text-xs text-slate-600 dark:text-slate-400">{cert.issuer}</p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {cert.skills.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80">
                <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">{cert.credentialId}</span>
                <a
                  href={cert.downloadUrl}
                  download
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 text-slate-600 dark:text-slate-300 hover:text-white transition-colors"
                  title="Download Certificate PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
