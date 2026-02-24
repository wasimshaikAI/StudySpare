import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Pencil, 
  Layers, 
  Trophy, 
  Calendar, 
  Timer, 
  Video, 
  Settings,
  Search,
  Bell,
  User as UserIcon,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Moon,
  Sun,
  Mic,
  MicOff,
  Maximize2,
  Terminal,
  Brain,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, FAKE_USERS } from './types';
import { useWebSocket } from './hooks/useWebSocket';
import confetti from 'canvas-confetti';

// Tab Components (Placeholders for now, will expand)
import Dashboard from './components/Dashboard';
import Chat from './components/Chat';
import Whiteboard from './components/Whiteboard';
import Flashcards from './components/Flashcards';
import Quizzes from './components/Quizzes';
import Schedule from './components/Schedule';
import Pomodoro from './components/Pomodoro';
import Recordings from './components/Recordings';
import AdminPanel from './components/AdminPanel';

type Tab = 'dashboard' | 'chat' | 'whiteboard' | 'flashcards' | 'quizzes' | 'schedule' | 'pomodoro' | 'recordings' | 'admin';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const { isConnected, lastMessage, sendMessage } = useWebSocket();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'whiteboard', label: 'Whiteboard', icon: Pencil },
    { id: 'flashcards', label: 'Flashcards', icon: Layers },
    { id: 'quizzes', label: 'Quizzes', icon: Trophy },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'pomodoro', label: 'Pomodoro', icon: Timer },
    { id: 'recordings', label: 'Recordings', icon: Video },
    { id: 'admin', label: 'Admin Panel', icon: Settings, adminOnly: true },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'chat': return <Chat sendMessage={sendMessage} lastMessage={lastMessage} />;
      case 'whiteboard': return <Whiteboard sendMessage={sendMessage} lastMessage={lastMessage} />;
      case 'flashcards': return <Flashcards />;
      case 'quizzes': return <Quizzes />;
      case 'schedule': return <Schedule />;
      case 'pomodoro': return <Pomodoro />;
      case 'recordings': return <Recordings />;
      case 'admin': return <AdminPanel />;
      default: return <Dashboard />;
    }
  };

  const [isAiBuddyOpen, setIsAiBuddyOpen] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    { role: 'ai', text: 'Hi Wasim! I\'m your AI Study Buddy. How can I help you today?' }
  ]);

  const aiPresets = [
    "Explain Quantum Entanglement",
    "Summarize today's chat",
    "Create a quiz from whiteboard",
    "Find related research papers",
    "Set a study goal"
  ];

  const handleAiPreset = (preset: string) => {
    setAiMessages(prev => [...prev, { role: 'user', text: preset }]);
    setTimeout(() => {
      setAiMessages(prev => [...prev, { role: 'ai', text: `That's a great question! Based on your current session on Quantum Physics, ${preset.toLowerCase()} involves complex calculations but I can simplify it for you...` }]);
    }, 1000);
  };

  return (
    <div className={cn(
      "flex h-screen overflow-hidden transition-colors duration-300",
      isDarkMode ? "bg-brand-dark text-slate-200" : "bg-slate-50 text-slate-900"
    )}>
      {/* Sidebar */}
      {!isFocusMode && (
        <motion.aside
          initial={false}
          animate={{ width: isSidebarCollapsed ? 80 : 280 }}
          className="glass z-30 flex flex-col border-r border-white/5"
        >
          <div className="p-8 flex items-center justify-between">
            {!isSidebarCollapsed && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-[0_0_20px_rgba(0,255,209,0.3)]">
                  <Terminal className="text-white w-6 h-6" />
                </div>
                <span className="font-black text-2xl tracking-tighter gradient-text">StudySphere</span>
              </motion.div>
            )}
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-2 hover:bg-white/5 rounded-xl transition-all text-slate-500 hover:text-brand-teal"
            >
              {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                  activeTab === item.id 
                    ? "bg-white/10 text-brand-teal shadow-[inset_0_0_20px_rgba(0,255,209,0.05)]" 
                    : "hover:bg-white/5 text-slate-500 hover:text-slate-200"
                )}
              >
                <item.icon size={22} className={cn(
                  "transition-all duration-300",
                  activeTab === item.id ? "scale-110 neon-text-teal" : "group-hover:scale-110 group-hover:text-slate-200"
                )} />
                {!isSidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="font-bold tracking-tight"
                  >
                    {item.label}
                  </motion.span>
                )}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute left-0 w-1.5 h-8 bg-brand-teal rounded-r-full shadow-[0_0_15px_rgba(0,255,209,0.8)]"
                  />
                )}
              </button>
            ))}
          </nav>

          <div className="p-6 border-t border-white/5">
            <button className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-slate-500 hover:bg-red-500/10 hover:text-red-400 transition-all group">
              <LogOut size={22} className="group-hover:scale-110 transition-transform" />
              {!isSidebarCollapsed && <span className="font-bold tracking-tight">Sign Out</span>}
            </button>
          </div>
        </motion.aside>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Navbar */}
        <header className="h-24 glass flex items-center justify-between px-10 z-20 border-b border-white/10">
          <div className="flex items-center gap-8">
            <div>
              <h2 className="text-xl font-black tracking-tight">Quantum Physics Final Prep</h2>
              <div className="flex items-center gap-2.5 text-xs font-bold text-slate-500">
                <span className={cn("w-2 h-2 rounded-full", isConnected ? "bg-brand-primary shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-red-500")} />
                {isConnected ? "NETWORK STABLE" : "CONNECTING..."} • <span className="text-brand-primary">5 ACTIVE NODES</span>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center bg-white/[0.03] rounded-2xl px-5 py-3 border border-white/5 w-80 focus-within:border-brand-primary/30 focus-within:bg-white/5 transition-all">
              <Search size={18} className="text-slate-500" />
              <input 
                type="text" 
                placeholder="Search knowledge base..." 
                className="bg-transparent border-none focus:ring-0 text-sm ml-3 w-full placeholder:text-slate-600 font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 glass p-1.5 rounded-2xl">
              <button 
                onClick={() => setIsMicOn(!isMicOn)}
                className={cn(
                  "p-2.5 rounded-xl transition-all",
                  isMicOn ? "bg-brand-primary/20 text-brand-primary border border-brand-primary/30" : "text-slate-500 hover:text-slate-300"
                )}
              >
                {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
              </button>
              
              <button 
                onClick={() => setIsFocusMode(!isFocusMode)}
                className={cn(
                  "p-2.5 rounded-xl transition-all",
                  isFocusMode ? "bg-brand-secondary/20 text-brand-secondary border border-brand-secondary/30" : "text-slate-500 hover:text-slate-300"
                )}
              >
                <Maximize2 size={20} />
              </button>

              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2.5 rounded-xl text-slate-500 hover:text-slate-300 transition-all"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>

            <div className="h-10 w-px bg-white/5 mx-2" />

            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black tracking-tight group-hover:text-brand-primary transition-colors">Wasim Shaik</p>
                <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest">Session Host</p>
              </div>
              <div className="relative">
                <img 
                  src="https://i.pravatar.cc/150?u=wasim" 
                  alt="Profile" 
                  className="w-12 h-12 rounded-2xl border-2 border-brand-primary/30 p-0.5 group-hover:border-brand-primary transition-all"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-primary rounded-full border-2 border-brand-dark" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* AI Study Buddy Floating Button */}
        <button 
          onClick={() => setIsAiBuddyOpen(!isAiBuddyOpen)}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-white shadow-2xl shadow-brand-primary/40 hover:scale-110 transition-transform z-50 group"
        >
          <Brain size={32} className="group-hover:animate-pulse" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-brand-secondary rounded-full border-2 border-brand-dark flex items-center justify-center text-[10px] font-bold">
            1
          </div>
        </button>

        {/* AI Chatbot Sidebar */}
        <AnimatePresence>
          {isAiBuddyOpen && (
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="fixed top-20 right-0 bottom-0 w-96 glass z-40 flex flex-col border-l border-white/10"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                    <Brain size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold">Study Buddy AI</h3>
                    <p className="text-[10px] text-brand-primary">Powered by Gemini Pro</p>
                  </div>
                </div>
                <button onClick={() => setIsAiBuddyOpen(false)} className="text-slate-500 hover:text-white">
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {aiMessages.map((msg, i) => (
                  <div key={i} className={cn(
                    "p-4 rounded-2xl text-sm",
                    msg.role === 'ai' ? "bg-white/5 text-slate-300 border border-white/10" : "bg-brand-primary/20 text-brand-primary ml-8"
                  )}>
                    {msg.text}
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-white/10 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {aiPresets.map(preset => (
                    <button 
                      key={preset}
                      onClick={() => handleAiPreset(preset)}
                      className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Ask anything..." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-brand-primary outline-none"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-primary">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

