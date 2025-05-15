'use client';

import BottomSheet from '@/components/UI/BottomSheet';
import Input from '@/components/UI/Input';
import Textarea from '@/components/UI/Textarea';

type Props = {
  nextStep: () => void;
  prevStep: () => void;
  handleChange: (field: string, value: string) => void;
  formData: {
    nickname: string;
    about: string;
    lookingFor: string;
  };
};

export default function CreateCardFirst({
  nextStep,
  prevStep,
  handleChange,
  formData,
}: Props) {
  return (
    <BottomSheet
      removeBg
      removeDrag
      removeX
      titleClassName="w-full text-center text-[18px]"
      isOpen={true}
      onClose={prevStep}
      title="Персональная информация"
    >
      <div className="space-y-4 flex flex-col gap-2">
        <Input
          label="Ваш никнейм"
          placeholder="Введите ник"
          value={formData.nickname}
          onChange={(e) => handleChange('nickname', e.target.value)}
        />
        <Textarea
          label="О себе"
          placeholder="Расскажите о себе..."
          value={formData.about}
          onChange={(e) => handleChange('about', e.target.value)}
        />
        <Textarea
          label="Кого ищите"
          placeholder="Расскажите кого вы ищите..."
          value={formData.lookingFor}
          onChange={(e) => handleChange('lookingFor', e.target.value)}
        />
        <div className="space-y-2">
          <button
            onClick={nextStep}
            className="bg-[#7C87ED] flex !mt-2 justify-center rounded-[18px] w-full !p-3 outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
          >
            Дальше
          </button>
          <button
            onClick={prevStep}
            className="bg-[#140A0A] flex !mt-2 justify-center rounded-[18px] w-full !p-3 outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
          >
            Назад
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}
