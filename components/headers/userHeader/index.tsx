'use client';

import Image from 'next/image';
import Notification from '@/public/icons/Notification';
import { useSnapshot } from 'valtio/react';
import { userStore } from '@/store/user';

export default function UserHeader() {
  const snap = useSnapshot(userStore);
  return (
    <header className="flex fixed w-full items-center justify-between !p-6 border-b border-gray-200">
      {/* Левая часть: аватар + текст */}
      <div className="flex items-center">
        {/* Аватарка 48x48 с отступом справа 12 (tailwind: mr-3) */}
        <div className="relative w-12 h-12 !mr-3">
          <Image
            src={snap.user.photo_url}
            alt="User Avatar"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        </div>

        {/* Текст и никнейм */}
        <div className="flex flex-col">
          <span className="text-[12px] text-[#AFAFAF]">Доброе утро</span>
          <span className="text-sm font-medium text-[#FFFFFF]">
            {snap.user.first_name + snap.user.last_name}
          </span>
        </div>
      </div>

      {/* Правая часть: иконка уведомления */}
      <div className="!p-3 rounded-full outline outline-[#363636] bg-[#140A0A]">
        <Notification />
        {/* Можно добавить badge для уведомлений */}
        {/* <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span> */}
      </div>
    </header>
  );
}
