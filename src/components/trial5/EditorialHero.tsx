import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowDown, 
  ArrowUpRight, 
  Code2, 
  Smile, 
  Moon,
  Terminal, 
  MapPin
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../BrandIcons';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useTheme } from './ThemeContext';

export const EditorialHero: React.FC = () => {
  const { isDark } = useTheme();
  const [avatarMode, setAvatarMode] = useState<'coding' | 'standing' | 'sleeping'>('coding');

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const rolePills = [
    { title: 'Data Analyst', highlight: true },
    { title: 'AI/ML Engineer', highlight: true },
    { title: 'Full-Stack Developer', highlight: false },
  ];

  // Reusable responsive Chibi Avatar Card
  const renderAvatarCard = (isMobile: boolean = false) => (
    <div
      className={`relative w-full ${
        isMobile ? 'max-w-[300px] sm:max-w-[320px] mx-auto my-6' : 'max-w-[420px]'
      } rounded-[32px] sm:rounded-[36px] border border-[#C7D4B8] bg-gradient-to-b from-[#141514] via-[#16221A] to-[#0A120D] p-4 sm:p-6 shadow-[0_20px_60px_rgba(20,21,20,0.18)] overflow-hidden group`}
    >
      {/* Ambient emerald back-glow aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-[#34D399]/20 blur-3xl pointer-events-none" />

      {/* Top Interactive Mode Toggle Bar */}
      <div className="relative z-10 flex items-center justify-between gap-1.5 pb-3 mb-2 border-b border-white/[0.08]">
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${avatarMode === 'sleeping' ? 'bg-amber-400' : 'bg-[#34D399]'} animate-pulse shadow-[0_0_8px_currentColor]`} />
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#C7D4B8] font-semibold">
            {avatarMode === 'sleeping' ? 'RESTING' : 'STATUS'}
          </span>
        </div>

        {/* Mode Switcher Pills (3 poses: Coding, Hello, Sleep) */}
        <div className="flex items-center gap-1 p-1 rounded-full border border-white/10 bg-black/40">
          <button
            onClick={() => setAvatarMode('coding')}
            aria-label="Switch to Coding Pose"
            className={`min-h-[32px] px-2.5 py-1 flex items-center gap-1 rounded-full text-[10px] sm:text-[11px] font-mono transition-all cursor-pointer active:scale-95 ${
              avatarMode === 'coding'
                ? 'bg-[#34D399] text-[#0A120D] font-bold shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Code2 className="w-3 h-3" />
            <span>Coding</span>
          </button>

          <button
            onClick={() => setAvatarMode('standing')}
            aria-label="Switch to Friendly Pose"
            className={`min-h-[32px] px-2.5 py-1 flex items-center gap-1 rounded-full text-[10px] sm:text-[11px] font-mono transition-all cursor-pointer active:scale-95 ${
              avatarMode === 'standing'
                ? 'bg-[#C7D4B8] text-[#0A120D] font-bold shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Smile className="w-3 h-3" />
            <span>Hello</span>
          </button>

          <button
            onClick={() => setAvatarMode('sleeping')}
            aria-label="Switch to Resting Pose"
            className={`min-h-[32px] px-2.5 py-1 flex items-center gap-1 rounded-full text-[10px] sm:text-[11px] font-mono transition-all cursor-pointer active:scale-95 ${
              avatarMode === 'sleeping'
                ? 'bg-amber-300 text-[#0A120D] font-bold shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Moon className="w-3 h-3" />
            <span>Sleep</span>
          </button>
        </div>
      </div>

      {/* Central Animated Avatar Image with Floating Idle Motion */}
      <motion.div 
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
        onClick={() => {
          setAvatarMode(prev => {
            if (prev === 'coding') return 'standing';
            if (prev === 'standing') return 'sleeping';
            return 'coding';
          });
        }}
        className={`relative z-10 w-full ${
          isMobile ? 'h-[230px] sm:h-[260px]' : 'h-[310px] sm:h-[340px]'
        } flex items-center justify-center cursor-pointer overflow-hidden rounded-2xl select-none active:scale-98 transition-transform`}
        title="Tap to toggle pose (Coding / Hello / Sleep)"
      >
        <AnimatePresence mode="wait">
          {avatarMode === 'coding' && (
            <motion.img
              key="coding"
              src="/images/avatar-coding.jpg"
              alt="Jai S Ramani — Coding and Developing"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]"
            />
          )}

          {avatarMode === 'standing' && (
            <motion.img
              key="standing"
              src="/images/avatar-standing.jpg"
              alt="Jai S Ramani — AI & ML Engineer"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]"
            />
          )}

          {avatarMode === 'sleeping' && (
            <motion.img
              key="sleeping"
              src="/images/avatar-sleeping.jpg"
              alt="Jai S Ramani — Resting with companion dog"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.25 }}
              className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.8)]"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Bottom Card Telemetry Pill */}
      <div className="relative z-10 pt-3 mt-2 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-1.5 text-white/90">
          <Terminal className="w-3.5 h-3.5 text-[#34D399]" />
          <span className="font-bold">Jai S Ramani</span>
        </div>

        <div className="flex items-center gap-1 text-[#C7D4B8]/80 text-[11px]">
          <MapPin className="w-3 h-3 text-[#34D399]" />
          <span>{avatarMode === 'sleeping' ? 'Recharging 💤' : 'Bangalore, IN'}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section 
      id="hero" 
      className="relative min-h-[calc(100vh-4rem)] pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 md:px-10 max-w-[1360px] mx-auto flex flex-col justify-center select-none font-sans overflow-hidden"
    >
      
      {/* ATMOSPHERIC BACKGROUND: Misty Hills & Soft Natural Sunlight Silhouettes */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Radiance aura */}
        <div className={`absolute -top-40 -left-40 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full blur-3xl transition-opacity duration-500 ${
          isDark
            ? 'bg-gradient-to-br from-[#1E3E2B]/40 via-[#10241A]/20 to-transparent opacity-60'
            : 'bg-gradient-to-br from-[#C7D4B8]/40 via-[#858D7A]/15 to-transparent opacity-70'
        }`} />
        <div className={`absolute top-1/3 right-0 lg:-right-32 w-[240px] sm:w-[550px] h-[240px] sm:h-[550px] rounded-full blur-3xl transition-opacity duration-500 ${
          isDark
            ? 'bg-gradient-to-bl from-[#34D399]/15 via-transparent to-transparent opacity-50'
            : 'bg-gradient-to-bl from-[#C7D4B8]/35 via-white/50 to-transparent opacity-80'
        }`} />

        {/* Misty Hills SVG Contour Layers */}
        <svg
          className={`absolute bottom-0 inset-x-0 w-full h-48 sm:h-72 preserve-3d transition-colors duration-500 ${
            isDark ? 'text-[#16291E]/30 opacity-40' : 'text-[#C7D4B8]/20 opacity-60'
          }`}
          viewBox="0 0 1440 320"
          fill="currentColor"
        >
          <path d="M0,224L60,208C120,192,240,160,360,165.3C480,171,600,213,720,208C840,203,960,149,1080,138.7C1200,128,1320,160,1380,176L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
        </svg>
        <svg
          className={`absolute -bottom-6 inset-x-0 w-full h-40 sm:h-64 transition-colors duration-500 ${
            isDark ? 'text-[#0E1A13]/40 opacity-50' : 'text-[#858D7A]/10 opacity-70'
          }`}
          viewBox="0 0 1440 320"
          fill="currentColor"
        >
          <path d="M0,160L80,176C160,192,320,224,480,213.3C640,203,800,149,960,138.7C1120,128,1280,160,1360,176L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
        </svg>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* LEFT COLUMN: Editorial Typography, Role Badges & CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start w-full"
        >
          {/* 1. ROLE PILLS: Data Analyst, AI/ML Engineer, Full-Stack Developer */}
          <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8">
            {rolePills.map((role, idx) => (
              <div 
                key={role.title}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono tracking-wider uppercase font-semibold transition-all ${
                  idx === 0
                    ? isDark
                      ? 'border-[#34D399]/40 bg-[#12241A] text-[#34D399] shadow-sm'
                      : 'border-[#141514] bg-[#141514] text-[#F5F3E9] shadow-sm'
                    : isDark
                      ? 'border-[#1E3325] bg-[#0E1712]/80 text-[#D2DEC8] backdrop-blur-md'
                      : 'border-[#C7D4B8] bg-white/80 text-[#242722] backdrop-blur-md'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-[#34D399]' : isDark ? 'bg-[#34D399]/50' : 'bg-[#141514]'}`} />
                <span>{role.title}</span>
              </div>
            ))}
          </div>

          {/* 2. FLUID EDITORIAL SERIF HEADING (Scales via CSS clamp without overflow) */}
          <h1 className={`text-[clamp(2.4rem,6vw,5.5rem)] font-serif ${isDark ? 'text-[#F0F4EE]' : 'text-[#242722]'} leading-[1.04] tracking-tight mb-6 sm:mb-8`}>
            Turning data into <br />
            <span className={`italic font-normal underline decoration-2 underline-offset-8 ${
              isDark ? 'text-[#34D399] decoration-[#34D399]/40' : 'text-[#141514] decoration-[#C7D4B8]'
            }`}>
              beautiful insights.
            </span>
          </h1>

          {/* 3. MOBILE-ONLY CHIBI ARTWORK STACK (< 1024px) */}
          {/* Scaled cleanly (max-width: 280px-320px) so it never pushes CTAs off screen */}
          <div className="block lg:hidden w-full my-2">
            {renderAvatarCard(true)}
          </div>

          {/* 4. Subtitle / Bio Statement */}
          <p className={`text-base sm:text-lg md:text-xl ${isDark ? 'text-[#A3B899]' : 'text-[#242722]/80'} font-normal leading-relaxed max-w-2xl mb-8 sm:mb-10`}>
            I build intelligent systems, uncover meaningful insights, and transform complex problems into elegant digital solutions.
          </p>

          {/* 5. ACTION BUTTONS & SOCIALS (with min 44x44px touch targets) */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full">
            {/* Primary CTA */}
            <button
              onClick={() => scrollTo('projects')}
              className={`min-h-[48px] px-6 sm:px-7 py-3 rounded-full font-medium text-sm transition-all hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center gap-2.5 group ${
                isDark
                  ? 'bg-[#34D399] hover:bg-[#6EE7B7] text-[#07100B] font-bold shadow-[0_8px_24px_rgba(52,211,153,0.25)]'
                  : 'bg-[#141514] hover:bg-[#242722] text-[#F5F3E9] shadow-[0_8px_24px_rgba(20,21,20,0.18)]'
              }`}
            >
              <span>Explore My Work</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={() => scrollTo('contact')}
              className={`min-h-[48px] px-6 sm:px-7 py-3 rounded-full border font-medium text-sm transition-all shadow-sm active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${
                isDark
                  ? 'border-[#1E3325] hover:border-[#34D399] bg-[#0E1712] hover:bg-[#14231A] text-[#E8ECE6]'
                  : 'border-[#858D7A]/50 hover:border-[#141514] bg-white/80 hover:bg-white text-[#242722]'
              }`}
            >
              <span>Let's Connect</span>
              <ArrowUpRight className="w-4 h-4 opacity-60" />
            </button>

            {/* Social Icons for quick profile navigation */}
            <div className="flex items-center gap-2 ml-auto sm:ml-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Profile"
                aria-label="GitHub Profile"
                className={`min-h-[48px] min-w-[48px] flex items-center justify-center rounded-full border transition-all shadow-sm active:scale-95 ${
                  isDark
                    ? 'border-[#1E3325] bg-[#0E1712] text-[#A3B899] hover:text-[#34D399] hover:border-[#34D399]'
                    : 'border-[#C7D4B8] bg-white/70 hover:bg-white text-[#242722] hover:text-[#141514]'
                }`}
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
                className={`min-h-[48px] min-w-[48px] flex items-center justify-center rounded-full border transition-all shadow-sm active:scale-95 ${
                  isDark
                    ? 'border-[#1E3325] bg-[#0E1712] text-[#A3B899] hover:text-[#34D399] hover:border-[#34D399]'
                    : 'border-[#C7D4B8] bg-white/70 hover:bg-white text-[#242722] hover:text-[#141514]'
                }`}
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Desktop Side-by-Side Character Showcase (hidden on mobile, visible on desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex lg:col-span-5 relative flex-col items-center justify-center"
        >
          {renderAvatarCard(false)}
        </motion.div>

      </div>
    </section>
  );
};
