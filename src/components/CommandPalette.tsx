import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Briefcase, User, Cpu, Mail, FileText, Check, Sparkles, X } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { THEMES, useTheme } from '../context/ThemeContext';
import confetti from 'canvas-confetti';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const { theme, setThemeById } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : handleOpen();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleOpen = () => {
    setQuery('');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        colors: [theme.accent, theme.accentLight, '#ffffff'],
        disableForReducedMotion: true,
      });
    } catch {
      // safe
    }
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1200);
  };

  const navActions = [
    { label: 'Featured Work (Projects)', icon: <Briefcase className="w-4 h-4" />, href: '#projects' },
    { label: 'About & Philosophy', icon: <User className="w-4 h-4" />, href: '#about' },
    { label: 'Technical Arsenal (Skills)', icon: <Cpu className="w-4 h-4" />, href: '#skills' },
    { label: 'The Interactive Lab', icon: <Sparkles className="w-4 h-4" />, href: '#lab' },
    { label: 'Trajectory & Education', icon: <FileText className="w-4 h-4" />, href: '#experience' },
    { label: 'Direct Dispatch (Contact)', icon: <Mail className="w-4 h-4" />, href: '#contact' },
  ];

  const filteredNav = navActions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  const filteredThemes = THEMES.filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#030B0D]/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-xl rounded-2xl bg-[#030B0D]/95 border border-[#00D9C0]/35 p-3 shadow-2xl overflow-hidden z-10 font-mono"
          style={{ boxShadow: `0 0 40px ${theme.glow}` }}
        >
          {/* Search Header */}
          <div className="flex items-center gap-3 px-3 py-2 border-b border-white/10">
            <Search className="w-4 h-4 text-[#557477]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or jump to section..."
              autoFocus
              className="w-full bg-transparent text-sm text-[#E8F1F2] placeholder-[#557477] focus:outline-none"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-[#557477] hover:text-[#E8F1F2]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto py-2 space-y-4">
            {/* Quick Actions */}
            <div>
              <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-[#557477]">
                Quick Direct Action
              </div>
              <button
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-[#E8F1F2] hover:bg-white/[0.06] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4" style={{ color: theme.accent }} />
                  <span>Copy Direct Email ({PERSONAL_INFO.email})</span>
                </div>
                {copied ? (
                  <span className="text-xs text-[#00D9C0] flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Copied
                  </span>
                ) : (
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-[#557477]">
                    ENTER
                  </kbd>
                )}
              </button>

              <a
                href={PERSONAL_INFO.resume}
                target="_blank"
                rel="noreferrer"
                onClick={onClose}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-[#E8F1F2] hover:bg-white/[0.06] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#FF8A30]" />
                  <span>Open Resume</span>
                </div>
                <span className="text-[10px] text-[#FF8A30]">↗</span>
              </a>
            </div>

            {/* Navigation Jumps */}
            {filteredNav.length > 0 && (
              <div>
                <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-[#557477]">
                  Navigation Landmarks
                </div>
                {filteredNav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-[#E8F1F2] hover:bg-white/[0.06] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#557477]">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    <span className="text-[10px] text-[#557477]">{item.href}</span>
                  </a>
                ))}
              </div>
            )}

            {/* Theme switcher */}
            {filteredThemes.length > 0 && (
              <div>
                <div className="px-3 py-1 text-[10px] uppercase tracking-wider text-[#557477]">
                  Theme Engines
                </div>
                <div className="grid grid-cols-2 gap-1 px-1">
                  {filteredThemes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setThemeById(t.id);
                        onClose();
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-[#E8F1F2] hover:bg-white/[0.06] transition-colors text-left"
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: t.accent }}
                      />
                      <span>{t.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="px-3 pt-2 pb-1 border-t border-white/10 flex items-center justify-between text-[10px] text-[#557477]">
            <span>Press ESC to dismiss</span>
            <span>Jai S Ramani // Telemetry OS</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
