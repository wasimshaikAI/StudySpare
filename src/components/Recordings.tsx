import React from 'react';
import { Play, Clock, Calendar, Download, Share2, Search, Video, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../types';

const RECORDINGS = [
  { id: '1', title: 'Quantum Mechanics Intro', date: 'Feb 22, 2026', duration: '1:24:05', thumbnail: 'https://picsum.photos/seed/physics/800/450', views: 124 },
  { id: '2', title: 'Thermodynamics Review', date: 'Feb 20, 2026', duration: '45:12', thumbnail: 'https://picsum.photos/seed/thermo/800/450', views: 89 },
  { id: '3', title: 'Schrödinger Equation Deep Dive', date: 'Feb 18, 2026', duration: '2:10:30', thumbnail: 'https://picsum.photos/seed/cat/800/450', views: 256 },
  { id: '4', title: 'Particle Physics Workshop', date: 'Feb 15, 2026', duration: '1:15:00', thumbnail: 'https://picsum.photos/seed/particle/800/450', views: 167 },
];

export default function Recordings() {
  return (
    <div className="space-y-10 pb-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Archive Vault</h2>
          <p className="text-slate-500 font-medium mt-1">Access previous research sessions and neural recordings</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center glass rounded-2xl px-5 py-3 border border-white/10 w-80 focus-within:border-brand-primary/50 transition-all">
            <Search size={18} className="text-slate-500" />
            <input 
              type="text" 
              placeholder="Search archives..." 
              className="bg-transparent border-none focus:ring-0 text-sm ml-3 w-full font-medium placeholder:text-slate-600"
            />
          </div>
          <button className="p-3.5 glass rounded-2xl text-slate-500 hover:text-white transition-all border border-white/5">
            <Calendar size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {RECORDINGS.map((rec, i) => (
          <motion.div 
            key={rec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-[40px] overflow-hidden group cursor-pointer border border-white/5 hover:border-white/10 transition-all shadow-xl"
          >
            <div className="relative aspect-video overflow-hidden">
              <img 
                src={rec.thumbnail} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                alt="" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-white shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                  <Play size={28} fill="currentColor" className="ml-1" />
                </div>
              </div>
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-brand-dark/80 backdrop-blur-md text-[10px] font-black text-white border border-white/10 tracking-widest">
                {rec.duration}
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-black mb-4 group-hover:text-brand-primary transition-colors line-clamp-1 tracking-tight">
                {rec.title}
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <Calendar size={14} className="text-brand-secondary" />
                    {rec.date}
                  </span>
                  <span className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                    <Eye size={14} className="text-brand-primary" />
                    {rec.views}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-2 rounded-xl bg-white/[0.03] text-slate-500 hover:text-brand-primary transition-all">
                    <Download size={16} />
                  </button>
                  <button className="p-2 rounded-xl bg-white/[0.03] text-slate-500 hover:text-brand-primary transition-all">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass p-16 rounded-[48px] text-center border-dashed border-2 border-white/5 bg-white/[0.01]"
      >
        <div className="w-20 h-20 rounded-[24px] bg-white/[0.03] flex items-center justify-center mx-auto mb-6 border border-white/5">
          <Video size={32} className="text-slate-600" />
        </div>
        <h3 className="text-2xl font-black mb-3 tracking-tight">End of Archive</h3>
        <p className="text-slate-500 max-w-sm mx-auto font-medium">
          Initialize a new session and enable neural recording to expand your study history.
        </p>
      </motion.div>
    </div>
  );
}
