import React, { useRef, useEffect, useState } from 'react';
import { 
  Square, 
  Circle, 
  Minus, 
  Type, 
  Eraser, 
  Undo, 
  Trash2, 
  Download,
  MousePointer2,
  Pencil
} from 'lucide-react';
import { cn } from '../types';

interface WhiteboardProps {
  sendMessage: (data: any) => void;
  lastMessage: any;
}

export default function Whiteboard({ sendMessage, lastMessage }: WhiteboardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#10b981');
  const [brushSize, setBrushSize] = useState(3);
  const [tool, setTool] = useState<'pencil' | 'eraser' | 'rect' | 'circle'>('pencil');

  const setupCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Restore previous drawing if any (mocked for now or could be stored)
  };

  useEffect(() => {
    setupCanvas();
    window.addEventListener('resize', setupCanvas);
    return () => window.removeEventListener('resize', setupCanvas);
  }, []);

  useEffect(() => {
    if (lastMessage?.type === 'draw') {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!ctx) return;

      const { x0, y0, x1, y1, color, size, isEraser } = lastMessage;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.strokeStyle = isEraser ? '#020617' : color;
      ctx.lineWidth = size;
      ctx.stroke();
      ctx.closePath();
    }
  }, [lastMessage]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    // Calculate position relative to canvas scale
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const pos = getPos(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      (ctx as any).lastX = pos.x;
      (ctx as any).lastY = pos.y;
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const pos = getPos(e);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (ctx && canvas) {
      const lastX = (ctx as any).lastX || pos.x;
      const lastY = (ctx as any).lastY || pos.y;

      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = tool === 'eraser' ? '#020617' : color;
      ctx.lineWidth = brushSize;
      ctx.stroke();

      sendMessage({
        type: 'draw',
        x0: lastX,
        y0: lastY,
        x1: pos.x,
        y1: pos.y,
        color: color,
        size: brushSize,
        isEraser: tool === 'eraser'
      });

      (ctx as any).lastX = pos.x;
      (ctx as any).lastY = pos.y;
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      (ctx as any).lastX = undefined;
      (ctx as any).lastY = undefined;
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div ref={containerRef} className="h-full flex flex-col glass rounded-[32px] overflow-hidden relative border border-white/10">
      {/* Toolbar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 glass px-6 py-3 rounded-2xl flex items-center gap-6 z-10 border border-white/10 shadow-2xl">
        <div className="flex items-center gap-2 border-r border-white/10 pr-6">
          {[
            { id: 'pencil', icon: Pencil },
            { id: 'eraser', icon: Eraser },
            { id: 'rect', icon: Square },
            { id: 'circle', icon: Circle },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTool(t.id as any)}
              className={cn(
                "p-2.5 rounded-xl transition-all",
                tool === t.id ? "bg-brand-primary text-white shadow-lg" : "hover:bg-white/5 text-slate-500 hover:text-slate-200"
              )}
            >
              <t.icon size={18} />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 border-r border-white/10 pr-6">
          {['#10b981', '#6366f1', '#f59e0b', '#ef4444', '#ffffff'].map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={cn(
                "w-6 h-6 rounded-full border-2 transition-all hover:scale-125",
                color === c ? "border-white scale-110" : "border-transparent"
              )}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Size</span>
            <input 
              type="range" 
              min="1" 
              max="20" 
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-20 accent-brand-primary"
            />
          </div>
          <div className="w-px h-6 bg-white/10" />
          <button onClick={clearCanvas} className="p-2.5 hover:bg-red-500/10 text-red-400 rounded-xl transition-all">
            <Trash2 size={18} />
          </button>
          <button className="p-2.5 hover:bg-white/5 text-slate-500 hover:text-slate-200 rounded-xl transition-all">
            <Download size={18} />
          </button>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="flex-1 cursor-crosshair touch-none"
      />

      {/* Real-time indicator */}
      <div className="absolute bottom-6 right-6 glass px-4 py-2 rounded-full text-[10px] font-black text-brand-primary flex items-center gap-3 border border-brand-primary/20">
        <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
        LIVE COLLABORATION
      </div>
    </div>
  );
}
