import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { HolographicAvatar3D } from '../3d/HolographicAvatar3D';
import { sound } from '../../utils/soundEngine';
import { 
  Sparkles, 
  Rotate3d, 
  Eye, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Radio
} from 'lucide-react';

interface AvatarStage3DProps {
  onOpenIDCard: () => void;
}

export const AvatarStage3D: React.FC<AvatarStage3DProps> = ({ onOpenIDCard }) => {
  const [avatarMode, setAvatarMode] = useState<'hologram' | 'neural' | 'photorealistic'>('hologram');
  const [scanActive, setScanActive] = useState(false);

  const handleModeChange = (mode: 'hologram' | 'neural' | 'photorealistic') => {
    sound.playClick();
    setAvatarMode(mode);
  };

  const handleScanTrigger = () => {
    sound.playScan();
    setScanActive(true);
    setTimeout(() => setScanActive(false), 2400);
  };

  return (
    <div className="relative w-full max-w-lg aspect-[3.4/4.4] sm:aspect-[3.6/4.6] flex flex-col items-center justify-center select-none group">
      
      {/* ================= BACKGROUND CYBERNETIC PORTAL ================= */}
      {/* Glowing Hexagonal / Circular Aura */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent blur-2xl pointer-events-none" />

      {/* Outer Floating Holographic Coordinates & Rings */}
      <div className="absolute inset-x-0 -top-8 flex justify-between items-center px-4 text-[10px] font-mono text-cyan-400 pointer-events-none z-20">
        <span className="flex items-center gap-1.5 bg-slate-950/80 px-2.5 py-1 rounded-full border border-cyan-500/30">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
          <span>3D HOLOGRAPHIC PROJECTION // 2036</span>
        </span>
        <span className="bg-slate-950/80 px-2.5 py-1 rounded-full border border-slate-800 text-slate-400 hidden sm:inline">
          TARGET: JANGA SUKESH
        </span>
      </div>

      {/* ================= 3D CANVAS VIEWPORT ================= */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden border border-cyan-500/30 shadow-[0_0_50px_rgba(0,242,254,0.15)] bg-slate-950/40 backdrop-blur-sm cursor-grab active:cursor-grabbing">
        
        {/* Holographic Ambient Grid Behind Avatar */}
        <div className="absolute inset-0 grid-pattern opacity-25 pointer-events-none" />
        <div className="absolute inset-0 scanline opacity-15 pointer-events-none" />

        {/* 3D WebGL Canvas */}
        <Suspense fallback={
          <div className="w-full h-full flex flex-col items-center justify-center text-cyan-400 font-mono text-xs gap-3">
            <div className="w-10 h-10 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
            <span>INITIALIZING 3D HOLOGRAPHIC MESH...</span>
          </div>
        }>
          <Canvas
            camera={{ position: [0, 0.4, 5.8], fov: 45 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            dpr={[1, 1.75]}
          >
            <ambientLight intensity={0.9} />
            <directionalLight position={[5, 6, 4]} intensity={1.5} color="#00f2fe" />
            <directionalLight position={[-5, -4, -3]} intensity={1.0} color="#a855f7" />
            <pointLight position={[0, -2, 2]} intensity={2.0} color="#00f2fe" distance={5} />

            {/* The 3D Digital Human Avatar */}
            <HolographicAvatar3D mode={avatarMode} />

            {/* Orbit Controls with bounded angles */}
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 2 + 0.15}
              minPolarAngle={Math.PI / 2 - 0.25}
              maxAzimuthAngle={Math.PI / 5}
              minAzimuthAngle={-Math.PI / 5}
              rotateSpeed={0.6}
            />
          </Canvas>
        </Suspense>

        {/* Interactive Hologram Scan Beam Effect Overlay */}
        {scanActive && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-full h-1 bg-cyan-300 shadow-[0_0_20px_#00f2fe] animate-scan" />
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-cyan-300 bg-slate-950/90 px-3 py-1 rounded-full border border-cyan-400">
              BIOMETRIC SPECTRAL SCAN ACTIVE...
            </div>
          </div>
        )}

        {/* Floating Top Controls: Mode Switcher */}
        <div className="absolute top-3 left-3 right-3 z-20 flex justify-between items-center pointer-events-auto">
          <div className="flex gap-1 p-1 rounded-xl bg-slate-950/85 border border-cyan-500/30 backdrop-blur-md text-[10px] font-mono">
            <button
              onClick={() => handleModeChange('hologram')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                avatarMode === 'hologram'
                  ? 'bg-cyan-500 text-black font-bold shadow-[0_0_10px_#00f2fe]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              HOLOGRAM
            </button>
            <button
              onClick={() => handleModeChange('neural')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                avatarMode === 'neural'
                  ? 'bg-emerald-500 text-black font-bold shadow-[0_0_10px_#10b981]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              MATRIX
            </button>
            <button
              onClick={() => handleModeChange('photorealistic')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                avatarMode === 'photorealistic'
                  ? 'bg-purple-500 text-black font-bold shadow-[0_0_10px_#a855f7]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3D REAL
            </button>
          </div>

          <button
            onClick={handleScanTrigger}
            onMouseEnter={() => sound.playHover()}
            className="p-1.5 rounded-xl bg-slate-950/85 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-white text-[11px] font-mono flex items-center gap-1 backdrop-blur-md transition-all shadow-[0_0_10px_rgba(0,242,254,0.2)]"
            title="Trigger Biometric Hologram Scan"
          >
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="hidden sm:inline">SCAN</span>
          </button>
        </div>

        {/* Floating Bottom Toolbar */}
        <div className="absolute bottom-3 left-3 right-3 z-20 flex justify-between items-center text-[10px] font-mono">
          <button
            onClick={() => {
              sound.playClick();
              onOpenIDCard();
            }}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/85 border border-purple-500/40 text-purple-300 hover:border-purple-400 hover:text-white backdrop-blur-md transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>INSPECT 3D ID BADGE</span>
          </button>

          <div className="flex items-center gap-1.5 text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800 backdrop-blur-md">
            <Rotate3d className="w-3 h-3 text-cyan-400" />
            <span>DRAG TO ORBIT 3D</span>
          </div>
        </div>

      </div>

      {/* Base Pedestal Telemetry */}
      <div className="mt-3 text-center text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase">
        [ JANGA SUKESH • 3D DIGITAL AVATAR • EST. 2036 ]
      </div>

    </div>
  );
};
