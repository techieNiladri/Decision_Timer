
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { QUESTIONS } from './constants.ts';
import { Question, UserDecision, Category, AnalysisResult } from './types.ts';
import DecisionCard from './components/DecisionCard.tsx';
import AnalysisView from './components/AnalysisView.tsx';
import { getAIAnalysis } from './services/geminiService.ts';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<'START' | 'NAME_ENTRY' | 'PLAYING' | 'ANALYZING' | 'RESULT'>('START');
  const [userName, setUserName] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [decisions, setDecisions] = useState<UserDecision[]>([]);
  const [timeLeft, setTimeLeft] = useState(8);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  
  const timerRef = useRef<any>(null);
  const lastTickTime = useRef<number>(Date.now());

  const currentQuestion = QUESTIONS[currentIndex];

  const handleDecision = useCallback((choice: string, timedOut: boolean = false) => {
    if (gameState !== 'PLAYING') return;

    const timeTaken = timedOut ? currentQuestion.timeLimit : currentQuestion.timeLimit - timeLeft;
    
    const newDecision: UserDecision = {
      questionId: currentQuestion.id,
      category: currentQuestion.category,
      choice,
      timeTaken,
      timedOut
    };

    const updatedDecisions = [...decisions, newDecision];
    setDecisions(updatedDecisions);

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setTimeLeft(QUESTIONS[currentIndex + 1].timeLimit);
    } else {
      processAnalysis(updatedDecisions);
    }
  }, [currentIndex, decisions, gameState, timeLeft, currentQuestion]);

  const processAnalysis = async (allDecisions: UserDecision[]) => {
    setGameState('ANALYZING');
    
    const traitScores: Record<string, { val: number; count: number }> = {
      'Action': { val: 0, count: 0 },
      'Risk': { val: 0, count: 0 },
      'Control': { val: 0, count: 0 },
      'Speed': { val: 0, count: 0 },
      'Intuition': { val: 0, count: 0 }
    };

    allDecisions.forEach(d => {
      if (d.category === Category.ACTION_DELAY) {
        traitScores['Action'].count++;
        if (d.choice.toLowerCase().includes("now") || d.choice.toLowerCase().includes("immediately")) traitScores['Action'].val += 100;
      }
      if (d.category === Category.COMFORT_GROWTH) {
        traitScores['Risk'].count++;
        if (d.choice.toLowerCase().includes("uncertain") || d.choice.toLowerCase().includes("experiment") || d.choice.toLowerCase().includes("adventure")) traitScores['Risk'].val += 100;
      }
      if (d.category === Category.CONTROL_TRUST) {
        traitScores['Control'].count++;
        if (d.choice.toLowerCase().includes("myself") || d.choice.toLowerCase().includes("plan") || d.choice.toLowerCase().includes("manual")) traitScores['Control'].val += 100;
      }
      if (d.category === Category.PRESSURE_RESPONSE) {
        traitScores['Speed'].count++;
        if (!d.timedOut && d.timeTaken < 2.5) traitScores['Speed'].val += 100;
      }
      if (d.category === Category.LOGIC_INTUITION) {
        traitScores['Intuition'].count++;
        if (d.choice.toLowerCase().includes("gut") || d.choice.toLowerCase().includes("vibe") || d.choice.toLowerCase().includes("open")) traitScores['Intuition'].val += 100;
      }
    });

    const finalScores = Object.entries(traitScores).map(([name, s]) => ({
      name,
      value: s.count > 0 ? Math.max(15, Math.min(100, s.val / s.count)) : 50,
      fullMark: 100
    }));

    const aiRaw = await getAIAnalysis(allDecisions);
    const archetypeMatch = aiRaw.match(/ARCHETYPE:\s*(.*)/i);
    const insightMatch = aiRaw.match(/INSIGHT:\s*([\s\S]*)/i);

    setAnalysisResult({
      userName: userName || "Unknown Subject",
      fiveWordProfile: archetypeMatch ? archetypeMatch[1].trim() : "UNCLASSIFIED. NEURAL. CORE. PATTERN. ACTIVE.",
      title: "Decision Profile",
      description: "Based on your real-time responses.",
      scores: finalScores,
      geminiProfile: insightMatch ? insightMatch[1].trim() : aiRaw
    });
    setGameState('RESULT');
  };

  useEffect(() => {
    if (gameState === 'PLAYING') {
      lastTickTime.current = Date.now();
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const delta = (now - lastTickTime.current) / 1000;
        lastTickTime.current = now;

        setTimeLeft(prev => {
          if (prev - delta <= 0) {
            handleDecision("Timed Out", true);
            return 0;
          }
          return prev - delta;
        });
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, handleDecision]);

  const startNameEntry = () => setGameState('NAME_ENTRY');
  
  const startTest = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userName.trim()) return;
    setDecisions([]);
    setCurrentIndex(0);
    setTimeLeft(QUESTIONS[0].timeLimit);
    setGameState('PLAYING');
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center relative transition-all duration-[2000ms] ease-in-out overflow-hidden bg-ethereal`}>
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.05)_0%,transparent_70%)] bg-glow-soft" />
      </div>
      
      {gameState === 'START' && (
        <div className="text-center px-6 animate-in fade-in zoom-in duration-[1500ms] z-10">
          <div className="mb-12 flex justify-center">
            <div className="relative">
               <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center relative">
                 <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-[1.5px] h-24 animate-[spin_20s_linear_infinite] flex flex-col items-center">
                     <div className="w-full h-1/2 bg-white/40 rounded-full" />
                     <div className="w-full h-1/2" />
                   </div>
                 </div>
                 <div className="w-1.5 h-1.5 bg-white/20 rounded-full z-10" />
               </div>
               <div className="absolute inset-0 rounded-full border border-white/5 scale-125 opacity-20" />
            </div>
          </div>
          <h1 className="text-6xl md:text-9xl font-display font-bold tracking-tighter mb-8 text-white leading-none">
            NEURAL<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-400">DECIDER</span>
          </h1>
          <p className="text-xl md:text-2xl font-light text-slate-400 mb-20 max-w-xl mx-auto italic tracking-[0.15em] uppercase opacity-60">
            How you decide says more than what you decide.
          </p>
          <button
            onClick={startNameEntry}
            className="group relative px-20 py-7 bg-white text-slate-950 rounded-full font-display font-bold text-xl tracking-[0.3em] transition-all duration-500 hover:scale-[1.02] active:scale-95 shadow-[0_0_80px_rgba(255,255,255,0.05)] overflow-hidden"
          >
            <span className="relative z-10 uppercase">GET STARTED</span>
            <div className="absolute inset-0 bg-slate-200 opacity-0 group-hover:opacity-20 transition-opacity" />
          </button>
        </div>
      )}

      {gameState === 'NAME_ENTRY' && (
        <div className="text-center w-full max-w-2xl px-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <h2 className="text-slate-500 font-display font-bold tracking-[0.6em] uppercase text-[10px] mb-12 opacity-40">Identity Verification</h2>
          <form onSubmit={startTest} className="space-y-16">
            <div className="relative max-w-lg mx-auto">
              <input 
                autoFocus
                type="text" 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="TYPE NAME..."
                className="w-full bg-transparent border-b-2 border-white/10 py-6 text-3xl md:text-5xl text-center font-display font-bold text-white placeholder:text-white/5 focus:outline-none focus:border-cyan-500/50 transition-all uppercase tracking-tighter"
              />
            </div>
            <button 
              type="submit"
              disabled={!userName.trim()}
              className="px-16 py-6 bg-white text-black font-display font-bold tracking-[0.4em] uppercase text-sm rounded-full disabled:opacity-20 transition-all hover:scale-105 active:scale-95 shadow-2xl"
            >
              START TEST
            </button>
          </form>
        </div>
      )}

      {gameState === 'PLAYING' && (
        <>
          <div className="absolute top-12 left-0 right-0 flex flex-col items-center gap-3">
            <div className="text-slate-500 font-display font-bold tracking-[0.6em] uppercase text-[9px] opacity-40">
              Pattern Calibration: {userName}
            </div>
            <div className="flex gap-1.5">
              {QUESTIONS.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-[1px] transition-all duration-700 rounded-full ${
                    i === currentIndex ? 'w-10 bg-white shadow-[0_0_10px_white]' : 
                    i < currentIndex ? 'w-2 bg-slate-700' : 'w-1.5 bg-slate-900'
                  }`}
                />
              ))}
            </div>
          </div>
          <DecisionCard 
            key={currentIndex} 
            question={currentQuestion} 
            timeLeft={timeLeft} 
            onSelect={handleDecision} 
          />
        </>
      )}

      {gameState === 'ANALYZING' && (
        <div className="flex flex-col items-center gap-12 animate-in fade-in duration-1000">
          <div className="relative">
            <div className="w-20 h-20 border-[0.5px] border-white/10 rounded-full animate-pulse" />
            <div className="absolute inset-0 w-20 h-20 border-t-[0.5px] border-white/60 rounded-full animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-display font-medium text-white tracking-[0.4em] uppercase">Synthesizing Profile</h2>
            <p className="text-slate-600 font-display text-sm italic tracking-[0.3em] uppercase">Processing {userName}'s behavioral nodes</p>
          </div>
        </div>
      )}

      {gameState === 'RESULT' && analysisResult && (
        <AnalysisView 
          result={analysisResult} 
          onRestart={() => { setGameState('START'); setUserName(''); }} 
        />
      )}

      <footer className="fixed bottom-10 left-10 flex items-center gap-6 opacity-20">
        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        <span className="text-slate-400 text-[9px] font-display tracking-[0.5em] uppercase">Neural.Protocol.V2</span>
      </footer>
    </div>
  );
};

export default App;