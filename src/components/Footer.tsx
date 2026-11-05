import React from "react";
import { ArrowUp, Terminal } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { useTheme } from "../context/ThemeContext";

interface FooterProps {
  onOpenCommand: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCommand }) => {
  const { theme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left identity */}
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm border"
            style={{
              backgroundColor: `rgba(${theme.accentRgb}, 0.15)`,
              borderColor: `rgba(${theme.accentRgb}, 0.4)`,
              color: theme.accent
            }}
          >
            JR
          </div>
          <div>
            <div className="text-sm font-semibold text-white tracking-wide">
              {PERSONAL_INFO.name}
            </div>
            <div className="text-xs font-mono text-zinc-500">
              {PERSONAL_INFO.role} · Bangalore, India
            </div>
          </div>
        </div>

        {/* Center: Command Palette tip */}
        <button
          onClick={onOpenCommand}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
        >
          <Terminal className="w-3.5 h-3.5" style={{ color: theme.accent }} />
          <span>Press</span>
          <kbd className="px-1.5 py-0.5 rounded bg-black/50 border border-white/10 text-[10px] text-zinc-300">⌘K</kbd>
          <span>for Command Palette</span>
        </button>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono ml-2 cursor-pointer"
            title="Scroll to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Top</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-zinc-600 gap-2">
        <div>
          © {new Date().getFullYear()} {PERSONAL_INFO.name}. All systems verified.
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Built with React 19, Three.js & Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
};
