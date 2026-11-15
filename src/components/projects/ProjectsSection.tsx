import React, { useState } from 'react';
import { PROJECTS } from '../../data/portfolioData';
import { sound } from '../../utils/soundEngine';
import { 
  ExternalLink, 
  Github, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
  Database, 
  Workflow, 
  ShieldCheck, 
  Truck, 
  Users, 
  Scale, 
  TrendingUp, 
  FileText,
  Search,
  Filter
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const [activeProjectId, setActiveProjectId] = useState<string>('question-paper-hub');

  // Interactive state for Question Paper Hub interactive demo
  const [selectedBranch, setSelectedBranch] = useState('CSE (DS)');
  const [selectedYear, setSelectedYear] = useState('Year 2');
  const [selectedSem, setSelectedSem] = useState('Sem 1');

  // Interactive step for AgriLink AI interactive supply chain flow
  const [activeAgriStep, setActiveAgriStep] = useState<number>(0);

  const agriSteps = [
    { title: "1. Farmer Submission", desc: "Farmer uploads harvest batch data & crop imagery directly from rural center.", icon: Users, color: "text-amber-400" },
    { title: "2. AI Quality Scan", desc: "Computer vision evaluates defect density, moisture index & grade standard.", icon: Sparkles, color: "text-cyan-400" },
    { title: "3. Price Forecasting", desc: "Predictive engine forecasts optimal fair-market value based on historical mandi arrivals.", icon: TrendingUp, color: "text-emerald-400" },
    { title: "4. Smart Logistics Dispatch", desc: "Algorithmic route optimization dispatches verified local transport fleets.", icon: Truck, color: "text-blue-400" },
    { title: "5. Digital Procurement", desc: "Verified bulk buyers execute settlement directly into farmer account with escrow.", icon: ShieldCheck, color: "text-purple-400" }
  ];

  const currentProject = PROJECTS.find(p => p.id === activeProjectId) || PROJECTS[0];

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SECTION 03 // ARCHITECTURAL SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
            FLAGSHIP <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 cyber-glow-text">SYSTEMS</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base font-sans">
            Production-deployed web infrastructure and intelligent supply-chain architectures engineered by Janga Sukesh.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md flex flex-wrap gap-2">
            {PROJECTS.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => {
                  sound.playClick();
                  setActiveProjectId(proj.id);
                }}
                onMouseEnter={() => sound.playHover()}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono tracking-wider transition-all duration-300 ${
                  activeProjectId === proj.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold shadow-[0_0_20px_rgba(0,242,254,0.4)] scale-105'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span className="opacity-70">0{idx + 1}.</span>
                <span>{proj.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ================= ACTIVE PROJECT CARD ================= */}
        <div className="cyber-panel p-6 sm:p-10 rounded-3xl border border-cyan-500/30 space-y-10 relative overflow-hidden">
          
          {/* Ambient Top Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Project Header & Meta */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-500/15 border border-cyan-500/40 text-cyan-300">
                  {currentProject.category}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {currentProject.highlight}
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
                {currentProject.title}
              </h3>
              <p className="text-sm font-mono text-cyan-400">
                {currentProject.subtitle}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              {currentProject.liveUrl && (
                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold font-mono text-xs tracking-wider shadow-[0_0_20px_rgba(0,242,254,0.4)] hover:scale-105 transition-all"
                >
                  <ExternalLink className="w-4 h-4 text-black" />
                  <span>LAUNCH LIVE PLATFORM</span>
                </a>
              )}

              <a
                href={currentProject.githubUrl || "https://github.com/sukeshreddy32"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                onMouseEnter={() => sound.playHover()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-200 hover:text-white font-mono text-xs tracking-wider transition-all"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB REPO</span>
              </a>
            </div>
          </div>

          {/* Description & Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <p className="text-slate-300 leading-relaxed font-sans text-base">
                {currentProject.description}
              </p>

              {/* Key Features List */}
              <div className="space-y-3">
                <span className="text-xs font-mono text-cyan-400 tracking-wider block">KEY ARCHITECTURAL HIGHLIGHTS:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentProject.features.map(f => (
                    <div key={f} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono text-slate-400 block">TECHNOLOGY STACK:</span>
                <div className="flex flex-wrap gap-2">
                  {currentProject.tags.map(t => (
                    <span key={t} className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-700 text-cyan-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Architecture Pipeline Summary */}
            <div className="lg:col-span-5 cyber-panel p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
                <Workflow className="w-4 h-4 text-cyan-400" />
                <span>SYSTEM PIPELINE FLOW</span>
              </div>

              <div className="space-y-2.5">
                {currentProject.architecture.map((arch, idx) => (
                  <div key={arch} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono flex items-start gap-2 text-slate-300">
                    <span className="text-cyan-400 font-bold shrink-0">0{idx + 1}.</span>
                    <span>{arch}</span>
                  </div>
                ))}
              </div>

              {/* Live metrics */}
              {currentProject.metrics && (
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800">
                  {currentProject.metrics.map(m => (
                    <div key={m.label} className="p-2 rounded bg-slate-900/60 text-center">
                      <div className="text-[10px] font-mono text-slate-400">{m.label}</div>
                      <div className="text-xs font-mono font-bold text-cyan-300 truncate mt-0.5">{m.value}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ================= INTERACTIVE PROJECT DEMO PREVIEW ================= */}
          <div className="pt-6 border-t border-slate-800/80">
            {activeProjectId === 'question-paper-hub' ? (
              /* Question Paper Hub Interactive Preview */
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-mono text-cyan-400 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    <span>INTERACTIVE CATALOG HIERARCHY SIMULATOR:</span>
                  </span>
                  <span className="text-xs font-mono text-slate-500">Live platform preview mode</span>
                </div>

                <div className="cyber-panel p-4 sm:p-6 rounded-2xl border border-cyan-500/20 space-y-5">
                  {/* Filter Selectors */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1.5">BRANCH</label>
                      <div className="flex gap-1.5">
                        {['CSE (DS)', 'CSE (Core)', 'ECE', 'AI&ML'].map(b => (
                          <button
                            key={b}
                            onClick={() => { sound.playClick(); setSelectedBranch(b); }}
                            className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                              selectedBranch === b
                                ? 'bg-cyan-500 text-black font-bold'
                                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1.5">ACADEMIC YEAR</label>
                      <div className="flex gap-1.5">
                        {['Year 1', 'Year 2', 'Year 3', 'Year 4'].map(y => (
                          <button
                            key={y}
                            onClick={() => { sound.playClick(); setSelectedYear(y); }}
                            className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                              selectedYear === y
                                ? 'bg-cyan-500 text-black font-bold'
                                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            {y}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1.5">SEMESTER</label>
                      <div className="flex gap-1.5">
                        {['Sem 1', 'Sem 2'].map(s => (
                          <button
                            key={s}
                            onClick={() => { sound.playClick(); setSelectedSem(s); }}
                            className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                              selectedSem === s
                                ? 'bg-cyan-500 text-black font-bold'
                                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Simulated Question Paper Results */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                      <span>MATCHING ARCHIVES: {selectedBranch} • {selectedYear} • {selectedSem}</span>
                      <span className="text-emerald-400">READY TO STREAM</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { title: "Data Structures & Algorithms - Endsem 2024", code: "CS-201", type: "PDF" },
                        { title: "Discrete Mathematics & Probability - Midsem 2", code: "MA-203", type: "PDF" },
                        { title: "Python for Data Analysis - Comprehensive", code: "DS-205", type: "PDF" },
                      ].map(paper => (
                        <div key={paper.title} className="p-3 rounded-lg bg-slate-900/90 border border-slate-700/80 flex items-center justify-between">
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-mono text-cyan-400">{paper.code}</span>
                            <div className="text-xs font-sans text-white font-medium">{paper.title}</div>
                          </div>
                          <a
                            href="https://question-paper-hub.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-black transition-colors"
                            title="View paper on live portal"
                          >
                            <FileText className="w-4 h-4" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* AgriLink AI Interactive 5-Node Supply Chain Simulator */
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-2">
                    <Workflow className="w-4 h-4" />
                    <span>INTERACTIVE 5-STAGE SUPPLY CHAIN VISUALIZATION:</span>
                  </span>
                  <span className="text-xs font-mono text-slate-500">Click a node to inspect pipeline logic</span>
                </div>

                <div className="cyber-panel p-4 sm:p-6 rounded-2xl border border-emerald-500/20 space-y-6">
                  {/* 5-Node Flow Steps */}
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    {agriSteps.map((step, idx) => {
                      const Icon = step.icon;
                      const isActive = activeAgriStep === idx;
                      return (
                        <div
                          key={step.title}
                          onClick={() => { sound.playClick(); setActiveAgriStep(idx); }}
                          onMouseEnter={() => sound.playHover()}
                          className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-300 flex flex-col items-center text-center space-y-2 ${
                            isActive
                              ? 'bg-slate-900 border-cyan-400 shadow-[0_0_20px_rgba(0,242,254,0.3)] scale-105'
                              : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className={`p-2 rounded-lg bg-slate-900 ${step.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-mono font-bold text-white leading-tight">
                            {step.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Node Detail Box */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-xs font-mono text-cyan-400 uppercase">
                        ACTIVE STAGE: {agriSteps[activeAgriStep].title}
                      </div>
                      <p className="text-sm text-slate-300 font-sans">
                        {agriSteps[activeAgriStep].desc}
                      </p>
                    </div>

                    <div className="text-xs font-mono text-emerald-400 px-3 py-1.5 rounded bg-emerald-950/50 border border-emerald-500/40 shrink-0">
                      FAIR-VALUE PROTECTED
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
