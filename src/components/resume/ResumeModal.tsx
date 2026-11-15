import React, { useState } from 'react';
import { PERSONAL_INFO, PROJECTS, EDUCATION_TIMELINE, CERTIFICATIONS, SKILLS } from '../../data/portfolioData';
import { sound } from '../../utils/soundEngine';
import { 
  X, 
  Printer, 
  Download, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  CheckCircle2, 
  FileText,
  Eye,
  Sparkles
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<'structured' | 'original'>('structured');

  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in no-print"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-[90vh] cyber-panel-glow rounded-3xl flex flex-col overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ================= HEADER ================= */}
        <div className="p-4 sm:p-5 border-b border-cyan-500/30 bg-slate-950 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-white">
                JANGA SUKESH — CURRICULUM VITAE
              </h3>
              <p className="text-[11px] font-mono text-cyan-400">
                VERIFIED SOURCE OF TRUTH • SOFTWARE DEVELOPER
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Switcher */}
            <div className="p-1 rounded-xl bg-slate-900 border border-slate-700 flex text-xs font-mono">
              <button
                onClick={() => { sound.playClick(); setViewMode('structured'); }}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  viewMode === 'structured'
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                INTERACTIVE
              </button>
              <button
                onClick={() => { sound.playClick(); setViewMode('original'); }}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  viewMode === 'original'
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ORIGINAL DOC
              </button>
            </div>

            {/* Print / Save PDF */}
            <button
              onClick={handlePrint}
              onMouseEnter={() => sound.playHover()}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white transition-colors"
              title="Print / Save PDF"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Download Original Image / Document */}
            <a
              href={PERSONAL_INFO.resumeOriginalUrl}
              download="Janga_Sukesh_Resume.jpg"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500 hover:text-black transition-colors"
              title="Download Original Resume File"
            >
              <Download className="w-4 h-4" />
            </a>

            {/* Close Modal */}
            <button
              onClick={() => { sound.playClick(); onClose(); }}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-rose-400 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ================= RESUME CONTENT AREA ================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#030712] text-slate-200">
          {viewMode === 'original' ? (
            /* Original Uploaded Resume View */
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="text-xs font-mono text-cyan-400 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>EXACT UPLOADED RESUME DOCUMENT (AUTHENTIC ARCHIVE)</span>
              </div>
              <div className="max-w-2xl w-full rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-white">
                <img
                  src={PERSONAL_INFO.resumeOriginalUrl}
                  alt="Janga Sukesh Original Resume"
                  className="w-full h-auto"
                />
              </div>
            </div>
          ) : (
            /* Structured Interactive Digital Resume */
            <div className="max-w-3xl mx-auto space-y-8 font-sans">
              
              {/* Header Profile */}
              <div className="pb-6 border-b border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h1 className="text-3xl font-extrabold font-display text-white">
                      {PERSONAL_INFO.name}
                    </h1>
                    <p className="text-sm font-mono text-cyan-400 font-semibold mt-0.5">
                      {PERSONAL_INFO.tagline}
                    </p>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 w-fit">
                    ~FRESHER (EMERGING DEVELOPER)
                  </span>
                </div>

                {/* Contact bar */}
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{PERSONAL_INFO.email}</span>
                  </a>
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{PERSONAL_INFO.phone}</span>
                  </a>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Hyderabad / Telangana</span>
                  </span>
                  <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                    <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>LinkedIn</span>
                  </a>
                  <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                    <Github className="w-3.5 h-3.5 text-cyan-400" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

              {/* Objective */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                  OBJECTIVE
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed italic bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  "{PERSONAL_INFO.objective}"
                </p>
              </div>

              {/* Education */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                  EDUCATION
                </h4>
                <div className="space-y-3">
                  {EDUCATION_TIMELINE.map(edu => (
                    <div key={edu.institution} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-white">{edu.degree}</div>
                        <div className="text-xs text-slate-400">{edu.institution} • {edu.location}</div>
                      </div>
                      <div className="text-right sm:text-right font-mono text-xs">
                        <div className="text-cyan-300 font-bold">{edu.scoreLabel}: {edu.score}</div>
                        <div className="text-slate-500 text-[11px]">{edu.period}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                  TECHNICAL SKILLS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map(s => (
                    <span key={s.name} className="px-3 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300">
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                  FLAGSHIP PROJECTS
                </h4>
                <div className="space-y-3">
                  {PROJECTS.map(proj => (
                    <div key={proj.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex justify-between items-center">
                        <h5 className="text-sm font-bold text-white">{proj.title}</h5>
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{proj.description}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {proj.tags.map(t => (
                          <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                  CERTIFICATIONS
                </h4>
                {CERTIFICATIONS.map(cert => (
                  <div key={cert.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center text-sm font-bold text-white">
                      <span>{cert.title}</span>
                      <span className="text-xs font-mono text-cyan-400">{cert.period}</span>
                    </div>
                    <div className="text-xs text-slate-400">{cert.issuer} ({cert.partner})</div>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {cert.topics.map(t => (
                        <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Languages */}
              <div className="space-y-2 pb-4">
                <h4 className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                  LANGUAGES
                </h4>
                <div className="flex gap-4 text-xs font-mono text-slate-300">
                  {PERSONAL_INFO.languages.map(l => (
                    <span key={l.name}>
                      • <strong className="text-white">{l.name}</strong> ({l.level})
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};
