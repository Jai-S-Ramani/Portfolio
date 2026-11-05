import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { EXPERIENCES } from '../data/portfolioData';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const TimelineSection: React.FC = () => {
  const { theme } = useTheme();
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 70%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="py-24 px-4 sm:px-8 lg:px-14 max-w-6xl mx-auto scroll-mt-20">
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
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC TRAJECTORY // EDUCATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Education & Background
          </h2>
        </div>

        {/* Timeline Tree */}
        <div ref={timelineRef} className="relative ml-4 sm:ml-6 space-y-12">
          {/* Base Inactive Track */}
          <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-white/10" />

          {/* Dynamic Scroll-Activated Laser Beam */}
          <motion.div
            style={{
              scaleY,
              transformOrigin: 'top',
              background: `linear-gradient(180deg, ${theme.accentLight}, ${theme.accent})`,
              boxShadow: `0 0 16px ${theme.glow}`,
            }}
            className="absolute left-0 top-3 bottom-3 w-[2px] z-0"
          />

          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -30, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative pl-6 sm:pl-10 z-10"
            >
              {/* Timeline Node Dot */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0.4 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className="absolute -left-[7px] top-1.5 w-4 h-4 rounded-full border-2 bg-[#030B0D] z-20"
                style={{
                  borderColor: theme.accent,
                  boxShadow: `0 0 14px ${theme.glow}`,
                }}
              />

              <div className="rounded-2xl bg-[#030B0D]/85 border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold font-mono mt-0.5" style={{ color: theme.accent }}>
                      @{exp.company}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-xs text-[#557477]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#E8F1F2]/80 leading-relaxed font-normal">
                  {exp.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#557477]">
                    // Key Academic Highlights & Coursework
                  </div>
                  {exp.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="text-xs text-[#E8F1F2]/75 flex items-start gap-2">
                      <span className="font-mono" style={{ color: theme.accent }}>+</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] text-[#557477] bg-white/[0.03] border border-white/[0.06] px-2.5 py-0.5 rounded"
                    >
                      #{tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

