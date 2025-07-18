import { useEffect, useState } from 'react';
import { TelegramWebApp } from '@/types/telegram';

export default function useTelegramWebApp() {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [isTelegramWebApp, setIsTelegramWebApp] = useState(false);
  const [platform, setPlatform] = useState<string>('');

  useEffect(() => {
    const checkTelegramWebApp = () => {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        const tgWebApp = window.Telegram.WebApp;
        setWebApp(tgWebApp);

        // Проверяем, что это действительно Telegram WebApp
        const isTgWebApp = tgWebApp.platform && tgWebApp.platform !== 'unknown';
        setIsTelegramWebApp(isTgWebApp);
        setPlatform(tgWebApp.platform || 'unknown');
        return true; // API загружено
      }
      return false; // API еще не загружено
    };

    // Проверяем сразу
    const isLoaded = checkTelegramWebApp();

    // Если API еще не загружено, устанавливаем интервал для проверки
    if (!isLoaded) {
      let attempts = 0;
      const maxAttempts = 50; // Максимум 5 секунд (50 * 100мс)

      const interval = setInterval(() => {
        attempts++;
        const loaded = checkTelegramWebApp();

        if (loaded || attempts >= maxAttempts) {
          clearInterval(interval);
          if (attempts >= maxAttempts) {
            console.warn(
              'Telegram WebApp API не загрузился в течение 5 секунд',
            );
          }
        }
      }, 100); // Проверяем каждые 100мс

      // Очищаем интервал при размонтировании
      return () => clearInterval(interval);
    }
  }, []);

  return { webApp, isTelegramWebApp, platform };
}
