import React, { useEffect, useState, useRef } from 'react';
import { sound } from '../../utils/soundEngine';
import { Sparkles, Terminal, FastForward, Volume2, VolumeX } from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<number>(0);
  // 0: Dark Void & Single Glowing Particle
  // 1: Particle Sphere Assembly & Scanning
  // 2: "INITIALIZING DIGITAL IDENTITY..."
  // 3: "JANGA SUKESH" & "THE FUTURE IS BUILT BY THOSE WHO CREATE IT."
  // 4: Warp transition out
  const [progress, setProgress] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(sound.getMuted());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Background procedural 2D particle vortex / sphere canvas
  useEffect(() => {
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

    const numParticles = 300;
    const particles = Array.from({ length: numParticles }, () => {
      const radius = 120 + Math.random() * 180;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      return {
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        targetX: radius * Math.sin(phi) * Math.cos(theta),
        targetY: radius * Math.sin(phi) * Math.sin(theta),
        targetZ: radius * Math.cos(phi),
        speed: 0.02 + Math.random() * 0.03,
        size: 1 + Math.random() * 2,
        alpha: 0.2 + Math.random() * 0.8,
        color: Math.random() > 0.4 ? '#00f2fe' : '#7c3aed'
      };
    });

    let angle = 0;
    let animId: number;

    const render = () => {
      ctx.fillStyle = 'rgba(3, 7, 18, 0.25)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      angle += 0.01;

      particles.forEach(p => {
        // Rotate 3D target around Y axis
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const rx = p.targetX * cosA - p.targetZ * sinA;
        const rz = p.targetX * sinA + p.targetZ * cosA;

        // Perspective projection
        const scale = 350 / (350 + rz);
        const projectedX = cx + rx * scale;
        const projectedY = cy + p.targetY * scale;

        // Smooth lerp toward projected sphere position
        p.x += (projectedX - p.x) * p.speed;
        p.y += (projectedY - p.y) * p.speed;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.size * scale), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * Math.min(1, scale);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6 * scale;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Sequence Timer & Progress Counter
  useEffect(() => {
    sound.playScan();

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 38);

    const timer1 = setTimeout(() => {
      setPhase(1);
      sound.playScan();
    }, 800);

    const timer2 = setTimeout(() => {
      setPhase(2);
      sound.playHover();
    }, 2200);

    const timer3 = setTimeout(() => {
      setPhase(3);
      sound.playSuccess();
    }, 3200);

    const timer4 = setTimeout(() => {
      setPhase(4);
      sound.playWarp();
    }, 4800);

    const timerEnd = setTimeout(() => {
      onComplete();
    }, 5500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timerEnd);
    };
  }, [onComplete]);

  const handleSkip = () => {
    sound.playWarp();
    onComplete();
  };

  const toggleSound = () => {
    const next = sound.toggleMute();
    setIsAudioMuted(next);
    if (!next) sound.playClick();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#030712] text-white transition-opacity duration-700 select-none overflow-hidden ${
        phase === 4 ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background 3D Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Futuristic Grid Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      {/* Cyberpunk Scanline */}
      <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />

      {/* Top Controls: Audio & Skip */}
      <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-center text-xs font-mono">
        <div className="flex items-center gap-2 text-cyan-400/80">
          <Terminal className="w-4 h-4 animate-pulse" />
          <span className="tracking-widest">BOOT://SYSTEM_2036.EST</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 transition-colors"
          >
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
            <span className="hidden sm:inline">{isAudioMuted ? 'UNMUTE' : 'AUDIO ON'}</span>
          </button>

          <button
            onClick={handleSkip}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-500 hover:text-black font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(0,242,254,0.3)]"
          >
            <span>SKIP INTRO</span>
            <FastForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Center Dynamic HUD & Identity Display */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-2xl">
        {/* Holographic Glowing Central Node */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Animated concentric rings */}
          <div className="absolute w-44 h-44 rounded-full border border-cyan-500/20 animate-spin-slow" />
          <div className="absolute w-36 h-36 rounded-full border border-dashed border-purple-500/30 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
          <div className="absolute w-24 h-24 rounded-full border border-cyan-400/50 animate-pulse" />

          {/* Central Quantum Orb */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 shadow-[0_0_40px_#00f2fe] flex items-center justify-center animate-pulse">
            <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_20px_#fff]" />
          </div>
        </div>

        {/* Dynamic Status Text */}
        <div className="h-28 flex flex-col items-center justify-center space-y-2">
          {phase >= 0 && phase < 2 && (
            <p className="text-sm font-mono tracking-widest text-cyan-400 animate-pulse uppercase">
              SCANNING QUANTUM SIGNATURE...
            </p>
          )}

          {phase === 2 && (
            <p className="text-base sm:text-lg font-mono tracking-widest text-cyan-300 animate-pulse uppercase">
              INITIALIZING DIGITAL IDENTITY...
            </p>
          )}

          {phase >= 3 && (
            <div className="space-y-3 transition-all duration-700 transform translate-y-0">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 cyber-glow-text">
                JANGA SUKESH
              </h1>
              <p className="text-xs sm:text-sm font-mono tracking-[0.25em] text-cyan-300/90 uppercase font-medium">
                THE FUTURE IS BUILT BY THOSE WHO CREATE IT.
              </p>
            </div>
          )}
        </div>

        {/* Progress Bar & Telemetry */}
        <div className="w-64 sm:w-80 mt-10 space-y-2">
          <div className="flex justify-between items-center text-[10px] font-mono text-cyan-400/70">
            <span>CORE_SYNC: EST. 2036</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-cyan-500/30 p-[1px]">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full transition-all duration-75 shadow-[0_0_10px_#00f2fe]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-[10px] font-mono text-slate-500 flex justify-between">
            <span>B.TECH CSE (DATA SCIENCE)</span>
            <span>SECURE LINK VERIFIED</span>
          </div>
        </div>
      </div>

      {/* Bottom Coordinates & Watermark */}
      <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-center text-[10px] font-mono text-slate-500">
        <div>LAT: 17.52° N // LONG: 78.23° E</div>
        <div className="tracking-widest">BEYOND THE CODE</div>
      </div>
    </div>
  );
};
