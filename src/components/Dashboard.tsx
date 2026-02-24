import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  Award, 
  Zap, 
  Play, 
  ArrowRight,
  Quote,
  Copy,
  Check
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { FAKE_USERS, cn } from '../types';

const data = [
  { name: 'Mon', hours: 2.5 },
  { name: 'Tue', hours: 4.2 },
  { name: 'Wed', hours: 3.8 },
  { name: 'Thu', hours: 5.1 },
  { name: 'Fri', hours: 4.5 },
  { name: 'Sat', hours: 6.2 },
  { name: 'Sun', hours: 4.8 },
];

export default function Dashboard() {
  const [joinCode, setJoinCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generateJoinCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setJoinCode(code);
    setCopied(false);
  };

  const copyToClipboard = () => {
    if (joinCode) {
      navigator.clipboard.writeText(joinCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Welcome */}
      <div className="relative overflow-hidden rounded-[40px] glass p-12 border border-white/10">
        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-black tracking-widest mb-6 border border-brand-primary/20"
          >
            <Zap size={14} className="animate-pulse" />
            QUANTUM SESSION ACTIVE
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-[1.1] tracking-tighter">
            Welcome back, <span className="gradient-text">Wasim!</span>
          </h1>
          <p className="text-slate-400 text-xl mb-10 leading-relaxed font-medium">
            You're currently leading the <span className="text-slate-100 font-bold">Quantum Physics Final Prep</span> room. 
            Your focus efficiency is peaking at <span className="text-brand-primary">94%</span> today.
          </p>
          <div className="flex flex-wrap gap-5">
            <button className="gradient-bg text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-all shadow-xl group">
              <Play size={20} fill="currentColor" className="group-hover:translate-x-0.5 transition-transform" />
              Initialize Pomodoro
            </button>
            <div className="relative">
              <button 
                onClick={generateJoinCode}
                className="bg-white/[0.03] hover:bg-white/[0.08] px-8 py-4 rounded-2xl font-black border border-white/10 transition-all"
              >
                Invite Collaborators
              </button>
              
              <AnimatePresence>
                {joinCode && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-4 left-0 glass p-4 rounded-2xl border border-brand-primary/30 z-20 w-64 shadow-2xl"
                  >
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">JOIN PROTOCOL CODE</p>
                    <div className="flex items-center justify-between bg-black/20 rounded-xl p-3 border border-white/5">
                      <span className="font-mono font-black text-brand-primary text-lg tracking-widest">{joinCode}</span>
                      <button onClick={copyToClipboard} className="text-slate-400 hover:text-white transition-colors">
                        {copied ? <Check size={18} className="text-brand-primary" /> : <Copy size={18} />}
                      </button>
                    </div>
                    <p className="text-[9px] text-slate-500 mt-2 font-medium">Share this code with your team to synchronize nodes.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <div className="absolute top-10 right-10 w-80 h-80 bg-brand-primary rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-10 right-40 w-80 h-80 bg-brand-secondary rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Focus Streak', value: '12 Days', icon: TrendingUp, color: 'text-brand-primary', glow: 'rgba(16,185,129,0.1)' },
          { label: 'Total Focus', value: '142.5h', icon: Clock, color: 'text-brand-secondary', glow: 'rgba(99,102,241,0.1)' },
          { label: 'Mastery Level', value: 'Level 24', icon: Award, color: 'text-brand-accent', glow: 'rgba(245,158,11,0.1)' },
          { label: 'Room Nodes', value: '5 Active', icon: Users, color: 'text-slate-300', glow: 'rgba(255,255,255,0.05)' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 rounded-3xl flex items-center gap-6 glass-hover group"
          >
            <div className={cn("p-4 rounded-2xl bg-white/[0.03] transition-all duration-500 group-hover:scale-110", stat.color)} style={{ boxShadow: `0 0 20px ${stat.glow}` }}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <p className="text-2xl font-black tracking-tight">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Chart Section */}
        <div className="lg:col-span-2 glass p-10 rounded-[40px] border border-white/10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-black tracking-tight">Productivity Analytics</h3>
              <p className="text-sm text-slate-500 font-medium">Real-time focus metrics for the current cycle</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-xl text-xs font-black border border-brand-primary/20">WEEKLY</button>
              <button className="bg-white/5 text-slate-500 px-4 py-2 rounded-xl text-xs font-black border border-white/10 hover:text-slate-300 transition-colors">MONTHLY</button>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#475569" 
                  fontSize={11} 
                  fontWeight={700}
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  stroke="#475569" 
                  fontSize={11} 
                  fontWeight={700}
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `${value}h`}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: '#10b981', fontWeight: 900 }}
                  labelStyle={{ color: '#94a3b8', marginBottom: '4px', fontWeight: 700 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorHours)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Online Members & Quote */}
        <div className="space-y-10">
          <div className="glass p-8 rounded-[40px] border border-white/10">
            <h3 className="text-lg font-black mb-8 flex items-center justify-between tracking-tight">
              Active Nodes
              <span className="text-[10px] font-black text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full border border-brand-primary/20">5 ONLINE</span>
            </h3>
            <div className="space-y-6">
              {FAKE_USERS.map((user) => (
                <div key={user.id} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img src={user.avatar} className="w-12 h-12 rounded-2xl border border-white/10 group-hover:border-brand-primary/50 transition-all" alt={user.name} />
                      <div className={cn(
                        "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-brand-dark shadow-sm",
                        user.status === 'online' ? "bg-brand-primary" : user.status === 'idle' ? "bg-yellow-500" : "bg-red-500"
                      )} />
                    </div>
                    <div>
                      <p className="text-sm font-black group-hover:text-brand-primary transition-colors tracking-tight">{user.name}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{user.role === 'host' ? 'Moderator' : 'Researcher'}</p>
                    </div>
                  </div>
                  <button className="p-2.5 rounded-xl bg-white/[0.03] opacity-0 group-hover:opacity-100 transition-all hover:bg-white/10">
                    <ArrowRight size={16} className="text-slate-500" />
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] text-xs font-black uppercase tracking-widest transition-all border border-white/10">
              Network Directory
            </button>
          </div>

          <div className="gradient-bg p-8 rounded-[40px] text-white relative overflow-hidden group shadow-2xl">
            <Quote className="absolute -top-6 -right-6 w-32 h-32 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
            <p className="text-xl font-bold italic mb-6 relative z-10 leading-relaxed">
              "The beautiful thing about learning is that no one can take it away from you."
            </p>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-8 h-px bg-white/30" />
              <p className="text-xs font-black uppercase tracking-widest opacity-80">B.B. King</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
