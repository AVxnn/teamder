import { useEffect, useState } from 'react';
import { TelegramWebApp } from '@/types/telegram';

export default function useTelegramWebApp() {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);
  const [isTelegramWebApp, setIsTelegramWebApp] = useState(false);
  const [platform, setPlatform] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tgWebApp = window.Telegram.WebApp;
      setWebApp(tgWebApp);

      // Проверяем, что это действительно Telegram WebApp
      const isTgWebApp = tgWebApp.platform && tgWebApp.platform !== 'unknown';
      setIsTelegramWebApp(isTgWebApp);
      setPlatform(tgWebApp.platform || 'unknown');
    }
  }, []);

  return { webApp, isTelegramWebApp, platform };
}
