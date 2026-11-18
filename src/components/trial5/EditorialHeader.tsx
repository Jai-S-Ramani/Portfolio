import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Copy, Check, Menu, X, Sun, Moon, Monitor } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useTheme } from './ThemeContext';

interface EditorialHeaderProps {
  activeSection?: string;
}

export const EditorialHeader: React.FC<EditorialHeaderProps> = ({ activeSection = 'hero' }) => {
  const { themeMode, isDark, cycleTheme, setThemeMode, dynamicReason } = useTheme();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'projects', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <>
      <header className="fixed top-3 sm:top-6 inset-x-0 z-40 flex justify-center px-3 sm:px-4 pointer-events-none select-none font-sans">
        <motion.div
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between gap-2 sm:gap-6 px-3.5 sm:px-6 py-2.5 sm:py-3 rounded-full border transition-colors duration-500 max-w-[1180px] w-full ${
            isDark
              ? 'border-[#1E3325] bg-[#0A120D]/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] text-[#E8ECE6]'
              : 'border-[#C7D4B8]/70 bg-[#F5F3E9]/92 backdrop-blur-xl shadow-[0_8px_30px_rgba(20,21,20,0.06)] text-[#242722]'
          }`}
        >
          {/* Left: J. Monogram & Availability Indicator */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => scrollTo('hero')}
              className="min-h-[44px] flex items-center gap-2 group cursor-pointer"
              aria-label="Scroll to Hero section"
            >
              <span className={`font-serif italic font-bold text-2xl tracking-tight transition-colors ${
                isDark ? 'text-[#34D399] group-hover:text-emerald-300' : 'text-[#141514] group-hover:text-[#858D7A]'
              }`}>
                J.
              </span>
              <span className={`hidden md:inline-block text-xs font-semibold tracking-tight border-l pl-2.5 ${
                isDark ? 'text-[#A3B899] border-[#1E3325]' : 'text-[#242722]/80 border-[#C7D4B8]'
              }`}>
                Jai S Ramani
              </span>
            </button>

            {/* Availability & Dynamic Status Indicator */}
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-medium transition-colors ${
              isDark ? 'border-[#1E3325] bg-[#0E1A14] text-[#34D399]' : 'border-[#C7D4B8] bg-[#C7D4B8]/30 text-[#141514]'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-[#34D399]' : 'bg-[#141514]'} animate-pulse`} />
              <span>Available for opportunities</span>
            </div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`min-h-[38px] px-3.5 py-1.5 flex items-center rounded-full text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                    isActive
                      ? isDark
                        ? 'bg-[#182C20] text-[#34D399] border border-[#2D4D38] shadow-sm'
                        : 'bg-[#141514] text-[#F5F3E9] shadow-sm'
                      : isDark
                        ? 'text-[#A3B899] hover:text-[#E8ECE6] hover:bg-[#122018]'
                        : 'text-[#242722]/70 hover:text-[#141514] hover:bg-[#C7D4B8]/30'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right: Theme Switcher, Resume, Email & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            
            {/* Theme Mode Cycle Button (System / Dark / Light) */}
            <button
              onClick={cycleTheme}
              title={`Current Theme: ${themeMode.toUpperCase()} (${dynamicReason}) — Click to cycle System / Dark / Light`}
              aria-label="Cycle Theme Mode (System / Dark / Light)"
              className={`min-h-[44px] px-3 flex items-center gap-1.5 rounded-full border transition-all cursor-pointer active:scale-95 shadow-sm ${
                isDark
                  ? 'border-[#243E2E] bg-[#122219] text-[#E8ECE6] hover:border-[#34D399]/60'
                  : 'border-[#C7D4B8] bg-white/70 text-[#141514] hover:bg-white'
              }`}
            >
              {themeMode === 'system' ? (
                <Monitor className="w-4 h-4 text-[#34D399]" />
              ) : isDark ? (
                <Moon className="w-4 h-4 text-emerald-400" />
              ) : (
                <Sun className="w-4 h-4 text-amber-500" />
              )}
              <span className="text-[11px] font-mono uppercase font-semibold hidden sm:inline">
                {themeMode === 'system' ? 'System' : isDark ? 'Dark' : 'Light'}
              </span>
            </button>

            <button
              onClick={handleCopyEmail}
              className={`hidden sm:flex min-h-[44px] items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer shadow-sm active:scale-95 ${
                isDark
                  ? 'border-[#1E3325] hover:border-[#34D399] bg-[#0E1A14] text-[#D2DEC8]'
                  : 'border-[#C7D4B8] hover:border-[#141514] bg-white/60 hover:bg-white text-[#242722]'
              }`}
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 opacity-60" />}
              <span>{copiedEmail ? 'Copied' : 'Email'}</span>
            </button>

            <a
              href={PERSONAL_INFO.resume}
              target="_blank"
              rel="noopener noreferrer"
              className={`min-h-[44px] flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm active:scale-95 group ${
                isDark
                  ? 'bg-[#34D399] hover:bg-[#6EE7B7] text-[#07100B] font-bold shadow-[0_0_16px_rgba(52,211,153,0.3)]'
                  : 'bg-[#141514] hover:bg-[#242722] text-[#F5F3E9]'
              }`}
            >
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Mobile Hamburger Button with 44x44px target */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full border transition-colors cursor-pointer active:scale-95 ${
                isDark
                  ? 'border-[#1E3325] text-[#34D399] hover:bg-[#122018]'
                  : 'border-[#C7D4B8] text-[#141514] hover:bg-[#C7D4B8]/30'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Drawer Menu & Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
            />

            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className={`fixed inset-x-3 top-20 z-50 p-5 rounded-3xl border shadow-2xl lg:hidden flex flex-col gap-2 font-sans ${
                isDark
                  ? 'border-[#1E3325] bg-[#0A140F]/98 text-[#E8ECE6] backdrop-blur-2xl'
                  : 'border-[#C7D4B8] bg-[#F5F3E9]/98 text-[#242722] backdrop-blur-2xl'
              }`}
            >
              <div className={`flex items-center justify-between pb-3 mb-1 border-b ${
                isDark ? 'border-[#1E3325]' : 'border-[#C7D4B8]/40'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                  <span className={`text-xs font-mono font-semibold ${isDark ? 'text-[#34D399]' : 'text-[#141514]'}`}>
                    Opportunities Open
                  </span>
                </div>
                <span className="text-[10px] font-mono opacity-60">
                  {dynamicReason}
                </span>
              </div>

              {/* Theme Mode Selector Segment */}
              <div className={`flex items-center gap-1 p-1 rounded-2xl border ${
                isDark ? 'border-[#1E3325] bg-black/30' : 'border-[#C7D4B8] bg-white/60'
              }`}>
                <button
                  onClick={() => setThemeMode('system')}
                  className={`flex-1 min-h-[38px] flex items-center justify-center gap-1.5 rounded-xl text-xs font-mono transition-all ${
                    themeMode === 'system'
                      ? 'bg-[#34D399] text-[#07100B] font-bold shadow-sm'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>System</span>
                </button>
                <button
                  onClick={() => setThemeMode('dark')}
                  className={`flex-1 min-h-[38px] flex items-center justify-center gap-1.5 rounded-xl text-xs font-mono transition-all ${
                    themeMode === 'dark'
                      ? 'bg-[#182C20] text-[#34D399] font-bold shadow-sm border border-[#2D4D38]'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>Dark</span>
                </button>
                <button
                  onClick={() => setThemeMode('light')}
                  className={`flex-1 min-h-[38px] flex items-center justify-center gap-1.5 rounded-xl text-xs font-mono transition-all ${
                    themeMode === 'light'
                      ? 'bg-white text-[#141514] font-bold shadow-sm'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>Light</span>
                </button>
              </div>

              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`w-full min-h-[46px] flex items-center text-left px-4 py-2.5 rounded-2xl text-sm font-semibold transition-colors active:scale-98 ${
                    isDark
                      ? 'text-[#E8ECE6] hover:bg-[#14261C]'
                      : 'text-[#242722] hover:bg-[#C7D4B8]/40'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <div className={`pt-3 mt-1 border-t flex items-center gap-2 ${
                isDark ? 'border-[#1E3325]' : 'border-[#C7D4B8]/40'
              }`}>
                <button
                  onClick={handleCopyEmail}
                  className={`flex-1 min-h-[44px] flex items-center justify-center gap-2 px-3 py-2 rounded-2xl border text-xs font-semibold active:scale-95 ${
                    isDark
                      ? 'border-[#1E3325] bg-[#0E1A14] text-[#34D399]'
                      : 'border-[#C7D4B8] bg-white/80 text-[#141514]'
                  }`}
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 opacity-60" />}
                  <span>{copiedEmail ? 'Email Copied!' : 'Copy Email'}</span>
                </button>

                <a
                  href={PERSONAL_INFO.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 min-h-[44px] flex items-center justify-center gap-2 px-3 py-2 rounded-2xl text-xs font-semibold active:scale-95 ${
                    isDark
                      ? 'bg-[#34D399] text-[#07100B] font-bold'
                      : 'bg-[#141514] text-[#F5F3E9]'
                  }`}
                >
                  <span>Resume</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
