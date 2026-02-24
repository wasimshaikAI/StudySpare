import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface User {
  id: string;
  name: string;
  role: 'host' | 'member';
  avatar: string;
  status: 'online' | 'idle' | 'busy';
}

export interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: string;
  isMe?: boolean;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  deck: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const FAKE_USERS: User[] = [
  { id: '1', name: 'Wasim Shaik', role: 'host', avatar: 'https://i.pravatar.cc/150?u=wasim', status: 'online' },
  { id: '2', name: 'Sarah Chen', role: 'member', avatar: 'https://i.pravatar.cc/150?u=sarah', status: 'online' },
  { id: '3', name: 'Alex Rivera', role: 'member', avatar: 'https://i.pravatar.cc/150?u=alex', status: 'idle' },
  { id: '4', name: 'Jordan Lee', role: 'member', avatar: 'https://i.pravatar.cc/150?u=jordan', status: 'online' },
  { id: '5', name: 'Emma Wilson', role: 'member', avatar: 'https://i.pravatar.cc/150?u=emma', status: 'busy' },
];
