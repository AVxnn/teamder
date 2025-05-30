'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
import { wrap } from 'popmotion';
import ProfileCard from '../profileCard';
import { ActionButtons } from '../ActionButtons';
import { DotaRole, Hero } from '@/store/user';
import FilterSheet from '../sheets/FilterSheet';
import { useDebounce } from '@/hooks/useDebounce';

type ProfileData = {
  nickname: string;
  rating: number;
  preferredRoles: DotaRole[];
  preferredHeroes: Hero[];
  lookingFor: string;
  about: string;
  imageUrl?: string;
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
  preferredRoles?: DotaRole[];
  preferredHeroes?: Hero[];
};

interface Props {
  showFilters: boolean;
  onFiltersChange: (filters: Filters) => void;
  currentFilters: Filters;
  setShowFilters: (show: boolean) => void;
}

export default function SwipeableCardStack({
  showFilters,
  onFiltersChange,
  currentFilters = {},
  setShowFilters,
}: Props) {
  const [cards, setCards] = useState<CardData[]>([]);
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [localFilters, setLocalFilters] = useState<Filters>(currentFilters);

  // Используем наш кастомный хук для дебаунса фильтров
  const debouncedFilters = useDebounce(localFilters, 500);

  const currentCard = cards[wrap(0, cards.length, index)];
  const nextCard = cards[wrap(0, cards.length, index + 1)];

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useAnimation();

  // Функция загрузки рекомендаций
  const fetchRecommendations = async (filters: Filters) => {
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
            minRating: filters?.minRating,
            maxRating: filters?.maxRating,
            preferredRoles: filters?.preferredRoles || [],
            preferredHeroes: filters?.preferredHeroes?.map((h) => h._id) || [],
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

  // Эффект для загрузки рекомендаций при изменении дебаунснутых фильтров
  useEffect(() => {
    fetchRecommendations(debouncedFilters);
  }, [debouncedFilters]);

  // Эффект для синхронизации локальных фильтров с пропсами
  useEffect(() => {
    setLocalFilters(currentFilters);
  }, [currentFilters]);

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
      <>
        <div className="flex items-center justify-center h-full">
          <div className="text-white">Нет доступных рекомендаций</div>
        </div>

        <FilterSheet
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          onFiltersChange={onFiltersChange}
          currentFilters={currentFilters}
          setShowFilters={setShowFilters}
        />
      </>
    );
  }

  return (
    <div className="relative max-w-md mx-auto w-full">
      <FilterSheet
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        onFiltersChange={onFiltersChange}
        currentFilters={currentFilters}
        setShowFilters={setShowFilters}
      />

      <div className="relative max-w-md mx-auto">
        <div className="absolute inset-0 z-0 scale-95 bottom-[0px] !mt-4 opacity-50 blur-[2px] pointer-events-none">
          <ProfileCard
            isSocial={false}
            telegramId={0}
            username=""
            firstName=""
            imageUrl=""
            photoUrl=""
            {...nextCard.profile}
          />
        </div>

        <motion.div
          drag
          style={{ x }}
          className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing z-[5]"
          animate={controls}
          onDragEnd={handleDragEnd}
          dragConstraints={{ left: 0, right: 0 }}
        >
          <ProfileCard
            isSocial={false}
            telegramId={0}
            username=""
            firstName=""
            imageUrl=""
            photoUrl=""
            {...currentCard.profile}
          />
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
