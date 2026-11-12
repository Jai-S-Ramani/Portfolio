import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Database, Cpu, BarChart3, Code2, Server } from 'lucide-react';
import { TECH_STACK } from '../../data/portfolioData';

export const ArsenalBento: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Databases & Storage',
    'Frameworks & Libraries',
    'Programming Languages',
    'Tools & BI Platforms',
  ];

  const filteredTech =
    selectedCategory === 'All'
      ? TECH_STACK
      : TECH_STACK.filter((t) => t.category === selectedCategory);

  const categoryIcons: { [key: string]: React.ReactNode } = {
    'Databases & Storage': <Database className="w-4 h-4 text-[#00D9C0]" />,
    'Frameworks & Libraries': <Cpu className="w-4 h-4 text-[#4FACFE]" />,
    'Programming Languages': <Code2 className="w-4 h-4 text-emerald-400" />,
    'Tools & BI Platforms': <BarChart3 className="w-4 h-4 text-purple-400" />,
  };

  return (
    <section id="arsenal" className="py-24 px-4 sm:px-6 md:px-10 max-w-[1240px] mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D9C0] uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00D9C0]" />
            Technical Competencies
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            Arsenal & Methodologies
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
            A battle-tested stack honed for data pipelines, predictive AI models, and scalable systems.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {cat === 'All' ? 'All Skills' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTech.map((item, idx) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.03 }}
            className="flex flex-col justify-between p-4 rounded-xl border border-white/[0.07] hover:border-white/[0.18] bg-[#0c0e12]/60 hover:bg-[#0c0e12]/90 backdrop-blur-md transition-all group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {categoryIcons[item.category] || <Server className="w-4 h-4 text-white/50" />}
                  <span className="text-xs font-mono text-white/40">{item.category}</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#00D9C0]">
                  {item.proficiency}%
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-[#00D9C0] transition-colors">
                {item.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Proficiency Meter */}
            <div className="mt-4 pt-3 border-t border-white/[0.05]">
              <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.proficiency}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-[#00D9C0] to-[#4FACFE] rounded-full"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
