import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO, PROJECTS, SKILLS, EDUCATION_TIMELINE, CERTIFICATIONS } from '../../data/portfolioData';
import { sound } from '../../utils/soundEngine';
import { Terminal as TerminalIcon, X, CornerDownLeft, Sparkles } from 'lucide-react';

interface CommandCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
  onOpenIDCard: () => void;
  onToggleMatrix: () => void;
}

export const CommandCenterModal: React.FC<CommandCenterModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenResume,
  onOpenIDCard,
  onToggleMatrix
}) => {
  const [history, setHistory] = useState<Array<{ cmd: string; output: string | React.ReactNode }>>([
    {
      cmd: 'sys.init',
      output: (
        <div className="space-y-1">
          <div className="text-cyan-400 font-bold">SUKESH QUANTUM TERMINAL v2036.1</div>
          <div className="text-slate-400 text-xs">Type <span className="text-cyan-300">help</span> to list all interactive system commands.</div>
        </div>
      )
    }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw) return;

    sound.playTerminalKey();
    const parts = raw.toLowerCase().split(' ');
    const cmd = parts[0];
    const arg = parts.slice(1).join(' ');

    let result: React.ReactNode = "";

    switch (cmd) {
      case 'help':
        result = (
          <div className="space-y-1 text-xs font-mono">
            <div className="text-cyan-400 font-bold mb-1">AVAILABLE COMMANDS:</div>
            <div>• <strong className="text-white">about</strong> : Display developer background & academic record</div>
            <div>• <strong className="text-white">skills</strong> : List technical skills & programming competencies</div>
            <div>• <strong className="text-white">projects</strong> : Overview of Question Paper Hub & AgriLink AI</div>
            <div>• <strong className="text-white">certifications</strong> : Show Code Unnati credential details</div>
            <div>• <strong className="text-white">contact</strong> : Display direct email, phone & social links</div>
            <div>• <strong className="text-white">resume</strong> : Open interactive digital resume document</div>
            <div>• <strong className="text-white">id</strong> : Inspect 3D digital identity card</div>
            <div>• <strong className="text-white">warp &lt;section&gt;</strong> : Warp to section (hero, about, skills, projects, certifications, contact)</div>
            <div>• <strong className="text-white">matrix</strong> : Toggle cyberpunk matrix rain easter egg</div>
            <div>• <strong className="text-white">clear</strong> : Clear terminal console</div>
            <div>• <strong className="text-white">exit</strong> : Close terminal window</div>
          </div>
        );
        break;

      case 'about':
        result = (
          <div className="text-xs font-mono space-y-1">
            <div className="text-cyan-300 font-bold">{PERSONAL_INFO.name}</div>
            <div className="text-slate-300">{PERSONAL_INFO.tagline}</div>
            <div className="text-slate-400">Education: {EDUCATION_TIMELINE[0].degree} @ {EDUCATION_TIMELINE[0].institution} (CGPA: {EDUCATION_TIMELINE[0].score})</div>
          </div>
        );
        break;

      case 'skills':
        result = (
          <div className="text-xs font-mono space-y-1">
            <div className="text-cyan-300 font-bold">VERIFIED TECHNICAL SKILLS:</div>
            <div className="text-slate-300">{SKILLS.map(s => s.name).join(' • ')}</div>
          </div>
        );
        break;

      case 'projects':
        result = (
          <div className="text-xs font-mono space-y-2">
            {PROJECTS.map(p => (
              <div key={p.id} className="border-l-2 border-cyan-400 pl-2">
                <div className="text-white font-bold">{p.title}</div>
                <div className="text-slate-400">{p.description}</div>
                {p.liveUrl && <div className="text-cyan-300">Live: {p.liveUrl}</div>}
              </div>
            ))}
          </div>
        );
        break;

      case 'certifications':
        result = (
          <div className="text-xs font-mono space-y-1">
            <div className="text-amber-300 font-bold">{CERTIFICATIONS[0].title}</div>
            <div className="text-slate-300">{CERTIFICATIONS[0].issuer} ({CERTIFICATIONS[0].partner})</div>
            <div className="text-slate-400">Duration: {CERTIFICATIONS[0].period}</div>
          </div>
        );
        break;

      case 'contact':
        result = (
          <div className="text-xs font-mono space-y-1">
            <div>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-cyan-300 underline">{PERSONAL_INFO.email}</a></div>
            <div>Phone: <span className="text-emerald-300">{PERSONAL_INFO.phone}</span></div>
            <div>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-purple-300 underline">{PERSONAL_INFO.github}</a></div>
            <div>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-blue-300 underline">{PERSONAL_INFO.linkedin}</a></div>
          </div>
        );
        break;

      case 'resume':
        result = "Opening Curriculum Vitae modal...";
        onOpenResume();
        break;

      case 'id':
        result = "Opening 3D Digital Identity Card...";
        onOpenIDCard();
        break;

      case 'matrix':
        result = "Toggling digital matrix rain sequence...";
        onToggleMatrix();
        break;

      case 'warp':
        if (['hero', 'about', 'skills', 'projects', 'certifications', 'contact'].includes(arg)) {
          result = `Warping to section [${arg}]...`;
          sound.playWarp();
          onNavigate(arg);
          onClose();
        } else {
          result = `Unknown sector '${arg}'. Available: hero, about, skills, projects, certifications, contact.`;
        }
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
        sound.playClick();
        onClose();
        return;

      default:
        result = `Command not recognized: '${cmd}'. Type 'help' for command list.`;
    }

    setHistory(prev => [...prev, { cmd: raw, output: result }]);
    setInput('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl h-[70vh] cyber-panel-glow rounded-2xl flex flex-col overflow-hidden animate-scale-up font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="p-3.5 border-b border-cyan-500/30 bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400 text-xs">
            <TerminalIcon className="w-4 h-4" />
            <span>COMMAND CENTER // CLI TERMINAL [2036]</span>
          </div>

          <button
            onClick={() => { sound.playClick(); onClose(); }}
            className="p-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Output */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs text-slate-200">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <span>user@2036:~$</span>
                <span className="text-white">{item.cmd}</span>
              </div>
              <div className="pl-4 text-slate-300">
                {item.output}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Prompt */}
        <form onSubmit={handleCommand} className="p-3 border-t border-cyan-500/20 bg-slate-950 flex items-center gap-2">
          <span className="text-cyan-400 text-xs font-bold">user@2036:~$</span>
          <input
            type="text"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help' for command list..."
            className="flex-1 bg-transparent text-xs text-white placeholder-slate-600 focus:outline-none font-mono"
          />
          <button
            type="submit"
            className="p-1 rounded text-cyan-400 hover:text-white transition-colors"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
