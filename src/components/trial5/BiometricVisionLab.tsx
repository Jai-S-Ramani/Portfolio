import React, { useState } from 'react';
import { Scan, Eye, CheckCircle2, RefreshCw, BarChart2, GitMerge } from 'lucide-react';

export const BiometricVisionLab: React.FC = () => {
  const [activeModule, setActiveModule] = useState<'biometrics' | 'timeseries' | 'ast'>('biometrics');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  // Time-Series Hover state
  const [hoverIndex, setHoverIndex] = useState(0);

  // Simulated 30-day time series data
  const timeSeriesData = [
    { day: 'Day 01', price: 48900, sma: 49200, signal: 'HOLD' },
    { day: 'Day 05', price: 49500, sma: 49100, signal: 'HOLD' },
    { day: 'Day 10', price: 50200, sma: 49400, signal: 'WAIT' },
    { day: 'Day 15', price: 47800, sma: 49300, signal: 'MONITOR' },
    { day: 'Day 20', price: 45200, sma: 48900, signal: 'BUY' },
    { day: 'Day 25', price: 41900, sma: 48200, signal: 'STRONG BUY' },
    { day: 'Day 30', price: 39999, sma: 47500, signal: 'ARBITRAGE OPPORTUNITY' },
  ];

  const selectedPoint = timeSeriesData[hoverIndex] || timeSeriesData[0];

  const handleRunScan = () => {
    setIsScanning(true);
    setScanComplete(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 1200);
  };

  return (
    <section className="py-20 px-4 sm:px-6 md:px-10 max-w-[1240px] mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D9C0] uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00D9C0] animate-pulse" />
            Applied Machine Learning Playground
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Model Inference Studio
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-xl">
            Test live simulated model pipelines: InsightFace facial embeddings, 30-day rolling moving averages, and AST semantic merge diffs.
          </p>
        </div>

        {/* Module Switcher */}
        <div className="flex items-center p-1 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md">
          <button
            onClick={() => setActiveModule('biometrics')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              activeModule === 'biometrics'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Scan className="w-3.5 h-3.5" />
            <span>Face Biometrics (PresenceIQ)</span>
          </button>

          <button
            onClick={() => setActiveModule('timeseries')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              activeModule === 'timeseries'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Time-Series (PricePilot)</span>
          </button>

          <button
            onClick={() => setActiveModule('ast')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              activeModule === 'ast'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <GitMerge className="w-3.5 h-3.5" />
            <span>AST Merge (Samyukt)</span>
          </button>
        </div>
      </div>

      {/* Main Studio Card */}
      <div className="rounded-2xl border border-white/[0.09] bg-[#0c0e12]/90 backdrop-blur-xl shadow-2xl overflow-hidden p-6 sm:p-8">
        
        {/* ======================================================== */}
        {/* MODULE A: BIOMETRIC VISION INFERENCE (PresenceIQ) */}
        {/* ======================================================== */}
        {activeModule === 'biometrics' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual HUD Scanner Frame */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center p-6 rounded-2xl border border-white/[0.1] bg-[#060709] min-h-[340px] overflow-hidden">
              {/* Corner HUD Reticles */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#00D9C0]" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#00D9C0]" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#00D9C0]" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#00D9C0]" />

              {/* Scanning Laser Line */}
              {isScanning && (
                <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#00D9C0] to-transparent shadow-[0_0_15px_#00D9C0] animate-bounce" />
              )}

              {/* Stylized Face Mesh Target Graphic */}
              <div className="relative w-44 h-52 border border-white/20 rounded-full flex flex-col items-center justify-center p-4">
                {/* Eye Landmark Nodes */}
                <div className="flex justify-between w-24 mb-6">
                  <div className="w-3 h-3 rounded-full border border-[#00D9C0] bg-[#00D9C0]/30 animate-pulse flex items-center justify-center">
                    <div className="w-1 h-1 bg-[#00D9C0] rounded-full" />
                  </div>
                  <div className="w-3 h-3 rounded-full border border-[#00D9C0] bg-[#00D9C0]/30 animate-pulse flex items-center justify-center">
                    <div className="w-1 h-1 bg-[#00D9C0] rounded-full" />
                  </div>
                </div>

                {/* Nose Node */}
                <div className="w-2.5 h-2.5 rounded-full border border-[#4FACFE] bg-[#4FACFE]/40 mb-5" />

                {/* Mouth Landmark Curve */}
                <div className="w-14 h-3 border-b-2 border-[#00D9C0]/80 rounded-full" />

                {/* Bounding Box Label */}
                <div className="absolute -bottom-3 px-2 py-0.5 rounded bg-black/80 border border-white/20 text-[9px] font-mono text-[#00D9C0]">
                  BOX [142, 88, 210, 260]
                </div>
              </div>

              {/* Live Status Pill */}
              <div className="mt-4 text-xs font-mono text-center">
                {isScanning ? (
                  <span className="text-amber-400 animate-pulse">
                    ⚡ EXTRACTING 512-D EMBEDDINGS...
                  </span>
                ) : scanComplete ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5 justify-center">
                    <CheckCircle2 className="w-4 h-4" /> VERIFIED: USN-2023-AI041 (PASS)
                  </span>
                ) : (
                  <span className="text-white/40">READY FOR LIVE INFERENCE</span>
                )}
              </div>
            </div>

            {/* Inference Telemetry & Trigger */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  InsightFace Biometric Verification Engine
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Extracts 512-dimensional facial feature vectors using OpenCV and InsightFace, matching with cosine similarity against enrolled database with anti-spoof liveness verification.
                </p>
              </div>

              {/* Metrics Output Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                  <span className="text-[10px] font-mono text-white/40">COSINE SIMILARITY</span>
                  <p className="text-lg font-bold font-mono text-[#00D9C0] mt-0.5">
                    {scanComplete ? '0.9782' : '0.0000'}
                  </p>
                  <span className="text-[10px] font-mono text-white/30">Threshold: &gt; 0.9000</span>
                </div>

                <div className="p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                  <span className="text-[10px] font-mono text-white/40">ANTI-SPOOF LIVENESS</span>
                  <p className={`text-lg font-bold font-mono mt-0.5 ${scanComplete ? 'text-emerald-400' : 'text-white/40'}`}>
                    {scanComplete ? 'GENUINE (0.994)' : 'AWAITING'}
                  </p>
                  <span className="text-[10px] font-mono text-white/30">Texture & Depth Filter</span>
                </div>
              </div>

              {/* Extracted Vector Sample */}
              <div className="p-3 rounded-xl border border-white/[0.08] bg-[#07080a] font-mono text-[11px] text-white/60">
                <span className="text-white/40 block mb-1">EXTRACTED VECTOR TENSOR [0:4 of 512]:</span>
                <span className="text-emerald-400">
                  {scanComplete ? '[ 0.0841, -0.2190, 0.4502, 0.1198 ... +508 dims ]' : '[ 0.0000, 0.0000, 0.0000, 0.0000 ... ]'}
                </span>
              </div>

              {/* Trigger Button */}
              <button
                onClick={handleRunScan}
                disabled={isScanning}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#00D9C0] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#00F2FE] transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-[#00D9C0]/20"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-black" />
                    <span>Analyzing Facial Mesh...</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 text-black" />
                    <span>Run Biometric Inference</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODULE B: TIME-SERIES VOLATILITY (PricePilot) */}
        {/* ======================================================== */}
        {activeModule === 'timeseries' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  PricePilot 30-Day Moving Average & Arbitrage Waveform
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Hover across the chronological points below to inspect real-time moving averages and deal quality scores.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>5 Amazon Regions + 18 Retail Feeds</span>
              </div>
            </div>

            {/* Interactive Timeline Points */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {timeSeriesData.map((item, idx) => (
                <button
                  key={idx}
                  onMouseEnter={() => setHoverIndex(idx)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    hoverIndex === idx
                      ? 'border-[#00D9C0] bg-[#00D9C0]/15 shadow-[0_0_15px_rgba(0,217,192,0.2)]'
                      : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.2]'
                  }`}
                >
                  <span className="text-[10px] font-mono text-white/40 block">{item.day}</span>
                  <p className="text-sm font-bold font-mono text-white mt-1">₹{item.price.toLocaleString()}</p>
                  <span className={`text-[10px] font-mono mt-1 block font-bold ${
                    item.signal.includes('BUY') ? 'text-emerald-400' : 'text-white/50'
                  }`}>
                    {item.signal}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected Date Metric Strip */}
            <div className="p-4 rounded-xl border border-white/[0.08] bg-[#07080a] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <div>
                <span className="text-white/40">SELECTED TIMESTAMP:</span>
                <p className="text-white font-bold">{selectedPoint.day} • Market Spot Price</p>
              </div>
              <div>
                <span className="text-white/40">30D MOVING AVERAGE:</span>
                <p className="text-white font-bold">₹{selectedPoint.sma.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-white/40">SPREAD / DISCOUNT:</span>
                <p className="text-emerald-400 font-bold">
                  {Math.round(((selectedPoint.sma - selectedPoint.price) / selectedPoint.sma) * 100)}% Drop
                </p>
              </div>
              <div>
                <span className="text-white/40">ALGORITHM RECOMMENDATION:</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">
                  {selectedPoint.signal}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* MODULE C: 3-LAYER AST MERGE ENGINE (Samyukt) */}
        {/* ======================================================== */}
        {activeModule === 'ast' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Samyukt: 3-Layer Semantic Merge Engine
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Resolves concurrent branch divergence through Text-level diff, AST structural parsing, and AI behavioral analysis.
              </p>
            </div>

            {/* 3-Column Split View */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 rounded-xl border border-white/[0.08] bg-[#07080a]">
                <span className="text-amber-400 font-bold block mb-2">BRANCH A (feature/analytics)</span>
                <pre className="text-white/60 text-[11px] leading-relaxed">
{`function computeKPI(data) {
  // Added moving average
  const ma = movingAvg(data, 30);
  return { ma, items: data.length };
}`}
                </pre>
              </div>

              <div className="p-4 rounded-xl border border-white/[0.08] bg-[#07080a]">
                <span className="text-cyan-400 font-bold block mb-2">BRANCH B (main/production)</span>
                <pre className="text-white/60 text-[11px] leading-relaxed">
{`function computeKPI(data) {
  // Added error handling
  if (!data) throw new Error();
  return { items: data.length };
}`}
                </pre>
              </div>

              <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <span className="text-emerald-400 font-bold block mb-2">✓ RESOLVED VIA AST ENGINE</span>
                <pre className="text-emerald-300 text-[11px] leading-relaxed">
{`function computeKPI(data) {
  if (!data) throw new Error();
  const ma = movingAvg(data, 30);
  return { ma, items: data.length };
}`}
                </pre>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-between text-xs font-mono text-white/50">
              <span>AST Parsing Latency: <strong className="text-white">14.2ms</strong></span>
              <span>Conflict Status: <strong className="text-emerald-400">Zero Conflicts Detected</strong></span>
              <span>Test Suite: <strong className="text-white">100% Supertest & Playwright</strong></span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
