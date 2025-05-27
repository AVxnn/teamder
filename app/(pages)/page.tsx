'use client';

import { TelegramWebApp } from '@/types/telegram';
import { useEffect, useState } from 'react';
import FullPageLoader from '@/components/fullPageLoader';
import TeamderHeader from '@/components/headers/teamderHeader';
import SwipeableCardStack from '@/components/SwipeableCardStack';
import { useSnapshot } from 'valtio';
import { userStore } from '@/store/user';
import { useRouter } from 'next/navigation';

declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

export default function HomePage() {
  const { user } = useSnapshot(userStore);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading, isClient);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (
      !user ||
      !user.profile ||
      Object.keys(user.profile).length === 0 ||
      !user.profile?.rating
    ) {
      router.replace('/tutorial');
    } else {
      setIsLoading(true);
    }
    setIsLoading(true);

    const isTutorialCompleted = localStorage.getItem('tutorial') === 'true';
    console.log(isTutorialCompleted);
    if (!isTutorialCompleted) {
      router.push('/tutorial');
    } else {
    }
  }, [user]);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    if (tg.BackButton.isVisible) {
      tg.BackButton.hide();
      tg.BackButton.offClick(() => {});
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
      <div className="!px-6 !mt-22 flex justify-center">
        <SwipeableCardStack />
      </div>
    </main>
  );
}
