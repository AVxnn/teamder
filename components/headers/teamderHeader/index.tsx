'use client';

import TDImage from '@/components/UI/TDImage';
import { motion } from 'framer-motion';
import React from 'react';
import { useSnapshot } from 'valtio/react';
import { userStore } from '@/store/user';
import Notification from '@/public/icons/Notification';

const TeamderHeader = () => {
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
        className="absolute left-1/2 transform -translate-x-1/2 text-[32px]"
      >
        Teamder
      </motion.h1>
      <div className="!p-3 rounded-full outline outline-[#363636] bg-[#140A0A]">
        <Notification />
        {/* Можно добавить badge для уведомлений */}
        {/* <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span> */}
      </div>
    </div>
  );
};

export default TeamderHeader;
