'use client';

import ChatIcon from '@/public/icons/ChatIcon';
import { userStore } from '@/store/user';
import React from 'react';
import { useSnapshot } from 'valtio';

const NavBar = () => {
  const snap = useSnapshot(userStore);
  return (
    <div className="fixed flex gap-[8px] bottom-[32px] !p-[5px] left-1/2 transform -translate-x-1/2  bg-[#0A0B14] w-[224px] h-[64px] rounded-full">
      <div className="w-[74px] h-[56px] flex items-center justify-center !rounded-full !border-[#363636] !border-solid !border-1">
        <ChatIcon />
      </div>
      <div className="w-[56px] h-[56px] flex items-center justify-center !rounded-full bg-[#7C87ED] !border-[#7C87ED] !border-solid !border-1">
        TD
      </div>
      <div className="w-[74px] h-[56px] flex items-center justify-center !rounded-full !border-[#363636] !border-solid !border-1">
        {snap.user?.photo_url ? (
          <img
            className="w-[48px] !h-[32px] object-cover rounded-full"
            src={snap.user?.photo_url}
            alt="Avatar"
          />
        ) : null}
      </div>
    </div>
  );
};

export default NavBar;
