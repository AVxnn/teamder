import { proxy } from 'valtio'
// types/user.ts

export interface TelegramUser {
  telegramId: number;
  username?: string;
  firstName?: string;
  photoUrl?: string;
  lastLogin?: string;     // ISO-строка (Date на бэке)
  createdAt?: string;     // ISO-строка
}

export interface UserProfile {
  nickname?: string;
  about?: string;
  lookingFor?: string;
  steamId?: string;
  rating?: number;
  hoursPlayed?: number;
  wins?: number;
  losses?: number;
  discordLink?: string;
  steamLink?: string;
  cardImage?: string;     // base64 или URL
}


export const userStore = proxy({
  user: {} as {
    id: string
    first_name: string
    last_name: string
    username: string
    photo_url: string
    profile?: UserProfile;
    likesGiven?: string[];       // массив ObjectId строк
    likesReceived?: string[];
  }, // Используем `User` как тип для данных пользователя
})