import React, { useEffect, useRef } from 'react';
import { sound } from '../../utils/soundEngine';
import { X } from 'lucide-react';

interface EasterEggMatrixProps {
  isActive: boolean;
  onClose: () => void;
}

export const EasterEggMatrix: React.FC<EasterEggMatrixProps> = ({ isActive, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const letters = '01 JANGA SUKESH 2036 BEYOND THE CODE PYTHON TYPESCRIPT C++ SQL AI ML DATA SCIENCE';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);

    let animId: number;

    const draw = () => {
      ctx.fillStyle = 'rgba(3, 7, 18, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00f2fe';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/90 flex flex-col justify-between p-6">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      <div className="relative z-10 flex justify-between items-center font-mono text-cyan-400 text-xs">
        <span>QUANTUM MATRIX DATASTREAM // 2036 ACTIVATED</span>
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-cyan-400 text-white hover:bg-cyan-500 hover:text-black transition-colors"
        >
          <span>EXIT MATRIX</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="relative z-10 text-center font-mono text-xs text-cyan-400/80">
        JANGA SUKESH — BEYOND THE CODE • EST. 2036
      </div>
    </div>
  );
};
