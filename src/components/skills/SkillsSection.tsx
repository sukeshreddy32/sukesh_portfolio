import React, { useState } from 'react';
import { SKILLS } from '../../data/portfolioData';
import { SkillItem } from '../../types';
import { sound } from '../../utils/soundEngine';
import { 
  Terminal, 
  Code2, 
  FileCode, 
  Cpu, 
  Database, 
  Layout, 
  Palette, 
  Binary, 
  BarChart3, 
  Sparkles,
  Info,
  X,
  Layers,
  ChevronRight
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Terminal,
  Code2,
  FileCode,
  Cpu,
  Database,
  Layout,
  Palette,
  Binary,
  BarChart3,
  Sparkles
};

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeModalSkill, setActiveModalSkill] = useState<SkillItem | null>(null);

  const categories = [
    'ALL',
    'Programming',
    'Database',
    'Web Technologies',
    'Computing & AI'
  ];

  const filteredSkills = selectedCategory === 'ALL'
    ? SKILLS
    : SKILLS.filter(s => s.category === selectedCategory);

  const handleOpenSkill = (skill: SkillItem) => {
    sound.playModal();
    setActiveModalSkill(skill);
  };

  const handleCloseSkill = () => {
    sound.playClick();
    setActiveModalSkill(null);
  };

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/70 border border-purple-500/40 text-purple-300 text-xs font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span>SECTION 02 // TECHNICAL GALAXY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white">
            COMPUTATIONAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 cyber-glow-text-purple">TOOLKIT</span>
          </h2>
          <p className="text-slate-400 max-w-2xl text-sm sm:text-base font-sans">
            Every technology in Sukesh's arsenal is presented transparently with its architectural role. No arbitrary percentage bars—only real technical capabilities.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat);
              }}
              onMouseEnter={() => sound.playHover()}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono tracking-wider transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold shadow-[0_0_20px_rgba(0,242,254,0.4)] scale-105'
                  : 'bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:border-cyan-500/50 hover:text-white'
              }`}
            >
              {cat === 'ALL' ? '[ ALL SYSTEMS ]' : `[ ${cat.toUpperCase()} ]`}
            </button>
          ))}
        </div>

        {/* Interactive 3D Technology Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSkills.map(skill => {
            const Icon = iconMap[skill.iconName] || Code2;
            return (
              <div
                key={skill.name}
                onClick={() => handleOpenSkill(skill)}
                onMouseEnter={() => sound.playHover()}
                className="group relative cyber-panel p-5 rounded-2xl cursor-pointer hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,242,254,0.2)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Holographic Top Corner Glow */}
                <div
                  className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-20 group-hover:opacity-60 transition-opacity"
                  style={{ backgroundColor: skill.color }}
                />

                <div className="space-y-4">
                  {/* Top Header: Icon + Category Badge */}
                  <div className="flex justify-between items-start">
                    <div
                      className="p-3 rounded-xl border transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${skill.color}15`,
                        borderColor: `${skill.color}40`,
                        boxShadow: `0 0 15px ${skill.color}25`
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: skill.color }} />
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-slate-400">
                      {skill.category}
                    </span>
                  </div>

                  {/* Title & Level */}
                  <div>
                    <h3 className="text-lg font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                      {skill.name}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400/90 mt-0.5">
                      {skill.levelDescription}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {skill.description}
                  </p>
                </div>

                {/* Bottom Tags & Detail CTA */}
                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {skill.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                        {tag}
                      </span>
                    ))}
                    {skill.tags.length > 2 && (
                      <span className="text-[10px] font-mono text-slate-500">+{skill.tags.length - 2}</span>
                    )}
                  </div>

                  <span className="text-[11px] font-mono text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                    <span>INSPECT</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ================= HOLOGRAPHIC SKILL INSPECTION MODAL ================= */}
      {activeModalSkill && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={handleCloseSkill}
        >
          <div
            className="relative w-full max-w-lg cyber-panel-glow p-6 sm:p-8 rounded-2xl space-y-6 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseSkill}
              onMouseEnter={() => sound.playHover()}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-cyan-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4">
              <div
                className="p-3.5 rounded-xl border"
                style={{
                  backgroundColor: `${activeModalSkill.color}20`,
                  borderColor: `${activeModalSkill.color}60`,
                  boxShadow: `0 0 20px ${activeModalSkill.color}40`
                }}
              >
                {React.createElement(iconMap[activeModalSkill.iconName] || Code2, {
                  className: "w-8 h-8",
                  style: { color: activeModalSkill.color }
                })}
              </div>

              <div>
                <span className="text-xs font-mono text-slate-400 tracking-wider">
                  SYSTEM MODULE // {activeModalSkill.category.toUpperCase()}
                </span>
                <h3 className="text-2xl font-bold font-display text-white">
                  {activeModalSkill.name}
                </h3>
                <p className="text-xs font-mono text-cyan-400">
                  {activeModalSkill.levelDescription}
                </p>
              </div>
            </div>

            {/* Core Description */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-slate-400 block">ARCHITECTURAL ROLE & CAPABILITY:</span>
              <p className="text-sm text-slate-200 leading-relaxed font-sans">
                {activeModalSkill.description}
              </p>
            </div>

            {/* Key Topics & Concepts */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 block">PRACTICAL CONCEPTS & COMPETENCIES:</span>
              <div className="flex flex-wrap gap-2">
                {activeModalSkill.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-cyan-950/50 border border-cyan-500/30 text-cyan-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Relevance to Portfolio Projects */}
            <div className="pt-2 border-t border-slate-800 text-xs font-mono text-slate-400 flex justify-between items-center">
              <span>PROJECT RELEVANCE:</span>
              <span className="text-cyan-300 font-semibold">QUESTION PAPER HUB & AGRILINK AI</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
