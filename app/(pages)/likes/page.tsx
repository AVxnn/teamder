'use client';

import TeamderHeader from '@/components/headers/teamderHeader';
import LikesList from '@/components/LikesList';
import useTelegramWebApp from '@/hooks/useTelegramWebApp';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ChatPage() {
  const router = useRouter();
  const { webApp: tgWebApp } = useTelegramWebApp();

  useEffect(() => {
    console.log(tgWebApp);
    if (!tgWebApp) return;

    if (!tgWebApp.BackButton.isVisible) {
      tgWebApp.BackButton.show();
    }

    tgWebApp.BackButton.show();
    tgWebApp.BackButton.onClick(() => router.push('/'));

    return () => {
      tgWebApp.BackButton.offClick(() => router.push('/'));
    };
  }, [tgWebApp]);

  return (
    <main className="flex justify-center overflow-auto">
      <TeamderHeader />
      <div className="!pt-[84px] !px-6 w-full max-w-[560px] overflow-y-scroll">
        <LikesList />
      </div>
    </main>
  );
}
