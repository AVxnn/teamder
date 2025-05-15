'use client';

import TeamderHeader from '@/components/headers/teamderHeader';
import { MatchPending } from '@/components/MatchPending';
import ProfileCard from '@/components/profileCard';
import useTelegramWebApp from '@/hooks/useTelegramWebApp';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LikesUserPage() {
  const tgWebApp = useTelegramWebApp();
  const router = useRouter();

  useEffect(() => {
    console.log(tgWebApp);
    if (!tgWebApp) return;

    if (!tgWebApp.BackButton.isVisible) {
      tgWebApp.BackButton.show();
    }

    tgWebApp.BackButton.show();
    tgWebApp.BackButton.onClick(() => router.push('/likes'));

    return () => {
      tgWebApp.BackButton.offClick(() => router.push('/likes'));
    };
  }, [tgWebApp]);

  return (
    <main className="bg-gradient-to-tr flex justify-center from-[#0F0505] to-[#310F0F] h-screen overflow-auto">
      <TeamderHeader />
      <div className="!pt-[84px] !pb-[112px] !px-6 w-full max-w-[560px] overflow-y-scroll">
        <ProfileCard
          nickname="Vxnn"
          rating={2400}
          totalGames={2000}
          wins={1200}
          losses={200}
          find="Ищу команду для турниров. Дискорд обязателен."
          aboutme="Профессиональный игрок. Люблю стратегии."
        />
        {/* <MatchReceived /> */}
        <MatchPending />
      </div>
    </main>
  );
}
