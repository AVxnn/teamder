'use client';

import { useState } from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
import { wrap } from 'popmotion';
import ProfileCard from '../profileCard';
import { ActionButtons } from '../ActionButtons';

type CardData = {
  nickname: string;
  rating: number;
  totalGames: number;
  wins: number;
  customField: string;
  find: string;
  aboutme: string;
  imageUrl?: string;
  discordUrl?: string;
  steamUrl?: string;
  telegramUrl?: string;
};

const cards: CardData[] = [
  {
    nickname: 'Vxnn',
    rating: 2400,
    totalGames: 2000,
    wins: 1200,
    customField: 'Новый',
    find: 'Ищу команду для турниров. Дискорд обязателен.',
    aboutme: 'Профессиональный игрок. Люблю стратегии.',
    imageUrl: '/img/tutorial/tutorial_1.png',
    discordUrl: '#',
    steamUrl: '#',
    telegramUrl: '#',
  },
  {
    nickname: 'Skylord',
    rating: 1800,
    totalGames: 1500,
    wins: 900,
    customField: 'Старый',
    find: 'Новичков для обучения. Готов помогать.',
    aboutme: 'Опытный наставник. Играю 5 лет.',
    imageUrl: '/img/tutorial/tutorial_2.png',
    discordUrl: '#',
    steamUrl: '#',
    telegramUrl: '#',
  },
  {
    nickname: 'Frosty',
    rating: 2100,
    totalGames: 1800,
    wins: 1100,
    customField: 'Средний',
    find: 'Команду для вечерних игр. Без токсиков.',
    aboutme: 'Казуальный игрок. Люблю кооперативы.',
    imageUrl: '/img/tutorial/tutorial_3.png',
    discordUrl: '#',
    steamUrl: '#',
    telegramUrl: '#',
  },
];

export default function SwipeableCardStack() {
  const [index, setIndex] = useState(0);
  const currentCard = cards[wrap(0, cards.length, index)];
  const nextCard = cards[wrap(0, cards.length, index + 1)];

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const controls = useAnimation();

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

  return (
    <div className="relative max-w-md mx-auto w-full">
      <div className="relative max-w-md mx-auto">
        <div className="absolute inset-0 z-0 scale-95 bottom-[0px] !mt-4 opacity-50 blur-[2px] pointer-events-none">
          <ProfileCard socialBar={false} {...nextCard} />
        </div>

        <motion.div
          drag
          style={{ x }}
          className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing z-[5]"
          animate={controls}
          onDragEnd={handleDragEnd}
          dragConstraints={{ left: 0, right: 0 }}
        >
          <ProfileCard socialBar={false} {...currentCard} />
        </motion.div>
      </div>

      <ActionButtons
        onDislike={() => swipe('left')}
        onSuperLike={() => swipe('up')}
        onLike={() => swipe('right')}
      />
    </div>
  );
}
