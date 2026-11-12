import React from 'react';
import { motion } from 'motion/react';
import { Trophy, CheckCircle, ShieldCheck } from 'lucide-react';
import { ACHIEVEMENTS } from '../../data/portfolioData';

export const Accreditations: React.FC = () => {
  return (
    <section id="honors" className="py-24 px-4 sm:px-6 md:px-10 max-w-[1240px] mx-auto">
      {/* Section Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D9C0] uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-[#00D9C0]" />
          Verified Accreditations
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Honors & Certifications
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
          National and conference recognitions for research presentations, applied AI systems, and technical certifications.
        </p>
      </div>

      {/* Accreditations Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ACHIEVEMENTS.map((item, idx) => {
          const isAward = item.category === 'Award';

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col justify-between p-6 rounded-2xl border border-white/[0.08] hover:border-white/[0.2] bg-[#0c0e12]/80 backdrop-blur-xl transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] group"
            >
              <div>
                {/* Badge Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center border ${
                        isAward
                          ? 'border-amber-400/30 bg-amber-400/10 text-amber-400'
                          : 'border-[#00D9C0]/30 bg-[#00D9C0]/10 text-[#00D9C0]'
                      }`}
                    >
                      {isAward ? <Trophy className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                        {item.category}
                      </span>
                      <span className="text-xs font-mono font-semibold text-white/80">
                        {item.issuer}
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-[11px] font-mono text-white/50">
                    {item.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-[#00D9C0] transition-colors mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Verified Pill */}
              <div className="flex items-center justify-between pt-4 mt-6 border-t border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Credential Verified</span>
                </div>
                <span className="text-[10px] font-mono text-white/30">IISc / NPTEL / IEEE CONFERENCES</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
