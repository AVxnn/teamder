import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TDImage from '../UI/TDImage';

type ProfileCardProps = {
  nickname: string;
  rating: number;
  totalGames: number;
  wins: number;
  customField: string;
  description: string;
  imageUrl?: string;
};

export default function ProfileCard({
  nickname,
  rating,
  totalGames,
  wins,
  customField,
  description,
  imageUrl,
}: ProfileCardProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isMounted ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto outline outline-[#363636] bg-[#140A0A] !p-4 text-white rounded-[32px] shadow-2xl"
    >
      <div className="rounded-xl overflow-hidden">
        <TDImage
          useNextImage
          src={imageUrl || '/img/tutorial/tutorial_1.png'}
          alt="Profile banner"
          width={600}
          height={166}
          className="rounded-[24px] object-cover"
        />
      </div>
      <div className="!mt-3 space-y-2">
        <div className="flex justify-between">
          <div className="flex text-sm">
            <span className="text-[#AFAFAF] !mr-1">Никнейм: </span>
            <span>{nickname}</span>
          </div>
          <div className="flex text-sm">
            <span className="text-[#AFAFAF] !mr-1">Рейтинг: </span>
            <span>{rating}</span>
          </div>
        </div>
        <div className="!mt-3 text-sm text-[#AFAFAF]">
          О себе: <span className="text-white !ml-1">{description}</span>
        </div>
        <div className="!mt-3 text-sm text-[#AFAFAF]">
          Ищу: <span className="text-white !ml-1">{description}</span>
        </div>
        <div className="flex justify-between !mt-2">
          <div className="flex flex-col gap-1">
            <span className="text-[12px] text-[#AFAFAF]">Всего игр:</span>
            <span className="text-[16px] w-24 text-center outline outline-[#363636] text-white !px-3 !py-1.5 bg-[#140A0A] rounded-full font-medium">
              {totalGames} игр
            </span>
          </div>
          <div className="flex flex-col  gap-1">
            <span className="text-[12px] text-[#AFAFAF]">Побед:</span>
            <span className="text-[16px] w-16 text-center outline outline-[#363636] text-white !px-3 !py-1.5 bg-[#140A0A] rounded-full font-medium">
              {wins}
            </span>
          </div>
          <div className="flex flex-col  gap-1">
            <span className="text-[12px] text-[#AFAFAF]">Поражений:</span>
            <span className="text-[16px] w-24 text-center outline outline-[#363636] text-white !px-3 !py-1.5 bg-[#140A0A] rounded-full font-medium">
              {customField}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
