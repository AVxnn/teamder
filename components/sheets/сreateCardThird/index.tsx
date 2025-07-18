'use client';

import BottomSheet from '@/components/UI/BottomSheet';
import Input from '@/components/UI/Input';
import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  nextStep: () => void;
  prevStep: () => void;
  stepDirection: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  handleChange: (field: string, value: string) => void;
}

const contentVariants = {
  initial: (direction: 1 | 2) => ({
    x: direction === 1 ? 100 : -100,
    opacity: 0,
    position: 'absolute' as const,
    width: '100%',
  }),
  animate: {
    x: 0,
    opacity: 1,
    position: 'relative' as const,
    width: '100%',
  },
  exit: (direction: 1 | 2) => ({
    x: direction === 1 ? -100 : 100,
    opacity: 0,
    position: 'absolute' as const,
    width: '100%',
  }),
};

const CreateCardThird: FC<Props> = ({
  nextStep,
  prevStep,
  formData,
  handleChange,
  stepDirection,
}) => {
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
      titleClassName="w-full text-center text-[18px]"
      isOpen={true}
      onClose={prevStep}
      title="Как вас искать"
    >
      <div className="relative min-h-[200px]">
        <AnimatePresence custom={stepDirection} mode="wait">
          <motion.div
            key="create-card-third"
            custom={stepDirection}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="flex gap-2 w-full !mb-2 !mt-2">
              <Input
                label="Ссылка на Discord"
                placeholder="Вставьте ссылку на приглашение"
                value={formData.discordLink}
                onChange={(val) =>
                  handleChange('discordLink', val.target.value)
                }
              />
            </div>
            <div className="flex gap-2 w-full !mb-2 !mt-2">
              <Input
                label="Ссылка на Steam"
                placeholder="Вставьте ссылку профиля"
                value={formData.steamLink}
                onChange={(val) => handleChange('steamLink', val.target.value)}
              />
            </div>

            <p className="text-center text-[#afafaf] text-[12px] !mb-2 !mt-4">
              Данные чтобы с вами связались новые друзья
            </p>

            <div
              className="bg-[#7C87ED] text-white text-center !py-3 rounded-[18px] w-full outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
              onClick={nextStep}
            >
              Создать карточку
            </div>

            <div
              className="text-white text-center !mt-3 !py-3 rounded-[18px] w-full outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
              onClick={prevStep}
            >
              Назад
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </BottomSheet>
  );
};

export default CreateCardThird;
