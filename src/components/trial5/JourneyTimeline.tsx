import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin } from 'lucide-react';
import { EXPERIENCES } from '../../data/portfolioData';

export const JourneyTimeline: React.FC = () => {
  return (
    <section id="journey" className="py-24 px-4 sm:px-6 md:px-10 max-w-[1240px] mx-auto">
      {/* Section Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D9C0] uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-[#00D9C0]" />
          Academic & Technical Foundations
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Journey & Education
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-xl">
          Formal engineering background in Artificial Intelligence, Machine Learning, and Discrete Mathematics.
        </p>
      </div>

      {/* Vertical Rail */}
      <div className="relative border-l border-white/[0.1] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
        {EXPERIENCES.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="relative group"
          >
            {/* Glowing Rail Dot */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#090A0C] border-2 border-[#00D9C0] group-hover:bg-[#00D9C0] transition-colors shadow-[0_0_12px_rgba(0,217,192,0.6)]" />

            {/* Content Card */}
            <div className="p-6 rounded-2xl border border-white/[0.08] hover:border-white/[0.18] bg-[#0c0e12]/80 backdrop-blur-xl transition-all">
              {/* Meta Strip */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-[#00D9C0]">
                  <Calendar className="w-3 h-3" />
                  {exp.period}
                </span>

                <span className="inline-flex items-center gap-1.5 text-xs font-mono text-white/40">
                  <MapPin className="w-3 h-3" />
                  {exp.location}
                </span>
              </div>

              {/* Title & Organization */}
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                {exp.role}
              </h3>
              <p className="text-sm font-mono text-slate-300 mt-0.5">
                {exp.company}
              </p>

              <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed">
                {exp.description}
              </p>

              {/* Highlights List */}
              <div className="mt-4 space-y-2">
                {exp.highlights.map((item, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-[#00D9C0] font-mono mt-0.5">➔</span>
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-white/[0.06]">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md border border-white/[0.06] bg-white/[0.02] text-[10px] font-mono text-white/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
