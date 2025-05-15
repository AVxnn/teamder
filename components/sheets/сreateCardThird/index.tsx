'use client';

import BottomSheet from '@/components/UI/BottomSheet';
import Input from '@/components/UI/Input';
import { FC } from 'react';

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  nextStep: () => void;
  prevStep: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  handleChange: (field: string, value: string) => void;
}

const сreateCardThird: FC<Props> = ({
  nextStep,
  prevStep,
  formData,
  handleChange,
}) => {
  return (
    <BottomSheet
      removeBg
      removeDrag
      removeX
      titleClassName="w-full text-center text-[18px]"
      isOpen={true}
      onClose={prevStep}
      title="Как вас искать"
    >
      <div className="flex gap-2 w-full !mb-2 !mt-2">
        <Input
          label="Ссылка на Discord"
          placeholder="Вставьте ссылку на приглашение"
          value={formData.discordLink}
          onChange={(val) => handleChange('discordLink', val.target.value)}
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
        Предпросмотр
      </div>
    </BottomSheet>
  );
};

export default сreateCardThird;
