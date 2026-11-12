import React, { useState } from 'react';
import { Play, Terminal, Database, Sliders, CheckCircle2, RefreshCw } from 'lucide-react';

export const InteractiveSandbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sql' | 'model' | 'terminal'>('sql');

  // SQL Engine State
  const sqlQueries = [
    {
      id: 'arbitrage',
      name: '01 / Retail Arbitrage Spread (PricePilot)',
      query: `SELECT marketplace, 
       COUNT(sku_id) AS tracked_items,
       ROUND(AVG(discount_pct), 2) AS avg_discount_pct,
       ROUND(MAX(deal_quality_score), 2) AS peak_deal_score
FROM retail_arbitrage_feeds
WHERE region = 'IN' AND in_stock = 1
GROUP BY marketplace
ORDER BY peak_deal_score DESC;`,
      executionTime: '8.4 ms',
      rowsReturned: 4,
      columns: ['Marketplace', 'Tracked Items', 'Avg Discount %', 'Peak Deal Score', 'Action Signal'],
      rows: [
        ['Amazon IN', '1,420', '28.4%', '9.6 / 10', 'STRONG BUY'],
        ['Flipkart', '1,180', '24.1%', '9.1 / 10', 'STRONG BUY'],
        ['Croma', '640', '18.7%', '8.2 / 10', 'HOLD'],
        ['Blinkit', '390', '14.2%', '7.5 / 10', 'WAIT'],
      ],
    },
    {
      id: 'biometrics',
      name: '02 / Facial Vector Cosine Match (PresenceIQ)',
      query: `SELECT student_id,
       section_code,
       ROUND(cosine_similarity(embedding_vector, capture_vector), 4) AS similarity_score,
       liveness_verified,
       timestamp
FROM biometric_attendance_stream
WHERE similarity_score >= 0.90
ORDER BY timestamp DESC
LIMIT 4;`,
      executionTime: '11.2 ms',
      rowsReturned: 4,
      columns: ['Student ID', 'Section', 'Cosine Similarity', 'Liveness Check', 'Verification'],
      rows: [
        ['USN-2023-AI041', 'SEC-A', '0.9782', 'PASSED (Anti-Spoof)', 'VERIFIED'],
        ['USN-2023-AI088', 'SEC-A', '0.9654', 'PASSED (Anti-Spoof)', 'VERIFIED'],
        ['USN-2023-AI012', 'SEC-B', '0.9419', 'PASSED (Anti-Spoof)', 'VERIFIED'],
        ['USN-2023-AI105', 'SEC-A', '0.9128', 'PASSED (Anti-Spoof)', 'VERIFIED'],
      ],
    },
  ];

  const [selectedSqlIndex, setSelectedSqlIndex] = useState(0);
  const [isQueryRunning, setIsQueryRunning] = useState(false);
  const [queryOutput, setQueryOutput] = useState<any>(sqlQueries[0]);

  const handleExecuteQuery = () => {
    setIsQueryRunning(true);
    setTimeout(() => {
      setQueryOutput(sqlQueries[selectedSqlIndex]);
      setIsQueryRunning(false);
    }, 280);
  };

  // Model Simulator State
  const [discountThreshold, setDiscountThreshold] = useState<number>(20);
  const simulatedBasePrice = 49999;
  const simulatedCurrentPrice = Math.round(simulatedBasePrice * (1 - discountThreshold / 100));
  const isBuySignal = discountThreshold >= 18;

  // Terminal State
  const [commandHistory, setCommandHistory] = useState<Array<{ cmd: string; out: string | React.ReactNode }>>([
    { cmd: 'whoami', out: 'Jai S Ramani — Data Analyst | AI & ML Engineer (Bangalore, India)' },
    { cmd: 'skills --top', out: 'SQL (95%), Python/Pandas (96%), OpenCV/InsightFace (92%), Docker, React 19' },
  ]);
  const [currentInput, setCurrentInput] = useState('');

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = currentInput.trim().toLowerCase();
    if (!trimmed) return;

    let output: string | React.ReactNode = '';
    if (trimmed === 'help') {
      output = 'Available commands: whoami, skills, projects, contact, resume, clear';
    } else if (trimmed === 'whoami') {
      output = 'Jai S Ramani — Data Analyst & AI Systems Engineer. B.E. AI/ML @ VTU Bangalore.';
    } else if (trimmed === 'skills') {
      output = 'SQL, Python, Pandas, NumPy, Power BI, Tableau, OpenCV, InsightFace, Docker, Flask, React.';
    } else if (trimmed === 'projects') {
      output = '1. PricePilot (Arbitrage Platform) | 2. Samyukt (Semantic Cloud VCS) | 3. PresenceIQ (Biometric Attendance)';
    } else if (trimmed === 'contact') {
      output = 'Email: jaisramani05@gmail.com | GitHub: github.com/Jai-S-Ramani | LinkedIn: in/jai-s-ramani-2948532bb';
    } else if (trimmed === 'resume') {
      output = 'Opening resume repository: https://github.com/Jai-S-Ramani/Resume.git';
      window.open('https://github.com/Jai-S-Ramani/Resume.git', '_blank');
    } else if (trimmed === 'clear') {
      setCommandHistory([]);
      setCurrentInput('');
      return;
    } else {
      output = `Command not recognized: "${trimmed}". Type "help" for a list of commands.`;
    }

    setCommandHistory((prev) => [...prev, { cmd: currentInput, out: output }]);
    setCurrentInput('');
  };

  return (
    <section id="sandbox" className="py-24 px-4 sm:px-6 md:px-10 max-w-[1240px] mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#00D9C0] uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00D9C0] animate-pulse" />
            Interactive Engineering Lab
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            The Systems Sandbox
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-xl">
            Test live simulated queries, model volatility sliders, and real runtime metrics directly in the browser.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center p-1 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md">
          <button
            onClick={() => setActiveTab('sql')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              activeTab === 'sql'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>SQL Engine</span>
          </button>

          <button
            onClick={() => setActiveTab('model')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              activeTab === 'model'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Model Lab</span>
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              activeTab === 'terminal'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal</span>
          </button>
        </div>
      </div>

      {/* Main Sandbox Window Frame */}
      <div className="rounded-2xl border border-white/[0.09] bg-[#0c0e12]/90 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Window Chrome Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.07] bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs font-mono text-white/40">
              sandbox.jaisramani.dev — {activeTab.toUpperCase()}_RUNTIME_V5
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono text-white/40">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              IN-MEMORY CLUSTER 200 OK
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: SQL QUERY ENGINE */}
        {/* ======================================================== */}
        {activeTab === 'sql' && (
          <div className="p-4 sm:p-6 space-y-6">
            {/* Query Selector Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {sqlQueries.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      setSelectedSqlIndex(idx);
                      setQueryOutput(sqlQueries[idx]);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                      selectedSqlIndex === idx
                        ? 'bg-[#00D9C0]/15 text-[#00D9C0] border border-[#00D9C0]/30 font-medium'
                        : 'bg-white/[0.03] text-white/60 hover:text-white border border-white/[0.06]'
                    }`}
                  >
                    {q.name}
                  </button>
                ))}
              </div>

              <button
                onClick={handleExecuteQuery}
                disabled={isQueryRunning}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#00D9C0] text-black font-semibold text-xs hover:bg-[#00F2FE] transition-all disabled:opacity-50 cursor-pointer shadow-md"
              >
                {isQueryRunning ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-black" />
                )}
                <span>{isQueryRunning ? 'Running...' : 'Execute Query'}</span>
              </button>
            </div>

            {/* SQL Code Block */}
            <div className="rounded-xl border border-white/[0.08] bg-[#07080a] p-4 font-mono text-xs text-emerald-300 leading-relaxed overflow-x-auto shadow-inner">
              <pre>{sqlQueries[selectedSqlIndex].query}</pre>
            </div>

            {/* Execution Telemetry & Output Table */}
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-white/50">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Query Execution Complete ({queryOutput.rowsReturned} rows returned)
                </span>
                <span className="text-[#00D9C0]">
                  Latency: {queryOutput.executionTime}
                </span>
              </div>

              {/* Formatted Data Grid */}
              <div className="rounded-xl border border-white/[0.08] overflow-x-auto bg-white/[0.01]">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/[0.08] bg-white/[0.02] text-white/40">
                      {queryOutput.columns.map((col: string, i: number) => (
                        <th key={i} className="py-2.5 px-4 font-medium">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05]">
                    {queryOutput.rows.map((row: string[], rIdx: number) => (
                      <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                        {row.map((cell: string, cIdx: number) => (
                          <td key={cIdx} className="py-2.5 px-4 text-white/80">
                            {cell.includes('BUY') || cell.includes('VERIFIED') ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                {cell}
                              </span>
                            ) : cell.includes('WAIT') || cell.includes('HOLD') ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                                {cell}
                              </span>
                            ) : (
                              cell
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: MODEL VOLATILITY & SIGNAL LAB */}
        {/* ======================================================== */}
        {activeTab === 'model' && (
          <div className="p-4 sm:p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Controls Column */}
              <div className="md:col-span-5 space-y-4">
                <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02]">
                  <label className="flex items-center justify-between text-xs font-mono text-white/80 mb-2">
                    <span>Discount Sensitivity Threshold:</span>
                    <span className="text-[#00D9C0] font-bold text-sm">
                      {discountThreshold}%
                    </span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="1"
                    value={discountThreshold}
                    onChange={(e) => setDiscountThreshold(Number(e.target.value))}
                    className="w-full accent-[#00D9C0] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-white/40 mt-1">
                    <span>5% (Permissive)</span>
                    <span>40% (Ultra-Strict)</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-white/60">
                    <span>Base 30D Moving Avg:</span>
                    <span className="text-white font-medium">₹{simulatedBasePrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Simulated Retail Spot Price:</span>
                    <span className="text-white font-medium">₹{simulatedCurrentPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-white/60 pt-2 border-t border-white/[0.06]">
                    <span>Calculated Arbitrage Spread:</span>
                    <span className="text-emerald-400 font-bold">
                      +₹{(simulatedBasePrice - simulatedCurrentPrice).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Live Signal Payload Column */}
              <div className="md:col-span-7 flex flex-col justify-between p-4 rounded-xl border border-white/[0.08] bg-[#07080a]">
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <span className="text-white/40">SIMULATED ALERT DISPATCH (DISCORD / TELEGRAM)</span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                        isBuySignal
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      }`}
                    >
                      {isBuySignal ? '⚡ DISPATCH SIGNAL: BUY' : '⏳ DISPATCH SIGNAL: WAIT'}
                    </span>
                  </div>

                  <pre className="text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto">
{`{
  "event": "PRICE_DROP_ARBITRAGE_ALERT",
  "marketplace": "Amazon IN vs Croma Feed",
  "confidence_score": ${(0.82 + discountThreshold * 0.004).toFixed(3)},
  "30d_moving_avg": ${simulatedBasePrice},
  "current_price": ${simulatedCurrentPrice},
  "drop_percentage": "-${discountThreshold}%",
  "bank_offer_stacking": "HDFC Instant 10% Applied",
  "verdict": "${isBuySignal ? 'STRONG_BUY_RECOMMENDATION' : 'HOLD_MONITORING'}"
}`}
                  </pre>
                </div>

                <p className="text-[11px] font-mono text-white/40 mt-4 pt-3 border-t border-white/[0.06]">
                  *Simulates the 6-engine analytics suite in PricePilot with statistical volatility modeling.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: RECRUITER TERMINAL */}
        {/* ======================================================== */}
        {activeTab === 'terminal' && (
          <div className="p-4 sm:p-6 font-mono text-xs space-y-4">
            <div className="text-white/40 text-[11px] pb-2 border-b border-white/[0.06]">
              Interactive Recruiter Shell. Try typing commands: <span className="text-[#00D9C0]">whoami</span>,{' '}
              <span className="text-[#00D9C0]">skills</span>, <span className="text-[#00D9C0]">projects</span>,{' '}
              <span className="text-[#00D9C0]">contact</span>, <span className="text-[#00D9C0]">resume</span>,{' '}
              <span className="text-[#00D9C0]">clear</span>.
            </div>

            <div className="space-y-3 min-h-[160px] max-h-[300px] overflow-y-auto pr-2">
              {commandHistory.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-white/60">
                    <span className="text-[#00D9C0]">jai@portfolio:~$</span>
                    <span className="text-white font-bold">{item.cmd}</span>
                  </div>
                  <div className="text-slate-300 pl-4">{item.out}</div>
                </div>
              ))}
            </div>

            <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-2 border-t border-white/[0.06]">
              <span className="text-[#00D9C0]">jai@portfolio:~$</span>
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="type command (e.g. skills, resume)..."
                className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-white/20"
                autoFocus
              />
              <button
                type="submit"
                className="px-3 py-1 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-white/70 text-xs transition-colors cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
