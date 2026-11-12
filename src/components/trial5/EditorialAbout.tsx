import React from 'react';
import { GraduationCap, ArrowUpRight, Award } from 'lucide-react';
import { useTheme } from './ThemeContext';

export const EditorialAbout: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section 
      id="about" 
      className={`py-16 sm:py-24 px-4 sm:px-6 md:px-10 max-w-[1360px] mx-auto select-none font-sans border-t transition-colors duration-300 ${
        isDark ? 'border-[#1E3325]/80' : 'border-[#C7D4B8]/40'
      }`}
    >
      
      {/* SECTION HEADER */}
      <div className="flex flex-col items-start mb-10 sm:mb-16">
        <span className={`text-xs font-mono uppercase tracking-[0.2em] mb-2 sm:mb-3 ${
          isDark ? 'text-[#34D399]' : 'text-[#858D7A]'
        }`}>
          01 // PHILOSOPHY & BACKGROUND
        </span>
        <h2 className={`text-3xl sm:text-5xl md:text-6xl font-serif tracking-tight ${
          isDark ? 'text-[#F0F4EE]' : 'text-[#242722]'
        }`}>
          A little about <span className={`italic font-normal ${isDark ? 'text-[#34D399]' : 'text-[#141514]'}`}>what I do.</span>
        </h2>
      </div>

      {/* EDITORIAL TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        
        {/* Left Column: Personal Introduction & Technical Philosophy */}
        <div className={`lg:col-span-6 space-y-5 sm:space-y-6 text-sm sm:text-base md:text-lg leading-relaxed ${
          isDark ? 'text-[#A3B899]' : 'text-[#242722]/85'
        }`}>
          <p className={`font-serif italic text-xl sm:text-2xl md:text-3xl leading-snug ${
            isDark ? 'text-[#E8ECE6]' : 'text-[#141514]'
          }`}>
            “Data is not just numbers on a dashboard; it is the blueprint of human behavior, economic patterns, and computational architecture.”
          </p>

          <p>
            I am a B.Tech Artificial Intelligence & Machine Learning engineer based in Bangalore, India, passionate about 
            synthesizing <strong className={isDark ? 'text-[#34D399] font-semibold' : 'text-[#141514] font-semibold'}>analytical rigor</strong>, <strong className={isDark ? 'text-[#34D399] font-semibold' : 'text-[#141514] font-semibold'}>applied machine learning</strong>, and <strong className={isDark ? 'text-[#34D399] font-semibold' : 'text-[#141514] font-semibold'}>clean systems engineering</strong>.
          </p>

          <p>
            Rather than treating AI and analytics as disconnected academic experiments, I focus on end-to-end production pipelines: from autonomous daemon crawlers and multi-source time-series aggregations to AST semantic merge engines and real-time facial biometrics.
          </p>

          <p>
            I believe resilient software starts with disciplined data foundations—containerizing microservices with 100% automated test coverage, maintaining sub-30ms database connection latency, and ensuring every predictive model delivers measurable, reliable business outcomes.
          </p>
        </div>

        {/* Right Column: Education, Technical Interests, Experience & Credentials */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Education Card */}
          <div className={`p-6 rounded-3xl border shadow-sm space-y-3 transition-colors duration-300 ${
            isDark
              ? 'border-[#1E3325] bg-[#0E1712]/90 backdrop-blur-xl'
              : 'border-[#C7D4B8]/60 bg-white/80 backdrop-blur-xl'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-mono uppercase tracking-wider ${
                isDark ? 'text-[#34D399]' : 'text-[#858D7A]'
              }`}>
                ACADEMIC FORMATION
              </span>
              <GraduationCap className={`w-5 h-5 ${isDark ? 'text-[#34D399]' : 'text-[#141514]'}`} />
            </div>

            <div>
              <h3 className={`text-lg font-bold ${isDark ? 'text-[#F0F4EE]' : 'text-[#141514]'}`}>
                Bachelor of Technology (B.Tech)
              </h3>
              <p className={`text-sm font-serif italic ${isDark ? 'text-[#A3B899]' : 'text-[#858D7A]'}`}>
                Artificial Intelligence & Machine Learning (AI & ML)
              </p>
              <p className={`text-xs mt-1 ${isDark ? 'text-[#A3B899]/70' : 'text-[#242722]/70'}`}>
                Bangalore, Karnataka, India · 2023 — Present
              </p>
            </div>

            <p className={`text-xs leading-relaxed pt-2 border-t ${
              isDark ? 'border-[#1E3325] text-[#A3B899]' : 'border-[#C7D4B8]/30 text-[#242722]/80'
            }`}>
              Rigorous coursework in Data Structures & Algorithms, Applied Deep Learning, Database Management Systems, Linear Algebra, and Statistical Machine Learning.
            </p>
          </div>

          {/* Technical Interests Card */}
          <div className={`p-6 rounded-3xl border shadow-sm space-y-3 transition-colors duration-300 ${
            isDark
              ? 'border-[#1E3325] bg-[#0E1712]/90 backdrop-blur-xl'
              : 'border-[#C7D4B8]/60 bg-white/80 backdrop-blur-xl'
          }`}>
            <span className={`text-[11px] font-mono uppercase tracking-wider block ${
              isDark ? 'text-[#34D399]' : 'text-[#858D7A]'
            }`}>
              PRIMARY TECHNICAL DOMAINS
            </span>

            <div className="flex flex-wrap gap-2">
              {[
                'Time-Series Forecasting',
                'Computer Vision & Face Biometrics',
                'SQL Pipeline Optimization',
                'AST Code Analysis & VCS',
                'Autonomous Daemon Workers',
                'Predictive Market Arbitrage',
                'Full-Stack Reactive UI',
                'Docker Multi-Container Topologies',
              ].map((domain) => (
                <span
                  key={domain}
                  className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${
                    isDark
                      ? 'border-[#1E3325] bg-[#14261C] text-[#D2DEC8]'
                      : 'border-[#C7D4B8] bg-[#C7D4B8]/20 text-[#141514]'
                  }`}
                >
                  {domain}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements Summary Pill Card */}
          <div className={`p-6 rounded-3xl border shadow-sm flex items-center justify-between transition-colors duration-300 ${
            isDark
              ? 'border-[#1E3325] bg-gradient-to-r from-[#14261C] to-[#0E1712]/95 backdrop-blur-xl'
              : 'border-[#C7D4B8] bg-gradient-to-r from-[#C7D4B8]/30 to-white/90 backdrop-blur-xl'
          }`}>
            <div className="space-y-1">
              <div className={`flex items-center gap-2 text-xs font-mono uppercase ${
                isDark ? 'text-[#34D399]' : 'text-[#858D7A]'
              }`}>
                <Award className={`w-4 h-4 ${isDark ? 'text-[#34D399]' : 'text-[#141514]'}`} />
                <span>Peer-Reviewed Recognition</span>
              </div>
              <h4 className={`text-sm font-bold ${isDark ? 'text-[#F0F4EE]' : 'text-[#141514]'}`}>
                Smartworld 2025 Best Presentation & BTI Hackathon 1st Prize
              </h4>
            </div>

            <a
              href="#achievements"
              className={`p-3 rounded-full transition-colors ${
                isDark
                  ? 'bg-[#34D399] text-[#07100B] hover:bg-[#6EE7B7]'
                  : 'bg-[#141514] text-[#F5F3E9] hover:bg-[#242722]'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
