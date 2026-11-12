import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, CheckCircle2 } from 'lucide-react';
import { ACHIEVEMENTS } from '../../data/portfolioData';
import { useTheme } from './ThemeContext';

export const EditorialAchievements: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <section 
      id="achievements" 
      className={`py-24 px-4 sm:px-6 md:px-10 max-w-[1360px] mx-auto select-none font-sans border-t transition-colors duration-300 ${
        isDark ? 'border-[#1E3325]/80' : 'border-[#C7D4B8]/40'
      }`}
    >
      
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
        <div>
          <span className={`text-xs font-mono uppercase tracking-[0.2em] mb-3 block ${
            isDark ? 'text-[#34D399]' : 'text-[#858D7A]'
          }`}>
            04 // PEER RECOGNITION
          </span>
          <h2 className={`text-4xl sm:text-6xl font-serif tracking-tight ${
            isDark ? 'text-[#F0F4EE]' : 'text-[#242722]'
          }`}>
            Honors & <span className={`italic font-normal ${isDark ? 'text-[#34D399]' : 'text-[#141514]'}`}>accolades.</span>
          </h2>
        </div>

        <p className={`text-sm max-w-md font-normal leading-relaxed ${
          isDark ? 'text-[#A3B899]' : 'text-[#858D7A]'
        }`}>
          Peer-reviewed awards, conference presentations, and certified technical benchmarks earned through rigorous engineering.
        </p>
      </div>

      {/* HORIZONTAL ACHIEVEMENT TIMELINE & CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACHIEVEMENTS.map((item, index) => {
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`p-6 sm:p-8 rounded-[32px] border transition-all flex flex-col justify-between space-y-6 active:scale-[0.99] ${
                isDark
                  ? 'border-[#1E3325] bg-gradient-to-br from-[#0E1712]/95 to-[#080E0A]/90 shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:border-[#34D399]/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]'
                  : 'border-[#C7D4B8]/70 bg-gradient-to-br from-white/95 to-[#F5F3E9]/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(20,21,20,0.05)] hover:shadow-[0_20px_50px_rgba(20,21,20,0.08)]'
              }`}
            >
              <div>
                {/* Card Top: Year & Gold Accent Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[11px] font-mono font-bold tracking-widest px-3 py-1 rounded-full border uppercase ${
                    isDark
                      ? 'border-[#1E3325] bg-[#14261C] text-[#34D399]'
                      : 'border-[#C7D4B8] bg-[#C7D4B8]/30 text-[#141514]'
                  }`}>
                    {item.category} · {item.year}
                  </span>

                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shadow-sm ${
                    isDark ? 'bg-[#14261C] text-[#34D399]' : 'bg-[#141514] text-[#F5F3E9]'
                  }`}>
                    {index === 0 ? (
                      <Trophy className="w-4 h-4 text-amber-300" />
                    ) : (
                      <Medal className="w-4 h-4 text-amber-300" />
                    )}
                  </div>
                </div>

                <h3 className={`text-xl font-serif font-bold leading-snug mb-2 ${
                  isDark ? 'text-[#F0F4EE]' : 'text-[#141514]'
                }`}>
                  {item.title}
                </h3>

                <p className={`text-xs font-mono mb-4 ${
                  isDark ? 'text-[#85998A]' : 'text-[#858D7A]'
                }`}>
                  {item.issuer}
                </p>

                <p className={`text-xs sm:text-sm leading-relaxed ${
                  isDark ? 'text-[#A3B899]' : 'text-[#242722]/80'
                }`}>
                  {item.description}
                </p>
              </div>

              {/* Bottom Verification Note */}
              <div className={`pt-4 border-t flex items-center gap-2 text-xs font-mono font-semibold ${
                isDark ? 'border-[#1E3325] text-[#34D399]' : 'border-[#C7D4B8]/30 text-[#141514]'
              }`}>
                <CheckCircle2 className={`w-4 h-4 ${isDark ? 'text-[#34D399]' : 'text-emerald-700'}`} />
                <span>Verified Academic Milestone</span>
              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
};
