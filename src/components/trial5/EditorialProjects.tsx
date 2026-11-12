import React from 'react';
import { motion } from 'motion/react';
import { 
  GitMerge, 
  ScanFace, 
  TrendingUp, 
  CheckCircle2, 
  ArrowUpRight
} from 'lucide-react';
import { GithubIcon } from '../BrandIcons';
import { useTheme } from './ThemeContext';

interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  description: string;
  features: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  githubUrl: string;
  accentBg: string;
}

export const EditorialProjects: React.FC = () => {
  const { isDark } = useTheme();

  const projects: ProjectItem[] = [
    {
      id: 'price-pilot',
      title: 'PricePilot',
      tagline: 'Amazon Price Tracker & Arbitrage Intelligence Platform',
      category: 'Data Analytics & Web Scraping',
      year: '2025',
      description: 'Enterprise price intelligence and retail arbitrage platform tracking high-frequency product pricing across 5 global Amazon regions and benchmarking against 18 national and international marketplaces.',
      features: [
        'Multi-marketplace price tracking across 18 feeds (Amazon, Flipkart, Croma, Walmart)',
        'Price volatility analytics utilizing 30-day moving averages and variance scoring',
        'Automated multi-channel alerts via HTML Email, Discord Webhooks, and Telegram bots',
        'Split-basket cross-retailer comparison with multi-currency normalization',
      ],
      metrics: [
        { label: 'Retail Feeds', value: '18 Feeds' },
        { label: 'Amazon Regions', value: '5 Global' },
        { label: 'Pytest Suite', value: '100% (59/59)' },
      ],
      tags: ['Python', 'Flask', 'SQLite', 'Pandas', 'Docker', 'Chart.js', 'Pytest'],
      githubUrl: 'https://github.com/Jai-S-Ramani/PricePilot',
      accentBg: 'from-[#C7D4B8]/40 via-white to-white',
    },
    {
      id: 'samyukt',
      title: 'Samyukt',
      tagline: 'Intelligent Cloud-Based Collaborative Platform for Multi-Layer Merge & Conflict Resolution',
      category: 'Systems & Cloud VCS',
      year: '2025',
      description: 'Cloud-native version control platform featuring a proprietary 3-layer semantic merge engine (text-level diff, AST structural parsing, and AI behavioral analysis) to automate complex code conflict resolution across concurrent development branches.',
      features: [
        'Collaborative version control with real-time branch state synchronization',
        'AI-powered conflict resolution utilizing AST grammar tree grafting',
        'Intelligent commit generation with semantic semantic changelog extraction',
        'Multi-layer merging architecture maintaining sub-30ms MongoDB Atlas connection pooling',
      ],
      metrics: [
        { label: 'Merge Engine', value: '3-Layer AST' },
        { label: 'DB Latency', value: '< 30ms Ping' },
        { label: 'Conflict Bypass', value: 'Automated' },
      ],
      tags: ['React', 'Node.js', 'MongoDB Atlas', 'AST Parsing', 'Mongoose', 'Docker'],
      githubUrl: 'https://github.com/Jai-S-Ramani/Samyukt',
      accentBg: 'from-[#C7D4B8]/30 via-white to-white',
    },
    {
      id: 'presence-iq',
      title: 'PresenceIQ',
      tagline: 'AI-Driven Web-Based Automated Attendance System',
      category: 'Computer Vision & Biometrics',
      year: '2025',
      description: 'High-throughput computer vision attendance automation platform integrating InsightFace embeddings, OpenCV anti-spoofing liveness verification, and real-time attendance analytics dashboards with role-based access control.',
      features: [
        'Facial recognition pipeline extracting 512-dimensional vector embeddings',
        'Automated attendance marking with sub-20ms frame evaluation latency',
        'Comprehensive administrative analytics, anomaly reporting, and CSV audits',
        'Intelligent authentication preventing spoofing via dynamic eye-blink & micro-texture verification',
      ],
      metrics: [
        { label: 'Liveness Ratio', value: '99.1%' },
        { label: 'Vector Match', value: '18.4ms' },
        { label: 'IEEE Award', value: '2nd Place' },
      ],
      tags: ['Python', 'OpenCV', 'InsightFace', 'Flask', 'React', 'Tailwind CSS'],
      githubUrl: 'https://github.com/Jai-S-Ramani/PresenceIQ',
      accentBg: 'from-[#858D7A]/20 via-white to-white',
    },
  ];

  return (
    <section 
      id="projects" 
      className={`py-24 px-4 sm:px-6 md:px-10 max-w-[1360px] mx-auto select-none font-sans border-t transition-colors duration-300 ${
        isDark ? 'border-[#1E3325]/80' : 'border-[#C7D4B8]/40'
      }`}
    >
      
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
        <div>
          <span className={`text-xs font-mono uppercase tracking-[0.2em] mb-3 block ${
            isDark ? 'text-[#34D399]' : 'text-[#858D7A]'
          }`}>
            02 // SELECTED PORTFOLIO
          </span>
          <h2 className={`text-4xl sm:text-6xl font-serif tracking-tight ${
            isDark ? 'text-[#F0F4EE]' : 'text-[#242722]'
          }`}>
            Featured <span className={`italic font-normal ${isDark ? 'text-[#34D399]' : 'text-[#141514]'}`}>projects.</span>
          </h2>
        </div>

        <p className={`text-sm max-w-md font-normal leading-relaxed ${
          isDark ? 'text-[#A3B899]' : 'text-[#858D7A]'
        }`}>
          Production-grade systems engineered with rigorous quantitative validation, automated testing, and human-centric interfaces.
        </p>
      </div>

      {/* PROJECT CARDS STACK */}
      <div className="space-y-12">
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`group rounded-[28px] sm:rounded-[36px] border p-5 sm:p-8 lg:p-12 shadow-[0_16px_50px_rgba(0,0,0,0.2)] active:scale-[0.99] transition-all duration-300 overflow-hidden ${
              isDark
                ? 'border-[#1E3325] bg-gradient-to-br from-[#0E1712]/95 to-[#080E0A]/90 hover:border-[#34D399]/40'
                : 'border-[#C7D4B8]/70 bg-gradient-to-br from-white/95 to-[#F5F3E9]/80 hover:border-[#141514]/40'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Project Narrative & Details */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-5 sm:space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                    <span className={`text-[11px] font-mono uppercase font-bold tracking-wider px-3 py-1 rounded-full border ${
                      isDark
                        ? 'border-[#1E3325] bg-[#14261C] text-[#34D399]'
                        : 'border-[#C7D4B8] bg-[#C7D4B8]/30 text-[#141514]'
                    }`}>
                      {project.category}
                    </span>
                    <span className={`text-xs font-mono ${isDark ? 'text-[#85998A]' : 'text-[#858D7A]'}`}>
                      {project.year}
                    </span>
                  </div>

                  <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight mb-2 transition-colors ${
                    isDark ? 'text-[#F0F4EE] group-hover:text-white' : 'text-[#141514] group-hover:text-[#242722]'
                  }`}>
                    {project.title}
                  </h3>

                  <p className={`text-xs sm:text-sm font-serif italic mb-3 sm:mb-4 ${
                    isDark ? 'text-[#A3B899]' : 'text-[#858D7A]'
                  }`}>
                    {project.tagline}
                  </p>

                  <p className={`text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-6 ${
                    isDark ? 'text-[#A3B899]' : 'text-[#242722]/80'
                  }`}>
                    {project.description}
                  </p>
                </div>

                {/* Key Architectural Highlights */}
                <div className={`space-y-2 pt-4 border-t ${isDark ? 'border-[#1E3325]' : 'border-[#C7D4B8]/40'}`}>
                  <span className={`text-[11px] font-mono uppercase tracking-wider block font-semibold ${
                    isDark ? 'text-[#34D399]' : 'text-[#858D7A]'
                  }`}>
                    Core Capabilities:
                  </span>
                  <ul className={`grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs ${
                    isDark ? 'text-[#D2DEC8]' : 'text-[#242722]/85'
                  }`}>
                    {project.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                          isDark ? 'text-[#34D399]' : 'text-[#141514]'
                        }`} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technology Tags & Action Link */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono border ${
                          isDark
                            ? 'border-[#1E3325] bg-[#0E1712] text-[#A3B899]'
                            : 'border-[#C7D4B8] bg-white/60 text-[#242722]/70'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95 group/btn ${
                      isDark
                        ? 'bg-[#34D399] hover:bg-[#6EE7B7] text-[#07100B] font-bold shadow-[0_4px_16px_rgba(52,211,153,0.3)]'
                        : 'bg-[#141514] hover:bg-[#242722] text-[#F5F3E9]'
                    }`}
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>View Repository</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Right Column: Visual Dashboard Preview Component */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className={`rounded-2xl sm:rounded-3xl border p-4 sm:p-6 shadow-sm space-y-4 sm:space-y-6 ${
                  isDark
                    ? 'border-[#1E3325] bg-[#0A120D]'
                    : 'border-[#C7D4B8] bg-white/90'
                }`}>
                  
                  {/* Visual Header */}
                  <div className={`flex items-center justify-between pb-3 sm:pb-4 border-b ${
                    isDark ? 'border-[#1E3325]' : 'border-[#C7D4B8]/30'
                  }`}>
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isDark ? 'bg-[#14261C] text-[#34D399]' : 'bg-[#C7D4B8]/40 text-[#141514]'
                      }`}>
                        {project.id === 'samyukt' && <GitMerge className="w-4 h-4" />}
                        {project.id === 'presence-iq' && <ScanFace className="w-4 h-4" />}
                        {project.id === 'price-pilot' && <TrendingUp className="w-4 h-4" />}
                      </div>
                      <span className={`text-xs font-mono font-bold uppercase ${
                        isDark ? 'text-[#34D399]' : 'text-[#141514]'
                      }`}>
                        {project.title} Telemetry
                      </span>
                    </div>
                  </div>

                  {/* 3 Metric Tiles */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {project.metrics.map((m, i) => (
                      <div 
                        key={i} 
                        className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border text-center ${
                          isDark
                            ? 'border-[#1E3325] bg-[#0E1712]'
                            : 'border-[#C7D4B8]/40 bg-[#F5F3E9]/60'
                        }`}
                      >
                        <span className={`text-[10px] font-mono uppercase block ${
                          isDark ? 'text-[#85998A]' : 'text-[#858D7A]'
                        }`}>
                          {m.label}
                        </span>
                        <span className={`text-xs font-bold mt-1 block ${
                          isDark ? 'text-[#34D399]' : 'text-[#141514]'
                        }`}>
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Status Callout */}
                  <div className={`p-4 rounded-2xl border text-xs leading-relaxed font-mono ${
                    isDark
                      ? 'bg-[#14261C]/50 border-[#1E3325] text-[#D2DEC8]'
                      : 'bg-[#C7D4B8]/20 border-[#C7D4B8]/50 text-[#242722]/80'
                  }`}>
                    {project.id === 'samyukt' && (
                      <p>AST Parser: Conflict-free merge resolution across concurrent branches with automated AST node mapping.</p>
                    )}
                    {project.id === 'presence-iq' && (
                      <p>Biometrics: Real-time 512-D InsightFace facial vector matching with OpenCV multi-frame liveness checks.</p>
                    )}
                    {project.id === 'price-pilot' && (
                      <p>Arbitrage Engine: 30-day moving average time-series with discount variance triggers across 18 feeds.</p>
                    )}
                  </div>

                </div>
              </div>

            </div>
          </motion.article>
        ))}
      </div>

    </section>
  );
};
