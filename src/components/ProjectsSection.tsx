import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import type { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { Layers } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [inspectingProject, setInspectingProject] = useState<Project | null>(null);
  const { theme } = useTheme();

  const categories = ['All', 'AI & Data Analytics', 'Systems & Cloud', 'Computer Vision'];

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 px-4 sm:px-8 lg:px-14 max-w-6xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
      >
        <div>
          <div
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-3"
            style={{ color: theme.accent }}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>PORTFOLIO DIRECTORY // SELECTED WORKS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Featured Deployments
          </h2>
          <p className="text-sm sm:text-base text-[#E8F1F2]/75 mt-3 max-w-xl">
            Production price intelligence engines, cloud version control platforms, and edge computer vision architectures.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-[#030B0D]/80 border border-white/10 backdrop-blur-md self-start md:self-end">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? 'text-[#030B0D] font-bold shadow-md'
                  : 'text-[#557477] hover:text-white'
              }`}
              style={selectedCategory === cat ? { backgroundColor: theme.accent } : {}}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid with Staggered Scroll-In (2-Column Grid like Main) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 35, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectCard
              project={project}
              onInspect={(p) => setInspectingProject(p)}
            />
          </motion.div>
        ))}
      </div>

      {/* Inspect Modal */}
      <ProjectModal
        project={inspectingProject}
        onClose={() => setInspectingProject(null)}
      />
    </section>
  );
};

