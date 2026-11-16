import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Terminal, X, Check } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

interface MinimalCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MinimalCommandPalette: React.FC<MinimalCommandPaletteProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);

  // Close on Escape & toggle on ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const items = [
    {
      id: 'projects',
      title: 'Navigate to Projects',
      category: 'Navigation',
      action: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'sandbox',
      title: 'Open Data Sandbox (SQL & Models)',
      category: 'Navigation',
      action: () => {
        document.getElementById('sandbox')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'arsenal',
      title: 'Inspect Tech Stack & Skills',
      category: 'Navigation',
      action: () => {
        document.getElementById('arsenal')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'journey',
      title: 'View Education & Academic Timeline',
      category: 'Navigation',
      action: () => {
        document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'honors',
      title: 'View Awards & Certifications',
      category: 'Navigation',
      action: () => {
        document.getElementById('honors')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'contact',
      title: 'Transmit Direct Message',
      category: 'Navigation',
      action: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      },
    },
    {
      id: 'copy-email',
      title: 'Copy Email Address (jaisramani05@gmail.com)',
      category: 'Action',
      action: () => {
        navigator.clipboard.writeText(PERSONAL_INFO.email);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
          onClose();
        }, 1200);
      },
    },
    {
      id: 'resume',
      title: 'View / Download Resume (PDF)',
      category: 'External',
      action: () => {
        window.open(PERSONAL_INFO.resume, '_blank');
        onClose();
      },
    },
    {
      id: 'github',
      title: 'Open GitHub Profile',
      category: 'External',
      action: () => {
        window.open(PERSONAL_INFO.github, '_blank');
        onClose();
      },
    },
    {
      id: 'linkedin',
      title: 'Open LinkedIn Profile',
      category: 'External',
      action: () => {
        window.open(PERSONAL_INFO.linkedin, '_blank');
        onClose();
      },
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg rounded-2xl border border-white/[0.12] bg-[#0c0e12] shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08]">
              <Search className="w-4 h-4 text-[#00D9C0]" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or jump to section..."
                className="flex-1 bg-transparent text-sm font-mono text-white placeholder-white/30 focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-md text-white/40 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List Results */}
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-white/[0.04]">
              {filteredItems.length === 0 ? (
                <div className="p-6 text-center text-xs font-mono text-white/40">
                  No matching commands found.
                </div>
              ) : (
                filteredItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-white/[0.05] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-2.5">
                      <Terminal className="w-3.5 h-3.5 text-white/40 group-hover:text-[#00D9C0] transition-colors" />
                      <span className="text-xs font-mono text-white/80 group-hover:text-white">
                        {item.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.id === 'copy-email' && copied && (
                        <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                          <Check className="w-3 h-3" /> Copied
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-white/30 px-2 py-0.5 rounded bg-white/[0.03]">
                        {item.category}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Footer Tip */}
            <div className="px-4 py-2 border-t border-white/[0.06] bg-white/[0.01] flex items-center justify-between text-[10px] font-mono text-white/30">
              <span>Use ↑↓ to navigate, ESC to close</span>
              <span>⌘K to toggle</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
