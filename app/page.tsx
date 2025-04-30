'use client';

import NavBar from '@/components/navbar';
import { userStore } from '@/store/user';
import { TelegramWebApp } from '@/types/telegram';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';

declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

export default function HomePage() {
  const snap = useSnapshot(userStore);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    console.log(window.Telegram);
    tg?.expand();

    const user = tg?.initDataUnsafe?.user;
    console.log(user, 'user', tg);
    if (isClient && user) {
      userStore.user.id = user.id;
      userStore.user.first_name = user.first_name;
      userStore.user.last_name = user.last_name;
      userStore.user.username = user.username;
      userStore.user.photo_url = user.photo_url;
    }
  }, [isClient]);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <main className="bg-gradient-to-tr from-[#05060F] to-[#0F1231] h-screen">
      <div className="flex justify-center items-center !pt-[128px]">
        Привет, {snap.user.first_name || 'Гость'} 👋
      </div>
      <NavBar />
    </main>
  );
}
