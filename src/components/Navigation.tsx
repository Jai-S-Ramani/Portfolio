import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { Home, Briefcase, User, Cpu, Sparkles, Mail, FileText, Menu, X, ArrowUpRight, Award, Command } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface NavigationProps {
  activeSection: string;
  onOpenCommandPalette: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onOpenCommandPalette,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const { theme } = useTheme();

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setScrollPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  const navItems = [
    { id: 'hero', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'projects', label: 'Work', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <User className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills', icon: <Cpu className="w-4 h-4" /> },
    { id: 'lab', label: 'The Lab', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'experience', label: 'Trajectory', icon: <FileText className="w-4 h-4" /> },
    { id: 'achievements', label: 'Honors', icon: <Award className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      {/* 1. Top Bar: Minimal Logo (Top-Left), Command Palette, Theme, Contact CTA (Top-Right) */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 lg:px-12 py-4 flex items-center justify-between pointer-events-none">
        {/* Top-Left: Minimal Monogram Logo */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, 'hero')}
          className="pointer-events-auto flex items-center gap-3 group"
        >
          <div
            className="w-10 h-10 rounded-xl bg-[#030B0D]/85 border backdrop-blur-md flex items-center justify-center font-mono font-bold text-sm transition-all group-hover:scale-105"
            style={{
              color: theme.accent,
              borderColor: `rgba(${theme.accentRgb}, 0.35)`,
              boxShadow: `0 0 15px ${theme.glow}`,
            }}
          >
            JR
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-sm tracking-tight text-[#E8F1F2] group-hover:text-white transition-colors">
              {PERSONAL_INFO.name}
            </span>
            <span className="font-mono text-[10px] text-[#557477]">
              Data Analyst & AI/ML
            </span>
          </div>
        </a>

        {/* Top-Right: Actions (Command Palette, Theme Switcher, Contact CTA, Resume) */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#030B0D]/80 hover:bg-[#030B0D] border border-white/10 hover:border-white/25 text-xs font-mono text-[#557477] hover:text-[#E8F1F2] backdrop-blur-md transition-all active:scale-95"
            title="Open Command Palette (⌘K)"
          >
            <Command className="w-3.5 h-3.5 text-[#E8F1F2]" />
            <span className="hidden md:inline">Command</span>
            <kbd className="px-1 py-0.5 rounded bg-white/10 text-[10px] text-white/70">
              ⌘K
            </kbd>
          </button>

          {/* Contact Button */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-[#030B0D] transition-all active:scale-95 shadow-md hover:brightness-110"
            style={{
              backgroundColor: theme.accent,
              boxShadow: `0 0 20px ${theme.glow}`,
            }}
          >
            <span>Initiate Contact</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Resume link */}
          <a
            href={PERSONAL_INFO.resume}
            target="_blank"
            rel="noreferrer"
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-[#E8F1F2] bg-[#030B0D]/80 border border-white/10 hover:border-white/30 transition-all backdrop-blur-md"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-[#030B0D]/85 border border-white/15 text-[#E8F1F2] hover:text-white backdrop-blur-md transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* 2. Desktop Left-Side Floating Vertical Navigation Capsule Dock */}
      <motion.aside
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed left-3 sm:left-5 lg:left-7 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center pointer-events-auto"
      >
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2.5 p-2 rounded-full bg-[#030B0D]/85 border backdrop-blur-2xl shadow-2xl transition-colors"
          style={{
            borderColor: `rgba(${theme.accentRgb}, 0.28)`,
            boxShadow: `0 12px 40px rgba(0,0,0,0.8), 0 0 25px ${theme.glow}`,
          }}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`group relative p-2.5 rounded-full transition-all duration-200 flex items-center justify-center ${
                  isActive ? 'text-[#030B0D]' : 'text-[#557477] hover:text-white hover:bg-white/10'
                }`}
                aria-label={item.label}
              >
                {/* Active Fluid Spring Pill */}
                {isActive && (
                  <motion.div
                    layoutId="active-floating-dock-pill"
                    className="absolute inset-0 rounded-full shadow-lg"
                    style={{
                      backgroundColor: theme.accent,
                      boxShadow: `0 0 16px ${theme.glow}`,
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <span className="relative z-10">{item.icon}</span>

                {/* Cyberpunk Tooltip */}
                <span
                  className="pointer-events-none absolute left-full ml-3 px-2.5 py-1 rounded-md bg-[#030B0D]/95 border text-[#E8F1F2] font-mono text-[11px] whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 shadow-2xl flex items-center gap-1.5"
                  style={{ borderColor: `rgba(${theme.accentRgb}, 0.4)` }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: theme.accent }}
                  />
                  <span>{item.label}</span>
                </span>
              </a>
            );
          })}

          <div className="w-4 h-[1px] bg-white/15 my-0.5" />

          {/* Direct Resume Link */}
          <a
            href={PERSONAL_INFO.resume}
            target="_blank"
            rel="noreferrer"
            className="group relative p-2.5 rounded-full text-[#FF8A30] hover:bg-[#FF8A30]/15 transition-colors flex items-center justify-center"
            aria-label="View Resume"
          >
            <FileText className="w-4 h-4" />
            <span className="pointer-events-none absolute left-full ml-3 px-2.5 py-1 rounded-md bg-[#030B0D]/95 border border-[#FF8A30]/40 text-[#FF8A30] font-mono text-[11px] whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 shadow-2xl flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A30]" />
              <span>Resume</span>
            </span>
          </a>

          <div className="w-4 h-[1px] bg-white/15 my-0.5" />

          {/* Interactive Circular Scroll Progress Meter */}
          <div
            className="group relative flex flex-col items-center justify-center py-1 cursor-default"
            title={`Scroll progress: ${scrollPercent}%`}
          >
            <div className="relative w-7 h-7 flex items-center justify-center">
              <svg className="w-7 h-7 -rotate-90">
                <circle
                  cx="14"
                  cy="14"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className="text-white/10"
                />
                <circle
                  cx="14"
                  cy="14"
                  r="10"
                  stroke={theme.accent}
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="62.83"
                  strokeDashoffset={62.83 - (62.83 * scrollPercent) / 100}
                  strokeLinecap="round"
                  className="transition-all duration-150"
                  style={{
                    filter: `drop-shadow(0 0 4px ${theme.accent})`,
                  }}
                />
              </svg>
              <span className="absolute text-[8px] font-mono text-zinc-300 font-bold">
                {scrollPercent}
              </span>
            </div>

            {/* Scroll Tooltip */}
            <span
              className="pointer-events-none absolute left-full ml-3 px-2.5 py-1 rounded-md bg-[#030B0D]/95 border text-[#E8F1F2] font-mono text-[11px] whitespace-nowrap opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 shadow-2xl flex items-center gap-1.5"
              style={{ borderColor: `rgba(${theme.accentRgb}, 0.4)` }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: theme.accent }}
              />
              <span>{scrollPercent}% scrolled</span>
            </span>
          </div>
        </motion.div>
      </motion.aside>

      {/* 3. Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-20 z-50 p-6 rounded-2xl bg-[#030B0D]/95 border border-white/20 backdrop-blur-2xl shadow-2xl lg:hidden flex flex-col gap-3 font-mono"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  setMobileOpen(false);
                  handleNavClick(e, item.id);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
                  activeSection === item.id
                    ? 'bg-white/10 text-white border border-white/20'
                    : 'text-[#E8F1F2] hover:bg-white/[0.06]'
                }`}
              >
                <span style={{ color: theme.accent }}>{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <a
                href={PERSONAL_INFO.resume}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#FF8A30] flex items-center gap-1.5 hover:underline"
              >
                <FileText className="w-3.5 h-3.5" /> Resume ↗
              </a>
              <span className="text-[11px] text-[#557477]">
                {PERSONAL_INFO.name}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

