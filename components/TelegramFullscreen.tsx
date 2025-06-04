'use client';

import useTelegramWebApp from '@/hooks/useTelegramWebApp';
import { useEffect } from 'react';

export default function TelegramFullscreen() {
  const tgWebApp = useTelegramWebApp();

  useEffect(() => {
    if (!tgWebApp) return;

    try {
      tgWebApp.expand(); // Разворачиваем WebApp
      tgWebApp.disableVerticalSwipes();
      tgWebApp.requestFullscreen(); // Запрашиваем fullscreen
    } catch (err) {
      console.error('Error while expanding Telegram WebApp:', err);
    }
  }, [tgWebApp]);

  return null;
}
