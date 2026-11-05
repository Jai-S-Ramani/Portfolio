import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { CustomCursor } from './components/CustomCursor';
import { InteractiveBackground } from './components/InteractiveBackground';
import { ScrollProgress } from './components/ScrollProgress';
import { Navigation } from './components/Navigation';
import { CommandPalette } from './components/CommandPalette';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { LabSection } from './components/LabSection';
import { TimelineSection } from './components/TimelineSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const { theme } = useTheme();

  // Initialize Lenis smooth scroll
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

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = [
      'projects',
      'about',
      'skills',
      'lab',
      'experience',
      'achievements',
      'contact'
    ];

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
      if (window.scrollY < 400) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#030B0D] text-[#E8F1F2] relative overflow-x-hidden selection:bg-white/20 selection:text-white p-2 sm:p-4 md:p-6 lg:p-8">
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Top Spring Scroll Progress Bar */}
      <ScrollProgress />

      {/* 3D Cyber Horizon Wave Grid Background */}
      <InteractiveBackground currentMode="cyber-grid" />

      {/* Global Navigation: Floating Left Dock & Pinned Top Header */}
      <Navigation
        activeSection={activeSection}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Raycast-style Command Palette Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      {/* ======================================================== */}
      {/* CORE FRAME: Master rounded container with responsive glow*/}
      {/* ======================================================== */}
      <div
        className="relative mx-auto w-full max-w-[1540px] rounded-[2rem] sm:rounded-[2.8rem] border bg-[#030B0D]/50 backdrop-blur-md overflow-hidden transition-all duration-700"
        style={{
          borderColor: `rgba(${theme.accentRgb}, 0.35)`,
          boxShadow: `0 0 80px rgba(${theme.accentRgb}, 0.16), inset 0 0 50px rgba(${theme.accentRgb}, 0.05)`
        }}
      >
        {/* Subtle Decorative Ambient Corner Accents */}
        <div
          className="pointer-events-none absolute top-0 left-0 w-48 h-48 rounded-tl-[2rem] sm:rounded-tl-[2.8rem] transition-colors duration-700"
          style={{
            background: `radial-gradient(circle at top left, rgba(${theme.accentRgb}, 0.16), transparent 70%)`
          }}
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 w-48 h-48 rounded-br-[2rem] sm:rounded-br-[2.8rem] transition-colors duration-700"
          style={{
            background: `radial-gradient(circle at bottom right, rgba(${theme.accentRgb}, 0.12), transparent 70%)`
          }}
        />

        {/* Content Container (with offset on desktop for floating left vertical capsule dock) */}
        <div className="lg:pl-24">
          <HeroSection />
          <ProjectsSection />
          <AboutSection />
          <SkillsSection />
          <LabSection />
          <TimelineSection />
          <AchievementsSection />
          <ContactSection />
          <Footer onOpenCommand={() => setCommandPaletteOpen(true)} />
        </div>
      </div>
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
