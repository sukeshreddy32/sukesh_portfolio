import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { sound } from '../../utils/soundEngine';
import { 
  ArrowRight, 
  FileText, 
  Compass, 
  Sparkles, 
  Github, 
  Linkedin, 
  Mail, 
  ShieldCheck, 
  Cpu, 
  MapPin,
  ArrowDown
} from 'lucide-react';

interface HeroSectionProps {
  onOpenResume: () => void;
  onOpenIDCard: () => void;
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenResume,
  onOpenIDCard,
  onNavigate
}) => {
  const [mottoIndex, setMottoIndex] = useState(0);
  const mottos = ["THINK.", "BUILD.", "INNOVATE.", "REPEAT."];

  // 3D Mouse Parallax for Centered Portrait
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setMottoIndex((prev) => (prev + 1) % mottos.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: x * 14,
      y: y * 14
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 z-10 overflow-hidden bg-[#030712] text-white select-none"
    >
      {/* ================= AMBIENT DARK NEBULA LIGHTING ================= */}
      {/* Soft atmospheric halo centered behind Sukesh's portrait */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[720px] h-[550px] sm:h-[720px] rounded-full pointer-events-none transition-transform duration-500 ease-out"
        style={{
          background: 'radial-gradient(circle at center, rgba(245, 158, 11, 0.20) 0%, rgba(217, 119, 6, 0.08) 35%, transparent 70%)',
          filter: 'blur(60px)',
          transform: `translate(calc(-50% + ${tilt.x * 1.5}px), calc(-50% + ${tilt.y * 1.5}px))`
        }}
      />

      <div className="max-w-4xl mx-auto w-full flex flex-col items-center text-center space-y-6 relative z-10">
        
        {/* ================= TOP CLEAN STATUS BADGE ================= */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-wider shadow-[0_0_15px_rgba(0,242,254,0.15)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>EST. 2036 // QUANTUM NEXUS</span>
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-700/60 text-slate-300 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>VERIFIED DEVELOPER IDENTITY</span>
          </span>
        </div>

        {/* ================= CENTER: ONLY SUKESH'S PIC IN DARK EFFECT ================= */}
        {/* Clean, centered portrait with NO brackets, NO scan lines, NO clutter boxes */}
        <div
          className="relative w-64 sm:w-80 md:w-96 max-w-[85vw] aspect-[0.88/1] flex items-center justify-center cursor-pointer group"
          onClick={() => {
            sound.playClick();
            onOpenIDCard();
          }}
          title="Click to inspect 3D Digital Identity Card"
        >
          {/* Subtle elegant orbital ring behind head */}
          <div className="absolute w-[108%] h-[108%] rounded-full border border-cyan-500/20 animate-spin-slow pointer-events-none" />
          <div className="absolute w-[92%] h-[92%] rounded-full border border-dashed border-purple-500/20 animate-spin pointer-events-none" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />

          {/* Sukesh's Cutout Photo with smooth 3D mouse parallax tilt */}
          <div
            className="relative w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
            style={{
              transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${-tilt.y}deg)`
            }}
          >
            {/* The Cutout Photo (Seamless In Dark, Zero Box) */}
            <img
              src="/assets/sukesh_cutout.png?v=2"
              alt="Janga Sukesh - Software Developer"
              className="w-full h-full object-contain filter contrast-[1.12] brightness-[0.98] drop-shadow-[0_15px_35px_rgba(245,158,11,0.25)] drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] group-hover:scale-[1.03] transition-transform duration-500 ease-out"
              loading="eager"
            />

            {/* Seamless Dark Gradient Fade at bottom into the page */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#030712] via-[#030712]/70 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* ================= CENTER TITLES & TYPOGRAPHY ================= */}
        <div className="space-y-3 -mt-4">
          <p className="text-xs sm:text-sm font-mono text-cyan-400 tracking-[0.25em] uppercase font-semibold">
            HELLO, WORLD.
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-white leading-tight">
            I'M{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 cyber-glow-text">
              JANGA SUKESH.
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-sans text-slate-300 max-w-xl mx-auto leading-relaxed">
            <span className="font-semibold text-white">Software Developer.</span> Building intelligent digital experiences, scalable web platforms, and data-driven computational systems.
          </p>
        </div>

        {/* Dynamic Philosophy Motto Pill */}
        <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-md">
          <span className="text-xs font-mono text-slate-400">CORE PHILOSOPHY:</span>
          <div className="flex items-center gap-2 font-mono font-bold text-xs sm:text-sm text-cyan-400">
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
              {mottos[mottoIndex]}
            </span>
            <span className="text-slate-500 text-xs hidden sm:inline">[THINK • BUILD • INNOVATE • REPEAT]</span>
          </div>
        </div>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          {/* Explore Universe */}
          <button
            onClick={() => {
              sound.playWarp();
              onNavigate('projects');
            }}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold font-mono text-xs sm:text-sm tracking-wider shadow-[0_0_20px_rgba(0,242,254,0.4)] hover:shadow-[0_0_30px_rgba(0,242,254,0.7)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Compass className="w-4 h-4 text-black" />
            <span>EXPLORE MY UNIVERSE</span>
          </button>

          {/* View Projects */}
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('skills');
            }}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-mono text-xs sm:text-sm tracking-wider hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,242,254,0.25)] transition-all duration-300"
          >
            <span>VIEW TECH GALAXY</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </button>

          {/* Download/View Resume */}
          <button
            onClick={() => {
              sound.playModal();
              onOpenResume();
            }}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-purple-950/50 hover:bg-purple-900/60 border border-purple-500/40 text-purple-300 font-mono text-xs sm:text-sm tracking-wider hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300"
          >
            <FileText className="w-4 h-4 text-purple-400" />
            <span>DOWNLOAD RESUME</span>
          </button>
        </div>

        {/* ================= SOCIAL CHANNELS & ACADEMIC BADGE ================= */}
        <div className="pt-4 border-t border-slate-800/80 w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="p-2.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(0,242,254,0.3)] transition-all"
              title="GitHub: sukeshreddy32"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="p-2.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(0,242,254,0.3)] transition-all"
              title="LinkedIn Profile: jangasukesh"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="p-2.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(0,242,254,0.3)] transition-all"
              title="Email Sukesh"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>B.TECH CSE (DATA SCIENCE) • ELLENKI COLLEGE (CGPA 8.7)</span>
          </div>
        </div>

      </div>
    </section>
  );
};
