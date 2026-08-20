import React from 'react';
import { motion } from 'framer-motion';
import { experience } from '../../data/experience';
import { Calendar, ExternalLink, ChevronRight } from 'lucide-react';

const Experience = () => {
  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>05 // PROFESSIONAL HISTORY</span>
          </div>
          <h2 className="heading-lg tracking-tight uppercase text-slate-900 dark:text-white">
            EXPERIENCE &amp; <span className="text-blue-600 dark:text-blue-400">ENGINEERING ROLES</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Practical industry track record delivering CI/CD automation, DevSecOps controls, observability, and cloud infrastructure.
          </p>
        </div>

        {/* Experience Timeline Cards */}
        <div className="space-y-8 relative">
          {/* Vertical Connecting Line */}
          <div className="hidden md:block absolute left-8 top-6 bottom-6 w-px bg-slate-200 dark:bg-slate-800" />

          {experience.map((exp, idx) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative md:pl-20"
            >
              {/* Timeline Node Dot */}
              <div className="hidden md:flex absolute left-6 top-6 w-5 h-5 rounded-full bg-white dark:bg-slate-950 border-2 border-blue-600 dark:border-blue-500 items-center justify-center -translate-x-1/2 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              </div>

              {/* Experience Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800/90 hover:border-blue-400 dark:hover:border-slate-700 transition-all duration-300 space-y-6 shadow-sm dark:shadow-none">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/80 pb-4">
                  <div>
                    <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider block mb-1">
                      {exp.type} • {exp.status.toUpperCase()}
                    </span>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-sm text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5 transition-colors font-medium"
                      >
                        <span>{exp.company}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      </a>
                    </div>
                  </div>

                  <div className="font-mono text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2 bg-slate-100 dark:bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800/80 self-start sm:self-center">
                    <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>{exp.year}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  {exp.description}
                </p>

                {/* Responsibilities list */}
                <div className="space-y-2">
                  <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                    KEY CONTRIBUTIONS &amp; DELIVERABLES
                  </span>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300 font-sans">
                    {exp.responsibilities.map((resp, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies used */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 uppercase mr-1">TECH:</span>
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
