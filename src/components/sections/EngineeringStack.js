import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Box, Server, Activity, ShieldCheck, CheckCircle } from 'lucide-react';

const pipelineSteps = [
  {
    id: 'code',
    num: '01',
    title: 'CODE & COMMIT',
    icon: GitBranch,
    tool: 'Git / GitHub',
    desc: 'Developer pushes code; triggers automated webhook',
  },
  {
    id: 'ci',
    num: '02',
    title: 'CI / BUILD & TEST',
    icon: Box,
    tool: 'GitHub Actions',
    desc: 'Automated matrix build, unit test execution & linting',
  },
  {
    id: 'sec',
    num: '03',
    title: 'DEVSECOPS SCAN',
    icon: ShieldCheck,
    tool: 'SAST / DAST',
    desc: 'Static code security check, secret & CVE detection',
  },
  {
    id: 'container',
    num: '04',
    title: 'CONTAINERIZE',
    icon: Server,
    tool: 'Docker / ECR',
    desc: 'Multi-stage build & registry push with semantic tagging',
  },
  {
    id: 'deploy',
    num: '05',
    title: 'IAC & DEPLOY',
    icon: Server,
    tool: 'Terraform / Coolify',
    desc: 'Infrastructure provisioning & zero-downtime rollout',
  },
  {
    id: 'observe',
    num: '06',
    title: 'OBSERVE & ALERT',
    icon: Activity,
    tool: 'Grafana / Prometheus',
    desc: 'Real-time telemetry, error tracking & Slack alerts',
  },
];

const EngineeringStack = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % pipelineSteps.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="architecture" className="section-padding relative overflow-hidden bg-slate-950/40 border-y border-slate-900">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-blue-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>03 // LIVE PIPELINE VISUALIZATION</span>
          </div>
          <h2 className="heading-lg tracking-tight uppercase">
            END-TO-END <span className="text-blue-400">ENGINEERING STACK</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-2xl">
            A visual trace of how code flows from developer commits into production infrastructure through automated CI/CD, security guardrails, and real-time observability.
          </p>
        </div>

        {/* Interactive Pipeline Sequence */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4 relative">
          {pipelineSteps.map((step, idx) => {
            const isActive = activeStep === idx;
            const isCompleted = activeStep > idx;

            return (
              <motion.div
                key={step.id}
                onClick={() => setActiveStep(idx)}
                whileHover={{ y: -4 }}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative ${
                  isActive
                    ? 'bg-slate-900 border-blue-500 shadow-xl shadow-blue-500/15'
                    : isCompleted
                    ? 'bg-slate-900/60 border-slate-800/80'
                    : 'bg-slate-900/40 border-slate-900'
                }`}
              >
                {/* Step number and status */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-slate-500">{step.num}</span>
                  {isActive ? (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                    </span>
                  ) : isCompleted ? (
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-slate-800" />
                  )}
                </div>

                {/* Icon */}
                <div className={`p-2.5 rounded-xl w-fit mb-3 ${isActive ? 'bg-blue-500/10 text-blue-400' : 'bg-slate-800/60 text-slate-400'}`}>
                  <step.icon className="w-5 h-5" />
                </div>

                <h3 className="font-display font-bold text-xs text-white uppercase tracking-tight mb-1">
                  {step.title}
                </h3>
                <span className="font-mono text-[10px] text-blue-400 block mb-2">{step.tool}</span>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Live Packet Simulation Bar */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px]">
              STATUS: PASSING
            </span>
            <span className="text-slate-300">
              Active Stage: <strong className="text-blue-400">{pipelineSteps[activeStep].title}</strong> ({pipelineSteps[activeStep].tool})
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-500 text-[11px]">
            <span>Trigger: push:main</span>
            <span>Runner: ubuntu-latest</span>
            <span>Duration: ~42s</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngineeringStack;
