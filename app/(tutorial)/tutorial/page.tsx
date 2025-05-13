'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Типы для данных обучения
type TutorialStep = {
  id: number;
  title: string;
  description: string;
  image: string;
  gradientFrom: string;
  gradientTo: string;
};

export default function TutorialPage() {
  const router = useRouter();
  // Данные для каждого этапа обучения
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

  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  // Обработчик кнопки "Далее"
  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setDirection('right');
      setCurrentStep(currentStep + 1);
    } else {
      // Завершение обучения
      localStorage.setItem('tutorial', 'true');
      router.push('/');
    }
  };

  // Обработчик кнопки "Назад"
  const handlePrev = () => {
    if (currentStep > 0) {
      setDirection('left');
      setCurrentStep(currentStep - 1);
    }
  };

  // Анимация для контента
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
      className="h-screen overflow-hidden relative"
      initial={{
        background: `linear-gradient(to bottom right, ${tutorialSteps[0].gradientFrom}, ${tutorialSteps[0].gradientTo})`,
      }}
      animate={{
        background: `linear-gradient(to bottom right, ${tutorialSteps[currentStep].gradientFrom}, ${tutorialSteps[currentStep].gradientTo})`,
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="container mx-auto !px-6 !py-8 h-full flex flex-col">
        {/* Контент с анимацией */}
        <div className="flex m-8 justify-center relative">
          <h1 className="text-3xl">Teamder</h1>
        </div>
        <div className="flex-1 flex items-center justify-center relative">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={tutorialSteps[currentStep].id}
              custom={direction}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'tween', ease: 'easeInOut', duration: 0.35 }}
              className="absolute text-center w-full"
            >
              <motion.img
                src={tutorialSteps[currentStep].image}
                alt={`Step ${currentStep + 1}`}
                className="mx-auto mb-8 w-full"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.35 }}
              />
              <h1 className="text-2xl !mt-16 font-bold text-white mb-4">
                {tutorialSteps[currentStep].title}
              </h1>
              <p className="text-gray-300">
                Описание этапа {currentStep + 1}...
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Навигация */}
        <div className="pb-8 flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-full ${
              currentStep === 0
                ? 'opacity-50 cursor-default'
                : 'hover:bg-white/10'
            } text-white transition-all`}
          >
            Назад
          </button>

          <div className="flex space-x-2">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  currentStep === index ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="px-6 py-3 bg-white text-black rounded-full hover:bg-white/90 transition-all"
          >
            {currentStep === tutorialSteps.length - 1 ? 'Начать' : 'Далее'}
          </button>
        </div>
      </div>
    </motion.main>
  );
}
