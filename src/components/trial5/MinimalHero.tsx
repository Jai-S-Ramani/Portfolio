import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../BrandIcons';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { CardovaCardDeck } from './CardovaCardDeck';

export const MinimalHero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-28 sm:pt-36 pb-20 px-4 sm:px-6 md:px-10 max-w-[1340px] mx-auto font-sans">
      {/* Editorial Grid: Text Hierarchy on Left, 3D Cardova Corporate Card Stack on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Typography & Intent (Cardova Serif-Italic Editorial) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex flex-col items-start"
        >
          {/* Status Label (Sage & Forest Pill) */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#2D5442] bg-[#0E1F18]/80 backdrop-blur-md mb-6 shadow-[0_4px_16px_rgba(0,0,0,0.5)]">
            <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse shadow-[0_0_8px_#34D399]" />
            <span className="text-[11px] font-mono text-[#D2DEC8] tracking-wider uppercase font-semibold">
              CARDOVA FINTECH AESTHETICS // CORPORATE DATA PLATFORM
            </span>
          </div>

          {/* Huge Clean Typography with Cardova Italic Serif Accent */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#E8ECE6] leading-[1.08] mb-6">
            The new standard in <br />
            <span className="font-serif italic font-normal text-[#A3B899] drop-shadow-[0_2px_10px_rgba(163,184,153,0.2)]">
              corporate data
            </span>{' '}
            & predictive systems.
          </h1>

          {/* Crisp Analytical Bio */}
          <p className="text-base sm:text-lg text-[#A3B899] font-normal leading-relaxed max-w-xl mb-8">
            Engineered like modern institutional financial systems: quantitative data pipelines, 
            time-series arbitrage forecasting, and biometric computer vision models designed for absolute precision with{' '}
            <span className="text-[#E8ECE6] font-semibold">SQL</span>,{' '}
            <span className="text-[#E8ECE6] font-semibold">Python (Pandas, NumPy)</span>,{' '}
            <span className="text-[#E8ECE6] font-semibold">Power BI</span>, and{' '}
            <span className="text-[#E8ECE6] font-semibold">Dockerized microservices</span>.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              onClick={() => scrollTo('projects')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#E8ECE6] text-[#0A1813] font-bold text-sm hover:bg-white hover:scale-[1.02] active:scale-98 transition-all shadow-[0_4px_24px_rgba(232,236,230,0.2)] cursor-pointer"
            >
              <span>Audit Portfolio Ledger</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollTo('sandbox')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#2D5442] hover:border-[#34D399] bg-[#0E1F18]/80 text-[#D2DEC8] text-sm font-semibold hover:bg-[#142B21] transition-all cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
            >
              <Sparkles className="w-4 h-4 text-[#34D399]" />
              <span>Model Inference Studio</span>
            </button>

            {/* Social Icons */}
            <div className="flex items-center gap-2 ml-1">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub Profile"
                className="p-3.5 rounded-full border border-[#233B30] hover:border-[#34D399]/50 bg-[#0E1F18]/80 text-[#A3B899] hover:text-[#E8ECE6] transition-all cursor-pointer"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn Profile"
                className="p-3.5 rounded-full border border-[#233B30] hover:border-[#34D399]/50 bg-[#0E1F18]/80 text-[#A3B899] hover:text-[#E8ECE6] transition-all cursor-pointer"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: 3D Interactive Cardova Titanium Corporate Card Deck */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 flex justify-center items-center"
        >
          <CardovaCardDeck />
        </motion.div>
      </div>
    </section>
  );
};
