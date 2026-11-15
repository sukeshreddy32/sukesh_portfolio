import React, { useState, useEffect, useRef } from 'react';
import { AI_KNOWLEDGE_BASE, PERSONAL_INFO } from '../../data/portfolioData';
import { sound } from '../../utils/soundEngine';
import { ChatMessage } from '../../types';
import { 
  Bot, 
  Send, 
  Sparkles, 
  X, 
  Volume2, 
  VolumeX, 
  CornerDownLeft, 
  Terminal,
  RotateCcw
} from 'lucide-react';

interface SukeshAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export const SukeshAIModal: React.FC<SukeshAIModalProps> = ({
  isOpen,
  onClose,
  onOpenResume
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Greetings. I am SUKESH AI—the personal neural assistant for Janga Sukesh (EST. 2036). How may I assist your inquiry into his software engineering background, projects, or technical competencies today?",
      timestamp: '2036.04 // 00:01'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [enableVoice, setEnableVoice] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "Who is Sukesh?",
    "Tell me about Question Paper Hub",
    "What is AgriLink AI?",
    "What programming languages does he know?",
    "What is his education background?",
    "How can I contact him?",
    "Where can I download his resume?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages, isTyping]);

  const speakText = (text: string) => {
    if (!enableVoice || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1.05;
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch {}
  };

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    sound.playTerminalKey();
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Natural simulated neural retrieval
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      let bestMatch = AI_KNOWLEDGE_BASE.find(item =>
        item.keywords.some(k => lowerQuery.includes(k.toLowerCase()))
      );

      let reply = "";
      if (bestMatch) {
        reply = bestMatch.answer;
      } else if (lowerQuery.includes("hire") || lowerQuery.includes("job") || lowerQuery.includes("work")) {
        reply = `Sukesh is an emerging Software Developer (~Fresher) maintaining an 8.7 CGPA in B.Tech CSE (Data Science) at Ellenki College. He is enthusiastically available for software development internships and technology engineering roles. Feel free to contact him at ${PERSONAL_INFO.email} or call ${PERSONAL_INFO.phone}.`;
      } else {
        reply = `Thank you for your inquiry regarding "${query}". Sukesh is a Software Developer specializing in Python, TypeScript, SQL, and AI/Machine Learning. You can review his flagship projects "Question Paper Hub" and "AgriLink AI", or download his verified resume directly!`;
      }

      sound.playModal();
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);

      if (enableVoice) {
        speakText(reply);
      }
    }, 600);
  };

  const handleReset = () => {
    sound.playClick();
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: "Neural context cleared. How can I assist you with Janga Sukesh's portfolio?",
        timestamp: 'SYSTEM RESET'
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl h-[85vh] sm:h-[750px] cyber-panel-glow rounded-3xl flex flex-col overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================= MODAL HEADER ================= */}
        <div className="p-4 sm:p-5 border-b border-cyan-500/30 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Holographic Glowing Orb Avatar */}
            <div className="relative flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_#00f2fe] animate-pulse">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-base sm:text-lg text-white">
                  SUKESH AI
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  NEURAL v3.6
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400">
                Verified Autonomous Portfolio Assistant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Speech Toggle */}
            <button
              onClick={() => {
                sound.playClick();
                setEnableVoice(!enableVoice);
              }}
              className={`p-2 rounded-lg border text-xs font-mono transition-colors ${
                enableVoice
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title={enableVoice ? "Mute Speech Synthesis" : "Enable Speech Synthesis"}
            >
              {enableVoice ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Reset Chat */}
            <button
              onClick={handleReset}
              className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
              title="Reset Chat Session"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ================= CHAT MESSAGE THREAD ================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 font-sans text-sm">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1 px-1">
                <span className="text-[10px] font-mono text-slate-500">
                  {msg.sender === 'user' ? 'VISITOR' : 'SUKESH AI'}
                </span>
                <span className="text-[9px] font-mono text-slate-600">
                  {msg.timestamp}
                </span>
              </div>

              <div
                className={`max-w-[85%] sm:max-w-[80%] p-3.5 sm:p-4 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-tr-none shadow-[0_0_15px_rgba(0,242,254,0.25)]'
                    : 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 p-3 bg-slate-950/80 border border-slate-800 rounded-2xl rounded-tl-none w-fit">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono text-cyan-400">NEURAL RETRIEVAL IN PROGRESS...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ================= SUGGESTED QUESTION CHIPS ================= */}
        <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="text-[10px] font-mono text-slate-400 shrink-0">PROMPTS:</span>
          {suggestedQuestions.map(q => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 hover:border-cyan-400 hover:text-cyan-300 text-slate-300 shrink-0 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* ================= INPUT FOOTER ================= */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 border-t border-cyan-500/20 bg-slate-950 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Sukesh's projects, skills, education, or contact..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono transition-colors"
          />

          <button
            type="submit"
            disabled={!input.trim()}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(0,242,254,0.4)] transition-all flex items-center gap-1.5"
          >
            <span className="text-xs font-mono hidden sm:inline">TRANSMIT</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
