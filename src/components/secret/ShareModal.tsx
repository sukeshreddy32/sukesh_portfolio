import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { sound } from '../../utils/soundEngine';
import { X, Copy, Check, Share2, Linkedin, Twitter, MessageSquare } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://question-paper-hub.vercel.app/';

  if (!isOpen) return null;

  const handleCopy = () => {
    sound.playClick();
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = `Explore the 2036 Personal Developer Universe of Janga Sukesh — Software Developer & AI Enthusiast:`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-md w-full cyber-panel-glow p-6 rounded-2xl space-y-5 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pb-3 border-b border-cyan-500/20">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
            <Share2 className="w-4 h-4" />
            <span>SHARE DIGITAL UNIVERSE</span>
          </div>
          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono text-slate-400 block">PORTFOLIO ACCESS LINK</label>
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-700">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-transparent text-xs font-mono text-slate-300 focus:outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-cyan-500 text-black font-bold text-xs font-mono hover:bg-cyan-400 transition-colors flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "COPIED" : "COPY"}</span>
            </button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-blue-400 text-xs font-mono text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-colors"
          >
            <Linkedin className="w-4 h-4 text-blue-400" />
            <span>LinkedIn</span>
          </a>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs font-mono text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-colors"
          >
            <Twitter className="w-4 h-4 text-cyan-400" />
            <span>X (Twitter)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
