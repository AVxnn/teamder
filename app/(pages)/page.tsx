'use client';

import { TelegramWebApp } from '@/types/telegram';
import { useEffect, useState } from 'react';
import FullPageLoader from '@/components/fullPageLoader';
import TeamderHeader from '@/components/headers/teamderHeader';
import SwipeableCardStack from '@/components/SwipeableCardStack';
import { useSnapshot } from 'valtio';
import { userStore } from '@/store/user';
import { useRouter } from 'next/navigation';
import { DotaRole, Hero } from '@/store/user';
import useTelegramWebApp from '@/hooks/useTelegramWebApp';
import { shouldApplyFullscreen, isWebBrowser } from '@/utils/telegramUtils';

type Filters = {
  minRating?: number;
  maxRating?: number;
  preferredRoles?: DotaRole[];
  preferredHeroes?: Hero[];
};

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
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({});
  const { webApp, isTelegramWebApp, platform } = useTelegramWebApp();

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
      // router.replace('/tutorial');
      return;
    } else {
      setIsLoading(true);
      return;
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
    // Логируем информацию о платформе для отладки
    console.log('Telegram WebApp Info:', {
      isTelegramWebApp,
      platform,
      webApp: !!webApp,
      shouldApplyFullscreen: shouldApplyFullscreen(),
      isWebBrowser: isWebBrowser(),
    });

    if (!webApp) return;

    if (webApp.BackButton.isVisible) {
      webApp.BackButton.hide();
      webApp.BackButton.offClick(() => {});
    }
  }, [webApp, isTelegramWebApp, platform]);

  if (!isLoading) {
    return <FullPageLoader />;
  }

  if (!isClient) {
    return <FullPageLoader />;
  }

  return (
    <main className="bg-gradient-to-tr flex justify-center from-[#0F0505] to-[#310F0F] h-screen overflow-auto">
      <TeamderHeader onToggleFilters={() => setShowFilters(!showFilters)} />
      <div className="!pt-[84px] !pb-[112px] !px-6 w-full max-w-[560px] flex justify-center overflow-y-scroll">
        <SwipeableCardStack
          showFilters={showFilters}
          onFiltersChange={setFilters}
          setShowFilters={setShowFilters}
          currentFilters={filters}
        />
      </div>
    </main>
  );
}
