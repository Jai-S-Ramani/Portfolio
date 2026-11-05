import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Volume2, Sparkles, Terminal, Copy, Check, Play, Pause, VolumeX } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const LabSection: React.FC = () => {
  const { theme } = useTheme();

  // Audio Synth State
  const [isPlaying, setIsPlaying] = useState(false);
  const [freq, setFreq] = useState(440); // A4
  const [volume, setVolume] = useState(0.25); // 0 to 1
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Code Copy State
  const [codeCopied, setCodeCopied] = useState(false);

  const sampleSnippet = `# PricePilot: Autonomous 6-Engine Volatility & BUY/WAIT Forecaster
import pandas as pd
import numpy as np

def calculate_arbitrage_signal(price_series: pd.Series, window=30) -> dict:
    sma = price_series.rolling(window=window).mean()
    volatility = price_series.pct_change().std() * np.sqrt(window)
    current_price = price_series.iloc[-1]
    z_score = (current_price - sma.iloc[-1]) / (price_series.std() + 1e-6)

    # Statistical Thresholds for BUY / WAIT Signals
    action = "STRONG_BUY" if z_score < -1.5 else "WAIT" if z_score > 0.5 else "MONITOR"
    deal_quality = max(0, min(100, int((1 - (current_price / sma.iloc[-1])) * 100 + 50)))

    return {
        "action": action,
        "deal_quality_score": deal_quality,
        "current_price": round(current_price, 2),
        "volatility_index": round(volatility, 4)
    }`;

  const toggleAudio = async () => {
    if (isPlaying) {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.setTargetAtTime(0.0001, audioCtxRef.current.currentTime, 0.05);
        setTimeout(() => {
          try {
            oscRef.current?.stop();
            oscRef.current?.disconnect();
          } catch {
            // safe fallback
          }
          setIsPlaying(false);
        }, 80);
      } else {
        setIsPlaying(false);
      }
    } else {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

        let ctx = audioCtxRef.current;
        if (!ctx || ctx.state === 'closed') {
          ctx = new AudioCtx();
          audioCtxRef.current = ctx;
        }

        if (ctx.state === 'suspended') {
          await ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Smooth volume ramp
        const targetVolume = Math.max(0.05, volume);
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(targetVolume, ctx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        oscRef.current = osc;
        gainRef.current = gain;
        setIsPlaying(true);
      } catch (err) {
        console.error('Audio playback error:', err);
      }
    }
  };

  const handleFreqChange = (newFreq: number) => {
    setFreq(newFreq);
    if (oscRef.current && audioCtxRef.current) {
      oscRef.current.frequency.setTargetAtTime(newFreq, audioCtxRef.current.currentTime, 0.03);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (gainRef.current && audioCtxRef.current && isPlaying) {
      gainRef.current.gain.setTargetAtTime(
        Math.max(0.0001, newVol),
        audioCtxRef.current.currentTime,
        0.03
      );
    }
  };

  // Canvas Spectrum Visualizer (DO NOT kill audio on animation re-renders)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;
    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = theme.accent;

      const barCount = 32;
      const barW = w / barCount;

      for (let i = 0; i < barCount; i++) {
        const amp = isPlaying
          ? (Math.sin(phase + i * 0.35) * 0.5 + 0.5) * (h * 0.7) + 5
          : Math.sin(phase * 0.5 + i * 0.2) * 4 + 6;

        ctx.fillStyle = `rgba(${theme.accentRgb}, ${isPlaying ? 0.8 : 0.25})`;
        ctx.fillRect(i * barW + 1, h - amp, barW - 2, amp);
      }

      phase += isPlaying ? 0.15 : 0.03;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isPlaying, theme]);

  // Clean audio ONLY on component unmount
  useEffect(() => {
    return () => {
      try {
        oscRef.current?.stop();
        oscRef.current?.disconnect();
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.close();
        }
      } catch {
        // safe unmount
      }
    };
  }, []);

  const copyCode = () => {
    navigator.clipboard.writeText(sampleSnippet);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  return (
    <section id="lab" className="py-24 px-4 sm:px-8 lg:px-14 max-w-6xl mx-auto scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        className="space-y-12"
      >
        {/* Header */}
        <div>
          <div
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider mb-3"
            style={{ color: theme.accent }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>EXPERIMENTAL WORKSPACE // LIVE SANDBOX</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            The Interactive Lab
          </h2>
          <p className="text-sm sm:text-base text-[#E8F1F2]/75 mt-3 max-w-xl">
            Live Web Audio API harmonic resonance synthesis and vectorized time-series arbitrage algorithms.
          </p>
        </div>

        {/* 2-Column Lab Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tool 1: Web Audio Resonance Chamber (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-[#030B0D]/85 border border-white/10 p-6 backdrop-blur-xl shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4" style={{ color: theme.accent }} />
                <span className="font-mono text-xs font-bold text-white uppercase">
                  Harmonic Frequency Chamber
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#557477]">Web Audio API</span>
            </div>

            <p className="text-xs text-[#E8F1F2]/70 leading-relaxed">
              Pure mathematical sine wave synthesizer running directly in your browser. Modulate the frequency slider to analyze harmonic audio waveforms.
            </p>

            {/* Spectrum Canvas */}
            <div className="h-28 w-full rounded-xl bg-black/60 border border-white/10 p-2 overflow-hidden flex items-end">
              <canvas
                ref={canvasRef}
                width={360}
                height={100}
                className="w-full h-full"
              />
            </div>

            {/* Controls */}
            <div className="space-y-4 font-mono">
              {/* Frequency Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#557477]">Carrier Frequency:</span>
                  <span className="font-bold text-white">{freq} Hz</span>
                </div>
                <input
                  type="range"
                  min="110"
                  max="880"
                  step="1"
                  value={freq}
                  onChange={(e) => handleFreqChange(Number(e.target.value))}
                  className="w-full cursor-pointer"
                  style={{ accentColor: theme.accent }}
                />

                {/* Quick frequency presets */}
                <div className="grid grid-cols-4 gap-1.5 mt-2">
                  {[220, 330, 440, 880].map((f) => (
                    <button
                      key={f}
                      onClick={() => handleFreqChange(f)}
                      className={`text-[10px] py-1 rounded-md border transition-all ${
                        freq === f
                          ? 'text-[#030B0D] font-bold shadow-sm'
                          : 'text-[#557477] border-white/10 hover:border-white/20 hover:text-white'
                      }`}
                      style={freq === f ? { backgroundColor: theme.accent, borderColor: theme.accent } : {}}
                    >
                      {f}Hz
                    </button>
                  ))}
                </div>
              </div>

              {/* Volume Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#557477] flex items-center gap-1.5">
                    {volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>Output Gain:</span>
                  </span>
                  <span className="font-bold text-white">{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.5"
                  step="0.01"
                  value={volume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  className="w-full cursor-pointer"
                  style={{ accentColor: theme.accent }}
                />
              </div>

              {/* Start / Stop Button */}
              <button
                onClick={toggleAudio}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
                style={{
                  backgroundColor: isPlaying ? '#FF8A30' : theme.accent,
                  color: '#030B0D',
                  boxShadow: `0 0 20px ${isPlaying ? 'rgba(255,138,48,0.4)' : theme.glow}`,
                }}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Halt Resonance' : 'Initiate Audio Resonance'}</span>
              </button>
            </div>
          </div>

          {/* Tool 2: Code Snippet Sandbox (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#030B0D]/85 border border-white/10 p-6 backdrop-blur-xl shadow-xl space-y-4 font-mono">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs">
                <Terminal className="w-3.5 h-3.5" style={{ color: theme.accent }} />
                <span className="text-white font-semibold">arbitrage_engine.py</span>
              </div>
              <button
                onClick={copyCode}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-xs text-[#557477] hover:text-white border border-white/10 transition-colors"
              >
                {codeCopied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            <pre className="text-xs text-[#C8FACC] bg-black/60 p-4 rounded-xl overflow-x-auto leading-relaxed border border-white/5">
              <code>{sampleSnippet}</code>
            </pre>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
