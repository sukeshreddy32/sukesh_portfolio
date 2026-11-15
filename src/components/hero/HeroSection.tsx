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
  Terminal, 
  ShieldCheck, 
  Cpu, 
  MapPin,
  ExternalLink
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

  // Mouse Parallax for Portrait Card
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const portraitContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setMottoIndex((prev) => (prev + 1) % mottos.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!portraitContainerRef.current) return;
    const rect = portraitContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 12,
      y: (x / (rect.width / 2)) * 12
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* ================= LEFT COLUMN: THE DIGITAL FACE ================= */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div
            ref={portraitContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] p-3 rounded-2xl cyber-panel transition-transform duration-200 ease-out cursor-pointer group"
            style={{
              perspective: '1200px',
              transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
            }}
            onClick={() => {
              sound.playClick();
              onOpenIDCard();
            }}
            title="Click to inspect 3D Digital Identity Card"
          >
            {/* Outer Hologram Laser Frame */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500/40 via-purple-500/30 to-blue-500/40 blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

            {/* Corner Tech Brackets */}
            <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
            <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
            <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />

            {/* Top HUD Telemetry Pill */}
            <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center text-[10px] font-mono bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/30">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>ONLINE // IDENTITY MATRIX</span>
              </span>
              <span className="text-slate-400">ID: JS-2036-VERIFIED</span>
            </div>

            {/* The Authentic Portrait Container */}
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-950 border border-cyan-500/30">
              {/* Actual Uploaded Portrait of Janga Sukesh */}
              <img
                src={PERSONAL_INFO.portraitUrl}
                alt="Janga Sukesh - Software Developer"
                className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
              />

              {/* Holographic Scanline Overlay */}
              <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />

              {/* Dynamic Laser Scanning Beam */}
              <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#00f2fe] animate-scan pointer-events-none opacity-80" />

              {/* Radial Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/30 pointer-events-none" />

              {/* Floating Concentric Cyber Rings overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
                <div className="w-56 h-56 rounded-full border border-dashed border-cyan-400/60 animate-spin-slow" />
                <div className="w-40 h-40 rounded-full border border-purple-400/50 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
              </div>

              {/* Bottom Holographic Profile Badge */}
              <div className="absolute bottom-3 left-3 right-3 z-20 p-3 rounded-lg bg-slate-950/85 backdrop-blur-md border border-cyan-500/30 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-display font-bold text-sm tracking-wide text-white">
                    JANGA SUKESH
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    CGPA 8.7
                  </span>
                </div>
                <div className="text-[11px] font-mono text-cyan-400/90 flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-cyan-400" />
                  <span>B.Tech CSE (Data Science) • 2024–2028</span>
                </div>
                <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>Ellenki College of Engineering & Tech</span>
                </div>
              </div>
            </div>

            {/* Click to inspect tip */}
            <div className="absolute -bottom-6 left-0 right-0 text-center text-[10px] font-mono text-cyan-400/70 tracking-widest uppercase">
              [ CLICK TO INSPECT 3D ID CARD ]
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: FUTURISTIC HERO COPY ================= */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          
          {/* Top Status Capsule */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono tracking-wider">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>EST. 2036 // QUANTUM NEXUS</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>VERIFIED DEVELOPER IDENTITY</span>
            </span>
          </div>

          {/* Main Titles */}
          <div className="space-y-2">
            <p className="text-sm font-mono text-cyan-400 tracking-[0.25em] uppercase font-semibold">
              HELLO, WORLD.
            </p>
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold font-display tracking-tight text-white leading-[1.1]">
              I'M{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 cyber-glow-text">
                JANGA SUKESH.
              </span>
            </h1>
            <p className="text-lg sm:text-xl font-sans text-slate-300 max-w-2xl leading-relaxed pt-2">
              <span className="font-semibold text-white">Software Developer.</span> Building intelligent digital experiences, scalable web platforms, and data-driven computational systems.
            </p>
          </div>

          {/* Dynamic Glitch / Typewriter Motto */}
          <div className="flex items-center gap-3 p-3 sm:px-4 rounded-xl bg-slate-900/80 border border-slate-700/80 backdrop-blur-md">
            <span className="text-xs font-mono text-slate-400 tracking-wider">CORE PHILOSOPHY:</span>
            <div className="flex items-center gap-2 font-mono font-bold text-sm sm:text-base text-cyan-400">
              <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30">
                {mottos[mottoIndex]}
              </span>
              <span className="text-slate-500 text-xs hidden sm:inline">[THINK • BUILD • INNOVATE • REPEAT]</span>
            </div>
          </div>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Explore Universe */}
            <button
              onClick={() => {
                sound.playWarp();
                onNavigate('skills');
              }}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold font-mono text-sm tracking-wider shadow-[0_0_25px_rgba(0,242,254,0.4)] hover:shadow-[0_0_35px_rgba(0,242,254,0.8)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Compass className="w-4 h-4 text-black" />
              <span>EXPLORE MY UNIVERSE</span>
            </button>

            {/* View Projects */}
            <button
              onClick={() => {
                sound.playClick();
                onNavigate('projects');
              }}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 text-cyan-300 font-mono text-sm tracking-wider hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,242,254,0.25)] transition-all duration-300"
            >
              <span>VIEW PROJECTS</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </button>

            {/* Download/View Resume */}
            <button
              onClick={() => {
                sound.playModal();
                onOpenResume();
              }}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-purple-950/50 hover:bg-purple-900/60 border border-purple-500/40 text-purple-300 font-mono text-sm tracking-wider hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all duration-300"
            >
              <FileText className="w-4 h-4 text-purple-400" />
              <span>DOWNLOAD RESUME</span>
            </button>
          </div>

          {/* Social Proof & Direct Channels */}
          <div className="pt-4 border-t border-slate-800/80 w-full flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(0,242,254,0.3)] transition-all"
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
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(0,242,254,0.3)] transition-all"
                title="LinkedIn Profile: jangasukesh"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(0,242,254,0.3)] transition-all"
                title="Email Sukesh"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>EDUCATION: ELLENKI CSE (DS) 2024–2028</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
