'use client';

import TeamderHeader from '@/components/headers/teamderHeader';
import LikesList from '@/components/LikesList';
import useTelegramWebApp from '@/hooks/useTelegramWebApp';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ChatPage() {
  const router = useRouter();
  const tgWebApp = useTelegramWebApp();

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
    <main className="bg-gradient-to-tr from-[#0F0505] to-[#310F0F] h-screen overflow-hidden relative">
      <TeamderHeader />
      <div className="!px-6 !mt-22 flex justify-center">
        <LikesList />
      </div>
    </main>
  );
}
