'use client';

import Like from '@/public/icons/Like';
import Trash from '@/public/icons/Trash';
import { useRouter } from 'next/navigation';
import useTelegramWebApp from '@/hooks/useTelegramWebApp';
import { useState } from 'react';

type Props = {
  userId: number;
};

export const MatchLike = ({ userId }: Props) => {
  const router = useRouter();
  const tgWebApp = useTelegramWebApp();
  const [isLoading, setIsLoading] = useState(false);

  const handleLike = async () => {
    try {
      setIsLoading(true);
      const telegramId = tgWebApp?.initDataUnsafe?.user?.id;
      if (!telegramId) {
        throw new Error('Telegram ID not found');
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recommendations/like`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            telegramId: telegramId,
            toTelegramId: userId,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to like user');
      }

      router.push('/likes');
    } catch (error) {
      console.error('Error liking user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 !mt-6 text-white">
      <div className="bg-[#161014] rounded-full !p-4 h-[48px] flex items-center outline outline-[#363636] gap-3 text-base font-base">
        <Like />
        Лайкните пользователя
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleLike}
          disabled={isLoading}
          className="bg-[#7C87ED] flex justify-center rounded-full w-full !p-3 outline outline-[#363636] hover:scale-105 transition-transform cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Загрузка...' : 'Лайкнуть'}
        </button>
        <button
          onClick={() => router.push('/likes')}
          disabled={isLoading}
          className="!p-3 w-[48px] h-[48px] min-w-[48px] flex rounded-full items-center justify-center bg-[#140A0A] outline outline-[#363636] text-white hover:bg-[#1F1F1F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash />
        </button>
      </div>
    </div>
  );
};
