import type { Avatar, TrainingLog, ProgressData, VirtualWorldLocation } from './types';

// Avatar constants
export const AVATARS: Avatar[] = [
  {
    id: 1,
    name: 'Alex',
    image: 'https://avatar.iran.liara.run/public/boy',
    gender: 'male'
  },
  {
    id: 2,
    name: 'Jordan',
    image: 'https://avatar.iran.liara.run/public/boy?username=jordan',
    gender: 'male'
  },
  {
    id: 3,
    name: 'Emma',
    image: 'https://avatar.iran.liara.run/public/girl',
    gender: 'female'
  },
  {
    id: 4,
    name: 'Sophia',
    image: 'https://avatar.iran.liara.run/public/girl?username=sophia',
    gender: 'female'
  }
];

// Initial training log (empty)
export const INITIAL_TRAINING_LOG: TrainingLog[] = [];

// Initial progress data for the chart
export const INITIAL_PROGRESS_DATA: ProgressData[] = [
  { day: 'Mon', mood: 50 },
  { day: 'Tue', mood: 55 },
  { day: 'Wed', mood: 52 },
  { day: 'Thu', mood: 60 },
  { day: 'Fri', mood: 65 },
  { day: 'Sat', mood: 70 },
  { day: 'Sun', mood: 75 }
];

// Virtual world locations
export const VIRTUAL_WORLD_LOCATIONS: VirtualWorldLocation[] = [
  {
    name: 'Coffee Shop',
    description: 'Order drinks and have casual conversations',
    image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=2071&auto=format&fit=crop',
    context: 'Coffee Shop Scenario - Practice ordering coffee drinks, asking about menu items, making small talk with the barista, and using polite expressions like "I\'d like...", "Could I have...", "How much is...?"'
  },
  {
    name: 'Airport',
    description: 'Check-in, security, and travel conversations',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop',
    context: 'Airport Scenario - Practice checking in for flights, going through security, asking about gates and boarding times, handling luggage questions, and understanding airport announcements'
  },
  {
    name: 'Restaurant',
    description: 'Make reservations and order food',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop',
    context: 'Restaurant Scenario - Practice making reservations, asking about menu items, ordering appetizers and main courses, requesting modifications, asking for the bill, and using restaurant vocabulary'
  },
  {
    name: 'Job Interview',
    description: 'Practice professional conversations',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop',
    context: 'Job Interview Scenario - Practice introducing yourself professionally, answering questions about your experience, discussing strengths and weaknesses, asking about the role, and using formal business English'
  },
  {
    name: 'Shopping Mall',
    description: 'Shop for clothes and ask for help',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=2070&auto=format&fit=crop',
    context: 'Shopping Mall Scenario - Practice asking about sizes and colors, trying on clothes, asking for different items, inquiring about prices and discounts, and interacting with store employees'
  },
  {
    name: 'Doctor\'s Office',
    description: 'Describe symptoms and get medical advice',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop',
    context: 'Doctor\'s Office Scenario - Practice describing symptoms, explaining when pain started, discussing medical history, understanding doctor\'s instructions, and learning health-related vocabulary'
  }
];
