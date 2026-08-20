import React from 'react';
import { motion } from 'framer-motion';

const Observability = () => {
  const metrics = [
    { label: 'SIMULATED UPTIME', value: '99.98%', sub: 'Last 90 Days SLA', status: 'HEALTHY', color: 'text-emerald-400' },
    { label: 'CI/CD RUNS', value: '142+', sub: 'Automated Pipelines', status: 'PASSING', color: 'text-blue-400' },
    { label: 'PIPELINE SUCCESS', value: '98.7%', sub: 'Zero Broken Main', status: 'OPTIMAL', color: 'text-emerald-400' },
    { label: 'P95 RESPONSE TIME', value: '42ms', sub: 'Cluster Gateway', status: 'FAST', color: 'text-cyan-400' },
  ];

  return (
    <section id="telemetry" className="section-padding relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-blue-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>07 // SYSTEM OBSERVABILITY</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="heading-lg tracking-tight uppercase">
                PRODUCTION <span className="text-blue-400">TELEMETRY &amp; METRICS</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-xl">
                Representative dashboard telemetry reflecting Prometheus scraping targets, Grafana metrics, and container health.
              </p>
            </div>
            <span className="font-mono text-[10px] text-slate-500 px-3 py-1 rounded bg-slate-900 border border-slate-800">
              * REPRESENTATIVE SIMULATION
            </span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-slate-500 tracking-wider">{m.label}</span>
                <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {m.status}
                </span>
              </div>
              <div className={`font-display text-3xl sm:text-4xl font-bold ${m.color}`}>
                {m.value}
              </div>
              <p className="font-mono text-xs text-slate-400">{m.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Mock Grafana / Prometheus Panel View */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <span className="text-slate-300 font-bold">GRAFANA // CLUSTER OVERVIEW (K8S-AWS-US-EAST)</span>
            </div>
            <span className="text-slate-500 text-[11px]">SCRAPE INTERVAL: 15s</span>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-slate-500 text-[10px] block">CPU UTILIZATION (AVG)</span>
              <div className="text-xl font-bold text-slate-200">28.4%</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full w-[28%]" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-slate-500 text-[10px] block">MEMORY ALLOCATION</span>
              <div className="text-xl font-bold text-slate-200">4.2 GB / 16 GB</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full w-[35%]" />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-slate-500 text-[10px] block">ORACLE DB IOPS &amp; SYNC</span>
              <div className="text-xl font-bold text-emerald-400">SYNCED (0 LAG)</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full w-[100%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Observability;
