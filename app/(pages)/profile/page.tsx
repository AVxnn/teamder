'use client';

import { userStore } from '@/store/user';
import { useSnapshot } from 'valtio';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const snap = useSnapshot(userStore);
  const router = useRouter();

  return (
    <main className="bg-gradient-to-tr from-[#05060F] to-[#0F1231] h-screen overflow-hidden">
      <div className="flex justify-center items-center !pt-[128px]">
        Привет, {snap.user.first_name || 'Гость'} 👋
      </div>
      <div
        className="flex justify-center items-center !pt-[128px]"
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
