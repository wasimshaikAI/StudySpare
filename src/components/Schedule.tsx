import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Plus, ArrowRight, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../types';

export default function Schedule() {
  const [view, setView] = useState<'week' | 'list'>('week');
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

  const events = [
    { day: 'MON', start: 10, end: 12, title: 'Quantum Physics', color: 'bg-brand-primary' },
    { day: 'WED', start: 14, end: 16, title: 'Neural Networks', color: 'bg-brand-secondary' },
    { day: 'FRI', start: 9, end: 11, title: 'Thermodynamics', color: 'bg-brand-accent' },
  ];

  return (
    <div className="space-y-10 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Temporal Grid</h2>
          <p className="text-slate-500 font-medium mt-1">Manage your research cycles and focus sessions</p>
        </div>
        <div className="flex glass p-1.5 rounded-2xl border border-white/5">
          <button 
            onClick={() => setView('week')}
            className={cn(
              "px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
              view === 'week' ? "bg-brand-primary text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
            )}
          >
            GRID VIEW
          </button>
          <button 
            onClick={() => setView('list')}
            className={cn(
              "px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
              view === 'list' ? "bg-brand-primary text-white shadow-lg" : "text-slate-500 hover:text-slate-300"
            )}
          >
            LIST VIEW
          </button>
        </div>
      </div>

      {view === 'week' ? (
        <div className="glass rounded-[40px] overflow-hidden border border-white/5 shadow-2xl">
          <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-white/5 bg-white/[0.02]">
            <div className="p-6 border-r border-white/5" />
            {days.map(day => (
              <div key={day} className="p-6 text-center border-r border-white/5 last:border-r-0">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{day}</p>
              </div>
            ))}
          </div>
          <div className="relative h-[600px] overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-[80px_repeat(7,1fr)] h-full">
              {/* Time Labels */}
              <div className="border-r border-white/5 bg-white/[0.01]">
                {hours.map(hour => (
                  <div key={hour} className="h-20 p-4 text-right border-b border-white/5 last:border-b-0">
                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{hour}:00</span>
                  </div>
                ))}
              </div>
              {/* Grid Cells */}
              {days.map(day => (
                <div key={day} className="relative border-r border-white/5 last:border-r-0">
                  {hours.map(hour => (
                    <div key={hour} className="h-20 border-b border-white/5 last:border-b-0" />
                  ))}
                  {/* Events */}
                  {events.filter(e => e.day === day).map((event, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={cn(
                        "absolute left-2 right-2 rounded-2xl p-4 shadow-xl border border-white/10 group cursor-pointer hover:scale-[1.02] transition-all",
                        event.color,
                        "text-white"
                      )}
                      style={{ 
                        top: `${(event.start - 8) * 80 + 8}px`, 
                        height: `${(event.end - event.start) * 80 - 16}px`,
                        boxShadow: `0 10px 30px rgba(0,0,0,0.3)`
                      }}
                    >
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">
                        {event.start}:00 - {event.end}:00
                      </p>
                      <p className="text-sm font-black leading-tight tracking-tight">{event.title}</p>
                      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Calendar size={14} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-8 rounded-[32px] flex items-center justify-between border border-white/5 hover:border-white/10 transition-all group"
            >
              <div className="flex items-center gap-8">
                <div className={cn("w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-white", event.color)}>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{event.day}</p>
                  <p className="text-lg font-black">{event.start}</p>
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight group-hover:text-brand-primary transition-colors">{event.title}</h3>
                  <p className="text-sm text-slate-500 font-medium">Advanced Research Session • {event.end - event.start} Hours</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-3 rounded-xl bg-white/[0.03] text-slate-500 hover:text-white transition-all">
                  <Clock size={20} />
                </button>
                <button className="p-3 rounded-xl bg-white/[0.03] text-slate-500 hover:text-brand-primary transition-all">
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
