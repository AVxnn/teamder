'use client';

import ChatIcon from '@/public/icons/ChatIcon';
import { userStore } from '@/store/user';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useSnapshot } from 'valtio';
import { NavLink } from '../UI/NavLink';
import TDImage from '../UI/TDImage';
import TeamDer from '@/public/icons/TeamDer';
import { motion } from 'framer-motion';

const NavBar = () => {
  const snap = useSnapshot(userStore);
  const pathname = usePathname();

  const getActivePosition = () => {
    switch (pathname) {
      case '/likes':
        return 'translate-x-0 w-[70px]';
      case '/':
        return 'translate-x-[80px] w-[54px]';
      case '/profile':
        return 'translate-x-[143px] w-[70px]';
      default:
        return 'translate-x-0';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: 0 }}
      className="flex gap-[8px] bottom-[100px] !p-[5px] left-1/2 transform -translate-x-1/2 backdrop-blur-md bg-transparent/30 z-10 w-[224px] h-[64px] rounded-full relative z-10"
    >
      <NavLink
        href="/likes"
        direction="left"
        className="w-[74px] h-[56px] flex items-center justify-center !rounded-full !border-solid !border-1 !border-[#363636] relative z-10 active:scale-95 transform transition-all duration-15 ease-in-out
    hover:brightness-110 cursor-pointer active:opacity-90"
      >
        <ChatIcon />
      </NavLink>
      <NavLink
        href={'/'}
        className="w-[56px] h-[56px] flex items-center justify-center !rounded-full !border-solid !border-1 !border-[#363636] relative z-10 active:scale-95 transform transition-all duration-15 ease-in-out
    hover:brightness-110 cursor-pointer active:opacity-90"
      >
        <TeamDer />
      </NavLink>
      <NavLink
        href="/profile"
        direction="right"
        className="w-[74px] h-[56px] flex items-center justify-center !rounded-full !border-solid !border-1 !border-[#363636] relative z-10 active:scale-95 transform transition-all duration-15 ease-in-out
    hover:brightness-110 cursor-pointer active:opacity-90"
      >
        {snap.user?.photo_url ? (
          <TDImage
            useNextImage
            width={48}
            height={32}
            className="w-[48px] !h-[32px] object-cover rounded-full"
            src={snap.user?.photo_url}
            alt="Avatar"
          />
        ) : null}
      </NavLink>
      <div
        className={`absolute h-[56px] bg-[#7C87ED] rounded-full transition-all duration-300 z-[-1] ease ${getActivePosition()}`}
      />
    </motion.div>
  );
};

export default NavBar;
