import React from 'react';
import { motion } from 'framer-motion';
import { Server, Shield, Cpu, Cloud, MapPin, GraduationCap, Briefcase, CheckCircle2 } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: Cloud,
      title: 'Cloud Infrastructure & AWS',
      desc: 'Provisioning secure, cost-optimized cloud environments with EC2, S3, RDS, IAM, VPC, and CloudFormation.',
    },
    {
      icon: Cpu,
      title: 'Containerization & Orchestration',
      desc: 'Docker multi-stage container builds, microservice packaging, and Kubernetes workload management.',
    },
    {
      icon: Server,
      title: 'CI/CD & Infrastructure as Code',
      desc: 'Automating release pipelines using GitHub Actions, Coolify, and declarative Terraform configurations.',
    },
    {
      icon: Shield,
      title: 'DevSecOps & Observability',
      desc: 'Shifting security left with automated SAST/DAST scanning, plus proactive monitoring via Prometheus & Grafana.',
    },
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>01 // SYSTEM ENGINEER PROFILE</span>
          </div>
          <h2 className="heading-lg tracking-tight uppercase text-slate-900 dark:text-white">
            ENGINEERING <span className="text-blue-600 dark:text-blue-400">MINDSET</span>
          </h2>
        </div>

        {/* Split Editorial Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Narrative Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed font-sans"
          >
            <p className="text-base sm:text-lg text-slate-900 dark:text-slate-200 font-medium">
              I am an Associate DevOps Engineer passionate about bridging the gap between software development, scalable infrastructure, and rock-solid production reliability.
            </p>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              My engineering philosophy revolves around <strong>automation first</strong>, <strong>reproducible infrastructure</strong>, and <strong>continuous security</strong>. Whether building declarative IaC scripts with Terraform, deploying containerized microservices to Kubernetes clusters, or configuring Prometheus exporters with Grafana alert dashboards, I focus on engineering systems that are resilient, observable, and automated end-to-end.
            </p>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              With hands-on experience at <strong>Zuse Technologies</strong> (Junior DevOps Engineer) and <strong>Fortude</strong> (Intern DevSecOps Engineer), I have engineered CI/CD pipelines, integrated SAST/DAST vulnerability scanners, managed enterprise Oracle databases, and deployed cloud resources on AWS.
            </p>

            {/* Core Capability Badges Grid */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-blue-400 dark:hover:border-slate-700 transition-colors space-y-2 shadow-sm dark:shadow-none"
                >
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <item.icon className="w-4 h-4" />
                    <h3 className="font-display font-semibold text-sm text-slate-900 dark:text-slate-100">{item.title}</h3>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Engineering Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-xl space-y-6"
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700">
                  <img
                    src="/profile123.jpg"
                    alt="Nirmal Koswatta"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">Nirmal Koswatta</h3>
                  <p className="font-mono text-xs text-blue-600 dark:text-blue-400">Associate DevOps Engineer</p>
                </div>
              </div>
              <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ACTIVE
              </span>
            </div>

            {/* Quick Metadata List */}
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-slate-400 dark:text-slate-500 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Location</span>
                  <span>Sri Lanka (Available for Remote / Hybrid / On-site)</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <GraduationCap className="w-4 h-4 text-slate-400 dark:text-slate-500 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Education</span>
                  <span>BSc (Hons) Computer Science</span>
                  <span className="text-slate-500 dark:text-slate-400 block text-[11px]">University of Bedfordshire / SLIIT CityUNI</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <Briefcase className="w-4 h-4 text-slate-400 dark:text-slate-500 mt-0.5" />
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase">Current Engagement</span>
                  <span>Junior DevOps Engineer @ Zuse Technologies</span>
                </div>
              </div>
            </div>

            {/* Engineering Values */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider block">
                CORE PRINCIPLES
              </span>
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-mono">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Infrastructure as Code over Manual Config</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Zero-Trust Shift-Left Security in CI/CD</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Comprehensive Metrics, Logs &amp; Alerting</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
