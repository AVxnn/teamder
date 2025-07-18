'use client';

import useTelegramWebApp from '@/hooks/useTelegramWebApp';
import { useEffect } from 'react';
import { shouldApplyFullscreen } from '@/utils/telegramUtils';

export default function TelegramFullscreen() {
  const { webApp, isTelegramWebApp, platform } = useTelegramWebApp();

  useEffect(() => {
    if (!webApp || !isTelegramWebApp) {
      console.log('Not in Telegram WebApp environment');
      return;
    }

    console.log('Telegram WebApp detected:', {
      platform,
      isTelegramWebApp,
      shouldApplyFullscreen: shouldApplyFullscreen(),
    });

    try {
      // Проверяем, что это мобильный или десктопный Telegram
      if (shouldApplyFullscreen()) {
        console.log('Applying fullscreen for platform:', platform);
        webApp.expand(); // Разворачиваем WebApp
        webApp.disableVerticalSwipes();
        webApp.requestFullscreen(); // Запрашиваем fullscreen
      } else {
        console.log('Skipping fullscreen for platform:', platform);
      }
    } catch (err) {
      console.error('Error while expanding Telegram WebApp:', err);
    }
  }, [webApp, isTelegramWebApp, platform]);

  return null;
}
