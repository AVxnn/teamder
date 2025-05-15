import { motion } from 'framer-motion';
import TDImage from '../UI/TDImage';
import Steam from '@/public/icons/Steam';
import Discord from '@/public/icons/Discord';
import Telegram from '@/public/icons/Telegram';

type ProfileCardProps = {
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
  socialBar?: boolean;
};

export default function ProfileCard({
  nickname,
  rating,
  totalGames,
  wins,
  customField,
  find,
  aboutme,
  imageUrl,
  discordUrl,
  steamUrl,
  telegramUrl,
  socialBar,
}: ProfileCardProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="mx-auto outline outline-[#363636] bg-[#140A0A] !p-4 text-white rounded-[32px] shadow-2xl"
      >
        <div className="rounded-xl overflow-hidden">
          <TDImage
            useNextImage
            src={imageUrl || '/img/tutorial/tutorial_1.png'}
            alt="Profile banner"
            width={600}
            height={166}
            className="rounded-[24px] object-cover pointer-events-none"
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
            О себе: <span className="text-white !ml-1">{aboutme}</span>
          </div>
          <div className="!mt-3 text-sm text-[#AFAFAF]">
            Ищу: <span className="text-white !ml-1">{find}</span>
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
      {socialBar ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mx-auto !px-4 text-white rounded-[32px] !mt-3"
        >
          <div className="flex justify-around gap-3 mt-6 !px-4">
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#140A0A] flex justify-center rounded-full w-full !p-3 outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
            >
              <Discord />
            </a>
            <a
              href={steamUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#140A0A] flex justify-center rounded-full w-full !p-3 outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
            >
              <Steam />
            </a>
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#140A0A] flex justify-center rounded-full w-full !p-3 outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
            >
              <Telegram />
            </a>
          </div>
        </motion.div>
      ) : null}
    </>
  );
}
