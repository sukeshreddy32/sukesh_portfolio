import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { sound } from '../../utils/soundEngine';
import { 
  Mail, 
  Phone, 
  Send, 
  Copy, 
  Check, 
  Github, 
  Linkedin, 
  MapPin, 
  MessageSquare, 
  Sparkles,
  ShieldCheck,
  Terminal
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldName: string) => {
    sound.playClick();
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Transmitter identity required';
    if (!formData.email.trim()) {
      errs.email = 'Comms link (email) required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Invalid communications protocol format';
    }
    if (!formData.subject.trim()) errs.subject = 'Subject vector required';
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = 'Payload must contain at least 10 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      sound.playScan();
      return;
    }

    sound.playTerminalKey();
    setIsSubmitting(true);

    // Simulate encrypted digital transmission
    setTimeout(() => {
      sound.playSuccess();
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Construct mailto link as working delivery fallback
      const mailtoLink = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\nMessage:\n${formData.message}`)}`;
      window.open(mailtoLink, '_blank');
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            <span>SECTION 05 // HYPERSPACE COMMUNICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-white leading-tight">
            LET'S BUILD SOMETHING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-cyan-400 cyber-glow-text">
              EXTRAORDINARY.
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base font-sans">
            Ready to collaborate on innovative software, discuss engineering opportunities, or explore future possibilities. Initiate transmission below.
          </p>
        </div>

        {/* Content Grid: Direct Channels on Left, Transmission Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Direct Email Card */}
            <div className="cyber-panel p-5 rounded-2xl flex items-center justify-between border border-slate-800 hover:border-cyan-400 transition-colors group">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">DIRECT ELECTRONIC MAIL</span>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sm font-mono font-bold text-white hover:text-cyan-400 transition-colors">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-cyan-400 hover:border-cyan-400 transition-colors"
                title="Copy Email to Clipboard"
              >
                {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Direct Phone Card */}
            <div className="cyber-panel p-5 rounded-2xl flex items-center justify-between border border-slate-800 hover:border-emerald-400 transition-colors group">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">SECURE TELEPHONY</span>
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="text-sm font-mono font-bold text-white hover:text-emerald-400 transition-colors">
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-emerald-400 hover:border-emerald-400 transition-colors"
                title="Copy Phone to Clipboard"
              >
                {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* LinkedIn Portal */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="cyber-panel p-5 rounded-2xl flex items-center justify-between border border-slate-800 hover:border-blue-400 transition-colors group block"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-blue-500/15 border border-blue-500/40 text-blue-300 group-hover:scale-105 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">PROFESSIONAL NETWORK</span>
                  <span className="text-sm font-mono font-bold text-white group-hover:text-blue-400 transition-colors">
                    linkedin.com/in/jangasukesh/
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">VISIT →</span>
            </a>

            {/* GitHub Profile */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="cyber-panel p-5 rounded-2xl flex items-center justify-between border border-slate-800 hover:border-purple-400 transition-colors group block"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-purple-500/15 border border-purple-500/40 text-purple-300 group-hover:scale-105 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 block">CODE REPOSITORY</span>
                  <span className="text-sm font-mono font-bold text-white group-hover:text-purple-400 transition-colors">
                    github.com/sukeshreddy32
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono text-slate-500 group-hover:text-cyan-400 transition-colors">VISIT →</span>
            </a>

            {/* Geographic Coordinates Card */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-3 text-xs font-mono text-slate-400">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>HYDERABAD / PATELGUDA [17.52° N, 78.23° E]</span>
            </div>

          </div>

          {/* Right Column: Interactive Holographic Transmission Terminal */}
          <div className="lg:col-span-7 cyber-panel-glow p-6 sm:p-8 rounded-3xl border border-rose-500/30 relative overflow-hidden">
            
            {/* Top Terminal Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Terminal className="w-4 h-4" />
                <span>COMMS_UPLINK // QUANTUM_2036</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">ENCRYPTION: ACTIVE</span>
            </div>

            {isSubmitted ? (
              /* Success State */
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.4)]">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold font-display text-white">
                  TRANSMISSION DISPATCHED
                </h4>
                <p className="text-sm text-slate-300 font-sans max-w-md">
                  Thank you, <strong className="text-cyan-300">{formData.name}</strong>. Your communication payload has been encrypted and opened with direct dispatch to Sukesh's inbox (<span className="text-white font-mono">{PERSONAL_INFO.email}</span>).
                </p>
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs font-mono text-cyan-300 transition-colors"
                >
                  SEND ANOTHER TRANSMISSION
                </button>
              </div>
            ) : (
              /* Input Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-400 block">YOUR NAME / IDENTITY *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Mercer"
                      className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono transition-colors"
                    />
                    {errors.name && <span className="text-[11px] font-mono text-rose-400">{errors.name}</span>}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-400 block">COMMUNICATIONS EMAIL *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. contact@domain.com"
                      className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono transition-colors"
                    />
                    {errors.email && <span className="text-[11px] font-mono text-rose-400">{errors.email}</span>}
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400 block">SUBJECT VECTOR *</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Software Developer Opportunity / Project Collaboration"
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono transition-colors"
                  />
                  {errors.subject && <span className="text-[11px] font-mono text-rose-400">{errors.subject}</span>}
                </div>

                {/* Message Input */}
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-400 block">TRANSMISSION PAYLOAD *</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="State your objectives, project parameters, or technical queries..."
                    className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono transition-colors resize-none"
                  />
                  {errors.message && <span className="text-[11px] font-mono text-rose-400">{errors.message}</span>}
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onMouseEnter={() => sound.playHover()}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-black font-extrabold font-mono text-sm tracking-wider shadow-[0_0_20px_rgba(0,242,254,0.4)] hover:shadow-[0_0_30px_rgba(0,242,254,0.7)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-black animate-ping" />
                      <span>INITIALIZING SECURE DISPATCH...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-black" />
                      <span>TRANSMIT DISPATCH PAYLOAD</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
