import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { sound } from '../../utils/soundEngine';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  MapPin, 
  Cpu, 
  ShieldCheck, 
  ArrowUp,
  Sparkles
} from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenTerminal: () => void;
  onToggleMatrix: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenTerminal,
  onToggleMatrix
}) => {
  const scrollToTop = () => {
    sound.playWarp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-cyan-500/20 bg-slate-950/90 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8 font-mono text-xs text-slate-400 no-print">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          
          {/* Identity Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-base text-white">
                JANGA SUKESH
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                EST. 2036
              </span>
            </div>
            <p className="text-slate-400 font-sans text-xs max-w-sm leading-relaxed">
              Software Developer specializing in applied machine learning, distributed web architectures, and modern algorithmic systems.
            </p>
            <div className="text-[11px] text-slate-500 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Patelguda, Hyderabad, Telangana, India</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="space-y-2">
            <span className="text-white font-bold block mb-2">QUICK SECTORS:</span>
            <div className="space-y-1.5">
              {['about', 'skills', 'projects', 'certifications', 'contact'].map(s => (
                <button
                  key={s}
                  onClick={() => { sound.playClick(); onNavigate(s); }}
                  className="block text-slate-400 hover:text-cyan-300 transition-colors uppercase"
                >
                  // {s}
                </button>
              ))}
            </div>
          </div>

          {/* Connect & Utilities */}
          <div className="space-y-3">
            <span className="text-white font-bold block mb-2">COMMUNICATIONS:</span>
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <button
                onClick={() => { sound.playClick(); onOpenTerminal(); }}
                className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-colors"
                title="Terminal CLI"
              >
                <Terminal className="w-4 h-4" />
              </button>
            </div>

            {/* Matrix rain easter egg trigger */}
            <button
              onClick={() => { sound.playScan(); onToggleMatrix(); }}
              className="text-[10px] text-cyan-400/80 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>[TRIGGER MATRIX EASTER EGG]</span>
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>SYSTEM STATUS: NORMAL // LAT: 17.52° N • LONG: 78.23° E</span>
          </div>

          <div>
            © 2036 JANGA SUKESH — BEYOND THE CODE. ALL RIGHTS RESERVED.
          </div>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-1.5 text-cyan-400 hover:text-white transition-colors"
          >
            <span>BACK TO ZENITH</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
