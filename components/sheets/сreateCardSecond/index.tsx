'use client';

import BottomSheet from '@/components/UI/BottomSheet';
import Input from '@/components/UI/Input';
import { ChangeEvent, FC } from 'react';
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
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: (direction: 1 | 2) => ({
    x: direction === 1 ? -100 : 100,
    opacity: 0,
    position: 'absolute' as const,
    width: '100%',
    transition: { duration: 0.3, ease: 'easeIn' },
  }),
};

const CreateCardSecond: FC<Props> = ({
  nextStep,
  prevStep,
  formData,
  handleChange,
  stepDirection,
}) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('cardImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
      title="Информация для карточки"
    >
      <div className="relative min-h-[200px]">
        <AnimatePresence custom={stepDirection} mode="wait">
          <motion.div
            key="create-card-second"
            custom={stepDirection}
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="!mb-4 !mt-1 w-full flex gap-4 items-center">
              {formData.cardImage && (
                <div className="mt-3 w-[56px] max-w-[96px] min-w-[96px]  max-h-[56px] rounded-2xl overflow-hidden border border-[#343434]">
                  <img
                    src={formData.cardImage}
                    alt="Превью изображения"
                    className="w-full h-auto object-cover rounded-2xl"
                  />
                </div>
              )}
              <label className="w-full">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <div className="bg-transparent outline h-[56px] outline-[#343434] text-white text-center !py-4 rounded-2xl cursor-pointer hover:bg-[#222] transition">
                  {formData.cardImage
                    ? 'Заменить изображение'
                    : 'Добавить изображение'}
                </div>
              </label>
            </div>

            <Input
              label="Ваш SteamID"
              placeholder="Вставьте id"
              value={formData.steamId}
              onChange={(val) => handleChange('steamId', val.target.value)}
            />

            <div className="flex gap-2 w-full !mb-2 !mt-2">
              <Input
                label="Ваш рейтинг"
                placeholder="Введите рейтинг"
                value={formData.rating.toString()}
                onChange={(val) => handleChange('rating', val.target.value)}
              />
              <Input
                label="Сколько у вас часов"
                placeholder="Введите часы"
                value={formData.hoursPlayed.toString()}
                onChange={(val) =>
                  handleChange('hoursPlayed', val.target.value)
                }
              />
            </div>

            <div className="flex gap-2 w-full">
              <Input
                label="Сколько у вас побед"
                placeholder="Введите победы"
                value={formData.wins.toString()}
                onChange={(val) => handleChange('wins', val.target.value)}
              />
              <Input
                label="Сколько у вас лузов"
                placeholder="Введите лузов"
                value={formData.losses.toString()}
                onChange={(val) => handleChange('losses', val.target.value)}
              />
            </div>

            <p className="text-center text-[#afafaf] text-[12px] !mb-2 !mt-4">
              Заполняйте данные верно
            </p>

            <div
              className="bg-[#7C87ED] text-white text-center !py-3 rounded-[18px] w-full outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
              onClick={nextStep}
            >
              Дальше
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

export default CreateCardSecond;
