'use client';

import Image from 'next/image';
import Notification from '@/public/icons/Notification';
import { useSnapshot } from 'valtio/react';
import { userStore } from '@/store/user';
import { motion } from 'framer-motion';

export default function UserHeader() {
  const snap = useSnapshot(userStore);
  return (
    <header className="max-w-[560px] flex fixed w-full items-center justify-between !px-6 !py-3 backdrop-blur-md bg-transparent/30 z-10">
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
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.06 }}
            className="text-[12px] text-[#AFAFAF]"
          >
            Доброе утро
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.03 }}
            className="text-sm font-medium text-[#FFFFFF]"
          >
            {snap.user.first_name + snap.user.last_name}
          </motion.span>
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
