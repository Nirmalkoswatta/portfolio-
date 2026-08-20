import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  const categories = ['ALL', 'DevOps / Monitoring', 'Cloud / AWS', 'Full Stack', 'Frontend'];

  const filteredProjects = selectedFilter === 'ALL'
    ? projects
    : projects.filter((p) => p.category.toLowerCase().includes(selectedFilter.toLowerCase()) || p.category === selectedFilter);

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="section-padding relative overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>04 // CASE STUDIES &amp; CODEBASES</span>
          </div>
          <h2 className="heading-lg tracking-tight uppercase text-slate-900 dark:text-white">
            FEATURED <span className="text-blue-600 dark:text-blue-400">ENGINEERING PROJECTS</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Real systems, monitoring platforms, cloud expense optimizers, and full-stack software built with production focus.
          </p>
        </div>

        {/* Featured Case Study 01: CI/CD Monitoring Dashboard */}
        {featuredProjects.slice(0, 1).map((fp) => (
          <div
            key={fp.id}
            className="mb-16 p-8 rounded-3xl bg-gradient-to-br from-white via-slate-50 to-blue-50/50 dark:from-slate-900 dark:via-slate-900/90 dark:to-blue-950/30 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden"
          >
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5 text-left">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/30 uppercase font-semibold">
                    FEATURED CASE STUDY // {fp.number}
                  </span>
                  <span className="font-mono text-xs text-slate-500">{fp.category}</span>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
                  {fp.title}
                </h3>

                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                  {fp.description}
                </p>

                {/* Problem Statement */}
                <div className="p-4 rounded-xl bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800/80 font-mono text-xs space-y-1 shadow-sm">
                  <span className="text-blue-600 dark:text-blue-400 font-bold uppercase block text-[10px]">CHALLENGE ADDRESSED:</span>
                  <p className="text-slate-700 dark:text-slate-300 font-sans">{fp.problem}</p>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-2">
                  {fp.technologies.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-2">
                  {fp.live && (
                    <a
                      href={fp.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors shadow-md"
                      data-cursor="LIVE"
                    >
                      <span>Live Production Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <a
                    href={fp.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white font-mono text-xs transition-colors shadow-sm"
                    data-cursor="GITHUB"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                  </a>
                </div>
              </div>

              {/* Right Side: Visual Architecture Pipeline */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-500">
                  <span>ARCHITECTURE TRACE</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">STATUS: HEALTHY</span>
                </div>

                <div className="space-y-2.5 font-mono text-xs">
                  {fp.architecture?.map((node, i) => (
                    <div key={node} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-md bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-[10px] font-bold">
                        0{i + 1}
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">{node}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-1.5 rounded-full font-mono text-xs transition-all border cursor-pointer ${
                selectedFilter === cat
                  ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="p-6 rounded-2xl bg-white/90 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900/90 transition-all duration-300 flex flex-col justify-between group shadow-sm dark:shadow-none"
              data-cursor="PROJECT"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">{project.number}</span>
                  <span className="font-mono text-[10px] text-slate-500 uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    {project.category}
                  </span>
                </div>

                <h4 className="font-display font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h4>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                  {project.description}
                </p>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="font-mono text-[10px] px-2 py-0.5 text-slate-400 dark:text-slate-500">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Code</span>
                </a>

                {project.live && project.live !== '#' && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors font-semibold"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
