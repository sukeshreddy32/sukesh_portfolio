import React from 'react';
import { PERSONAL_INFO, EDUCATION_TIMELINE } from '../../data/portfolioData';
import { sound } from '../../utils/soundEngine';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Code, 
  Cpu, 
  Globe2, 
  MapPin, 
  Sparkles,
  Layers,
  CheckCircle2,
  Brain
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const interests = [
    { title: "Software Engineering", desc: "Modular, performant, and maintainable systems.", icon: Code, color: "text-cyan-400" },
    { title: "Artificial Intelligence", desc: "Predictive models, neural architectures & vision.", icon: Brain, color: "text-purple-400" },
    { title: "Data Science & Analytics", desc: "Extracting actionable insights from data.", icon: Layers, color: "text-emerald-400" },
    { title: "Application Development", desc: "Building intuitive end-user platforms.", icon: Cpu, color: "text-blue-400" },
    { title: "Technology Innovation", desc: "Emerging computational horizons in 2036.", icon: Sparkles, color: "text-amber-400" },
  ];

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>SECTION 01 // IDENTITY DOSSIER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
            ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 cyber-glow-text">JANGA SUKESH</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base font-sans">
            A comprehensive profile of an emerging software developer dedicated to engineering solutions with computational rigor and creative vision.
          </p>
        </div>

        {/* Top Grid: Bio Dossier & Objective */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Bio Card */}
          <div className="lg:col-span-5 cyber-panel p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6 relative overflow-hidden group">
            {/* Ambient Background Gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
                <span className="text-xs font-mono text-cyan-400 tracking-wider">PROFILE_ID // 2036</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                  ACTIVE CANDIDATE
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs sm:text-sm">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">NAME:</span>
                  <span className="text-white font-bold">{PERSONAL_INFO.name}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">ROLE:</span>
                  <span className="text-cyan-300 font-bold">SOFTWARE DEVELOPER</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">EDUCATION:</span>
                  <span className="text-white">B.TECH CSE (DATA SCIENCE)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">INSTITUTION:</span>
                  <span className="text-slate-300">Ellenki College of Eng. & Tech</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">STATUS:</span>
                  <span className="text-purple-300">{PERSONAL_INFO.status}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">LOCATION:</span>
                  <span className="text-slate-300">{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="pt-2">
              <span className="text-xs font-mono text-slate-400 tracking-wider block mb-2">SPOKEN LANGUAGES:</span>
              <div className="flex flex-wrap gap-2">
                {PERSONAL_INFO.languages.map(l => (
                  <span key={l.name} className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono">
                    {l.name} <span className="text-cyan-400 text-[10px]">({l.level.split(' ')[0]})</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Objective & Technical Mission Card */}
          <div className="lg:col-span-7 cyber-panel-glow p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs">
                <Sparkles className="w-4 h-4" />
                <span>OFFICIAL RESUME OBJECTIVE</span>
              </div>

              <blockquote className="text-base sm:text-lg text-slate-200 font-sans leading-relaxed border-l-2 border-cyan-400 pl-4 italic">
                "{PERSONAL_INFO.objective}"
              </blockquote>

              <p className="text-sm text-slate-400 leading-relaxed font-sans pt-2">
                As an aspiring software engineer specializing in Data Science at Ellenki College of Engineering and Technology, I bridge foundational algorithmic rigor with modern scalable web and intelligent software architectures. From building live full-stack examination hubs to conceptualizing AI-driven agricultural supply chain pipelines, my commitment is to engineer high-utility digital systems.
              </p>
            </div>

            {/* Verified Academic Scores Pill Grid */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-cyan-500/20">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-cyan-500/30 text-center">
                <div className="text-xl sm:text-2xl font-bold font-display text-cyan-400 cyber-glow-text">8.7</div>
                <div className="text-[10px] sm:text-xs font-mono text-slate-400 mt-1">B.Tech CGPA (Current)</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-purple-500/30 text-center">
                <div className="text-xl sm:text-2xl font-bold font-display text-purple-400 cyber-glow-text-purple">94%</div>
                <div className="text-[10px] sm:text-xs font-mono text-slate-400 mt-1">Intermediate (MPC)</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/60 border border-emerald-500/30 text-center">
                <div className="text-xl sm:text-2xl font-bold font-display text-emerald-400">8.8</div>
                <div className="text-[10px] sm:text-xs font-mono text-slate-400 mt-1">SSC CGPA</div>
              </div>
            </div>
          </div>

        </div>

        {/* Educational Journey Timeline */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              EDUCATIONAL <span className="text-cyan-400">CHRONOLOGY</span>
            </h3>
            <p className="text-xs font-mono text-slate-400">VERIFIED TIMELINE FROM ACADEMIC RECORDS</p>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l border-cyan-500/30 max-w-4xl mx-auto space-y-8">
            {EDUCATION_TIMELINE.map((edu, idx) => (
              <div
                key={edu.institution}
                className="relative group cyber-panel p-5 sm:p-6 rounded-xl hover:border-cyan-400/60 transition-all duration-300"
              >
                {/* Timeline node pin */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-6 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_10px_#00f2fe]">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-mono text-cyan-400 tracking-wider">
                      {edu.period} • {edu.status}
                    </span>
                    <h4 className="text-lg font-bold font-display text-white mt-0.5">
                      {edu.degree}
                    </h4>
                    <p className="text-sm text-slate-300 flex items-center gap-1.5 mt-0.5">
                      <GraduationCap className="w-4 h-4 text-cyan-400" />
                      <span>{edu.institution}</span>
                      <span className="text-slate-500 text-xs">({edu.location})</span>
                    </p>
                  </div>

                  <div className="self-start sm:self-center px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold whitespace-nowrap">
                    {edu.scoreLabel}: {edu.score}
                  </div>
                </div>

                <p className="text-sm text-slate-400 pt-3 leading-relaxed">
                  {edu.description}
                </p>

                <div className="pt-3 flex flex-wrap gap-2">
                  {edu.highlights.map(h => (
                    <span key={h} className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                      <span>{h}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Interests Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-bold font-display text-white">AREAS OF FOCUS & INQUIRY</h3>
            <p className="text-xs font-mono text-slate-400">COMPUTATIONAL DOMAINS & ENGINEERING PASSIONS</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {interests.map(item => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="cyber-panel p-4 rounded-xl flex flex-col justify-between hover:border-cyan-400/50 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="space-y-2">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 w-fit">
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <h5 className="font-display font-bold text-sm text-white">{item.title}</h5>
                    <p className="text-xs text-slate-400 leading-snug">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
