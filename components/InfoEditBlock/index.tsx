'use client';

import { motion } from 'framer-motion';
import React from 'react';
import TDImage from '../UI/TDImage';
import { useRouter } from 'next/navigation';

const InfoEditBlock = () => {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-4 !mt-4 !p-4 bg-[#140A0A] outline outline-[#363636] rounded-[32px] w-full"
    >
      <TDImage
        src={'/img/illustrations/fire.png'}
        alt="Profile banner"
        width={480}
        height={280}
        className="rounded-[24px] w-full object-cover pointer-events-none"
      />
      <div
        className="rounded-3xl outline outline-[#363636] text-center bg-[#140A0A] !px-4 !py-4 text-white w-full cursor-pointer hover:scale-102 transition-all"
        onClick={() => {
          router.push('https://t.me/teamder');
        }}
      >
        Наш телеграм канал
      </div>
    </motion.div>
  );
};

export default InfoEditBlock;
