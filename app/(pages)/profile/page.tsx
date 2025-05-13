'use client';

import { userStore } from '@/store/user';
import { useSnapshot } from 'valtio';

export default function ProfilePage() {
  const snap = useSnapshot(userStore);

  return (
    <main className="bg-gradient-to-tr from-[#05060F] to-[#0F1231] h-screen">
      <div className="flex justify-center items-center !pt-[128px]">
        Привет, {snap.user.first_name || 'Гость'} 👋
      </div>
    </main>
  );
}
