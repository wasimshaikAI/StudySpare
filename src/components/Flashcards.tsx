import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Plus, 
  Layers,
} from 'lucide-react';
import { cn } from '../types';

export default function Flashcards() {
  const [currentDeck, setCurrentDeck] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const decks = [
    { id: '1', name: 'Quantum Mechanics', count: 42, color: 'text-brand-primary', glow: 'rgba(16,185,129,0.1)' },
    { id: '2', name: 'Neural Networks', count: 28, color: 'text-brand-secondary', glow: 'rgba(99,102,241,0.1)' },
    { id: '3', name: 'Thermodynamics', count: 35, color: 'text-brand-accent', glow: 'rgba(245,158,11,0.1)' },
  ];

  const cards = [
    { q: "What is Heisenberg's Uncertainty Principle?", a: "It is impossible to simultaneously know both the exact position and momentum of a particle." },
    { q: "Define Schrödinger's Cat", a: "A thought experiment illustrating the concept of superposition in quantum mechanics." },
    { q: "What is Quantum Entanglement?", a: "A phenomenon where particles become interconnected and share states regardless of distance." },
  ];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  if (!currentDeck) {
    return (
      <div className="space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Neural Repositories</h2>
            <p className="text-slate-500 font-medium mt-1">Select a data deck to begin synchronization</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="gradient-bg text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
          >
            <Plus size={20} />
            NEW REPOSITORY
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {decks.map((deck) => (
            <motion.div
              key={deck.id}
              whileHover={{ y: -8 }}
              onClick={() => setCurrentDeck(deck.id)}
              className="glass p-8 rounded-[40px] cursor-pointer border border-white/5 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-[50px] group-hover:bg-brand-primary/10 transition-all" />
              <div className={cn("w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-8 transition-all group-hover:scale-110", deck.color)} style={{ boxShadow: `0 0 20px ${deck.glow}` }}>
                <Layers size={28} />
              </div>
              <h3 className="text-xl font-black mb-2 tracking-tight group-hover:text-brand-primary transition-colors">{deck.name}</h3>
              <p className="text-slate-500 text-xs font-black uppercase tracking-widest">{deck.count} DATA NODES</p>
              
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-brand-dark bg-slate-800" />
                  ))}
                </div>
                <ArrowRight size={18} className="text-slate-600 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => setCurrentDeck(null)}
          className="flex items-center gap-3 text-slate-500 hover:text-white font-black text-xs uppercase tracking-widest transition-all"
        >
          <ArrowLeft size={18} />
          Back to Repositories
        </button>
        <div className="text-center">
          <p className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-1">SYNCHRONIZING</p>
          <h3 className="text-xl font-black tracking-tight">Quantum Mechanics</h3>
        </div>
        <div className="w-24" /> {/* Spacer */}
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-white/[0.03] rounded-full overflow-hidden border border-white/10">
        <motion.div 
          className="h-full gradient-bg shadow-lg"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
        />
      </div>

      {/* Card Container */}
      <div className="relative h-[450px] perspective-1000">
        <motion.div
          className="w-full h-full relative preserve-3d cursor-pointer"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden glass rounded-[40px] p-12 flex flex-col items-center justify-center text-center border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-8">QUERY</span>
            <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-tight text-slate-100">
              {cards[currentIndex].q}
            </h2>
            <p className="mt-12 text-brand-primary font-black text-[10px] uppercase tracking-widest animate-pulse">Click to decrypt answer</p>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden glass rounded-[40px] p-12 flex flex-col items-center justify-center text-center border border-brand-primary/20 shadow-2xl rotate-y-180 bg-brand-primary/[0.02]">
            <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.4em] mb-8">DECRYPTED DATA</span>
            <p className="text-2xl md:text-3xl font-bold leading-relaxed text-slate-200">
              {cards[currentIndex].a}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-10">
        <button 
          onClick={handlePrev}
          className="p-5 glass rounded-2xl text-slate-500 hover:text-white transition-all hover:scale-110 border border-white/5"
        >
          <ArrowLeft size={28} />
        </button>
        
        <div className="flex gap-4">
          <button className="px-8 py-4 rounded-2xl bg-red-500/10 text-red-400 font-black text-xs uppercase tracking-widest border border-red-500/20 hover:bg-red-500/20 transition-all">
            HARD
          </button>
          <button className="px-8 py-4 rounded-2xl bg-brand-primary/10 text-brand-primary font-black text-xs uppercase tracking-widest border border-brand-primary/20 hover:bg-brand-primary/20 transition-all">
            GOOD
          </button>
          <button className="px-8 py-4 rounded-2xl bg-brand-secondary/10 text-brand-secondary font-black text-xs uppercase tracking-widest border border-brand-secondary/20 hover:bg-brand-secondary/20 transition-all">
            EASY
          </button>
        </div>

        <button 
          onClick={handleNext}
          className="p-5 glass rounded-2xl text-slate-500 hover:text-white transition-all hover:scale-110 border border-white/5"
        >
          <ArrowRight size={28} />
        </button>
      </div>

      <div className="text-center">
        <p className="text-xs font-black text-slate-600 uppercase tracking-widest">
          NODE {currentIndex + 1} OF {cards.length}
        </p>
      </div>
    </div>
  );
}
