import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  CreditCard, 
  Wifi, 
  TrendingUp, 
  CheckCircle2, 
  Lock,
  Zap,
  Activity
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const CardovaCardDeck: React.FC = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [hardwareLock, setHardwareLock] = useState(true);
  const [copiedPill, setCopiedPill] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 3 Distinct Cardova Titanium Corporate Cards
  const cards = [
    {
      id: 'price-pilot',
      issuer: 'PricePilot Arbitrage Corp',
      tier: 'TITANIUM ARBITRAGE',
      chipColor: '#FFD700', // Gold Chip
      gradient: 'linear-gradient(135deg, #173628 0%, #0F251C 45%, #081611 100%)',
      borderColor: '#34D399',
      borderGlow: 'rgba(52, 211, 153, 0.4)',
      accentColor: '#34D399',
      number: '4921 •••• •••• 5959',
      holder: 'JAI S RAMANI',
      expiry: '100% PASS',
      badge: '18 FEEDS · 5 REGIONS',
      limit: '₹74,999.00',
      limitSub: 'Arbitrage Alpha Verified',
      transactions: [
        { title: 'Flipkart Benchmark Arbitrage', amount: '+₹4,200', time: '10:42 AM', tag: 'Alpha Signal', status: 'STRONG BUY' },
        { title: 'Amazon US 30D Moving Avg', amount: '-$120.50', time: '08:15 AM', tag: 'Price Drop', status: 'DISCOUNT' },
        { title: 'Pytest Suite 59/59 Automated', amount: '100% Pass', time: 'Yesterday', tag: 'CI/CD Pass', status: 'VERIFIED' },
      ]
    },
    {
      id: 'samyukt',
      issuer: 'Samyukt VCS Infinite',
      tier: 'INFINITE METAL',
      chipColor: '#E2E8F0', // Silver/Platinum Chip
      gradient: 'linear-gradient(135deg, #23372C 0%, #16241D 45%, #0B1410 100%)',
      borderColor: '#A3B899',
      borderGlow: 'rgba(163, 184, 153, 0.4)',
      accentColor: '#A3B899',
      number: '5582 •••• •••• 3030',
      holder: 'JAI S RAMANI',
      expiry: '03/30 MS',
      badge: '3-LAYER AST MERGE',
      limit: '< 30ms PING',
      limitSub: 'MongoDB Connection Pool',
      transactions: [
        { title: 'AST Semantic Conflict Graft', amount: '0 Conflicts', time: '11:20 AM', tag: 'Auto Merge', status: 'RESOLVED' },
        { title: 'MongoDB Atlas Ping Latency', amount: '11.8ms', time: '09:04 AM', tag: 'Pooling', status: 'OPTIMAL' },
        { title: 'Mongoose 6-Entity Schema Pool', amount: 'Sync Active', time: 'Yesterday', tag: 'Database', status: 'HEALTHY' },
      ]
    },
    {
      id: 'presence-iq',
      issuer: 'PresenceIQ Biometrics',
      tier: 'BLACK BIOMETRIC EDITION',
      chipColor: '#FFD700', // Gold Chip
      gradient: 'linear-gradient(135deg, #1B2F25 0%, #101F18 45%, #060D0A 100%)',
      borderColor: '#84A98C',
      borderGlow: 'rgba(132, 169, 140, 0.45)',
      accentColor: '#84A98C',
      number: '4012 •••• •••• 9910',
      holder: 'JAI S RAMANI',
      expiry: '99.1% AUTH',
      badge: '18.4MS LIVENESS VERIFIED',
      limit: '99.1% MATCH',
      limitSub: 'Euclidean Vector Distance 0.041',
      transactions: [
        { title: 'InsightFace Vector Extract', amount: '512-D Float', time: '12:05 PM', tag: 'Cosine Dist', status: 'MATCHED' },
        { title: 'OpenCV Real-Time Liveness Check', amount: '0.982 Ratio', time: '10:18 AM', tag: 'Anti-Spoof', status: 'PASSED' },
        { title: 'Smartworld 2025 IEEE Best Pres.', amount: '2nd Place', time: '2025', tag: 'Accreditation', status: 'HONOR' },
      ]
    }
  ];

  const activeCard = cards[activeCardIndex];

  // Mouse tilt tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleCopyCard = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedPill(true);
    setTimeout(() => setCopiedPill(false), 2000);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      className="relative w-full max-w-[560px] mx-auto select-none font-sans"
    >
      {/* Top Card Selector Tabs (Cardova Style) */}
      <div className="flex items-center justify-between gap-2 p-1.5 rounded-2xl border border-[#2D4539] bg-[#0E1F18]/80 backdrop-blur-xl mb-6 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
        {cards.map((c, idx) => (
          <button
            key={c.id}
            onClick={() => setActiveCardIndex(idx)}
            className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-semibold tracking-tight transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeCardIndex === idx
                ? 'bg-gradient-to-r from-[#1E3E30] to-[#2B5441] text-[#E8ECE6] border border-[#3E6B56] shadow-[0_4px_16px_rgba(46,84,65,0.4)]'
                : 'text-[#8EA89B] hover:text-[#E8ECE6] hover:bg-white/[0.04]'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 opacity-80" />
            <span className="truncate">{c.issuer.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* 3D FLOATING CARDOVA CARD CONTAINER */}
      <div 
        className="relative h-[330px] sm:h-[350px] w-full flex items-center justify-center"
        style={{ perspective: '1200px' }}
      >
        {cards.map((card, idx) => {
          const isSelected = activeCardIndex === idx;
          // Calculate stack offset for realistic Cardova fanning
          const diff = idx - activeCardIndex;
          const zIndex = isSelected ? 30 : 20 - Math.abs(diff);
          const translateY = isSelected ? (isHovered ? -12 : 0) : diff * 24 + 20;
          const translateX = isSelected ? 0 : diff * 32;
          const rotateZ = isSelected ? (isHovered ? mousePos.x * 6 : 0) : diff * 5;
          const scale = isSelected ? 1 : 0.92 - Math.abs(diff) * 0.04;
          const opacity = isSelected ? 1 : 0.55;

          const tiltX = isSelected && isHovered ? -mousePos.y * 18 : 0;
          const tiltY = isSelected && isHovered ? mousePos.x * 22 : 0;

          return (
            <motion.div
              key={card.id}
              onClick={() => setActiveCardIndex(idx)}
              animate={{
                transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotateZ(${rotateZ}deg) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
                opacity,
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 24,
              }}
              style={{
                zIndex,
                background: card.gradient,
                borderColor: card.borderColor,
                boxShadow: isSelected 
                  ? `0 24px 60px rgba(0, 0, 0, 0.8), 0 0 45px ${card.borderGlow}` 
                  : '0 12px 30px rgba(0, 0, 0, 0.6)',
              }}
              className={`absolute w-[340px] sm:w-[410px] h-[215px] sm:h-[245px] rounded-[24px] border p-6 flex flex-col justify-between overflow-hidden cursor-pointer transition-shadow duration-500`}
            >
              {/* Glossy Metallic Light Gleam Overlay */}
              <div 
                className="pointer-events-none absolute inset-0 opacity-60 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent"
                style={{
                  transform: `translateX(${mousePos.x * 60}px) translateY(${mousePos.y * 60}px)`,
                }}
              />

              {/* CARD TOP ROW: Issuer & Contactless Wave */}
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#34D399] animate-pulse shadow-[0_0_8px_#34D399]" />
                    <span className="text-[11px] font-bold tracking-widest text-[#D2DEC8] uppercase">
                      {card.issuer}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono tracking-wider text-[#84A98C] uppercase block mt-0.5">
                    {card.tier}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[#A3B899]">
                  <Wifi className="w-5 h-5 rotate-90 opacity-80" />
                </div>
              </div>

              {/* CARD MIDDLE ROW: EMV Smart Chip & Foil Logo */}
              <div className="relative z-10 flex items-center justify-between my-auto">
                {/* Metallic Gold/Silver Chip */}
                <div 
                  className="w-11 h-8 rounded-md border border-black/30 flex flex-col justify-between p-1 shadow-inner relative overflow-hidden"
                  style={{ backgroundColor: card.chipColor }}
                >
                  <div className="w-full h-[1px] bg-black/20" />
                  <div className="w-full h-[1px] bg-black/20" />
                  <div className="absolute inset-0 border border-white/40 rounded-sm pointer-events-none" />
                </div>

                {/* Titanium Hologram Badge */}
                <div className="px-3 py-1 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-md">
                  <span className="text-[10px] font-mono font-bold text-[#E8ECE6] tracking-wider uppercase">
                    {card.badge}
                  </span>
                </div>
              </div>

              {/* CARD BOTTOM ROW: Masked Number, Holder & Expiry */}
              <div className="relative z-10 space-y-2">
                <div className="text-base sm:text-lg font-mono font-bold tracking-[0.22em] text-[#E8ECE6] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {card.number}
                </div>

                <div className="flex items-end justify-between text-xs font-mono">
                  <div>
                    <span className="text-[9px] text-[#84A98C] uppercase tracking-wider block">
                      CARDHOLDER
                    </span>
                    <span className="font-bold text-[#E8ECE6] tracking-wide">
                      {card.holder}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] text-[#84A98C] uppercase tracking-wider block">
                      BENCHMARK
                    </span>
                    <span className="font-bold text-[#34D399] tracking-wider">
                      {card.expiry}
                    </span>
                  </div>
                </div>
              </div>

              {/* Subtle card bottom titanium reflection rim */}
              <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#34D399]/40 to-transparent" />
            </motion.div>
          );
        })}
      </div>

      {/* FLOATING FINTECH TELEMETRY WIDGETS (Cardova Landing Page Style) */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Widget 1: Limit & Spend Tracker */}
        <div className="p-4 rounded-2xl border border-[#233B30] bg-[#0A1813]/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-bold uppercase text-[#84A98C] tracking-wider">
              PORTFOLIO LEDGER ALPHA
            </span>
            <div className="flex items-center gap-1 text-[10px] text-[#34D399] font-bold bg-[#34D399]/10 px-2 py-0.5 rounded-full border border-[#34D399]/30">
              <TrendingUp className="w-3 h-3" />
              <span>+24.8% Alpha</span>
            </div>
          </div>
          <div className="text-2xl font-bold font-mono text-[#E8ECE6] tracking-tight">
            {activeCard.limit}
          </div>
          <span className="text-[11px] text-[#84A98C] block mt-0.5">
            {activeCard.limitSub}
          </span>
        </div>

        {/* Widget 2: Security & Quick Signal Key */}
        <div className="p-4 rounded-2xl border border-[#233B30] bg-[#0A1813]/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase text-[#84A98C] tracking-wider">
              TITANIUM HARDWARE LOCK
            </span>
            <button
              onClick={() => setHardwareLock(!hardwareLock)}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                hardwareLock 
                  ? 'border-[#34D399]/50 bg-[#34D399]/15 text-[#34D399]' 
                  : 'border-white/10 bg-white/5 text-white/40'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/[0.06]">
            <span className="text-xs text-[#D2DEC8] font-medium">
              Direct Inquiries
            </span>
            <button
              onClick={handleCopyCard}
              className="text-xs font-mono font-bold text-[#34D399] hover:underline cursor-pointer flex items-center gap-1"
            >
              {copiedPill ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5" />}
              <span>{copiedPill ? 'Signal Copied' : 'Issue Contact Key'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-Time Transaction Stream Ledger (Under the Cards) */}
      <div className="mt-3 p-4 rounded-2xl border border-[#233B30] bg-[#0A1813]/85 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-3 text-[10px] font-mono uppercase tracking-widest text-[#84A98C]">
          <span>RECENT PIPELINE TRANSACTIONS</span>
          <span className="flex items-center gap-1 text-[#34D399]">
            <Activity className="w-3 h-3 animate-pulse" />
            <span>LIVE AUDIT</span>
          </span>
        </div>

        <div className="space-y-2">
          {activeCard.transactions.map((tx, i) => (
            <div 
              key={i}
              className="p-2.5 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#193327] border border-[#2D5442] flex items-center justify-center text-[#34D399] font-bold text-[10px]">
                  {tx.tag.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <span className="font-semibold text-[#E8ECE6] block leading-tight">
                    {tx.title}
                  </span>
                  <span className="text-[10px] text-[#84A98C]">
                    {tx.time} · {tx.tag}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-mono font-bold text-[#34D399] block">
                  {tx.amount}
                </span>
                <span className="text-[9px] font-mono text-[#A3B899] uppercase">
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
