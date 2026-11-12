import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, CheckCircle } from 'lucide-react';
import { GithubIcon } from '../BrandIcons';
import { PROJECTS } from '../../data/portfolioData';

export const BentoProjects: React.FC = () => {
  const [activeTabs, setActiveTabs] = useState<{ [key: string]: 'overview' | 'architecture' | 'metrics' }>({
    'price-pilot': 'overview',
    'samyukt': 'overview',
    'presence-iq': 'overview',
  });

  const setTab = (projectId: string, tab: 'overview' | 'architecture' | 'metrics') => {
    setActiveTabs((prev) => ({ ...prev, [projectId]: tab }));
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 md:px-10 max-w-[1240px] mx-auto">
      {/* Section Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D9C0] uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-[#00D9C0]" />
          Production Engineering
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Featured Systems & Architecture
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
          High-performance distributed systems, time-series data pipelines, and applied computer vision models.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project, idx) => {
          const currentTab = activeTabs[project.id] || 'overview';

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col justify-between rounded-2xl border border-white/[0.08] hover:border-white/[0.22] bg-[#0c0e12]/80 backdrop-blur-xl p-6 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] group"
            >
              <div>
                {/* Top Bar: Category & Year */}
                <div className="flex items-center justify-between text-xs font-mono text-white/40 mb-4 pb-3 border-b border-white/[0.06]">
                  <span className="text-[#00D9C0] font-semibold">{project.category}</span>
                  <span>{project.year}</span>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-[#00D9C0] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1 mb-4">
                  {project.tagline}
                </p>

                {/* Micro Tab Selector */}
                <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.02] border border-white/[0.06] mb-5">
                  {(['overview', 'architecture', 'metrics'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setTab(project.id, tab)}
                      className={`flex-1 py-1 text-[11px] font-mono capitalize rounded-md transition-all cursor-pointer ${
                        currentTab === tab
                          ? 'bg-white text-black font-bold shadow-sm'
                          : 'text-white/50 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Dynamic Content */}
                <div className="min-h-[170px] mb-6">
                  {currentTab === 'overview' && (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                        <p className="text-[11px] text-[#00D9C0] font-mono font-medium leading-relaxed">
                          ⚡ Impact: {project.impact}
                        </p>
                      </div>
                    </div>
                  )}

                  {currentTab === 'architecture' && (
                    <div className="space-y-2">
                      {project.architectureNotes?.map((note, nIdx) => (
                        <div key={nIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-[#00D9C0] shrink-0 mt-0.5" />
                          <span className="leading-snug">{note}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {currentTab === 'metrics' && (
                    <div className="grid grid-cols-1 gap-2.5">
                      {project.metrics?.map((metric, mIdx) => (
                        <div
                          key={mIdx}
                          className="flex items-center justify-between p-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02]"
                        >
                          <span className="text-xs font-mono text-white/50">{metric.label}</span>
                          <span className="text-xs font-bold font-mono text-[#00D9C0]">
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Technology Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md border border-white/[0.07] bg-white/[0.02] text-[10px] font-mono text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer: Direct GitHub Link */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-mono text-white hover:text-[#00D9C0] transition-colors group/link cursor-pointer"
                >
                  <GithubIcon className="w-4 h-4 text-white/70 group-hover/link:text-[#00D9C0]" />
                  <span>View Repository</span>
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all" />
                </a>

                <span className="text-[10px] font-mono text-white/30">MIT LICENSE</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
