'use client';

import { useRouter } from 'next/navigation';
import UserHeader from '@/components/headers/userHeader';
import ProfileCard from '@/components/profileCard';

export default function ProfilePage() {
  const router = useRouter();

  return (
    <main className="bg-gradient-to-tr from-[#0F0505] to-[#310F0F] h-screen overflow-hidden">
      <UserHeader />
      <div className="!mt-[72px] !p-6">
        <h2 className="text-[16px] font-medium !mb-4">Ваш профиль</h2>
        <ProfileCard
          nickname="Vxnn"
          rating={2400}
          totalGames={2000}
          wins={1200}
          customField="Новый"
          description="Добрых отзывчивых геймеров, которые хотят в команде поднимать рейтинг. Иметь дискорд, телеграм, стим"
        />
      </div>
      <div
        className="flex justify-center items-center text-4xl !pt-[128px]"
        onClick={() => {
          localStorage.setItem('tutorial', 'false');
          router.push('/tutorial');
        }}
      >
        Вернуть туториал
      </div>
    </main>
  );
}
