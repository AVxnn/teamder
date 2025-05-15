'use client';

import NavBar from '@/components/navbar';
import useTelegramWebApp from '@/hooks/useTelegramWebApp';
import { userStore } from '@/store/user';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);
  const tgWebApp = useTelegramWebApp();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const isTutorialCompleted = localStorage.getItem('tutorial') === 'true';
    if (!isTutorialCompleted) {
      router.push('/tutorial');
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
        const response = await axios.post(
          'http://localhost:3002/api/auth/telegram-webapp',
          {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            photo_url: user.photo_url,
          },
        );
        if (response.data.success) {
          console.log(response.data);
          userStore.user = response.data.user;
          console.log('snap', response.data.user);
        } else {
          console.error('⚠️ Ошибка создания:', response.data.error);
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
