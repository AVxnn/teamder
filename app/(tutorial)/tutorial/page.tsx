'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import NavBarTutorial from '@/components/navbarTutorial';
import useTelegramWebApp from '@/hooks/useTelegramWebApp';
import { useSnapshot } from 'valtio';
import { userStore } from '@/store/user';

type TutorialStep = {
  id: number;
  title: string;
  description: string;
  image: string;
  gradientFrom: string;
  gradientTo: string;
};

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: 'Быстрая регистрация',
    description: 'Вы всего в трех шагах от новых тиммейтов',
    image: '/img/tutorial/tutorial_1.png',
    gradientFrom: '#0F0505',
    gradientTo: '#310F0F',
  },
  {
    id: 2,
    title: 'Поиск новых друзей',
    description: 'Простой интерфейс поможет быстро найти друзей',
    image: '/img/tutorial/tutorial_2.png',
    gradientFrom: '#050F05',
    gradientTo: '#0F3111',
  },
  {
    id: 3,
    title: 'Создание карточки',
    description: 'Начни с добавления информации о себе',
    image: '/img/tutorial/tutorial_3.png',
    gradientFrom: '#06050F',
    gradientTo: '#0F1631',
  },
];

export default function TutorialPage() {
  const router = useRouter();
  const snap = useSnapshot(userStore);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isMounted, setIsMounted] = useState(false);
  const tgWebApp = useTelegramWebApp();

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setDirection('right');
      setCurrentStep(currentStep + 1);
    } else {
      if (isMounted && tgWebApp) {
        if (tgWebApp.BackButton.isVisible) {
          tgWebApp.BackButton.hide();
        }
      }
      if (
        !snap.user ||
        !snap.user.profile ||
        Object.keys(snap.user.profile).length === 0 ||
        !snap.user.profile?.rating
      ) {
        localStorage.setItem('tutorial', 'false');
        router.push('/create');
      } else {
        localStorage.setItem('tutorial', 'true');
        router.push('/profile');
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setDirection('left');
      setCurrentStep(currentStep - 1);
    }
  };

  const contentVariants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <motion.main
      className="h-screen relative"
      initial={{
        background: `linear-gradient(to bottom right, ${tutorialSteps[0].gradientFrom}, ${tutorialSteps[0].gradientTo})`,
      }}
      animate={{
        background: `linear-gradient(to bottom right, ${tutorialSteps[currentStep].gradientFrom}, ${tutorialSteps[currentStep].gradientTo})`,
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="container mx-auto !px-6 !py-8 h-full flex flex-col">
        <div className="flex justify-center relative">
          <h1 className="text-3xl">Teamder</h1>
        </div>
        <div className="flex-1 !mt-[-64px] flex items-center justify-center relative">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={tutorialSteps[currentStep].id}
              custom={direction}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.35 }}
              className="absolute text-center flex items-center flex-col w-full"
            >
              <motion.img
                src={tutorialSteps[currentStep].image}
                alt={`Step ${currentStep + 1}`}
                className="mx-auto mb-8 w-full max-w-80"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.35 }}
              />
              <h1 className="text-[20px] !mt-8 !mb-2 font-bold text-white mb-4">
                {tutorialSteps[currentStep].title}
              </h1>
              <p className="text-[#AFAFAF] text-[14px] max-w-[241px]">
                {tutorialSteps[currentStep].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <NavBarTutorial
        currentStep={currentStep}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
    </motion.main>
  );
}
