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

      {/* Кнопка фильтров */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="fixed top-3 right-6 z-50 bg-[#140a0a] !p-3 rounded-full
outline outline-[#363636] text-white hover:bg-[#2a2a2a] transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
      </button>

      <div className="!px-6 !mt-22 flex justify-center">
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
