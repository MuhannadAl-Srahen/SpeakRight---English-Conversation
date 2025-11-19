// Application Types

export type Screen = 'login' | 'home' | 'training-log' | 'challenge' | 'virtual-world' | 'avatar';

export interface Avatar {
  id: number;
  name: string;
  image: string;
  gender: 'male' | 'female';
}

export interface Message {
  sender: 'user' | 'ai';
  text: string;
  correction?: string;
  accentFeedback?: string;
  encouragement?: string;
  promptToRead?: string;
  arabicTranslation?: string;
}

export interface TrainingLog {
  id: string;
  date: string;
  context: string | null;
  conversation: Message[];
  score: number;
}

export interface ProgressData {
  day: string;
  mood: number;
}

export interface VirtualWorldLocation {
  name: string;
  description: string;
  image: string;
  context: string;
}
