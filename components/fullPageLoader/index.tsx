import { userStore } from '@/store/user';
import React from 'react';
import { useSnapshot } from 'valtio';

const FullPageLoader = () => {
  const snap = useSnapshot(userStore);
  return (
    <main className="bg-gradient-to-tr from-[#05060F] to-[#0F1231] h-screen overflow-hidden relative">
      <div className="flex justify-center items-center text-center !pt-[128px]">
        Привет, {snap.user.first_name || 'Гость'} 👋 Загрузка
      </div>
    </main>
  );
};

export default FullPageLoader;
