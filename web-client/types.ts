
export enum AppView {
  HOME = 'HOME',
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  MIND_MIRROR = 'MIND_MIRROR',
  LEARN_PULSE = 'LEARN_PULSE',
  RISE_BOARD = 'RISE_BOARD',
  SKILL_QUEST = 'SKILL_QUEST',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER'
}

export enum MoodType {
  GREAT = 'Great',
  GOOD = 'Good',
  NEUTRAL = 'Neutral',
  STRESSED = 'Stressed',
  EXHAUSTED = 'Exhausted'
}

export interface UserProfile {
  name: string;
  source: string;
  aiUsageFreq: string;
  criticalThinkingLevel: number; // 1-5
  dailyGoal: string;
  streak: number;
  motivationScore: number;
}

export interface MoodEntry {
  mood: MoodType;
  energy: number; // 1-5
  focus: number; // 1-5
  timestamp: Date;
  aiInsight?: string;
}

export interface ReflectionAnalysis {
  sentiment: string;
  keywords: string[];
  scores: {
    confidence: number;
    discipline: number;
    criticalThinking: number;
  };
  feedback: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Flashcard {
  term: string;
  definition: string;
  example: string;
  type: string; // noun, verb, etc.
}
