'use client';

import useTelegramWebApp from '@/hooks/useTelegramWebApp';
import { userStore } from '@/store/user';
import { useEffect, useState } from 'react';
import { isWebBrowser } from '@/utils/telegramUtils';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);
  const [isWebBrowserPlatform, setIsWebBrowserPlatform] = useState(false);
  const { webApp: tgWebApp, platform } = useTelegramWebApp();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const isTutorialCompleted = localStorage.getItem('tutorial') === 'true';
    if (!isTutorialCompleted) {
      // router.push('/tutorial');
    } else {
    }
  }, []);

  useEffect(() => {
    if (window.Telegram && tgWebApp) {
      tgWebApp.disableVerticalSwipes();
      tgWebApp.ready();
    }
  }, [tgWebApp]);

  useEffect(() => {
    if (typeof window !== 'undefined' && tgWebApp) {
      tgWebApp?.expand();

      tgWebApp.setBackgroundColor('#140A0A');
      tgWebApp.headerColor = '#140A0A';
      tgWebApp.ready();

      tgWebApp.enableClosingConfirmation();
      tgWebApp.requestFullscreen();
    }

    const user = tgWebApp?.initDataUnsafe?.user;

    const getUserData = async () => {
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
          console.log(data);
          userStore.user = data.user;
        }
      } catch (err) {
        console.error('❌ Ошибка при запросе:', err);
      }
    };

    console.log(user, 'user');

    if (isClient && user) {
      getUserData();
    }
  }, [isClient, tgWebApp]);

  // Обновляем состояние платформы при изменении platform или tgWebApp
  useEffect(() => {
    if (platform || tgWebApp) {
      const isWeb = isWebBrowser();
      setIsWebBrowserPlatform(isWeb);
      console.log('Platform/WebApp updated:', platform, 'isWebBrowser:', isWeb);
    }
  }, [platform, tgWebApp]);

  return (
    <div
      className={`min-h-[100vh] mx-auto bg-gradient-to-tr from-[#0F0505] to-[#310F0F] ${
        !isWebBrowserPlatform ? '!pt-[100px]' : ''
      } bg-[#ddd] pb-24`}
    >
      {children}
    </div>
  );
}
