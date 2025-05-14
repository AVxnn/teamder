'use client';

import { useRouter } from 'next/navigation';
import UserHeader from '@/components/headers/userHeader';
import ProfileCard from '@/components/profileCard';
import ProfileSlider from '@/components/profileSlider';
import { motion } from 'framer-motion';
import GoldBenefitsCard from '@/components/goldBenefitsCard';
import InfoEditBlock from '@/components/InfoEditBlock';

export default function ProfilePage() {
  const router = useRouter();

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
          nickname="Vxnn"
          socialBar
          rating={2400}
          totalGames={2000}
          wins={1200}
          customField="Новый"
          find="Ищу команду для турниров. Дискорд обязателен."
          aboutme="Профессиональный игрок. Люблю стратегии."
        />
        <ProfileSlider
          likes={0}
          superLikes={0}
          onLikeClick={() => {}}
          onSuperLikeClick={() => {}}
        />
        <InfoEditBlock />
        <GoldBenefitsCard />
        <div
          className="rounded-3xl outline outline-[#363636] text-center bg-[#140A0A] !mt-4 !px-4 !py-4 text-white w-full"
          onClick={() => {
            localStorage.setItem('tutorial', 'false');
            router.push('/tutorial');
          }}
        >
          Открыть туториал
        </div>
      </div>
    </main>
  );
}
