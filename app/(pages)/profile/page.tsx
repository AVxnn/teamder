'use client';

import UserHeader from '@/components/headers/userHeader';
import ProfileCard from '@/components/profileCard';
import ProfileSlider from '@/components/profileSlider';
import { motion } from 'framer-motion';
import GoldBenefitsCard from '@/components/goldBenefitsCard';
import InfoEditBlock from '@/components/InfoEditBlock';
import Book from '@/public/icons/Book';
import News from '@/public/icons/News';
import Settings from '@/public/icons/Settings';
import { useRouter } from 'next/navigation';
import useTelegramWebApp from '@/hooks/useTelegramWebApp';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { userStore } from '@/store/user';

export default function ProfilePage() {
  const router = useRouter();
  const snap = useSnapshot(userStore);

  const tgWebApp = useTelegramWebApp();

  useEffect(() => {
    console.log(tgWebApp);
    if (!tgWebApp) return;

    if (!tgWebApp.BackButton.isVisible) {
      tgWebApp.BackButton.show();
    }

    tgWebApp.BackButton.show();
    tgWebApp.BackButton.onClick(() => router.push('/'));

    return () => {
      tgWebApp.BackButton.offClick(() => router.push('/'));
      tgWebApp.BackButton.hide();
    };
  }, [tgWebApp]);
  return (
    <main className="bg-gradient-to-tr flex justify-center from-[#0F0505] to-[#310F0F] h-screen overflow-auto">
      <UserHeader />
      <div className="!pt-[84px] !pb-[112px] !px-6 w-full max-w-[560px] overflow-y-scroll">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className=""
        >
          <h2 className="text-[16px] font-medium !mb-4">Ваш профиль</h2>
        </motion.div>
        <ProfileCard
          nickname={snap.user?.profile?.nickname}
          socialBar
          rating={snap.user?.profile?.rating}
          totalGames={snap.user?.profile?.hoursPlayed}
          wins={snap.user?.profile?.wins}
          losses={snap.user?.profile?.losses}
          find={snap.user?.profile?.about}
          aboutme={snap.user?.profile?.lookingFor}
        />
        <ProfileSlider
          likes={0}
          superLikes={0}
          onLikeClick={() => {}}
          onSuperLikeClick={() => {}}
        />
        <GoldBenefitsCard />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mx-auto !px-4 text-white rounded-[32px] !mt-3"
        >
          <div className="flex justify-around gap-3 mt-6 !px-4">
            <div
              rel="noopener noreferrer"
              className="bg-[#140A0A] flex justify-center rounded-full w-full !p-3 outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
            >
              <Book />
            </div>
            <div
              rel="noopener noreferrer"
              className="bg-[#140A0A] flex justify-center rounded-full w-full !p-3 outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
            >
              <News />
            </div>
            <div
              rel="noopener noreferrer"
              className="bg-[#140A0A] flex justify-center rounded-full w-full !p-3 outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
            >
              <Settings />
            </div>
          </div>
        </motion.div>
        <InfoEditBlock />
        <div
          onClick={() => router.push('/tutorial')}
          rel="noopener noreferrer"
          className="bg-[#140A0A] !mt-3 flex justify-center rounded-full w-full !p-3 outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
        >
          Туториал
        </div>
      </div>
    </main>
  );
}
