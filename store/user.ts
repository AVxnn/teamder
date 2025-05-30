import { proxy } from 'valtio';

export type UserRole = 'admin' | 'user' | 'premium';
export type ModerationStatus = 'pending' | 'approved' | 'rejected' | 'deleted';
export type DotaRole =
  | 'CARRY'
  | 'MID'
  | 'OFFLANE'
  | 'SOFT_SUPPORT'
  | 'HARD_SUPPORT';

export interface Hero {
  id: number;
  name: string;
  localized_name: string;
  image_url: string;
  _id: string;
}

export interface UserProfile {
  nickname: string;
  about: string;
  lookingFor: string;
  steamId?: string;
  rating: number;
  preferredRoles: DotaRole[];
  preferredHeroes: Hero[];
  discordLink?: string;
  steamLink?: string;
  cardImage?: string; // base64 или URL
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
  lastLogin?: string; // ISO-строка (Date на бэке)
  createdAt?: string; // ISO-строка
  role: UserRole;
  profile?: UserProfile;
  likesGiven?: string[]; // массив ObjectId строк
  likesReceived?: string[];
  likesLimit?: {
    dailyLimit: number;
    likesUsedToday: number;
  };
  superLikesLimit?: {
    dailyLimit: number;
    superLikesUsedToday: number;
  };
}

export const userStore = proxy({
  user: {} as User,
});
