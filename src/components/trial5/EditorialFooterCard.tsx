import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Check, ArrowDownToLine, Moon } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../BrandIcons';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const EditorialFooterCard: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-[1360px] mx-auto select-none font-sans">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-[540px] mx-auto rounded-[32px] sm:rounded-[36px] border border-[#C7D4B8] bg-gradient-to-b from-[#141514] via-[#16221A] to-[#0A120D] p-6 sm:p-8 shadow-[0_20px_60px_rgba(20,21,20,0.18)] overflow-hidden"
      >
        {/* Ambient emerald back-glow aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#34D399]/20 blur-3xl pointer-events-none" />

        {/* Top Status Header Bar */}
        <div className="relative z-10 flex items-center justify-between pb-3 mb-2 border-b border-white/[0.08] text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
            <span className="text-[11px] uppercase tracking-wider text-[#C7D4B8] font-semibold">
              STATUS: RECHARGING (OFFLINE)
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-white/50 text-[11px]">
            <Moon className="w-3.5 h-3.5 text-emerald-400" />
            <span>Night Mode</span>
          </div>
        </div>

        {/* Central Sleeping Chibi & Minecraft Dog Artwork */}
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
          className="relative z-10 w-full h-[220px] sm:h-[260px] flex items-center justify-center overflow-hidden rounded-2xl my-2"
        >
          <img
            src="/images/avatar-sleeping.jpg"
            alt="Jai S Ramani — Sleeping with companion dog"
            className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]"
          />
        </motion.div>

        {/* Sign-Off Narrative */}
        <div className="relative z-10 text-center space-y-2 mt-2 mb-6">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
            That's a wrap for now.
          </h3>
          <p className="text-xs sm:text-sm text-[#C7D4B8]/80 leading-relaxed max-w-md mx-auto">
            Thanks for reviewing my portfolio! Currently recharging for the next big analytical challenge. Drop a message anytime — my inbox is always listening.
          </p>
        </div>

        {/* 4 Interactive Clickable Social & Action Buttons (Styled after the artwork's bottom dock) */}
        <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 flex-wrap pt-4 border-t border-white/[0.08]">
          {/* 1. GitHub Button */}
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            aria-label="GitHub Profile"
            className="min-h-[46px] min-w-[46px] sm:min-w-[50px] flex items-center justify-center p-3 rounded-2xl border border-white/15 hover:border-[#34D399] bg-white/[0.06] hover:bg-[#34D399]/15 text-white/80 hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <GithubIcon className="w-5 h-5" />
          </a>

          {/* 2. LinkedIn Button */}
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            aria-label="LinkedIn Profile"
            className="min-h-[46px] min-w-[46px] sm:min-w-[50px] flex items-center justify-center p-3 rounded-2xl border border-white/15 hover:border-[#34D399] bg-white/[0.06] hover:bg-[#34D399]/15 text-white/80 hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <LinkedinIcon className="w-5 h-5 text-[#0A66C2]" />
          </a>

          {/* 3. Email Button */}
          <button
            onClick={handleCopyEmail}
            title={copiedEmail ? 'Email Copied!' : `Copy: ${PERSONAL_INFO.email}`}
            aria-label="Copy Email Address"
            className="min-h-[46px] min-w-[46px] sm:min-w-[50px] flex items-center justify-center p-3 rounded-2xl border border-white/15 hover:border-[#34D399] bg-white/[0.06] hover:bg-[#34D399]/15 text-white/80 hover:text-white transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            {copiedEmail ? (
              <Check className="w-5 h-5 text-emerald-400" />
            ) : (
              <Mail className="w-5 h-5" />
            )}
          </button>

          {/* 4. Download / View Resume Button */}
          <a
            href={PERSONAL_INFO.resume}
            target="_blank"
            rel="noopener noreferrer"
            title="Download Resume"
            aria-label="Download Resume"
            className="min-h-[46px] flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-[#34D399]/50 hover:border-[#34D399] bg-[#34D399]/15 hover:bg-[#34D399]/25 text-white font-mono text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer group"
          >
            <ArrowDownToLine className="w-4 h-4 text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
            <span>Resume</span>
          </a>
        </div>

      </motion.div>
    </section>
  );
};
