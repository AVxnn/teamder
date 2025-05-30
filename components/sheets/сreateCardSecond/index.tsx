'use client';

import BottomSheet from '@/components/UI/BottomSheet';
import Input from '@/components/UI/Input';
import { ChangeEvent, FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSelectSheet from '../HeroSelectSheet';
import RoleSelectSheet from '../RoleSelectSheet';

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  nextStep: () => void;
  prevStep: () => void;
  stepDirection: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  handleChange: (field: string, value: string | string[]) => void;
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

const DOTA_ROLES = [
  { id: 'CARRY', name: 'Керри' },
  { id: 'MID', name: 'Мид' },
  { id: 'OFFLANE', name: 'Оффлейн' },
  { id: 'SOFT_SUPPORT', name: 'Софт саппорт' },
  { id: 'HARD_SUPPORT', name: 'Хард саппорт' },
] as const;

const CreateCardSecond: FC<Props> = ({
  nextStep,
  prevStep,
  formData,
  handleChange,
  stepDirection,
}) => {
  const [isHeroSelectOpen, setIsHeroSelectOpen] = useState(false);
  const [isRoleSelectOpen, setIsRoleSelectOpen] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Проверяем тип файла
    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение');
      return;
    }

    // Проверяем размер файла (максимум 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Размер файла не должен превышать 5MB');
      return;
    }

    try {
      setIsImageLoading(true);

      // Конвертируем файл в Base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result as string;
          resolve(base64String); // Сохраняем полную строку с префиксом
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      // Сохраняем Base64 в formData
      handleChange('cardImage', base64);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Ошибка при обработке изображения');
    } finally {
      setIsImageLoading(false);
    }
  };

  return (
    <>
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
                    disabled={isImageLoading}
                  />
                  <div
                    className={`bg-transparent outline h-[56px] outline-[#343434] text-white text-center !py-4 rounded-2xl cursor-pointer hover:bg-[#222] transition ${
                      isImageLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isImageLoading
                      ? 'Загрузка...'
                      : formData.cardImage
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

              <Input
                label="Ваш рейтинг"
                placeholder="Введите рейтинг"
                value={formData.rating.toString()}
                onChange={(val) => handleChange('rating', val.target.value)}
              />

              <div className="!mt-4">
                <label className="block text-white mb-2">
                  Предпочитаемые роли (до 3)
                </label>
                <button
                  onClick={() => setIsRoleSelectOpen(true)}
                  className="w-full bg-transparent outline h-[56px] outline-[#343434] text-white text-center !py-4 rounded-2xl cursor-pointer hover:bg-[#222] transition"
                >
                  {formData.preferredRoles?.length
                    ? formData.preferredRoles
                        .map((role) => {
                          const roleInfo = DOTA_ROLES.find(
                            (r) => r.id === role,
                          );
                          return roleInfo ? roleInfo.name : role;
                        })
                        .join(', ')
                    : 'Выберите роли'}
                </button>
              </div>

              <div className="mt-4">
                <label className="block text-white mb-2">
                  Предпочитаемые герои (до 3)
                </label>
                <button
                  onClick={() => setIsHeroSelectOpen(true)}
                  className="w-full bg-transparent outline h-[56px] outline-[#343434] text-white text-center !py-4 rounded-2xl cursor-pointer hover:bg-[#222] transition"
                >
                  {formData.preferredHeroes?.length
                    ? formData.preferredHeroes.join(', ')
                    : 'Выберите героев'}
                </button>
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

      <HeroSelectSheet
        isOpen={isHeroSelectOpen}
        onClose={() => setIsHeroSelectOpen(false)}
        selectedHeroes={formData.preferredHeroes || []}
        onSave={(heroes) => handleChange('preferredHeroes', heroes)}
      />

      <RoleSelectSheet
        isOpen={isRoleSelectOpen}
        onClose={() => setIsRoleSelectOpen(false)}
        selectedRoles={formData.preferredRoles || []}
        onSave={(roles) => handleChange('preferredRoles', roles)}
      />
    </>
  );
};

export default CreateCardSecond;
