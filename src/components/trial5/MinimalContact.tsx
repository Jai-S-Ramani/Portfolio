import React, { useState } from 'react';
import { Mail, Copy, Check, Send, FileText, ArrowUpRight, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../BrandIcons';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const MinimalContact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setFormSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 md:px-10 max-w-[1240px] mx-auto">
      {/* Contact Card */}
      <div className="rounded-3xl border border-white/[0.09] bg-[#0c0e12]/90 backdrop-blur-2xl p-6 sm:p-10 md:p-14 shadow-2xl relative overflow-hidden">
        {/* Ambient Corner Glow */}
        <div className="pointer-events-none absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#00D9C0]/10 via-[#4FACFE]/5 to-transparent rounded-full blur-3xl -mr-20 -mt-20" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
          {/* Left Column: Direct Inquiries */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D9C0] uppercase tracking-wider mb-2">
                <span className="w-2 h-2 rounded-full bg-[#00D9C0]" />
                Initiate Conversation
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
                Let's engineer something exceptional.
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Open to Data Analyst, Applied AI, and Machine Learning Engineering positions.
                Let's discuss predictive pipelines, data systems, or quantitative modeling.
              </p>

              {/* Quick Copy Email Pill */}
              <div className="mb-6">
                <p className="text-xs font-mono text-white/40 mb-2">DIRECT EMAIL</p>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center justify-between w-full max-w-sm p-3.5 rounded-xl border border-white/[0.1] bg-white/[0.03] hover:border-[#00D9C0]/50 hover:bg-white/[0.05] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-[#00D9C0]" />
                    <span className="text-xs font-mono text-white font-medium">
                      {PERSONAL_INFO.email}
                    </span>
                  </div>
                  {copied ? (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                      <Check className="w-3.5 h-3.5" /> Copied
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-white/50 group-hover:text-white">
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </span>
                  )}
                </button>
              </div>

              {/* Location & Timezone */}
              <div className="flex items-center gap-2 text-xs font-mono text-white/50">
                <MapPin className="w-3.5 h-3.5 text-[#00D9C0]" />
                <span>{PERSONAL_INFO.location} • {PERSONAL_INFO.timeZone}</span>
              </div>
            </div>

            {/* Social & Resume Links */}
            <div className="flex flex-wrap items-center gap-3 pt-6 mt-6 border-t border-white/[0.08]">
              <a
                href={PERSONAL_INFO.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
                <ArrowUpRight className="w-3 h-3 opacity-60" />
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/[0.1] hover:border-white/[0.25] bg-white/[0.03] text-white text-xs font-mono transition-colors cursor-pointer"
              >
                <GithubIcon className="w-3.5 h-3.5 text-white/80" />
                <span>GitHub</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/[0.1] hover:border-white/[0.25] bg-white/[0.03] text-white text-xs font-mono transition-colors cursor-pointer"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-white/80" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Direct Message Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Mercer"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white text-xs font-mono placeholder-white/20 focus:outline-none focus:border-[#00D9C0]/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/60 mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white text-xs font-mono placeholder-white/20 focus:outline-none focus:border-[#00D9C0]/60 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/60 mb-1.5">
                  Project or Opportunity Details
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about the role, technical challenge, or dataset..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white text-xs font-mono placeholder-white/20 focus:outline-none focus:border-[#00D9C0]/60 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#00D9C0] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#00F2FE] transition-all shadow-[0_4px_24px_rgba(0,217,192,0.25)] cursor-pointer"
              >
                {formSubmitted ? (
                  <>
                    <Check className="w-4 h-4 text-black" />
                    <span>Message Received — Thank You!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 fill-black" />
                    <span>Transmit Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
        <p>© 2026 Jai S Ramani. Crafted with minimalism, React 19, Three.js & Tailwind CSS.</p>
        <div className="flex items-center gap-4">
          <a href="#hero" className="hover:text-white transition-colors">Back to top ↑</a>
          <span>•</span>
          <span className="text-[#00D9C0]">Bangalore, India</span>
        </div>
      </footer>
    </section>
  );
};
