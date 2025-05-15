'use client';

import { motion, AnimatePresence } from 'framer-motion';
import BottomSheet from '@/components/UI/BottomSheet';

const contentVariants = {
  initial: (direction: 1 | 2) => ({
    x: direction === 1 ? 100 : -100,
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: (direction: 1 | 2) => ({
    x: direction === 1 ? -100 : 100,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  }),
};

export default function RulesModal({
  nextStep,
  stepDirection,
}: {
  nextStep: () => void;
  stepDirection: number;
}) {
  return (
    <BottomSheet
      removeBg
      removeDrag
      removeX
      customAnimation={{
        backdrop: {
          initial: { opacity: 1 },
          animate: { opacity: 1 },
          exit: { opacity: 1 },
        },
        sheet: {
          initial: { y: 0 },
          animate: { y: 0 },
          exit: { y: 0 },
        },
        transition: {
          duration: 0.3,
          ease: 'easeOut',
        },
      }}
      isOpen={true}
      titleClassName="w-full text-center text-[18px]"
      title="Правила сервиса"
    >
      <div className="relative min-h-[200px]">
        <AnimatePresence custom={stepDirection} mode="wait">
          <motion.div
            key="rules-content"
            custom={stepDirection}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <p className="text-sm text-[#afafaf] !mb-2">
              1. При создании карточки указывайте верные данные, иначе карточка
              не пройдет модерацию
            </p>
            <p className="text-sm text-[#afafaf] !mb-2">
              2. В изображение можно добавить свой профиль Dota (без ID и ника)
              либо свое фото, всё остальное — не пройдет модерацию
            </p>
            <p className="text-sm text-[#afafaf] !mb-2">
              3. Поиск конкретных людей — не пройдет модерацию
            </p>
            <p className="text-sm text-[#afafaf] !mb-2">
              4. Сервис в стадии разработки. Возможны баги — за помощь в
              тестировании будем рады наградить значком тестера
            </p>

            <div
              onClick={nextStep}
              className="bg-[#7C87ED] flex !mt-8 justify-center rounded-[18px] w-full !p-3 outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
            >
              Перейти к созданию
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </BottomSheet>
  );
}
