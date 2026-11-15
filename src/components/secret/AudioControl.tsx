import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { sound } from '../../utils/soundEngine';

export const AudioControl: React.FC = () => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    setIsMuted(sound.getMuted());
  }, []);

  const handleToggle = () => {
    const nextState = sound.toggleMute();
    setIsMuted(nextState);
    if (!nextState) {
      sound.playClick();
      sound.startAmbient();
      setHasInteracted(true);
    } else {
      sound.stopAmbient();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
      <button
        onClick={handleToggle}
        onMouseEnter={() => sound.playHover()}
        className={`group relative flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300 ${
          !isMuted
            ? 'bg-cyan-950/70 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,242,254,0.3)]'
            : 'bg-slate-900/80 border-slate-700/80 text-slate-400 hover:border-slate-500'
        }`}
        title={isMuted ? "Enable 2036 Soundscape" : "Mute Soundscape"}
        aria-label={isMuted ? "Unmute audio" : "Mute audio"}
      >
        {/* Animated equalizer waves when unmuted */}
        {!isMuted && (
          <div className="flex items-end gap-0.5 h-3 mr-1">
            <span className="w-0.5 bg-cyan-400 animate-pulse h-2" style={{ animationDelay: '0ms' }} />
            <span className="w-0.5 bg-cyan-400 animate-pulse h-3" style={{ animationDelay: '150ms' }} />
            <span className="w-0.5 bg-cyan-400 animate-pulse h-1.5" style={{ animationDelay: '300ms' }} />
          </div>
        )}

        {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}

        <span className="text-xs font-mono tracking-wider hidden sm:inline">
          {isMuted ? "AUDIO: OFF" : "AUDIO: 2036 FX"}
        </span>

        {/* Pulse indicator on initial load if muted */}
        {!hasInteracted && isMuted && (
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
          </span>
        )}
      </button>
    </div>
  );
};
