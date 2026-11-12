import React, { useState } from 'react';
import { Send, Check, Copy, FileText, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../BrandIcons';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { useTheme } from './ThemeContext';

export const EditorialContact: React.FC = () => {
  const { isDark } = useTheme();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section 
      id="contact" 
      className={`py-24 px-4 sm:px-6 md:px-10 max-w-[1360px] mx-auto select-none font-sans border-t transition-colors duration-300 ${
        isDark ? 'border-[#1E3325]/80' : 'border-[#C7D4B8]/40'
      }`}
    >
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Editorial Headline & Social Links */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <span className={`text-xs font-mono uppercase tracking-[0.2em] mb-4 block ${
              isDark ? 'text-[#34D399]' : 'text-[#858D7A]'
            }`}>
              05 // INITIATE CONVERSATION
            </span>
            <h2 className={`text-4xl sm:text-6xl md:text-7xl font-serif leading-[1.05] tracking-tight ${
              isDark ? 'text-[#F0F4EE]' : 'text-[#242722]'
            }`}>
              Have an interesting idea? <br />
              <span className={`italic font-normal ${isDark ? 'text-[#34D399]' : 'text-[#141514]'}`}>
                Let's build something meaningful.
              </span>
            </h2>
          </div>

          <p className={`text-base sm:text-lg leading-relaxed max-w-xl ${
            isDark ? 'text-[#A3B899]' : 'text-[#242722]/80'
          }`}>
            Currently open for engineering roles, technical collaborations, and data science challenges. Feel free to send a transmission or connect via social channels.
          </p>

          {/* Quick Contact Badge Pills */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleCopy}
                className={`min-h-[44px] flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-semibold transition-all cursor-pointer shadow-sm active:scale-95 ${
                  isDark
                    ? 'border-[#1E3325] hover:border-[#34D399] bg-[#0E1712] text-[#D2DEC8]'
                    : 'border-[#C7D4B8] hover:border-[#141514] bg-white/80 hover:bg-white text-[#141514]'
                }`}
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 opacity-60" />}
                <span>{copiedEmail ? 'Email Copied!' : PERSONAL_INFO.email}</span>
              </button>

              <a
                href={PERSONAL_INFO.resume}
                target="_blank"
                rel="noopener noreferrer"
                className={`min-h-[44px] flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm active:scale-95 group ${
                  isDark
                    ? 'bg-[#34D399] hover:bg-[#6EE7B7] text-[#07100B] font-bold shadow-[0_4px_16px_rgba(52,211,153,0.3)]'
                    : 'bg-[#141514] hover:bg-[#242722] text-[#F5F3E9]'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Download Resume</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Social Network Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`min-h-[44px] flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold transition-all shadow-sm active:scale-95 ${
                  isDark
                    ? 'border-[#1E3325] bg-[#0E1712] text-[#A3B899] hover:text-[#34D399]'
                    : 'border-[#C7D4B8] bg-white/70 hover:bg-white text-[#141514]'
                }`}
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`min-h-[44px] flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold transition-all shadow-sm active:scale-95 ${
                  isDark
                    ? 'border-[#1E3325] bg-[#0E1712] text-[#A3B899] hover:text-[#34D399]'
                    : 'border-[#C7D4B8] bg-white/70 hover:bg-white text-[#141514]'
                }`}
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Cardova-Style Contact Form */}
        <div className="lg:col-span-6 w-full">
          <div className={`p-5 sm:p-8 lg:p-12 rounded-[28px] sm:rounded-[36px] border shadow-[0_16px_50px_rgba(0,0,0,0.3)] transition-colors duration-300 ${
            isDark
              ? 'border-[#1E3325] bg-gradient-to-br from-[#0E1712]/95 to-[#080E0A]/90'
              : 'border-[#C7D4B8]/70 bg-gradient-to-br from-white/95 to-[#F5F3E9]/80 backdrop-blur-xl'
          }`}>
            <h3 className={`text-xl font-serif font-bold mb-6 ${
              isDark ? 'text-[#F0F4EE]' : 'text-[#141514]'
            }`}>
              Send a direct message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className={`text-xs font-mono font-medium uppercase ${
                    isDark ? 'text-[#34D399]' : 'text-[#858D7A]'
                  }`}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-2xl border text-sm transition-colors focus:outline-none ${
                      isDark
                        ? 'border-[#1E3325] bg-[#0A120D] text-[#E8ECE6] placeholder-[#5C7063] focus:border-[#34D399]'
                        : 'border-[#C7D4B8] bg-white/90 text-[#242722] placeholder-[#9E9F9F] focus:border-[#141514]'
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className={`text-xs font-mono font-medium uppercase ${
                    isDark ? 'text-[#34D399]' : 'text-[#858D7A]'
                  }`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-2xl border text-sm transition-colors focus:outline-none ${
                      isDark
                        ? 'border-[#1E3325] bg-[#0A120D] text-[#E8ECE6] placeholder-[#5C7063] focus:border-[#34D399]'
                        : 'border-[#C7D4B8] bg-white/90 text-[#242722] placeholder-[#9E9F9F] focus:border-[#141514]'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className={`text-xs font-mono font-medium uppercase ${
                  isDark ? 'text-[#34D399]' : 'text-[#858D7A]'
                }`}>
                  Project or Opportunity Details
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell me about your team, problem space, or technical vision..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className={`w-full px-4 py-3 rounded-2xl border text-sm transition-colors resize-none focus:outline-none ${
                    isDark
                      ? 'border-[#1E3325] bg-[#0A120D] text-[#E8ECE6] placeholder-[#5C7063] focus:border-[#34D399]'
                      : 'border-[#C7D4B8] bg-white/90 text-[#242722] placeholder-[#9E9F9F] focus:border-[#141514]'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitted}
                className={`w-full py-4 rounded-full text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 ${
                  isDark
                    ? 'bg-[#34D399] hover:bg-[#6EE7B7] text-[#07100B] font-bold shadow-[0_8px_24px_rgba(52,211,153,0.3)]'
                    : 'bg-[#141514] hover:bg-[#242722] text-[#F5F3E9] shadow-[0_8px_24px_rgba(20,21,20,0.15)]'
                }`}
              >
                {isSubmitted ? (
                  <>
                    <Check className="w-4 h-4 text-[#07100B]" />
                    <span>Message Transmitted Successfully</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>

    </section>
  );
};
