import { motion } from 'framer-motion';
import TDImage from '../UI/TDImage';
import Steam from '@/public/icons/Steam';
import Discord from '@/public/icons/Discord';
import Telegram from '@/public/icons/Telegram';
import { Hero } from '@/store/user';

// Определяем тип для ролей
type DotaRole = 'CARRY' | 'MID' | 'OFFLANE' | 'SOFT_SUPPORT' | 'HARD_SUPPORT';

interface ProfileCardProps {
  nickname: string;
  rating: number;
  preferredRoles: string[];
  preferredHeroes: Hero[];
  lookingFor: string;
  about: string;
  imageUrl: string;
  telegramId: number;
  username: string;
  firstName: string;
  photoUrl: string;
  isSocial?: boolean;
  steamId?: string;
  discordUrl?: string;
  steamLink?: string;
  hoursPlayed?: number;
  wins?: number;
  losses?: number;
}

const DOTA_ROLES: Record<DotaRole, string> = {
  CARRY: 'Керри',
  MID: 'Мид',
  OFFLANE: 'Оффлейн',
  SOFT_SUPPORT: 'Саппорт 4',
  HARD_SUPPORT: 'Саппорт 5',
} as const;

const ProfileCard: React.FC<ProfileCardProps> = ({
  nickname,
  rating,
  preferredRoles,
  preferredHeroes,
  lookingFor,
  about,
  imageUrl,
  isSocial = false,
  discordUrl,
  steamLink,
  username,
}) => {
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
            src={
              imageUrl
                ? process.env.NEXT_PUBLIC_IMAGE_URL + imageUrl
                : '/img/tutorial/tutorial_1.png'
            }
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
              <span className="text-white">{nickname}</span>
            </div>
            <div className="flex text-sm">
              <span className="text-[#AFAFAF] !mr-1">Рейтинг: </span>
              <span className="text-white">{rating}</span>
            </div>
          </div>
          <div className="!mt-3 text-sm text-[#AFAFAF]">
            О себе: <span className="text-white !ml-1">{about}</span>
          </div>
          <div className="!mt-3 text-sm text-[#AFAFAF]">
            Ищу: <span className="text-white !ml-1">{lookingFor}</span>
          </div>
          <div className="flex justify-between !mt-2">
            <div className="flex flex-col gap-1">
              <span className="text-[12px] text-[#AFAFAF]">Любимые герои:</span>
              <div className="flex -space-x-2">
                {preferredHeroes?.slice(0, 3).map((hero, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-full overflow-hidden outline outline-[#363636] relative z-10"
                    style={{ zIndex: 10 - index }}
                  >
                    <TDImage
                      src={hero.image_url}
                      alt={hero.localized_name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[12px] text-[#AFAFAF]">Роли:</span>
              <div className="flex flex-wrap gap-1">
                {preferredRoles?.map((role, index) => (
                  <span
                    key={index}
                    className="text-[12px] text-center outline outline-[#363636] text-white !px-2 !py-1 bg-[#1a1a1a] rounded-full"
                  >
                    {DOTA_ROLES[role as DotaRole] || role}
                  </span>
                ))}
              </div>
            </div>
            {/* <div className="flex flex-col gap-1">
              <span className="text-[12px] text-[#AFAFAF]">Рейтинг:</span>
              <span className="text-[16px] w-24 text-center outline outline-[#363636] text-white !px-3 !py-1.5 bg-[#1a1a1a] rounded-full font-medium">
                {rating}
              </span>
            </div> */}
          </div>
        </div>
      </motion.div>
      {isSocial ? (
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
              href={steamLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#140A0A] flex justify-center rounded-full w-full !p-3 outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
            >
              <Steam />
            </a>
            <a
              href={`https://t.me/${username}`}
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
};

export default ProfileCard;
