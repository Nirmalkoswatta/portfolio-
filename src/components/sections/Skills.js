import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '../../data/skills';
import { Terminal } from 'lucide-react';

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState(skillCategories[0].id);
  const [activeSkill, setActiveSkill] = useState(null);

  const currentCategory = skillCategories.find((c) => c.id === selectedCategory) || skillCategories[0];

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>02 // CAPABILITY MATRIX</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="heading-lg tracking-tight uppercase text-slate-900 dark:text-white">
                DEVOPS <span className="text-blue-600 dark:text-blue-400">COMMAND CENTER</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
                Categorized infrastructure, automation, and platform engineering capabilities with qualitative maturity levels.
              </p>
            </div>

            {/* Qualitative Tier Legend */}
            <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] text-slate-500">
              <span>TIERS:</span>
              <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400">CORE</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">EXPERIENCED</span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400">WORKING</span>
            </div>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {skillCategories.map((cat) => {
            const isSelected = cat.id === selectedCategory;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActiveSkill(null);
                }}
                className={`px-4 py-2 rounded-xl font-mono text-xs tracking-wider uppercase whitespace-nowrap transition-all duration-200 border cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                    : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
                }`}
                data-cursor="CATEGORY"
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Capability Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCategory.skills.map((skill) => {
            const isSelected = activeSkill?.name === skill.name;
            const levelStyle =
              skill.level === 'CORE'
                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30'
                : skill.level === 'EXPERIENCED'
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                : 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30';

            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveSkill(isSelected ? null : skill)}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 border-blue-500 shadow-xl shadow-blue-500/10'
                    : 'bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900/80 shadow-sm'
                }`}
                data-cursor="SKILL"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">{skill.name}</h3>
                    <span className="font-mono text-[10px] text-slate-500 uppercase">{currentCategory.label}</span>
                  </div>
                  <span className={`font-mono text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${levelStyle}`}>
                    {skill.level}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">{skill.description}</p>

                {/* Sub-capabilities tags */}
                <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="font-mono text-[9px] text-slate-400 dark:text-slate-500 uppercase block">CAPABILITIES</span>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.context.map((ctx) => (
                      <span
                        key={ctx}
                        className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 text-slate-700 dark:text-slate-300"
                      >
                        {ctx}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Global Skill Matrix Summary */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/40 border border-slate-200 dark:border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-left">
            <h4 className="font-display font-semibold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Automated Infrastructure Workflow
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl">
              Code committed to GitHub triggers GitHub Actions pipelines, runs SAST security analysis, builds optimized Docker images, provisions AWS via Terraform, and pushes health telemetry to Prometheus &amp; Grafana.
            </p>
          </div>

          <a
            href="#architecture"
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-800 dark:border-slate-700 text-white font-mono text-xs font-semibold whitespace-nowrap transition-colors shadow-sm"
          >
            VIEW ARCHITECTURE →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Skills;
