import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { EditorialLoader } from './EditorialLoader';
import { EditorialHeader } from './EditorialHeader';
import { EditorialHero } from './EditorialHero';
import { EditorialAbout } from './EditorialAbout';
import { EditorialProjects } from './EditorialProjects';
import { EditorialSkills } from './EditorialSkills';
import { EditorialAchievements } from './EditorialAchievements';
import { EditorialContact } from './EditorialContact';
import { EditorialFooterCard } from './EditorialFooterCard';
import { ThemeProvider, useTheme } from './ThemeContext';
import { PERSONAL_INFO } from '../../data/portfolioData';

const Trial5Content: React.FC = () => {
  const { isDark } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const sectionIds = ['hero', 'projects', 'about', 'skills', 'achievements', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 280;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            return;
          }
        }
      }
      if (window.scrollY < 300) setActiveSection('hero');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen relative overflow-x-hidden font-sans transition-colors duration-500 ${
      isDark
        ? 'bg-[#070C09] text-[#E8ECE6] selection:bg-[#34D399] selection:text-[#070C09]'
        : 'bg-[#F5F3E9] text-[#242722] selection:bg-[#C7D4B8] selection:text-[#141514]'
    }`}>
      
      {/* Dynamic Cursor Light Aura */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-700 hidden md:block"
        style={{
          background: isDark
            ? `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(52, 211, 153, 0.05), transparent 80%)`
            : `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(199, 212, 184, 0.22), transparent 80%)`,
        }}
      />

      {/* 1. Custom Animated Page Loader with J. Monogram */}
      <EditorialLoader />

      {/* 2. Editorial Glassmorphic Header */}
      <EditorialHeader activeSection={activeSection} />

      {/* 3. Main Narrative Sections */}
      <main className="relative z-10">
        <EditorialHero />
        <EditorialAbout />
        <EditorialProjects />
        <EditorialSkills />
        <EditorialAchievements />
        <EditorialContact />
        <EditorialFooterCard />
      </main>

      {/* 4. Editorial Footer */}
      <footer className={`relative z-10 py-12 px-6 border-t text-center text-xs font-mono transition-colors duration-300 ${
        isDark
          ? 'border-[#1E3325] bg-[#070C09] text-[#85998A]'
          : 'border-[#C7D4B8]/60 bg-[#F5F3E9] text-[#858D7A]'
      }`}>
        <div className="max-w-[1360px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className={`font-serif italic font-bold text-base ${isDark ? 'text-[#34D399]' : 'text-[#141514]'}`}>
              J.
            </span>
            <span className={`font-semibold ${isDark ? 'text-[#F0F4EE]' : 'text-[#141514]'}`}>
              {PERSONAL_INFO.name}
            </span>
            <span>—</span>
            <span>Data Analyst | AI & ML Engineer</span>
          </div>

          <div>
            Bangalore, Karnataka, India
          </div>
        </div>
      </footer>

    </div>
  );
};

export const Trial5App: React.FC = () => {
  return (
    <ThemeProvider>
      <Trial5Content />
    </ThemeProvider>
  );
};
