import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ArrowDownRight, Copy, Check, Terminal, ArrowDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mascot3D } from './Mascot3D';
import { HeroGeometry3D } from './HeroGeometry3D';
import { useTheme } from '../context/ThemeContext';

export const HeroSection: React.FC = () => {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [visualMode, setVisualMode] = useState<'mascot' | 'geometry'>('mascot');
  const { theme } = useTheme();

  // Scroll Parallax and Fade
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.35]);
  const heroY = useTransform(scrollY, [0, 600], [0, 70]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.97]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % PERSONAL_INFO.taglines.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { x, y },
        colors: [theme.accent, theme.accentLight, '#ffffff'],
        disableForReducedMotion: true,
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-center px-4 sm:px-8 lg:px-14 pt-28 pb-16 overflow-hidden"
    >
      {/* Subtle Radial Theme Glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[380px] blur-[150px] rounded-full pointer-events-none -z-10 transition-all duration-700 opacity-20"
        style={{ backgroundColor: theme.accent }}
      />

      <motion.div
        style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
      >
        {/* Left Column: Bold Cinematic Typography & CTAs (col-span-7) */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* 1. Status Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#030B0D]/80 border border-white/10 backdrop-blur-md mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: theme.accent }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: theme.accent }}
              />
            </span>
            <span
              className="font-mono text-xs tracking-wide"
              style={{ color: theme.accent }}
            >
              DATA ANALYST // AI & ML ENGINEER · OPEN TO OPPORTUNITIES
            </span>
          </motion.div>

          {/* 2. Main Name & Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-4"
          >
            Jai S Ramani
          </motion.h1>

          {/* 3. Animated Tagline Cycler */}
          <div className="h-12 sm:h-14 mb-5 flex items-center">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#E8F1F2]/90 mr-3">
              I build as
            </span>
            <span
              className="relative inline-block min-w-[260px] sm:min-w-[340px] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text transition-all duration-500"
              style={{
                backgroundImage: `linear-gradient(to right, ${theme.accent}, ${theme.accentLight}, #ffffff)`,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={PERSONAL_INFO.taglines[taglineIndex]}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="inline-block"
                >
                  {PERSONAL_INFO.taglines[taglineIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>

          {/* 4. Bio Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-sm sm:text-base text-[#E8F1F2]/75 max-w-xl leading-relaxed mb-8"
          >
            Transforming raw, multi-source datasets into actionable business intelligence using SQL, Python (Pandas, NumPy), Excel, Power BI, and Tableau. Building automated extraction pipelines, time-series forecasting, and high-accuracy neural AI solutions.
          </motion.p>

          {/* 5. Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-wrap items-center gap-3.5"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-mono font-semibold text-xs text-[#030B0D] transition-all active:scale-95 shadow-lg hover:brightness-110"
              style={{
                backgroundColor: theme.accent,
                boxShadow: `0 0 25px ${theme.glow}`,
              }}
            >
              <span>Explore Works</span>
              <ArrowDownRight className="w-4 h-4" />
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-mono text-xs text-[#E8F1F2] bg-[#030B0D]/80 hover:bg-[#030B0D] border border-white/15 hover:border-white/30 backdrop-blur-md transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                  <span style={{ color: theme.accent }}>Copied Email!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#557477]" />
                  <span>{PERSONAL_INFO.email}</span>
                </>
              )}
            </button>

            <a
              href="#lab"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-3 rounded-xl font-mono text-xs text-[#557477] hover:text-[#E8F1F2] transition-colors"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Launch Lab &gt;</span>
            </a>
          </motion.div>
        </div>

        {/* Right Column: 3D Companion Mascot Window + Floating Tech Badges (col-span-5) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="lg:col-span-5 relative"
        >
          {/* Master 3D Card Window */}
          <div
            className="rounded-3xl bg-[#030B0D]/80 border p-2 relative overflow-hidden backdrop-blur-2xl shadow-2xl transition-all"
            style={{
              borderColor: `rgba(${theme.accentRgb}, 0.25)`,
              boxShadow: `0 20px 50px rgba(0,0,0,0.8), 0 0 35px ${theme.glow}`,
            }}
          >
            {/* Window Header Strip with Mode Toggle */}
            <div className="flex items-center justify-between px-3 pt-2 pb-2 border-b border-white/[0.08]">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="font-mono text-[11px] text-[#557477] ml-2">
                  {visualMode === 'mascot' ? 'companion // aero.ai' : 'viewport // geometry.gl'}
                </span>
              </div>

              {/* View Toggle */}
              <div className="flex items-center p-0.5 rounded-lg bg-black/50 border border-white/10 text-[11px] font-mono">
                <button
                  onClick={() => setVisualMode('mascot')}
                  className={`px-2 py-0.5 rounded-md transition-all ${
                    visualMode === 'mascot'
                      ? 'bg-white/20 text-white font-medium shadow-sm'
                      : 'text-[#557477] hover:text-white'
                  }`}
                >
                  🤖 Mascot
                </button>
                <button
                  onClick={() => setVisualMode('geometry')}
                  className={`px-2 py-0.5 rounded-md transition-all ${
                    visualMode === 'geometry'
                      ? 'bg-white/20 text-white font-medium shadow-sm'
                      : 'text-[#557477] hover:text-white'
                  }`}
                >
                  💎 Geometry
                </button>
              </div>
            </div>

            {/* 3D Content */}
            {visualMode === 'mascot' ? <Mascot3D /> : <HeroGeometry3D />}
          </div>
        </motion.div>
      </motion.div>

      {/* Subtle Scroll Down Prompt */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-mono text-[#557477] uppercase tracking-widest">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-[#557477]" />
        </motion.div>
      </div>
    </section>
  );
};
