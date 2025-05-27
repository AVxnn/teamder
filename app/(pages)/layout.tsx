'use client';

import NavBar from '@/components/navbar';
import useTelegramWebApp from '@/hooks/useTelegramWebApp';
import { userStore } from '@/store/user';
import { useEffect, useState } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);
  const tgWebApp = useTelegramWebApp();

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
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && tgWebApp) {
      if (!tgWebApp) {
        tgWebApp?.expand();

        tgWebApp.setBackgroundColor('#140A0A');
        tgWebApp.headerColor = '#140A0A';
        tgWebApp.ready();

        tgWebApp.enableClosingConfirmation();
        tgWebApp.requestFullscreen();
      }
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
  }, [isClient]);

  return (
    <div className="h-screen ">
      {children}
      <NavBar />
    </div>
  );
}
