import React, { useState } from 'react';
import { CERTIFICATIONS } from '../../data/portfolioData';
import { sound } from '../../utils/soundEngine';
import confetti from 'canvas-confetti';
import { 
  Award, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  ExternalLink, 
  BookOpen,
  Trophy,
  Flame
} from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  const [isCelebrated, setIsCelebrated] = useState(false);

  const handleCelebrate = () => {
    sound.playSuccess();
    setIsCelebrated(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f2fe', '#a855f7', '#fbbf24', '#ffffff']
      });
    } catch {}
  };

  const cert = CERTIFICATIONS[0];

  return (
    <section id="certifications" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>SECTION 04 // CREDENTIAL VAULT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
            ACCREDITED <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-cyan-400 cyber-glow-text">ACHIEVEMENTS</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base font-sans">
            Verified institutional curriculum and foundation certifications. No fabricated awards—only verified milestones.
          </p>
        </div>

        {/* 3D Holographic Trophy & Certificate Presentation Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative cyber-panel p-6 sm:p-10 rounded-3xl border border-amber-500/30 overflow-hidden space-y-8 group">
            
            {/* Ambient Corner Glow */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Verification Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                  <Trophy className="w-8 h-8" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>VERIFIED CREDENTIAL</span>
                    </span>
                    <span className="text-xs font-mono text-slate-500">ID: EDUNET-SAP-2026</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                    {cert.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={handleCelebrate}
                onMouseEnter={() => sound.playHover()}
                className="self-start sm:self-center flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold font-mono text-xs tracking-wider shadow-[0_0_15px_rgba(251,191,36,0.4)] hover:scale-105 transition-all"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>SALUTE ACHIEVEMENT</span>
              </button>
            </div>

            {/* Issuing Authorities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400">ISSUING ORGANIZATION:</span>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>{cert.issuer}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
                <span className="text-[11px] font-mono text-slate-400">STRATEGIC INDUSTRY PARTNER:</span>
                <div className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                  <Flame className="w-4 h-4 text-cyan-400" />
                  <span>{cert.partner}</span>
                </div>
              </div>
            </div>

            {/* In-Depth Description */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-amber-400 tracking-wider block">PROGRAM OVERVIEW:</span>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {cert.description}
              </p>
            </div>

            {/* Curriculum Modules Completed */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-400 tracking-wider block">CURRICULUM DISCIPLINES COMPLETED:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {cert.topics.map((topic, i) => (
                  <div key={topic} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Verification Stamp */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono text-slate-400">
              <div>DURATION: {cert.period}</div>
              <div className="text-amber-300/80">AUTHENTICATED DIGITAL ARCHIVE // 2036</div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
