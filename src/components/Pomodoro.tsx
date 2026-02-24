import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  Music, 
  Volume2,
  Coffee,
  Brain,
  History
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '../types';

export default function Pomodoro() {
  const [mode, setMode] = useState<'work' | 'short' | 'long'>('work');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const settings = {
    work: 25 * 60,
    short: 5 * 60,
    long: 15 * 60
  };

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10b981', '#6366f1', '#f59e0b']
      });
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(settings[mode]);
  };

  const changeMode = (newMode: 'work' | 'short' | 'long') => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(settings[newMode]);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = ((settings[mode] - timeLeft) / settings[mode]) * 100;

  return (
    <div className="h-full flex flex-col lg:flex-row gap-12 items-center justify-center max-w-6xl mx-auto">
      {/* Main Timer */}
      <div className="flex-1 flex flex-col items-center space-y-16">
        <div className="flex p-1.5 glass rounded-[24px] border border-white/5">
          {[
            { id: 'work', label: 'Deep Focus', icon: Brain },
            { id: 'short', label: 'Short Rest', icon: Coffee },
            { id: 'long', label: 'Long Rest', icon: Coffee },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => changeMode(m.id as any)}
              className={cn(
                "px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-3 transition-all",
                mode === m.id ? "bg-brand-primary text-white shadow-lg" : "text-slate-500 hover:text-slate-200"
              )}
            >
              <m.icon size={16} />
              {m.label}
            </button>
          ))}
        </div>

        <div className="relative w-96 h-96 flex items-center justify-center">
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="192"
              cy="192"
              r="180"
              className="stroke-white/[0.03] fill-none"
              strokeWidth="12"
            />
            <motion.circle
              cx="192"
              cy="192"
              r="180"
              className="stroke-brand-primary fill-none"
              strokeWidth="12"
              strokeDasharray="1131"
              animate={{ strokeDashoffset: 1131 - (1131 * progress) / 100 }}
              transition={{ duration: 1, ease: "linear" }}
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 10px rgba(16,185,129,0.3))' }}
            />
          </svg>

          <div className="text-center relative z-10">
            <motion.h2 
              key={timeLeft}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-8xl font-black tracking-tighter gradient-text"
            >
              {formatTime(timeLeft)}
            </motion.h2>
            <p className="text-slate-500 font-black uppercase tracking-[0.3em] mt-4 text-xs">
              {mode === 'work' ? 'NEURAL FOCUS ENGAGED' : 'SYSTEM RECOVERY'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <button 
            onClick={resetTimer}
            className="p-5 glass rounded-2xl text-slate-500 hover:text-white transition-all hover:scale-110"
          >
            <RotateCcw size={28} />
          </button>
          <button 
            onClick={toggleTimer}
            className="w-24 h-24 rounded-[32px] gradient-bg flex items-center justify-center text-white shadow-xl hover:scale-110 transition-all group"
          >
            {isActive ? <Pause size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="ml-1 group-hover:translate-x-0.5 transition-transform" />}
          </button>
          <button className="p-5 glass rounded-2xl text-slate-500 hover:text-white transition-all hover:scale-110">
            <SkipForward size={28} />
          </button>
        </div>
      </div>

      {/* Sidebar: Music & History */}
      <div className="w-full lg:w-96 space-y-8">
        <div className="glass p-8 rounded-[40px] border border-white/10">
          <h3 className="text-lg font-black mb-8 flex items-center gap-3 tracking-tight">
            <Music size={22} className="text-brand-secondary" />
            Acoustic Environment
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Cyberpunk Lofi', duration: '2:45', active: true },
              { name: 'Neural Focus', duration: '3:12', active: false },
              { name: 'Void Ambience', duration: '1:50', active: false },
            ].map((track) => (
              <div key={track.name} className={cn(
                "p-4 rounded-2xl flex items-center justify-between group cursor-pointer transition-all border",
                track.active ? "bg-brand-secondary/10 border-brand-secondary/30 shadow-lg" : "hover:bg-white/[0.03] border-transparent"
              )}>
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                    track.active ? "bg-brand-secondary text-white shadow-lg" : "bg-white/5 text-slate-500 group-hover:text-slate-300"
                  )}>
                    {track.active && isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </div>
                  <div>
                    <p className={cn("text-sm font-black tracking-tight", track.active ? "text-brand-secondary" : "text-slate-300")}>{track.name}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{track.duration}</p>
                  </div>
                </div>
                <Volume2 size={16} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-8 rounded-[40px] border border-white/10">
          <h3 className="text-lg font-black mb-8 flex items-center gap-3 tracking-tight">
            <History size={22} className="text-brand-primary" />
            Focus Logs
          </h3>
          <div className="space-y-6">
            {[
              { task: 'Quantum Physics', time: '25m', date: 'TODAY' },
              { task: 'Neural Networks', time: '50m', date: 'YESTERDAY' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-brand-primary shadow-lg" />
                  <p className="text-sm font-bold text-slate-300 group-hover:text-brand-primary transition-colors">{item.task}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-slate-100">{item.time}</p>
                  <p className="text-[9px] font-black text-slate-600 tracking-widest">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
