'use client';

import Like from '@/public/icons/Like';
import Trash from '@/public/icons/Trash';
import { useRouter } from 'next/navigation';
import useTelegramWebApp from '@/hooks/useTelegramWebApp';
import { useState } from 'react';

type Props = {
  userId: number;
  onShowSocials: (show: boolean) => void;
};

export const MatchReceived = ({ userId, onShowSocials }: Props) => {
  const router = useRouter();
  const { webApp: tgWebApp } = useTelegramWebApp();
  const [isLoading, setIsLoading] = useState(false);

  const handleDislike = async () => {
    try {
      setIsLoading(true);
      const telegramId = tgWebApp?.initDataUnsafe?.user?.id;
      if (!telegramId) {
        throw new Error('Telegram ID not found');
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recommendations/dislike`,
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
        throw new Error('Failed to dislike user');
      }

      router.push('/likes');
    } catch (error) {
      console.error('Error disliking user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 !mt-6 text-white">
      <div className="bg-[#161014] rounded-[24px] !p-4 h-[48px] flex items-center outline outline-[#363636] gap-3 text-base font-base">
        <Like />
        Вас лайкнули в ответ
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onShowSocials(true)}
          className="bg-[#7C87ED] flex justify-center rounded-[24px] w-full !p-3 outline outline-[#363636] hover:scale-105 transition-transform cursor-pointer"
        >
          Открыть соц.сети
        </button>
        <button
          onClick={handleDislike}
          disabled={isLoading}
          className="!p-3 w-[48px] h-[48px] min-w-[48px] flex rounded-[24px] items-center justify-center bg-[#140A0A] outline outline-[#363636] text-white hover:bg-[#1F1F1F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash />
        </button>
      </div>
    </div>
  );
};
