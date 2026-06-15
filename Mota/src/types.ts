export interface Task {
  id: string;
  title: string;
  description: string;
  date: string; // e.g., "2026-06-15" (raw datestring) or predefined labels
  displayDate?: string; // formatted nicely like "Hoje", "Amanhã", "Seg, 10 de Out"
  time: string; // e.g., "14:00"
  priority: 'Baixa' | 'Média' | 'Alta';
  completed: boolean;
  createdAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  notificationsEnabled: boolean;
}

export interface DailyStat {
  day: string; // "Sem 1", "Sem 2", etc.
  completed: number;
}
