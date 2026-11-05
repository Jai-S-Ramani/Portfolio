import React from "react";
import { motion } from "motion/react";
import { Award, CheckCircle2, ShieldCheck, Sparkles, Terminal } from "lucide-react";
import { ACHIEVEMENTS } from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";

const categoryIcons: Record<string, typeof Award> = {
  Award: Award,
  Certification: ShieldCheck,
  "Engineering Milestone": Sparkles,
  Competency: CheckCircle2,
};

export const AchievementsSection: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section id="achievements" className="py-24 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-white/5">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span
                className="w-2 h-2 rounded-full animate-ping"
                style={{ backgroundColor: theme.accent }}
              />
              <span
                className="text-xs uppercase tracking-[0.25em] font-mono font-semibold"
                style={{ color: theme.accent }}
              >
                // Milestones & Validations
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Engineering <span className="text-zinc-500">Achievements</span>
            </h2>
          </div>
          <p className="mt-4 sm:mt-0 text-sm text-zinc-400 font-mono flex items-center gap-2">
            <Terminal className="w-4 h-4" style={{ color: theme.accent }} />
            4 verified technical milestones
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ACHIEVEMENTS.map((item, index) => {
            const Icon = categoryIcons[item.category] || Award;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30, filter: 'blur(5px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className="relative group p-6 sm:p-8 rounded-2xl bg-zinc-950/70 border border-white/5 hover:border-white/20 transition-all duration-300"
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at top right, ${theme.accent}, transparent 70%)`
                  }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `rgba(${theme.accentRgb}, 0.15)`,
                        borderColor: `rgba(${theme.accentRgb}, 0.35)`,
                        color: theme.accent
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-mono font-medium border"
                        style={{
                          backgroundColor: `rgba(${theme.accentRgb}, 0.1)`,
                          borderColor: `rgba(${theme.accentRgb}, 0.3)`,
                          color: theme.accent
                        }}
                      >
                        {item.category}
                      </span>
                      <span className="text-xs font-mono text-zinc-500 px-2 py-1 rounded bg-white/5 border border-white/5">
                        {item.year}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p
                    className="text-xs font-mono mb-4 font-medium"
                    style={{ color: theme.accent }}
                  >
                    {item.issuer}
                  </p>

                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
