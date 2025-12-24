import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  PolarRadiusAxis,
} from "recharts";
import { AnalysisResult } from "../types.ts";

interface AnalysisViewProps {
  result: AnalysisResult;
  onRestart: () => void;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ result, onRestart }) => {
  return (
    <div className="w-full max-w-7xl p-6 md:p-12 animate-in fade-in slide-in-from-bottom-20 duration-1000 overflow-y-auto max-h-[95vh] scroll-smooth">
      <div className="flex flex-col items-center mb-16">
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[4rem] px-8 py-16 md:px-16 md:py-24 w-full max-w-5xl shadow-[0_0_120px_rgba(0,0,0,0.6)] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
          <div className="text-center relative z-10">
            <p className="text-cyan-400 font-display font-bold text-[11px] tracking-[0.8em] uppercase mb-10 opacity-60">
              Verified Neural Identity
            </p>
            <h2 className="text-6xl md:text-9xl font-display font-bold text-white mb-10 uppercase tracking-tighter leading-none">
              {result.userName}
            </h2>
            <div className="h-[1px] w-48 bg-white/10 mx-auto mb-12" />
            <p className="text-2xl md:text-4xl font-display font-medium text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-white to-slate-300 tracking-[0.25em] uppercase italic drop-shadow-sm">
              {result.fiveWordProfile}
            </p>
          </div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-stretch">
        <div className="xl:col-span-7 bg-slate-900/60 backdrop-blur-3xl rounded-[4rem] p-10 border border-white/10 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
          <div className="w-full h-[500px] md:h-[600px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="80%"
                data={result.scores}
              >
                <PolarGrid stroke="#475569" strokeDasharray="3 3" />
                <PolarAngleAxis
                  dataKey="name"
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "Space Grotesk",
                  }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={false}
                  axisLine={false}
                />
                <Radar
                  name="Trait Alignment"
                  dataKey="value"
                  stroke="#22d3ee"
                  strokeWidth={4}
                  fill="url(#radarGradient)"
                  fillOpacity={0.6}
                  animationDuration={2500}
                />
                <defs>
                  <linearGradient
                    id="radarGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.4} />
                  </linearGradient>
                </defs>
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="xl:col-span-5 flex flex-col gap-8">
          <div className="bg-gradient-to-br from-slate-900/80 to-indigo-950/40 p-12 rounded-[4rem] border border-white/10 shadow-2xl flex-1 flex flex-col justify-center relative min-h-[400px]">
            <div className="relative z-10 space-y-8">
              <h3 className="text-sm font-display font-bold text-cyan-400 uppercase tracking-[0.4em] opacity-80">
                Behavioral Intelligence Audit
              </h3>
              <p className="text-slate-200 text-2xl md:text-3xl leading-relaxed font-light italic tracking-tight">
                {result.geminiProfile}
              </p>
            </div>
          </div>

          <button
            onClick={onRestart}
            className="group relative w-full py-12 rounded-[3rem] bg-white text-slate-950 font-display font-extrabold text-2xl tracking-[0.4em] transition-all hover:bg-cyan-400 hover:text-white overflow-hidden shadow-2xl active:scale-95"
          >
            <span className="relative z-10">RESET UPLINK</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-indigo-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </div>
      </div>

      <div className="mt-32 mb-16 flex flex-col items-center">
        <div className="w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20" />

        <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 group transition-all duration-700 hover:border-white/10">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-cyan-500/50 transition-all duration-700">
              <img
                src="https://avatars.githubusercontent.com/u/165951787?v=4"
                alt="Developer Profile"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110"
              />
            </div>
            <div className="absolute -inset-2 border border-cyan-500/10 rounded-full animate-pulse pointer-events-none" />
          </div>

          <div className="text-center md:text-left space-y-4">
            <div>
              <h4 className="text-white font-display font-bold text-2xl tracking-tight uppercase">
                Niladri Dey
              </h4>
              <p className="text-cyan-400 font-display text-[10px] font-bold uppercase tracking-[0.4em]">
                Neural Experience Architect
              </p>
            </div>
            <p className="text-slate-400 max-w-md text-sm leading-relaxed font-light italic opacity-80">
              Mapping the intersection of human cognition and adaptive
              intelligence. This protocol analyzes micro-decisions to build a
              holistic behavioral fingerprint.
            </p>
            <div className="flex justify-center md:justify-start gap-8 pt-2">
              <a
                href="https://github.com/techieNiladri"
                className="text-slate-600 hover:text-white text-[10px] font-bold tracking-[0.2em] uppercase transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/niladri-dey-280710d/"
                className="text-slate-600 hover:text-white text-[10px] font-bold tracking-[0.2em] uppercase transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <p className="mt-20 text-slate-800 text-[10px] font-display tracking-[0.8em] uppercase opacity-40">
          © {new Date().getFullYear()} BEHAVIORAL PROTOCOL LABS
        </p>
      </div>
    </div>
  );
};

export default AnalysisView;
