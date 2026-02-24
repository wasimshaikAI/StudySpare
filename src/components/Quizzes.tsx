import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Timer, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw,
  Medal,
  Brain,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '../types';

export default function Quizzes() {
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'results'>('lobby');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const questions = [
    {
      q: "What is the primary carrier of electromagnetic force?",
      options: ["Gluon", "Photon", "W Boson", "Graviton"],
      correct: 1,
      explanation: "Photons are the gauge bosons for electromagnetism."
    },
    {
      q: "Which principle states that no two electrons can have the same set of quantum numbers?",
      options: ["Hund's Rule", "Aufbau Principle", "Pauli Exclusion Principle", "Uncertainty Principle"],
      correct: 2,
      explanation: "The Pauli Exclusion Principle is fundamental to the structure of atoms."
    }
  ];

  useEffect(() => {
    let timer: any;
    if (gameState === 'playing' && timeLeft > 0 && selectedAnswer === null) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && selectedAnswer === null) {
      handleAnswer(-1);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, selectedAnswer]);

  const startQuiz = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(15);
    setSelectedAnswer(null);
  };

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (index === questions[currentQuestion].correct) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setTimeLeft(15);
      } else {
        setGameState('results');
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#6366f1', '#f59e0b']
        });
      }
    }, 2000);
  };

  if (gameState === 'lobby') {
    return (
      <div className="max-w-4xl mx-auto text-center space-y-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-secondary/10 text-brand-secondary text-xs font-black tracking-widest border border-brand-secondary/20">
            <Trophy size={14} />
            GLOBAL LEADERBOARD ACTIVE
          </div>
          <h1 className="text-6xl font-black tracking-tighter leading-tight">
            Quantum <span className="gradient-text">Intelligence</span> Test
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Challenge your neural pathways with our high-intensity quantum physics assessment. 
            Earn <span className="text-brand-primary font-bold">XP</span> and climb the research ranks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'Questions', value: '15 Nodes', icon: Brain, color: 'text-brand-primary' },
            { label: 'Time Limit', value: '15s / Node', icon: Timer, color: 'text-brand-secondary' },
            { label: 'Difficulty', value: 'Level 4', icon: Zap, color: 'text-brand-accent' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-[40px] border border-white/5"
            >
              <div className={cn("w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center mx-auto mb-6", stat.color)}>
                <stat.icon size={24} />
              </div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-xl font-black tracking-tight">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <button 
          onClick={startQuiz}
          className="gradient-bg text-white px-12 py-5 rounded-[32px] font-black text-lg shadow-xl hover:scale-105 transition-all group"
        >
          INITIALIZE ASSESSMENT
        </button>
      </div>
    );
  }

  if (gameState === 'playing') {
    const q = questions[currentQuestion];
    return (
      <div className="max-w-4xl mx-auto space-y-10 pb-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center border border-white/10">
              <span className="text-brand-primary font-black">{currentQuestion + 1}</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">CURRENT NODE</p>
              <p className="text-sm font-black tracking-tight">Quantum Mechanics I</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">TIME REMAINING</p>
              <p className={cn("text-xl font-black tracking-tighter", timeLeft < 5 ? "text-red-500 animate-pulse" : "text-brand-primary")}>
                {timeLeft}s
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl glass flex items-center justify-center border border-white/10">
              <Timer size={24} className={timeLeft < 5 ? "text-red-500" : "text-brand-primary"} />
            </div>
          </div>
        </div>

        <div className="w-full h-1.5 bg-white/[0.03] rounded-full overflow-hidden border border-white/10">
          <motion.div 
            className="h-full gradient-bg shadow-lg"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        <div className="glass p-12 rounded-[40px] border border-white/5 shadow-2xl">
          <h2 className="text-3xl font-black leading-tight tracking-tight mb-12">
            {q.q}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {q.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={selectedAnswer !== null}
                className={cn(
                  "p-6 rounded-[24px] text-left font-bold transition-all border flex items-center justify-between group",
                  selectedAnswer === null 
                    ? "bg-white/[0.03] border-white/10 hover:border-brand-primary/50 hover:bg-white/[0.06] hover:scale-[1.02]" 
                    : i === q.correct 
                      ? "bg-brand-primary/20 border-brand-primary text-brand-primary shadow-lg" 
                      : i === selectedAnswer 
                        ? "bg-red-500/20 border-red-500 text-red-500" 
                        : "bg-white/[0.02] border-white/10 opacity-50"
                )}
              >
                <span className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-xs font-black group-hover:bg-brand-primary group-hover:text-white transition-colors">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {option}
                </span>
                {selectedAnswer !== null && i === q.correct && <CheckCircle2 size={20} />}
                {selectedAnswer === i && i !== q.correct && <XCircle size={20} />}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selectedAnswer !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 glass rounded-[32px] border border-brand-primary/20 bg-brand-primary/[0.02]"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-brand-primary/10 text-brand-primary">
                  <Brain size={20} />
                </div>
                <div>
                  <h4 className="font-black text-brand-primary uppercase tracking-widest text-xs mb-2">Neural Insight</h4>
                  <p className="text-slate-300 font-medium leading-relaxed">{q.explanation}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto text-center space-y-12 py-16">
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-brand-primary blur-[100px] opacity-20" />
        <Medal size={120} className="text-brand-primary mx-auto relative z-10 shadow-2xl" />
      </div>
      
      <div className="space-y-4">
        <h2 className="text-5xl font-black tracking-tighter">Assessment <span className="gradient-text">Complete</span></h2>
        <p className="text-slate-400 text-xl font-medium">Your neural synchronization is exceptional.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass p-8 rounded-[40px] border border-white/10">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">ACCURACY</p>
          <p className="text-4xl font-black text-brand-primary">{(score / questions.length) * 100}%</p>
        </div>
        <div className="glass p-8 rounded-[40px] border border-white/10">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">XP EARNED</p>
          <p className="text-4xl font-black text-brand-secondary">+{score * 150}</p>
        </div>
        <div className="glass p-8 rounded-[40px] border border-white/10">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">RANK</p>
          <p className="text-4xl font-black text-brand-accent">TOP 5%</p>
        </div>
      </div>

      <div className="flex justify-center gap-6">
        <button 
          onClick={startQuiz}
          className="gradient-bg text-white px-10 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition-all"
        >
          RE-INITIALIZE
        </button>
        <button className="bg-white/[0.03] hover:bg-white/[0.08] px-10 py-4 rounded-2xl font-black border border-white/10 transition-all">
          VIEW LEADERBOARD
        </button>
      </div>
    </div>
  );
}
