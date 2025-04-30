'use client';

import { userStore } from '@/store/user';
import { TelegramWebApp } from '@/types/telegram';
import { useEffect } from 'react';
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

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    tg?.expand();

    const user = tg?.initDataUnsafe?.user;
    if (user) {
      userStore.user.id = user.id;
      userStore.user.first_name = user.first_name;
      userStore.user.last_name = user.last_name;
      userStore.user.username = user.username;
      userStore.user.photo_url = user.photo_url;
    }
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>Привет, {snap.user.first_name || 'Гость'} 👋</h1>
      {snap.user.photo_url && (
        <img
          src={snap.user.photo_url}
          alt="avatar"
          width={100}
          style={{ borderRadius: '50%' }}
        />
      )}
      <pre>{JSON.stringify(snap, null, 2)}</pre>
    </main>
  );
}
