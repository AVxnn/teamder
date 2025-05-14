'use client';

import NavBar from '@/components/navbar';
import { userStore } from '@/store/user';
import { useEffect, useState } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const isTutorialCompleted = localStorage.getItem('tutorial') === 'true';
    console.log(isTutorialCompleted);
    if (!isTutorialCompleted) {
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    console.log(window.Telegram);

    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram?.WebApp;
      if (!tg) {
        tg?.expand();
        // Можно также изменить цвет фона
        tg.backgroundColor = '#140A0A';
        tg.headerColor = '#140A0A';
      }
    }

    const user = tg?.initDataUnsafe?.user;
    console.log(user, 'user');
    if (isClient && user) {
      userStore.user.id = user.id;
      userStore.user.first_name = user.first_name;
      userStore.user.last_name = user.last_name;
      userStore.user.username = user.username;
      userStore.user.photo_url = user.photo_url;
    }
  }, [isClient]);

  return (
    <div className="h-screen overflow-hidden">
      {children}
      {!isLoading ? <NavBar /> : null}
    </div>
  );
}
