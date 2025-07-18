'use client';

import TDImage from '@/components/UI/TDImage';
import { motion } from 'framer-motion';
import React from 'react';
import { useSnapshot } from 'valtio/react';
import { userStore } from '@/store/user';
import Notification from '@/public/icons/Notification';

interface TeamderHeaderProps {
  onToggleFilters?: () => void;
}

const TeamderHeader = ({ onToggleFilters }: TeamderHeaderProps) => {
  const snap = useSnapshot(userStore);

  return (
    <div className="max-w-[560px] !mx-auto flex fixed w-full justify-between !px-6 !my-3 z-10">
      <div className="relative w-12 h-12">
        <TDImage
          useNextImage
          src={snap.user.photo_url}
          alt="User Avatar"
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
      </div>
      <motion.h1
        // initial={{ opacity: 0, y: -20 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.2, delay: 0 }}
        className="absolute text-white left-1/2 transform -translate-x-1/2 text-[32px]"
      >
        Teamder
      </motion.h1>
      <div className="flex items-center gap-3">
        {/* Кнопка фильтров */}
        <button
          onClick={onToggleFilters}
          className="!p-3 rounded-[24px] outline outline-[#363636] bg-[#140A0A] text-white hover:bg-[#2a2a2a] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
        </button>

        {/* Кнопка уведомлений */}
        <div className="!p-3 rounded-[24px] outline outline-[#363636] bg-[#140A0A]">
          <Notification />
          {/* Можно добавить badge для уведомлений */}
          {/* <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span> */}
        </div>
      </div>
    </div>
  );
};

export default TeamderHeader;
