'use client';

import { userStore } from '@/store/user';
import { TelegramWebApp } from '@/types/telegram';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { useRouter } from 'next/navigation';
import FullPageLoader from '@/components/fullPageLoader';

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
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading, isClient);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const isTutorialCompleted = localStorage.getItem('tutorial') === 'true';
    console.log(isTutorialCompleted);
    if (!isTutorialCompleted) {
      router.push('/tutorial');
    } else {
      setIsLoading(true);
    }
  }, []);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    if (tg.BackButton.isVisible) {
      tg.BackButton.hide();
    }
  }, []);

  if (!isLoading) {
    return <FullPageLoader />;
  }

  if (!isClient) {
    return <FullPageLoader />;
  }

  return (
    <main className="bg-gradient-to-tr from-[#0F0505] to-[#310F0F] h-screen overflow-hidden relative">
      <div className="flex justify-center items-center !pt-[128px]">
        Привет, {snap.user.first_name || 'Гость'} 👋
      </div>
    </main>
  );
}
