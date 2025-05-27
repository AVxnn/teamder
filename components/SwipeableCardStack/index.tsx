'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
import { wrap } from 'popmotion';
import ProfileCard from '../profileCard';
import { ActionButtons } from '../ActionButtons';
import RecommendationFilters from '../RecommendationFilters';

type ProfileData = {
  nickname: string;
  rating: number;
  hoursPlayed: number;
  wins: number;
  losses: number;
  lookingFor: string;
  about: string;
  banner?: string;
  discordUrl?: string;
  steamUrl?: string;
  telegramUrl?: string;
};

type CardData = {
  telegramId: string;
  profile: ProfileData;
};

type Filters = {
  minRating?: number;
  maxRating?: number;
  minGamesPlayed?: number;
  maxGamesPlayed?: number;
  lookingFor?: string;
};

export default function SwipeableCardStack() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [index, setIndex] = useState(0);
  const [filters, setFilters] = useState<Filters>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const currentCard = cards[wrap(0, cards.length, index)];
  const nextCard = cards[wrap(0, cards.length, index + 1)];

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useAnimation();

  // Загрузка рекомендаций
  const fetchRecommendations = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const telegramId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
      if (!telegramId) {
        throw new Error('Telegram ID not found');
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recommendations`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            telegramId,
            minRating: filters.minRating,
            maxRating: filters.maxRating,
            minGamesPlayed: filters.minGamesPlayed,
            maxGamesPlayed: filters.maxGamesPlayed,
            lookingFor: filters.lookingFor,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch recommendations');
      }

      const data = await response.json();
      setCards(data);
      setIndex(0);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load recommendations',
      );
      console.error('Error fetching recommendations:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Обработка лайка
  const handleLike = async () => {
    if (!currentCard) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recommendations/like`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            telegramId: window.Telegram?.WebApp?.initDataUnsafe?.user?.id,
            toTelegramId: currentCard.telegramId,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to like user');
      }

      await swipe('right');
    } catch (err) {
      console.error('Error liking user:', err);
      // Здесь можно добавить уведомление об ошибке
    }
  };

  // Обработка дизлайка
  const handleDislike = async () => {
    if (!currentCard) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recommendations/dislike`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            telegramId: window.Telegram?.WebApp?.initDataUnsafe?.user?.id,
            toTelegramId: currentCard.telegramId,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to dislike user');
      }

      await swipe('left');
    } catch (err) {
      console.error('Error disliking user:', err);
      // Здесь можно добавить уведомление об ошибке
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [filters]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = async (_: any, info: any) => {
    const offsetX = info.offset.x;
    const offsetY = info.offset.y;

    if (Math.abs(offsetX) > 120) {
      const directionX = offsetX > 0 ? 1 : -1;
      await controls.start({
        x: directionX * 500,
        y: offsetY,
        opacity: 0,
        transition: { duration: 0.5 },
      });

      if (directionX > 0) {
        await handleLike();
      } else {
        await handleDislike();
      }

      x.set(0);
      y.set(0);
      setIndex((prev) => (prev + 1) % cards.length);
      controls.set({ x: 0, y: 0, opacity: 1 });
    } else if (Math.abs(offsetY) > 120) {
      const directionY = offsetY > 0 ? 1 : -1;
      await controls.start({
        x: offsetX,
        y: directionY * 500,
        opacity: 0,
        transition: { duration: 0.5 },
      });

      x.set(0);
      y.set(0);
      setIndex((prev) => (prev + 1) % cards.length);
      controls.set({ x: 0, y: 0, opacity: 1 });
    } else {
      await controls.start({
        x: 0,
        y: 0,
        rotate: 0,
        transition: { type: 'spring', stiffness: 300, damping: 30 },
      });
    }
  };

  const swipe = async (direction: 'left' | 'right' | 'up') => {
    const delta = direction === 'left' ? -500 : direction === 'right' ? 500 : 0;
    const deltaY = direction === 'up' ? -500 : 0;

    await controls.start({
      x: delta,
      y: deltaY,
      opacity: 0,
      transition: { duration: 0.3 },
    });

    x.set(0);
    y.set(0);
    setIndex((prev) => (prev + 1) % cards.length);
    controls.set({ x: 0, y: 0, opacity: 1 });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!cards.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white">Нет доступных рекомендаций</div>
      </div>
    );
  }

  return (
    <div className="relative max-w-md mx-auto w-full">
      {/* Кнопка фильтров */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="absolute top-4 right-4 z-20 bg-[#1a1a1a] p-2 rounded-xl text-white hover:bg-[#2a2a2a] transition-colors"
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

      {/* Панель фильтров */}
      {showFilters && (
        <div className="absolute top-16 right-4 z-20 w-72">
          <RecommendationFilters onFiltersChange={setFilters} />
        </div>
      )}

      <div className="relative max-w-md mx-auto">
        <div className="absolute inset-0 z-0 scale-95 bottom-[0px] !mt-4 opacity-50 blur-[2px] pointer-events-none">
          <ProfileCard socialBar={false} {...nextCard.profile} />
        </div>

        <motion.div
          drag
          style={{ x }}
          className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing z-[5]"
          animate={controls}
          onDragEnd={handleDragEnd}
          dragConstraints={{ left: 0, right: 0 }}
        >
          <ProfileCard socialBar={false} {...currentCard.profile} />
        </motion.div>
      </div>

      <ActionButtons
        onDislike={handleDislike}
        onSuperLike={() => swipe('up')}
        onLike={handleLike}
      />
    </div>
  );
}
