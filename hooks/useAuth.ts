import { userStore } from '@/store/user';
import useTelegramWebApp from '@/hooks/useTelegramWebApp';

export const useAuth = () => {
  const tgWebApp = useTelegramWebApp();

  const initializeAuth = async () => {
    if (!tgWebApp?.webApp?.initDataUnsafe?.user) return;

    const user = tgWebApp.webApp.initDataUnsafe.user;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/telegram-webapp`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            photo_url: user.photo_url,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        userStore.user = data.user;
      }
    } catch (error) {
      console.error('❌ Ошибка при аутентификации:', error);
    }
  };

  return { initializeAuth };
};
