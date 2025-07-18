'use client';

import { useEffect, useState } from 'react';
import useTelegramWebApp from '@/hooks/useTelegramWebApp';
import { useAuth } from '@/hooks/useAuth';
import { useTutorial } from '@/hooks/useTutorial';
import { useTelegramPlatform } from '@/hooks/useTelegramPlatform';

export default function TelegramViewport({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const { webApp: tgWebApp } = useTelegramWebApp();
  const { initializeAuth } = useAuth();
  const { checkTutorial } = useTutorial();
  const { platform, isReady } = useTelegramPlatform();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !tgWebApp || !isReady) return;

    // Инициализация в зависимости от платформы
    const initTelegramApp = () => {
      try {
        // Базовые настройки для всех платформ
        tgWebApp.disableVerticalSwipes();
        tgWebApp.setBackgroundColor('#140A0A');
        tgWebApp.headerColor = '#140A0A';

        if (platform === 'mobile') {
          // Мобильные настройки
          tgWebApp.expand();
          tgWebApp.requestFullscreen();
          tgWebApp.enableClosingConfirmation();
        } else if (platform === 'desktop') {
          // Десктопные настройки
          tgWebApp.expand();
          // Не используем fullscreen для десктопа
        } else {
          // Веб-настройки
          tgWebApp.expand();
        }

        tgWebApp.ready();
      } catch (error) {
        console.error('Ошибка инициализации Telegram WebApp:', error);
      }
    };

    initTelegramApp();
    initializeAuth();
    checkTutorial();
  }, [mounted, tgWebApp, isReady, platform, initializeAuth, checkTutorial]);

  // Применяем стили viewport только для мобильных устройств
  useEffect(() => {
    if (mounted) {
      document.documentElement.style.setProperty(
        '--tg-viewport-height',
        '100vh',
      );
      document.documentElement.style.setProperty(
        '--tg-viewport-stable-height',
        '100vh',
      );
    }
  }, [mounted]);

  if (!mounted) {
    return <div className="min-h-screen bg-[#140A0A]" />;
  }

  return <>{children}</>;
}
