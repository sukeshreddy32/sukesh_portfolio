import React, { useState, useEffect } from 'react';
import { CinematicIntro } from './components/intro/CinematicIntro';
import { UniverseCanvas } from './components/3d/UniverseCanvas';
import { Navbar } from './components/common/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { AboutSection } from './components/about/AboutSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { CertificationsSection } from './components/certifications/CertificationsSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/common/Footer';
import { SukeshAIModal } from './components/ai/SukeshAIModal';
import { ResumeModal } from './components/resume/ResumeModal';
import { DigitalIDCardModal } from './components/secret/DigitalIDCardModal';
import { CommandCenterModal } from './components/secret/CommandCenterModal';
import { ShareModal } from './components/secret/ShareModal';
import { EasterEggMatrix } from './components/secret/EasterEggMatrix';
import { CustomCursor } from './components/secret/CustomCursor';
import { AudioControl } from './components/secret/AudioControl';
import { sound } from './utils/soundEngine';
import { Bot, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isAIOpen, setIsAIOpen] = useState<boolean>(false);
  const [isIDCardOpen, setIsIDCardOpen] = useState<boolean>(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [isShareOpen, setIsShareOpen] = useState<boolean>(false);
  const [isMatrixActive, setIsMatrixActive] = useState<boolean>(false);

  // Global Keyboard Shortcuts (Ctrl+K for terminal, Esc to close modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        sound.playClick();
        setIsTerminalOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsResumeOpen(false);
        setIsAIOpen(false);
        setIsIDCardOpen(false);
        setIsTerminalOpen(false);
        setIsShareOpen(false);
        setIsMatrixActive(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      sound.playWarp();
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500 selection:text-black">
      
      {/* Custom Cyber Magnetic Cursor */}
      <CustomCursor />

      {/* Cinematic Introduction Sequence (Section 4) */}
      {showIntro && (
        <CinematicIntro onComplete={() => setShowIntro(false)} />
      )}

      {/* Central Interactive 3D WebGL Universe Canvas (Section 6) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <UniverseCanvas onNavigate={handleNavigate} />
      </div>

      {/* Background Cyber Ambient Lights */}
      <div className="fixed top-1/4 -left-48 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 -right-48 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* Top Navbar */}
      <Navbar
        onNavigate={handleNavigate}
        onOpenAI={() => setIsAIOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenIDCard={() => setIsIDCardOpen(true)}
        onOpenShare={() => setIsShareOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        {/* Section 05: Hero Section — The Digital Face */}
        <HeroSection
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenIDCard={() => setIsIDCardOpen(true)}
          onNavigate={handleNavigate}
        />

        {/* Section 07: About Me — Personal Digital Profile */}
        <AboutSection />

        {/* Section 08: Skills — Interactive Technology Galaxy */}
        <SkillsSection />

        {/* Section 09: Projects — 3D Project Exhibition */}
        <ProjectsSection />

        {/* Section 12: Certifications & Achievements */}
        <CertificationsSection />

        {/* Section 13: Contact — Communication Portal */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onToggleMatrix={() => setIsMatrixActive(true)}
      />

      {/* Floating Audio Controls */}
      <AudioControl />

      {/* Floating Holographic SUKESH AI Orb Launcher */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => {
            sound.playModal();
            setIsAIOpen(true);
          }}
          onMouseEnter={() => sound.playHover()}
          className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-950/90 border border-cyan-400 text-cyan-300 shadow-[0_0_25px_rgba(0,242,254,0.4)] hover:shadow-[0_0_35px_rgba(0,242,254,0.8)] hover:scale-105 transition-all duration-300"
          title="Open SUKESH AI Neural Assistant"
        >
          {/* Pulsing Hologram Orb */}
          <div className="relative flex items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 animate-spin-slow flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-black" />
            </div>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <span className="text-xs font-mono font-bold tracking-wider">
            SUKESH AI
          </span>
        </button>
      </div>

      {/* ================= MODALS ================= */}
      {/* Section 10: SUKESH AI Modal */}
      <SukeshAIModal
        isOpen={isAIOpen}
        onClose={() => setIsAIOpen(false)}
        onOpenResume={() => {
          setIsAIOpen(false);
          setIsResumeOpen(true);
        }}
      />

      {/* Section 11: Curriculum Vitae Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Section 19: 3D Digital Identity Card */}
      <DigitalIDCardModal
        isOpen={isIDCardOpen}
        onClose={() => setIsIDCardOpen(false)}
      />

      {/* Section 19: Command Center Terminal (Ctrl+K) */}
      <CommandCenterModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onNavigate={handleNavigate}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenIDCard={() => setIsIDCardOpen(true)}
        onToggleMatrix={() => setIsMatrixActive(true)}
      />

      {/* Section 19: Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />

      {/* Section 19: Matrix Rain Easter Egg */}
      <EasterEggMatrix
        isActive={isMatrixActive}
        onClose={() => setIsMatrixActive(false)}
      />

    </div>
  );
};
