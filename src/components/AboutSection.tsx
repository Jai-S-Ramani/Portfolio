import React from 'react';
import { motion } from 'motion/react';
import { PERSONAL_INFO, SPOKEN_LANGUAGES } from '../data/portfolioData';
import { User, Terminal, Database, ShieldCheck, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const AboutSection: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section id="about" className="py-24 px-4 sm:px-8 lg:px-14 max-w-6xl mx-auto scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="space-y-12"
      >
        {/* Header */}
        <div>
          <div
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-3"
            style={{ color: theme.accent }}
          >
            <User className="w-3.5 h-3.5" />
            <span>EXECUTIVE SUMMARY // ENGINEERING PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            About The Engineer
          </h2>
        </div>

        {/* 2-Column Overview Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Statement Box (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-2xl bg-[#030B0D]/85 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-5"
          >
            <div className="flex items-center gap-2 font-mono text-xs text-[#557477]">
              <Terminal className="w-3.5 h-3.5" style={{ color: theme.accent }} />
              <span>CANDIDATE // CORE_SUMMARY.md</span>
            </div>

            <p className="text-sm sm:text-base text-[#E8F1F2]/90 leading-relaxed font-normal">
              {PERSONAL_INFO.bio}
            </p>

            <div className="pt-4 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="text-[10px] text-[#557477]">LOCATION</div>
                <div className="font-semibold text-white mt-1">{PERSONAL_INFO.location}</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="text-[10px] text-[#557477]">DEGREE SPEC</div>
                <div className="font-semibold text-white mt-1">AI & Machine Learning</div>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="text-[10px] text-[#557477]">STATUS</div>
                <div className="font-semibold mt-1" style={{ color: theme.accent }}>
                  Ready to Deploy
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pillars & Multilingual Languages (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Core Capability Pillars */}
            <div className="rounded-2xl bg-[#030B0D]/85 border border-white/10 p-6 backdrop-blur-xl shadow-xl space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-[#557477]">
                Core Competency Vectors
              </div>

              <div className="flex items-start gap-3">
                <Database className="w-4 h-4 shrink-0 mt-1" style={{ color: theme.accent }} />
                <div>
                  <div className="text-xs font-bold text-white font-mono">
                    Time-Series & Volatility Modeling
                  </div>
                  <div className="text-xs text-[#E8F1F2]/70 mt-0.5">
                    Multi-region pricing normalization, 30-day moving averages, and automated signal dispatch.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-1" style={{ color: theme.accent }} />
                <div>
                  <div className="text-xs font-bold text-white font-mono">
                    High-Assurance Testing & CI/CD
                  </div>
                  <div className="text-xs text-[#E8F1F2]/70 mt-0.5">
                    100% pass rates across 59 automated pytest suites, Supertest specs, and Playwright E2E flows.
                  </div>
                </div>
              </div>
            </div>

            {/* Multilingual Fluency */}
            <div className="rounded-2xl bg-[#030B0D]/85 border border-white/10 p-6 backdrop-blur-xl shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#557477]">
                <Globe className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                <span>Multilingual Fluency (4 Languages)</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {SPOKEN_LANGUAGES.map((lang) => (
                  <div
                    key={lang.language}
                    className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between"
                  >
                    <span className="font-mono text-xs font-semibold text-white">
                      {lang.language}
                    </span>
                    <span className="font-mono text-[10px] text-[#557477]">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

