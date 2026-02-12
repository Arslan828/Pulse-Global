
export enum AppView {
  USER_DASHBOARD = 'USER_DASHBOARD',
  ADMIN_PORTAL = 'ADMIN_PORTAL',
  NEWS_APP = 'NEWS_APP'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  lastActive: string;
}

export interface SystemMetric {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface NewsArticle {
  title: string;
  summary: string;
  source: string;
  url: string;
  category: string;
  imageUrl?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'breaking' | 'alert' | 'update';
  read: boolean;
}
