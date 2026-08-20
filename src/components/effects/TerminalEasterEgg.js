import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, CornerDownLeft } from 'lucide-react';
import { projects } from '../../data/projects';
import { skillCategories } from '../../data/skills';
import { experience } from '../../data/experience';

const TerminalEasterEgg = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState([
    { type: 'system', content: 'Nirmal Koswatta CloudOps CLI v2.4.0 (x86_64-aws-linux)' },
    { type: 'system', content: 'Type "help" for a list of available commands.' }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'user', content: `$ ${input}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          content: `Available Commands:
  whoami          - Overview of Nirmal Koswatta
  skills          - List DevOps & Engineering capabilities
  projects        - List featured engineering repositories
  experience      - View professional experience history
  aws             - Show simulated cloud infrastructure status
  status          - Cluster & deployment telemetry
  kubectl get pods- View active microservice pods
  cv              - Direct link to download CV
  contact         - Contact coordinates
  clear           - Clear terminal buffer
  exit            - Close terminal overlay`
        });
        break;

      case 'whoami':
        newHistory.push({
          type: 'output',
          content: `Nirmal Koswatta — Associate DevOps Engineer
Location: Sri Lanka
Focus: AWS, Kubernetes, CI/CD, Terraform, DevSecOps, Observability (Prometheus/Grafana)
Education: BSc (Hons) Computer Science (University of Bedfordshire / SLIIT CityUNI)`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          content: skillCategories.map(cat => `[${cat.label}] ${cat.skills.map(s => `${s.name} (${s.level})`).join(', ')}`).join('\n')
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          content: projects.slice(0, 5).map(p => `• [${p.number}] ${p.title} (${p.category}) -> ${p.github}`).join('\n')
        });
        break;

      case 'experience':
        newHistory.push({
          type: 'output',
          content: experience.map(exp => `• ${exp.role} @ ${exp.company} (${exp.year})\n  Tech: ${exp.technologies.join(', ')}`).join('\n\n')
        });
        break;

      case 'aws':
        newHistory.push({
          type: 'output',
          content: `[AWS US-EAST-1]
• EC2 Instances: 4 Running (t3.medium, t3.large)
• EKS Cluster: 'nk-production-cluster' (v1.28) - Healthy
• S3 Buckets: 6 Managed (Standard-IA lifecycle enabled)
• RDS Postgres: Multi-AZ (Synced, 99.99% Availability)`
        });
        break;

      case 'status':
        newHistory.push({
          type: 'output',
          content: `SYSTEM TELEMETRY:
• Uptime: 99.98%
• Production Deployments: 142
• Pipeline Success Rate: 98.7%
• Average P95 Latency: 42ms
• Security Scans: Passed (0 High / 0 Critical)`
        });
        break;

      case 'kubectl get pods':
        newHistory.push({
          type: 'output',
          content: `NAME                                READY   STATUS    RESTARTS   AGE
cicd-dashboard-7b9f8-x4q2p          1/1     Running   0          4d12h
grafana-core-59df848b5-m9k21        1/1     Running   0          18d
prometheus-server-84f9bc765-lzp09   1/1     Running   0          18d
cloud-optimizer-api-6b74cc48d-n7t5q 1/1     Running   0          2d6h
portfolio-frontend-7965cd74f-k2w89  1/1     Running   0          1h`
        });
        break;

      case 'cv':
        newHistory.push({
          type: 'output',
          content: 'Opening CV in new tab: /Nirmal%20Koswatta%20ADE%20CV.pdf'
        });
        window.open('/Nirmal Koswatta ADE CV.pdf', '_blank');
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          content: `Email: nirmalkoza@gmail.com
LinkedIn: https://www.linkedin.com/in/nirmal-koswatta/
GitHub: https://github.com/Nirmalkoswatta`
        });
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        newHistory.push({
          type: 'error',
          content: `Command not found: "${cmd}". Type "help" for available commands.`
        });
    }

    setHistory(newHistory);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col h-[480px] max-h-[85vh] font-mono text-xs"
        >
          {/* Terminal Window Header */}
          <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-slate-400 font-mono text-xs ml-2 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-blue-400" />
                nirmal@cloudops-node-01:~
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
                aria-label="Close terminal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Terminal Output Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-2 text-slate-300">
            {history.map((item, idx) => (
              <div key={idx} className="leading-relaxed">
                {item.type === 'user' && (
                  <span className="text-emerald-400 font-semibold">{item.content}</span>
                )}
                {item.type === 'system' && (
                  <span className="text-blue-400/90">{item.content}</span>
                )}
                {item.type === 'output' && (
                  <pre className="text-slate-300 whitespace-pre-wrap font-mono mt-0.5">{item.content}</pre>
                )}
                {item.type === 'error' && (
                  <span className="text-rose-400">{item.content}</span>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Terminal Input Line */}
          <form onSubmit={handleCommand} className="p-3 bg-slate-900/60 border-t border-slate-800/80 flex items-center gap-2">
            <span className="text-emerald-400 font-bold">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a command (e.g. 'help', 'skills', 'aws', 'projects')..."
              autoFocus
              className="flex-1 bg-transparent text-slate-100 placeholder-slate-600 focus:outline-none font-mono text-xs"
            />
            <button type="submit" className="text-slate-500 hover:text-blue-400">
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TerminalEasterEgg;
