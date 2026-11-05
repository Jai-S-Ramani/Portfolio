import React, { useState } from "react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { Check, Copy, Mail, MapPin, Send, Sparkles } from "lucide-react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { useTheme } from "../context/ThemeContext";

export const ContactSection: React.FC = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: [theme.accent, theme.accentLight, "#ffffff"]
      });
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 pb-6 border-b border-white/5">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span
                className="w-2 h-2 rounded-full animate-ping"
                style={{ backgroundColor: theme.accent }}
              />
              <span
                className="text-xs uppercase tracking-[0.25em] font-mono font-semibold"
                style={{ color: theme.accent }}
              >
                // Communication Link
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Initiate <span className="text-zinc-500">Contact</span>
            </h2>
          </div>
          <p className="mt-4 sm:mt-0 text-sm text-zinc-400 font-mono">
            Open for Data Analytics & AI/ML opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Let's build something exceptional together.
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Whether you have an enterprise analytics challenge, an AI/ML initiative, or want to discuss automated predictive systems, my transmission link is always open.
              </p>
            </div>

            {/* Email quick copy card */}
            <div className="p-6 rounded-2xl bg-zinc-950/70 border border-white/10 relative overflow-hidden group">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300"
                style={{ backgroundColor: theme.accent }}
              />
              <p className="text-xs font-mono text-zinc-400 mb-2">// Direct Transmission</p>
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-sm sm:text-base text-white font-medium truncate">
                  {PERSONAL_INFO.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-2 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-colors border cursor-pointer"
                  style={{
                    backgroundColor: copied ? `rgba(${theme.accentRgb}, 0.2)` : "rgba(255,255,255,0.05)",
                    borderColor: copied ? theme.accent : "rgba(255,255,255,0.1)",
                    color: copied ? theme.accent : "#fff"
                  }}
                  title="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Location & Status */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-zinc-300">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border"
                  style={{
                    backgroundColor: `rgba(${theme.accentRgb}, 0.1)`,
                    borderColor: `rgba(${theme.accentRgb}, 0.3)`,
                    color: theme.accent
                  }}
                >
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-zinc-500">Location</div>
                  <div className="font-medium text-white">{PERSONAL_INFO.location}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-zinc-300">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border"
                  style={{
                    backgroundColor: `rgba(${theme.accentRgb}, 0.1)`,
                    borderColor: `rgba(${theme.accentRgb}, 0.3)`,
                    color: theme.accent
                  }}
                >
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-zinc-500">Availability</div>
                  <div className="font-medium text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Available for Full-Time Roles & Internships
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-white/5">
              <p className="text-xs font-mono text-zinc-500 mb-4">// Verified Networks</p>
              <div className="flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-zinc-900/80 border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white transition-all flex items-center gap-2 text-sm"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span className="font-mono text-xs">GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-zinc-900/80 border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white transition-all flex items-center gap-2 text-sm"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span className="font-mono text-xs">LinkedIn</span>
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="p-3 rounded-xl bg-zinc-900/80 border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white transition-all flex items-center gap-2 text-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span className="font-mono text-xs">Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right form column */}
          <div className="lg:col-span-7">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 sm:p-10 rounded-2xl bg-zinc-950/70 border border-white/10 relative"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2">
                    Name <span style={{ color: theme.accent }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ada Lovelace"
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-white/30 text-white placeholder-zinc-600 font-mono text-sm focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 mb-2">
                    Email <span style={{ color: theme.accent }}>*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="ada@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-white/30 text-white placeholder-zinc-600 font-mono text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-mono text-zinc-400 mb-2">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Data Analytics Pipeline / AI ML Collaboration"
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-white/30 text-white placeholder-zinc-600 font-mono text-sm focus:outline-none transition-colors"
                />
              </div>

              <div className="mb-6">
                <label className="block text-xs font-mono text-zinc-400 mb-2">
                  Message <span style={{ color: theme.accent }}>*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail your engineering objective, dataset specifications, or collaboration proposal..."
                  className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-white/30 text-white placeholder-zinc-600 font-mono text-sm focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-mono text-sm font-semibold flex items-center justify-center gap-2.5 transition-all text-black hover:opacity-90 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                style={{
                  backgroundColor: theme.accent,
                  boxShadow: `0 0 30px ${theme.glow}`
                }}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Transmitting Payload...
                  </>
                ) : submitted ? (
                  <>
                    <Check className="w-4 h-4" /> Message Transmitted Successfully!
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Transmit Message ↗
                  </>
                )}
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};
