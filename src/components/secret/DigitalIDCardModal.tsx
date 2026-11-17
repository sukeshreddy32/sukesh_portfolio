import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { sound } from '../../utils/soundEngine';
import { 
  X, 
  RotateCw, 
  ShieldCheck, 
  Cpu, 
  QrCode, 
  Fingerprint, 
  Sparkles,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';

interface DigitalIDCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DigitalIDCardModal: React.FC<DigitalIDCardModalProps> = ({ isOpen, onClose }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!isOpen) return null;

  const handleFlip = () => {
    sound.playWarp();
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full flex flex-col items-center space-y-4 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Flip Hint & Close */}
        <div className="w-full flex justify-between items-center text-xs font-mono text-cyan-400 px-2">
          <button
            onClick={handleFlip}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>CLICK CARD OR HERE TO FLIP</span>
          </button>

          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3D Card Container with Flip Transform */}
        <div
          className="w-full aspect-[1.58/1] cursor-pointer"
          style={{ perspective: '1200px' }}
          onClick={handleFlip}
        >
          <div
            className="relative w-full h-full rounded-2xl transition-transform duration-700 ease-in-out"
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            {/* ================= FRONT SIDE ================= */}
            <div
              className="absolute inset-0 w-full h-full rounded-2xl cyber-panel-glow p-5 flex flex-col justify-between border-2 border-cyan-400/50 shadow-[0_0_35px_rgba(0,242,254,0.3)] bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/80"
              style={{ backfaceVisibility: 'hidden' }}
            >
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-cyan-400 flex items-center justify-center text-black font-extrabold text-xs font-mono">
                    JS
                  </div>
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-cyan-400">
                      DIGITAL IDENTITY CARD // 2036
                    </div>
                    <div className="text-xs font-mono font-bold text-white tracking-wider">
                      CLEARANCE: ALPHA_DEV
                    </div>
                  </div>
                </div>

                {/* Holographic Chip */}
                <div className="w-9 h-7 rounded bg-gradient-to-tr from-amber-400 to-amber-200 border border-amber-500 shadow-inner flex flex-col justify-center px-1 space-y-0.5">
                  <div className="h-0.5 w-full bg-amber-600/60" />
                  <div className="h-0.5 w-full bg-amber-600/60" />
                </div>
              </div>

              {/* Card Center: Portrait & Identity Details */}
              <div className="flex items-center gap-4 py-1">
                {/* Micro Hologram Avatar */}
                <div className="relative w-20 h-24 rounded-lg overflow-hidden border border-cyan-400/60 shrink-0 bg-gradient-to-b from-cyan-950/80 to-slate-950 flex items-center justify-center">
                  <img
                    src={PERSONAL_INFO.cutoutUrl || PERSONAL_INFO.portraitUrl}
                    alt="Sukesh"
                    className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(0,242,254,0.4)]"
                  />
                  <div className="absolute inset-0 scanline opacity-30" />
                </div>

                {/* Name & Academic Rank */}
                <div className="space-y-1">
                  <h4 className="text-lg font-bold font-display text-white leading-tight">
                    {PERSONAL_INFO.name}
                  </h4>
                  <div className="text-[11px] font-mono text-cyan-300 font-semibold">
                    SOFTWARE DEVELOPER
                  </div>
                  <div className="text-[10px] font-mono text-slate-300">
                    B.Tech CSE (Data Science)
                  </div>
                  <div className="text-[9px] font-mono text-slate-400">
                    Ellenki College • CGPA: 8.7
                  </div>
                </div>
              </div>

              {/* Card Footer: Barcode & Status */}
              <div className="pt-2 border-t border-cyan-500/20 flex items-center justify-between">
                <div className="space-y-0.5">
                  {/* Simulated barcode */}
                  <div className="flex items-center gap-0.5 h-3">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-full ${i % 3 === 0 ? 'w-1 bg-cyan-400' : 'w-0.5 bg-slate-400'}`}
                      />
                    ))}
                  </div>
                  <span className="text-[8px] font-mono text-slate-500 tracking-widest block">
                    2036-6304-7384-50JS
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>VERIFIED</span>
                </div>
              </div>
            </div>

            {/* ================= BACK SIDE ================= */}
            <div
              className="absolute inset-0 w-full h-full rounded-2xl cyber-panel-glow p-5 flex flex-col justify-between border-2 border-purple-400/50 shadow-[0_0_35px_rgba(168,85,247,0.3)] bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950/80"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              {/* Magnetic Stripe */}
              <div className="-mx-5 -mt-5 h-8 bg-slate-950 border-b border-purple-500/30 flex items-center px-4">
                <span className="text-[9px] font-mono text-slate-500 tracking-widest">
                  QUANTUM BIOMETRIC STRIPE // ENCRYPTED
                </span>
              </div>

              {/* Back Content */}
              <div className="space-y-2 py-2">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-300">
                  <span>DISPATCH EMAIL:</span>
                  <span className="text-cyan-300">{PERSONAL_INFO.email}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-300">
                  <span>PHONE LINK:</span>
                  <span className="text-emerald-300">{PERSONAL_INFO.phone}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-300">
                  <span>CODE HUB:</span>
                  <span className="text-purple-300">github.com/sukeshreddy32</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-300">
                  <span>LOCATION:</span>
                  <span className="text-slate-400">Hyderabad, IN</span>
                </div>
              </div>

              {/* Signature Box & Security Hash */}
              <div className="pt-2 border-t border-purple-500/20 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[8px] font-mono text-slate-500">AUTHORIZING SIGNATURE</span>
                  <div className="font-display italic text-xs text-cyan-300 tracking-wider">
                    Janga Sukesh
                  </div>
                </div>

                <Fingerprint className="w-6 h-6 text-purple-400/60" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
