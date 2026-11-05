import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Cpu, Activity } from 'lucide-react';
import type { Project } from '../types';
import { GithubIcon } from './BrandIcons';
import { useTheme } from '../context/ThemeContext';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { theme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#030B0D]/85 backdrop-blur-xl transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-2xl rounded-2xl bg-[#030B0D]/95 border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden z-10"
          style={{ boxShadow: `0 25px 60px rgba(0,0,0,0.9), 0 0 30px ${theme.glow}` }}
        >
          {/* Accent glow line at top */}
          <div
            className="absolute top-0 left-0 right-0 h-1"
            style={{ backgroundColor: theme.accent }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-lg text-[#557477] hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Category & Status */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className="font-mono text-xs px-2.5 py-0.5 rounded-full border"
              style={{
                color: theme.accent,
                borderColor: `rgba(${theme.accentRgb}, 0.3)`,
                backgroundColor: `rgba(${theme.accentRgb}, 0.08)`,
              }}
            >
              {project.category}
            </span>
            <span className="font-mono text-xs text-[#557477]">·</span>
            <span className="font-mono text-xs text-[#557477]">{project.year}</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {project.title}
          </h2>
          <p className="text-sm sm:text-base text-[#E8F1F2]/80 mt-2 font-medium">
            {project.tagline}
          </p>

          {/* Overview */}
          <p className="text-sm text-[#E8F1F2]/70 mt-4 leading-relaxed">
            {project.description}
          </p>

          {/* Impact Banner */}
          <div
            className="my-5 p-3.5 rounded-xl border flex items-start gap-3"
            style={{
              borderColor: `rgba(${theme.accentRgb}, 0.25)`,
              backgroundColor: `rgba(${theme.accentRgb}, 0.05)`,
            }}
          >
            <Activity className="w-4 h-4 shrink-0 mt-0.5" style={{ color: theme.accent }} />
            <div className="text-xs text-[#E8F1F2]/90 leading-relaxed">
              <strong style={{ color: theme.accent }} className="font-semibold">
                Real-world impact:{' '}
              </strong>
              {project.impact}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-3 my-4">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="font-mono text-base sm:text-lg font-bold text-white">{m.value}</div>
                <div className="text-[11px] font-mono text-[#557477] mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Architecture Highlights */}
          <div className="mt-5">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#557477] mb-3 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5" style={{ color: theme.accent }} />
              <span>Architectural Design Decisions</span>
            </h4>
            <div className="space-y-2">
              {project.architectureNotes.map((note, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#E8F1F2]/80">
                  <CheckCircle2
                    className="w-3.5 h-3.5 shrink-0 mt-0.5"
                    style={{ color: theme.accent }}
                  />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags & Action */}
          <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-4">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs text-[#557477] bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions: View Source Code only */}
            <div className="flex items-center justify-end">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-medium text-[#030B0D] transition-all shadow-md active:scale-95 hover:brightness-110"
                style={{
                  backgroundColor: theme.accent,
                  boxShadow: `0 0 20px ${theme.glow}`,
                }}
              >
                <GithubIcon className="w-4 h-4" />
                <span>View Source Code</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

