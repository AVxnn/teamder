'use client';

import ChatIcon from '@/public/icons/ChatIcon';
import { userStore } from '@/store/user';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useSnapshot } from 'valtio';
import { NavLink } from '../UI/NavLink';

const NavBar = () => {
  const snap = useSnapshot(userStore);
  const pathname = usePathname();

  const getActivePosition = () => {
    switch (pathname) {
      case '/chat':
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
    <div className="fixed flex gap-[8px] bottom-[84px] !p-[5px] left-1/2 transform -translate-x-1/2 bg-[#0A0B14] w-[224px] h-[64px] rounded-full relative">
      <NavLink
        href="/chat"
        direction="left"
        className="w-[74px] h-[56px] flex items-center justify-center !rounded-full !border-solid !border-1 !border-[#363636] relative z-10"
      >
        <ChatIcon />
      </NavLink>
      <NavLink
        href={'/'}
        className="w-[56px] h-[56px] flex items-center justify-center !rounded-full !border-solid !border-1 !border-[#363636] relative z-10"
      >
        TD
      </NavLink>
      <NavLink
        href="/profile"
        direction="right"
        className="w-[74px] h-[56px] flex items-center justify-center !rounded-full !border-solid !border-1 !border-[#363636] relative z-10"
      >
        {snap.user?.photo_url ? (
          <img
            className="w-[48px] !h-[32px] object-cover rounded-full"
            src={snap.user?.photo_url}
            alt="Avatar"
          />
        ) : null}
      </NavLink>
      <div
        className={`absolute h-[56px] bg-[#7C87ED] rounded-full transition-all duration-300 z-4 ease ${getActivePosition()}`}
      />
    </div>
  );
};

export default NavBar;
