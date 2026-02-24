import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Smile, MoreVertical, Pin, File, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Message, FAKE_USERS, cn } from '../types';

interface ChatProps {
  sendMessage: (data: any) => void;
  lastMessage: any;
}

export default function Chat({ sendMessage, lastMessage }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Fetch initial messages
    fetch('/api/messages')
      .then(res => res.json())
      .then(data => {
        setMessages(data.map((m: any) => ({
          id: m.id.toString(),
          user: m.user,
          content: m.content,
          timestamp: new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isMe: m.user === 'Wasim Shaik'
        })));
      });
  }, []);

  useEffect(() => {
    if (lastMessage?.type === 'chat') {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        user: lastMessage.user,
        content: lastMessage.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false
      }]);
    }
  }, [lastMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      type: 'chat',
      user: 'Wasim Shaik',
      content: inputValue,
    };

    sendMessage(newMessage);
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      user: 'Wasim Shaik',
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    }]);
    setInputValue('');
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const content = `Shared a file: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
      const newMessage = {
        type: 'chat',
        user: 'Wasim Shaik',
        content: content,
      };
      sendMessage(newMessage);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        user: 'Wasim Shaik',
        content: content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true
      }]);
    }
  };

  return (
    <div className="h-full flex flex-col glass rounded-[32px] overflow-hidden border border-white/10">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleFileChange}
        multiple
      />
      
      {/* Chat Header */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {FAKE_USERS.slice(0, 3).map(u => (
              <img key={u.id} src={u.avatar} className="w-10 h-10 rounded-2xl border-2 border-brand-dark shadow-lg" alt="" />
            ))}
          </div>
          <div>
            <h3 className="text-sm font-black tracking-tight">Quantum Research Group</h3>
            <p className="text-[10px] font-black text-brand-primary uppercase tracking-widest">3 Nodes Transmitting...</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleFileClick}
            className="p-2.5 hover:bg-white/5 rounded-xl transition-all text-slate-500 hover:text-brand-primary"
            title="Attach Files"
          >
            <Pin size={18} />
          </button>
          <button className="p-2.5 hover:bg-white/5 rounded-xl transition-all text-slate-500 hover:text-slate-200">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth"
      >
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cn(
              "flex flex-col max-w-[75%]",
              msg.isMe ? "ml-auto items-end" : "mr-auto items-start"
            )}
          >
            {!msg.isMe && (
              <div className="flex items-center gap-2 mb-2 ml-1">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{msg.user}</span>
                <span className="w-1 h-1 rounded-full bg-slate-700" />
                <span className="text-[9px] font-bold text-slate-600">{msg.timestamp}</span>
              </div>
            )}
            <div className={cn(
              "px-5 py-4 rounded-[24px] text-sm shadow-xl leading-relaxed",
              msg.isMe 
                ? "gradient-bg text-white rounded-tr-none font-bold" 
                : "bg-white/[0.03] border border-white/10 rounded-tl-none font-medium text-slate-200"
            )}>
              {msg.content.startsWith('Shared a file:') ? (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-lg">
                    <File size={20} />
                  </div>
                  <span>{msg.content}</span>
                </div>
              ) : msg.content}
            </div>
            {msg.isMe && (
              <span className="text-[9px] font-bold text-slate-600 mt-2 mr-1 uppercase tracking-widest">Delivered • {msg.timestamp}</span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Input Area */}
      <form 
        onSubmit={handleSend}
        className="p-6 bg-white/[0.02] border-t border-white/10"
      >
        <div className="flex items-center gap-4 bg-brand-dark/40 rounded-2xl px-5 py-3 border border-white/10 focus-within:border-brand-primary/30 focus-within:bg-brand-dark/60 transition-all">
          <button 
            type="button" 
            onClick={handleFileClick}
            className="text-slate-500 hover:text-brand-primary transition-colors"
          >
            <Paperclip size={20} />
          </button>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Transmit data to group..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 placeholder:text-slate-600 font-medium"
          />
          <div className="flex items-center gap-2">
            <button type="button" className="text-slate-500 hover:text-slate-300 transition-colors">
              <Smile size={20} />
            </button>
            <button 
              type="submit"
              className="bg-brand-primary text-white p-2.5 rounded-xl hover:scale-110 transition-all shadow-lg disabled:opacity-30 disabled:scale-100 disabled:shadow-none"
              disabled={!inputValue.trim()}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
