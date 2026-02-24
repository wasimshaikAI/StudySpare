import React from 'react';
import { 
  Users, 
  Shield, 
  Ban, 
  UserPlus, 
  BarChart3, 
  Download, 
  Settings,
  MoreHorizontal,
  Mail,
  Activity,
  Lock,
  Unlock,
  Video
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'motion/react';
import { FAKE_USERS, cn } from '../types';

const engagementData = [
  { name: 'Mon', engagement: 85 },
  { name: 'Tue', engagement: 92 },
  { name: 'Wed', engagement: 78 },
  { name: 'Thu', engagement: 95 },
  { name: 'Fri', engagement: 88 },
  { name: 'Sat', engagement: 65 },
  { name: 'Sun', engagement: 72 },
];

export default function AdminPanel() {
  return (
    <div className="space-y-10 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Command Center</h2>
          <p className="text-slate-500 font-medium mt-1">System-wide oversight and neural network management</p>
        </div>
        <button className="glass hover:bg-white/[0.08] px-8 py-3 rounded-2xl font-black border border-white/10 transition-all flex items-center gap-3 shadow-xl">
          <Download size={20} className="text-brand-primary" />
          GENERATE PROTOCOL
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Member Management */}
        <div className="lg:col-span-2 glass rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
          <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <h3 className="text-xl font-black flex items-center gap-3 tracking-tight">
              <Users size={24} className="text-brand-primary" />
              Node Operators
            </h3>
            <button className="text-xs font-black text-brand-primary hover:text-brand-primary/80 flex items-center gap-2 uppercase tracking-widest transition-colors">
              <UserPlus size={16} />
              INITIALIZE LINK
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5 bg-white/[0.01]">
                  <th className="px-8 py-5">Operator</th>
                  <th className="px-8 py-5">Clearance</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {FAKE_USERS.map((user, i) => (
                  <motion.tr 
                    key={user.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-white/[0.03] transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img src={user.avatar} className="w-10 h-10 rounded-2xl border border-white/10" alt="" />
                          <div className={cn(
                            "absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-brand-dark",
                            user.status === 'online' ? "bg-brand-primary shadow-lg" : "bg-slate-600"
                          )} />
                        </div>
                        <div>
                          <p className="text-sm font-black tracking-tight">{user.name}</p>
                          <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">ID: {user.id.slice(0, 8)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border",
                        user.role === 'host' 
                          ? "bg-brand-secondary/10 border-brand-secondary/30 text-brand-secondary shadow-lg" 
                          : "bg-brand-primary/10 border-brand-primary/30 text-brand-primary shadow-lg"
                      )}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-[10px] font-black uppercase tracking-widest",
                          user.status === 'online' ? "text-brand-primary" : "text-slate-600"
                        )}>
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        <button className="p-2.5 hover:bg-white/[0.05] rounded-xl text-slate-500 hover:text-brand-primary transition-all border border-transparent hover:border-white/10"><Shield size={18} /></button>
                        <button className="p-2.5 hover:bg-red-500/10 rounded-xl text-slate-500 hover:text-red-500 transition-all border border-transparent hover:border-red-500/10"><Ban size={18} /></button>
                        <button className="p-2.5 hover:bg-white/[0.05] rounded-xl text-slate-500 hover:text-white transition-all border border-transparent hover:border-white/10"><MoreHorizontal size={18} /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Analytics & Settings */}
        <div className="space-y-8">
          <div className="glass p-8 rounded-[40px] border border-white/10 shadow-2xl">
            <h3 className="text-lg font-black mb-8 flex items-center gap-3 tracking-tight">
              <Activity size={24} className="text-brand-secondary" />
              Neural Activity
            </h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementData}>
                  <defs>
                    <linearGradient id="colorEng" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(10, 10, 10, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}
                    itemStyle={{ color: '#6366f1', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="engagement" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorEng)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">SYNC RATE</p>
                <p className="text-2xl font-black text-brand-secondary">94.2%</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">PEAK LOAD</p>
                <p className="text-2xl font-black text-white">1.2 TB/s</p>
              </div>
            </div>
          </div>

          <div className="glass p-8 rounded-[40px] border border-white/10 shadow-2xl">
            <h3 className="text-lg font-black mb-8 flex items-center gap-3 tracking-tight">
              <Settings size={24} className="text-slate-400" />
              Core Protocols
            </h3>
            <div className="space-y-6">
              {[
                { label: 'Public Access', desc: 'Neural link open to all', active: true, icon: Unlock },
                { label: 'Whiteboard Sync', desc: 'Real-time visual data', active: true, icon: Activity },
                { label: 'Auto-Archive', desc: 'Persistent session storage', active: false, icon: Video },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className={cn("p-2.5 rounded-xl transition-colors", s.active ? "bg-brand-primary/10 text-brand-primary" : "bg-white/[0.03] text-slate-600")}>
                      <s.icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-black tracking-tight">{s.label}</p>
                      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">{s.desc}</p>
                    </div>
                  </div>
                  <button className={cn(
                    "w-12 h-6 rounded-full relative transition-all duration-300",
                    s.active ? "bg-brand-primary shadow-lg" : "bg-white/10"
                  )}>
                    <div className={cn(
                      "absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300",
                      s.active ? "right-1" : "left-1"
                    )} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
