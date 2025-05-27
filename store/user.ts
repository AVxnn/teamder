import { proxy } from 'valtio'
// types/user.ts

export type UserRole = 'admin' | 'user' | 'premium';
export type ModerationStatus = 'pending' | 'approved' | 'rejected';

export interface UserProfile {
  nickname: string;
  about: string;
  lookingFor: string;
  steamId?: string;
  rating: number;
  hoursPlayed: number;
  wins: number;
  losses: number;
  discordLink?: string;
  steamLink?: string;
  cardImage?: string;     // base64 или URL
  moderationStatus: ModerationStatus;
  moderationComment?: string;
  moderatedAt?: string;
  moderatedBy?: string;
}

export interface User {
  id: string;
  username: string;
  first_name: string;
  lastName?: string;
  photo_url?: string;
  lastLogin?: string;     // ISO-строка (Date на бэке)
  createdAt?: string;     // ISO-строка
  role: UserRole;
  profile?: UserProfile;
  likesGiven?: string[];       // массив ObjectId строк
  likesReceived?: string[];
}

export const userStore = proxy({
  user: {} as User,
})