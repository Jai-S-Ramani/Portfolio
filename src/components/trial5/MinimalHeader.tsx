import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, FileText, Menu, X, ArrowUpRight, Copy, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface MinimalHeaderProps {
  activeSection: string;
  onOpenCommand: () => void;
}

export const MinimalHeader: React.FC<MinimalHeaderProps> = ({
  activeSection,
  onOpenCommand,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Live Bangalore Time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      setCurrentTime(`${timeStr} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Overview' },
    { id: 'projects', label: 'Projects' },
    { id: 'sandbox', label: 'Data Sandbox' },
    { id: 'arsenal', label: 'Arsenal' },
    { id: 'journey', label: 'Journey' },
    { id: 'honors', label: 'Honors' },
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
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <>
      <header className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-3.5 sm:px-5 py-2.5 rounded-full border border-white/[0.09] bg-[#090A0C]/80 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] max-w-[1140px] w-full"
        >
          {/* Left: Brand Monogram & Availability Beacon */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo('hero')}
              className="flex items-center gap-2.5 group text-left cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center font-mono font-bold text-xs text-white group-hover:border-[#00D9C0] transition-colors">
                JR
              </div>
              <div className="hidden sm:block">
                <span className="text-xs font-semibold text-white tracking-tight flex items-center gap-1.5">
                  Jai S Ramani
                </span>
                <span className="text-[10px] text-white/40 font-mono block -mt-0.5">
                  Data & AI Engineer
                </span>
              </div>
            </button>

            {/* Availability Pill */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for Hire
            </div>
          </div>

          {/* Center: Desktop Nav Pills */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.02] border border-white/[0.05] rounded-full p-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`relative px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    isActive ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 rounded-full bg-white/[0.1] border border-white/[0.12]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Bangalore Clock, Resume, Command Trigger */}
          <div className="flex items-center gap-2">
            {/* Live Clock */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono text-white/40">
              <span>{currentTime}</span>
            </div>

            {/* Quick Email Copy */}
            <button
              onClick={handleCopyEmail}
              title="Copy Email"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/[0.08] hover:border-white/[0.2] bg-white/[0.03] text-xs font-mono text-white/80 hover:text-white transition-all cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#00D9C0]" />
                  <span className="text-[#00D9C0]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-white/50" />
                  <span>Email</span>
                </>
              )}
            </button>

            {/* Resume Button */}
            <a
              href={PERSONAL_INFO.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors shadow-sm cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>

            {/* Command Palette Trigger */}
            <button
              onClick={onOpenCommand}
              title="Quick Search (⌘K)"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-white/[0.1] hover:border-[#00D9C0]/50 bg-white/[0.04] text-xs font-mono text-white/70 hover:text-white transition-all cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-[#00D9C0]" />
              <span className="hidden sm:inline text-[10px] text-white/40">⌘K</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-full text-white/70 hover:text-white border border-white/[0.08] cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 inset-x-4 z-40 p-5 rounded-2xl border border-white/[0.12] bg-[#0c0e12]/95 backdrop-blur-2xl shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.05] text-left text-sm text-white font-medium transition-colors"
                >
                  <span>{link.label}</span>
                  <span className="text-xs font-mono text-white/30">#0{navLinks.indexOf(link) + 1}</span>
                </button>
              ))}

              <div className="pt-3 mt-2 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-xs font-mono text-white/40">{currentTime}</span>
                <button
                  onClick={handleCopyEmail}
                  className="text-xs font-mono text-[#00D9C0] flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedEmail ? 'Copied Email' : 'Copy Email'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

