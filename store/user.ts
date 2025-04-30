import { proxy } from 'valtio'

interface User {
  id: number;  // предполагаем, что id — это строка
  first_name: string;
  last_name?: string;  // может быть необязательным
  username?: string;   // может быть необязательным
  photo_url?: string;  // может быть необязательным
}

export const userStore = proxy({
  user: {} as User, // Используем `User` как тип для данных пользователя
})