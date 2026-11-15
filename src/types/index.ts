export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'Full-Stack & Web' | 'AI & Data Science';
  tags: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  architecture: string[];
  metrics?: { label: string; value: string }[];
  highlight: string;
  gradient: string;
}

export interface SkillItem {
  name: string;
  category: 'Programming' | 'Database' | 'Web Technologies' | 'Computing & AI';
  levelDescription: string;
  description: string;
  iconName: string;
  color: string;
  coordinates: [number, number, number];
  tags: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  scoreLabel: string;
  score: string;
  description: string;
  highlights: string[];
  status: 'CURRENT' | 'COMPLETED';
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  partner: string;
  period: string;
  topics: string[];
  description: string;
  badge: string;
  verified: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
}

export type ActiveSection = 'hero' | 'about' | 'skills' | 'projects' | 'certifications' | 'contact';
