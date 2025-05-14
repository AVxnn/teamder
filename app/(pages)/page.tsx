'use client';

import { TelegramWebApp } from '@/types/telegram';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FullPageLoader from '@/components/fullPageLoader';
import TeamderHeader from '@/components/headers/teamderHeader';
import SwipeableCardStack from '@/components/SwipeableCardStack';

declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

export default function HomePage() {
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
      <TeamderHeader />
      <div className="!px-6 !mt-8 flex justify-center">
        <SwipeableCardStack />
      </div>
    </main>
  );
}
