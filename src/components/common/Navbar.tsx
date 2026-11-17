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
  ArrowUpRight,
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', id: 'projects' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Credentials', id: 'certifications' },
    { label: 'Contact', id: 'contact' }
  ];

  const handleLinkClick = (id: string) => {
    sound.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 no-print px-4 sm:px-8 ${
        isScrolled
          ? 'bg-black/75 backdrop-blur-xl py-3 border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Name Capsule Pill (like in reference) */}
        <div
          onClick={() => handleLinkClick('hero')}
          className="cursor-pointer px-4 py-2 rounded-full bg-stone-900/80 border border-white/15 hover:border-amber-500/60 transition-all duration-300 backdrop-blur-md shadow-sm group"
        >
          <span className="font-serif italic text-base sm:text-lg text-white font-medium group-hover:text-amber-400 transition-colors">
            Janga Sukesh
          </span>
        </div>

        {/* Center Navigation Links (clean, minimal, elegant like reference) */}
        <div className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-sans tracking-wide text-neutral-300">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              onMouseEnter={() => sound.playHover()}
              className="hover:text-white transition-colors duration-200 relative group py-1"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-amber-400 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        {/* Right Action Capsule Pills */}
        <div className="flex items-center gap-2.5">
          {/* CLI Terminal */}
          <button
            onClick={() => { sound.playClick(); onOpenTerminal(); }}
            onMouseEnter={() => sound.playHover()}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-900/60 border border-white/10 text-neutral-400 hover:text-white hover:border-white/30 text-xs font-mono transition-colors"
            title="Terminal CLI (Ctrl+K)"
          >
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px]">Ctrl+K</span>
          </button>

          {/* AI Assistant */}
          <button
            onClick={() => { sound.playModal(); onOpenAI(); }}
            onMouseEnter={() => sound.playHover()}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-900/80 border border-white/15 text-neutral-300 hover:text-cyan-300 hover:border-cyan-400 text-xs font-mono transition-all"
            title="Open SUKESH AI"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span>AI</span>
          </button>

          {/* Resume */}
          <button
            onClick={() => { sound.playModal(); onOpenResume(); }}
            onMouseEnter={() => sound.playHover()}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-900/80 border border-white/15 text-neutral-300 hover:text-white hover:border-white/40 text-xs font-mono transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Resume</span>
          </button>

          {/* Let's Talk CTA Pill (Exact style as reference) */}
          <button
            onClick={() => handleLinkClick('contact')}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-1 px-4 py-2 rounded-full bg-stone-900/90 border border-white/20 text-white font-sans text-xs sm:text-sm tracking-wide hover:border-amber-400 hover:text-amber-300 transition-all duration-300 shadow-sm"
          >
            <span>Let's talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => { sound.playClick(); setMobileMenuOpen(!mobileMenuOpen); }}
            className="md:hidden p-2 rounded-full bg-stone-900 border border-white/15 text-neutral-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-950/95 border-b border-white/15 px-6 py-6 space-y-4 backdrop-blur-2xl animate-fade-in font-sans text-sm">
          <div className="space-y-2">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="block w-full text-left py-2 px-3 rounded-lg text-neutral-300 hover:text-amber-400 hover:bg-stone-900 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-xs font-mono">
            <button
              onClick={() => { sound.playModal(); onOpenResume(); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg bg-stone-900 border border-white/10 text-neutral-300 flex items-center justify-center gap-1.5"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Resume</span>
            </button>

            <button
              onClick={() => { sound.playModal(); onOpenAI(); setMobileMenuOpen(false); }}
              className="p-2.5 rounded-lg bg-stone-900 border border-white/10 text-neutral-300 flex items-center justify-center gap-1.5"
            >
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>AI Chat</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
