'use client';

import useTelegramWebApp from '@/hooks/useTelegramWebApp';
import { useEffect } from 'react';

export default function TelegramFullscreen() {
  const tgWebApp = useTelegramWebApp();
  useEffect(() => {
    // Проверяем, что мы в Telegram WebApp
    if (typeof window !== 'undefined' && tgWebApp) {
      // Развернуть на весь экран при загрузке
      tgWebApp.expand(); // Сначала расширяем WebApp
      tgWebApp.requestFullscreen(); // Затем запрашиваем полноэкранный режим

      // Можно вернуть функцию очистки, если нужно
      return () => {
        // Любая очистка при размонтировании
      };
    }
  }, []);

  return null; // Или верните кнопку для ручного управления
}
