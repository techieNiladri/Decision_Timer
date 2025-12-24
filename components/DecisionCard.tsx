
import React from 'react';
import { Question } from '../types.ts';

interface DecisionCardProps {
  question: Question;
  timeLeft: number;
  onSelect: (choice: string) => void;
}

const DecisionCard: React.FC<DecisionCardProps> = ({ question, timeLeft, onSelect }) => {
  const progress = (timeLeft / question.timeLimit) * 100;
  
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl px-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out">
      <div className="w-full bg-white/5 rounded-full h-[1px] mb-20 overflow-hidden">
        <div 
          className="h-full bg-white transition-all duration-100 ease-linear shadow-[0_0_8px_white]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-center mb-24 max-w-2xl">
        <span className="text-slate-500 font-display tracking-[0.4em] text-[10px] uppercase mb-6 block font-bold opacity-60">
          {question.category}
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-medium text-white leading-[1.3] tracking-tight">
          {question.text}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <button
          onClick={() => onSelect(question.optionA.text)}
          className="group relative bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/20 p-10 rounded-[2rem] transition-all duration-500 transform hover:-translate-y-1 active:scale-[0.98] text-left overflow-hidden"
        >
          <div className="absolute top-6 left-8 text-[9px] font-bold text-slate-600 tracking-widest group-hover:text-white transition-colors">OPTION ALPHA</div>
          <p className="text-xl font-light mt-4 text-slate-300 group-hover:text-white transition-colors">{question.optionA.text}</p>
          <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </button>

        <button
          onClick={() => onSelect(question.optionB.text)}
          className="group relative bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/20 p-10 rounded-[2rem] transition-all duration-500 transform hover:-translate-y-1 active:scale-[0.98] text-left overflow-hidden"
        >
          <div className="absolute top-6 left-8 text-[9px] font-bold text-slate-600 tracking-widest group-hover:text-white transition-colors">OPTION BETA</div>
          <p className="text-xl font-light mt-4 text-slate-300 group-hover:text-white transition-colors">{question.optionB.text}</p>
          <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </button>
      </div>

      <div className="mt-20 text-slate-600 font-display text-[10px] tracking-[0.3em] uppercase italic">
        Decision required: <span className={`font-bold tabular-nums transition-colors duration-500 ${timeLeft < 2 ? 'text-white' : ''}`}>{timeLeft.toFixed(1)}s</span>
      </div>
    </div>
  );
};

export default DecisionCard;