'use client';

import useTelegramWebApp from '@/hooks/useTelegramWebApp';
import ArrowLeft from '@/public/icons/ArrowLeft';
import ArrowRight from '@/public/icons/ArrowRight';
import Check from '@/public/icons/Check';
import TeamDer from '@/public/icons/TeamDer';
import { userStore } from '@/store/user';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import TDImage from '../UI/TDImage';

const NavBarTutorial = ({
  currentStep,
  handlePrev,
  handleNext,
}: {
  currentStep: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handlePrev: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleNext: any;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const snap = useSnapshot(userStore);
  const pathname = usePathname();
  const tgWebApp = useTelegramWebApp();

  const [animatedSteps, setAnimatedSteps] = useState<number[]>([1]);

  useEffect(() => {
    if (currentStep + 1 > animatedSteps.length) {
      setAnimatedSteps((prev) => [...prev, currentStep + 1]);
    } else if (currentStep + 1 < animatedSteps.length) {
      const timer = setTimeout(() => {
        setAnimatedSteps((prev) => prev.slice(0, -1));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [animatedSteps.length, currentStep]);

  useEffect(() => {
    if (!tgWebApp) return;

    console.log(tgWebApp.BackButton.isVisible);
    if (!tgWebApp.BackButton.isVisible && currentStep + 1 !== 1) {
      tgWebApp.BackButton.show();
    }
    const handleBack = () => {
      handlePrev();
    };

    if (currentStep + 1 === 1) {
      tgWebApp.BackButton.offClick(handleBack);
      tgWebApp.BackButton.hide();
    } else {
      tgWebApp.BackButton.onClick(handleBack);
    }

    return () => {
      tgWebApp.BackButton.offClick(handleBack);
    };
  }, [currentStep]);

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
    <motion.div
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: 0 }}
      className="flex gap-[8px] bottom-[100px] !p-[5px] left-1/2 transform -translate-x-1/2 backdrop-blur-md bg-transparent/30 w-[224px] h-[64px] rounded-full relative"
    >
      <div
        className={`absolute h-[56px] bg-[#140A0A] rounded-full transition-all duration-300 ease ${getActivePosition()}`}
      />
      <div
        onClick={() => {
          if (
            window?.Telegram?.WebApp?.HapticFeedback &&
            currentStep + 1 >= 2
          ) {
            window?.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
          }
          handlePrev();
        }}
        className="w-[74px] h-[56px] flex bg-[#140A0A] items-center justify-center rounded-full !border-solid !border-1 !border-[#363636] relative z-10
    active:scale-95 transform transition-transform duration-15 ease-in-out
    hover:brightness-110 cursor-pointer active:opacity-90"
      >
        <div className="active:scale-90 transition-transform duration-15">
          {currentStep + 1 === 1 ? (
            <TDImage
              useNextImage
              src={'/img/icons/mipmap.webp'}
              width={32}
              height={32}
              alt={`mipmap`}
              className="w-8 h-8 rounded-[30px]"
            />
          ) : (
            <ArrowLeft />
          )}
        </div>
      </div>
      <div className="relative w-[56px] h-[56px] overflow-hidden">
        <div className="absolute inset-0 bg-[#140A0A] rounded-full !border-solid !border-1 !border-[#363636] flex items-center justify-center z-10">
          <TeamDer />
        </div>

        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          className="absolute top-0 left-0 z-10"
        >
          <AnimatePresence>
            {animatedSteps.includes(1) && (
              <motion.circle
                key="segment-1"
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke="#7C87ED"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ strokeDasharray: '0 150.8' }}
                animate={{
                  strokeDasharray: '50.3 100.6',
                  strokeDashoffset: '-100.6',
                  transition: { duration: 0.2 },
                }}
                exit={{
                  strokeDasharray: '0 150.8',
                  transition: { duration: 0.2 },
                }}
              />
            )}

            {animatedSteps.includes(2) && (
              <motion.circle
                key="segment-2"
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke="#7C87ED"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ strokeDasharray: '0 150.8' }}
                animate={{
                  strokeDasharray: '50.3 100.6',
                  strokeDashoffset: '0',
                  transition: { duration: 0.2 },
                }}
                exit={{
                  strokeDasharray: '0 150.8',
                  transition: { duration: 0.2 },
                }}
              />
            )}

            {animatedSteps.includes(3) && (
              <motion.circle
                key="segment-3"
                cx="28"
                cy="28"
                r="24"
                fill="none"
                stroke="#7C87ED"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ strokeDasharray: '0 150.8' }}
                animate={{
                  strokeDasharray: '50.3 100.6',
                  strokeDashoffset: '-50.3',
                  transition: { duration: 0.2 },
                }}
                exit={{
                  strokeDasharray: '0 150.8',
                  transition: { duration: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
        </svg>
      </div>
      <div
        onClick={() => {
          if (window?.Telegram?.WebApp?.HapticFeedback) {
            window?.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
          }
          handleNext();
        }}
        className={`w-[74px] h-[56px] flex items-center justify-center rounded-full !border-solid !border-1 !border-[#363636] relative z-10
    active:scale-95 transform transition-transform duration-15 ease-in-out
    hover:brightness-110 cursor-pointer active:opacity-90 
    ${currentStep + 1 === 3 ? 'bg-[#7C87ED]' : 'bg-[#140A0A]'}`}
      >
        <div className="active:scale-90 transition-transform duration-15">
          {currentStep + 1 === 3 ? <Check /> : <ArrowRight />}
        </div>
      </div>
    </motion.div>
  );
};

export default NavBarTutorial;
