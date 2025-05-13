'use client';

import PlayerCard from '@/components/playerCard';
import { userStore } from '@/store/user';
import { TelegramWebApp } from '@/types/telegram';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { useRouter } from 'next/navigation';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const isTutorialCompleted = localStorage.getItem('tutorial') === 'true';
    console.log(isTutorialCompleted);
    if (!isTutorialCompleted) {
      router.push('/tutorial');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <main className="bg-gradient-to-tr from-[#05060F] to-[#0F1231] h-screen">
      <div className="flex justify-center items-center !pt-[128px]">
        Привет, {snap.user.first_name || 'Гость'} 👋
      </div>
      <PlayerCard accountId={'337647206'} />
    </main>
  );
}
