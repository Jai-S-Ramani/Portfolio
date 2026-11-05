import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TECH_STACK } from '../data/portfolioData';
import { Cpu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All');
  const { theme } = useTheme();

  const categories = [
    'All',
    'Databases & Storage',
    'Frameworks & Libraries',
    'Programming Languages',
    'Tools & BI Platforms',
  ];

  const filteredItems =
    activeTab === 'All'
      ? TECH_STACK
      : TECH_STACK.filter((item) => item.category === activeTab);

  return (
    <section id="skills" className="py-24 px-4 sm:px-8 lg:px-14 max-w-6xl mx-auto scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="space-y-10"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-3"
              style={{ color: theme.accent }}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>STACK INVENTORY // PROFICIENCY MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Technical Arsenal
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-[#030B0D]/80 border border-white/10 backdrop-blur-md self-start md:self-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  activeTab === cat
                    ? 'text-[#030B0D] font-bold shadow-md'
                    : 'text-[#557477] hover:text-white'
                }`}
                style={activeTab === cat ? { backgroundColor: theme.accent } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.03 }}
              className="p-5 rounded-2xl bg-[#030B0D]/85 border border-white/[0.08] backdrop-blur-xl shadow-lg space-y-3 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-mono text-sm font-bold text-white tracking-tight">
                    {item.name}
                  </h4>
                  <span className="text-[10px] font-mono text-[#557477]">
                    {item.category}
                  </span>
                </div>
                <span
                  className="font-mono text-xs font-bold"
                  style={{ color: theme.accent }}
                >
                  {item.proficiency}%
                </span>
              </div>

              {/* Progress Track */}
              <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.proficiency}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: theme.accent,
                    boxShadow: `0 0 10px ${theme.glow}`,
                  }}
                />
              </div>

              <p className="text-xs text-[#E8F1F2]/65 leading-relaxed font-sans">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

