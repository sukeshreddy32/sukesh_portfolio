import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { sound } from '../../utils/soundEngine';
import { 
  Bot, 
  Terminal, 
  FileText, 
  CreditCard, 
  Menu, 
  X, 
  Share2, 
  Sparkles,
  Volume2,
  VolumeX
} from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenAI: () => void;
  onOpenTerminal: () => void;
  onOpenResume: () => void;
  onOpenIDCard: () => void;
  onOpenShare: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onOpenAI,
  onOpenTerminal,
  onOpenResume,
  onOpenIDCard,
  onOpenShare
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'IDENTITY', id: 'hero' },
    { label: 'ABOUT', id: 'about' },
    { label: 'SKILLS', id: 'skills' },
    { label: 'PROJECTS', id: 'projects' },
    { label: 'ACHIEVEMENTS', id: 'certifications' },
    { label: 'CONTACT', id: 'contact' }
  ];

  const handleLinkClick = (id: string) => {
    sound.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const toggleSound = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
    if (!next) sound.playClick();
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 no-print ${
        isScrolled
          ? 'bg-slate-950/85 backdrop-blur-xl border-b border-cyan-500/20 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-9 h-9 rounded-xl p-0.5 bg-gradient-to-tr from-cyan-400 to-purple-600 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_15px_rgba(0,242,254,0.3)]">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-base">
                JS
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-extrabold text-sm sm:text-base text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                JANGA SUKESH
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                2036
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 hidden sm:block">
              BEYOND THE CODE
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-900/80 border border-slate-700/80 backdrop-blur-md">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              onMouseEnter={() => sound.playHover()}
              className="px-3.5 py-1.5 rounded-full text-xs font-mono font-medium text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right Action Icons (Terminal, ID Card, AI, Audio) */}
        <div className="flex items-center gap-2">
          
          {/* Terminal Command Center (Ctrl+K) */}
          <button
            onClick={() => { sound.playClick(); onOpenTerminal(); }}
            onMouseEnter={() => sound.playHover()}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all hidden sm:flex items-center gap-1.5 text-xs font-mono"
            title="Open CLI Terminal (Ctrl+K)"
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-[11px] text-slate-400">Ctrl+K</span>
          </button>

          {/* 3D Digital ID Card */}
          <button
            onClick={() => { sound.playClick(); onOpenIDCard(); }}
            onMouseEnter={() => sound.playHover()}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all hidden sm:flex items-center"
            title="Inspect 3D Digital ID Card"
          >
            <CreditCard className="w-4 h-4 text-purple-400" />
          </button>

          {/* Share */}
          <button
            onClick={() => { sound.playClick(); onOpenShare(); }}
            onMouseEnter={() => sound.playHover()}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-all hidden sm:flex items-center"
            title="Share Universe"
          >
            <Share2 className="w-4 h-4 text-slate-300" />
          </button>

          {/* Resume Quick Trigger */}
          <button
            onClick={() => { sound.playModal(); onOpenResume(); }}
            onMouseEnter={() => sound.playHover()}
            className="px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300 hover:bg-purple-900/60 font-mono text-xs hidden md:flex items-center gap-1.5 transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>RESUME</span>
          </button>

          {/* SUKESH AI Assistant Button */}
          <button
            onClick={() => { sound.playModal(); onOpenAI(); }}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold font-mono text-xs tracking-wider shadow-[0_0_15px_rgba(0,242,254,0.3)] hover:scale-105 transition-all"
          >
            <Bot className="w-4 h-4 text-black" />
            <span>AI ASSISTANT</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => { sound.playClick(); setMobileMenuOpen(!mobileMenuOpen); }}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* ================= MOBILE MENU DRAWER ================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-cyan-500/30 px-6 py-6 space-y-4 backdrop-blur-2xl animate-fade-in font-mono text-sm">
          <div className="space-y-2">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="block w-full text-left py-2 px-3 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-slate-900 transition-colors"
              >
                // {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-2">
            <button
              onClick={() => { sound.playModal(); onOpenResume(); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-purple-300 flex items-center justify-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-purple-400" />
              <span>Resume</span>
            </button>

            <button
              onClick={() => { sound.playClick(); onOpenIDCard(); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-cyan-300 flex items-center justify-center gap-1.5"
            >
              <CreditCard className="w-4 h-4 text-cyan-400" />
              <span>3D ID Card</span>
            </button>

            <button
              onClick={() => { sound.playClick(); onOpenTerminal(); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 flex items-center justify-center gap-1.5"
            >
              <Terminal className="w-4 h-4" />
              <span>CLI Terminal</span>
            </button>

            <button
              onClick={() => { sound.playClick(); onOpenShare(); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
