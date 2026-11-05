import React, { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../types';
import { useTheme } from '../context/ThemeContext';
import { GithubIcon } from './BrandIcons';

interface ProjectCardProps {
  project: Project;
  onInspect: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onInspect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    // 3D Perspective tilt calculation (-10deg to +10deg)
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;
    setTilt({
      rotateX: -normY * 12,
      rotateY: normX * 12,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <div style={{ perspective: '1000px' }} className="w-full">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.015, 1.015, 1.015)`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
          transformStyle: 'preserve-3d',
        }}
        className="group relative rounded-2xl bg-[#0d0e15]/90 border border-white/[0.08] p-6 sm:p-7 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-black/70 backdrop-blur-xl"
      >
        {/* Dynamic Cursor Spotlight Radial Glow */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(${theme.accentRgb}, 0.12), transparent 80%)`,
          }}
        />

        {/* Top Header: Category Tag & Year */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span
              className="inline-flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1 rounded-full border transition-colors"
              style={{
                color: theme.accent,
                borderColor: `rgba(${theme.accentRgb}, 0.28)`,
                backgroundColor: `rgba(${theme.accentRgb}, 0.08)`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: theme.accent }}
              />
              {project.category}
            </span>
            <span className="font-mono text-xs text-slate-400">{project.year}</span>
          </div>

          {/* Title & Tagline */}
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-white transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-slate-400 mt-2 line-clamp-2 leading-relaxed">
            {project.tagline}
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 my-5 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="font-mono text-xs sm:text-sm font-semibold text-slate-200">
                  {m.value}
                </span>
                <span className="text-[10px] text-slate-400 truncate mt-0.5">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer: Tags, Source Code Button & Deep Dive */}
        <div className="relative z-10 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
          {/* Tech tags preview */}
          <div className="flex flex-wrap gap-1.5 max-w-[55%]">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] text-slate-400 bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="font-mono text-[10px] text-slate-400 px-1 py-0.5">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Source Link */}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-xs font-mono text-[#E8F1F2] border border-white/10 hover:border-white/25 transition-all active:scale-95"
              title="View GitHub Repository"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Source</span>
            </a>

            {/* Inspect Modal Trigger */}
            <button
              onClick={() => onInspect(project)}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-medium transition-colors px-2.5 py-1.5 rounded-lg active:scale-95 cursor-pointer"
              style={{ color: theme.accent }}
            >
              <span>Deep Dive</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
