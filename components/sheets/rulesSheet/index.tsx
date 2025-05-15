'use client';

import BottomSheet from '@/components/UI/BottomSheet';

export default function RulesModal({ nextStep }: { nextStep: () => void }) {
  return (
    <BottomSheet
      removeBg
      removeDrag
      removeX
      isOpen={true}
      titleClassName="w-full text-center text-[18px]"
      title="Правила сервиса"
    >
      <p className="text-sm text-[#afafaf] !mb-2">
        1. При создание карточки указывайте верные данные, иначе карточка не
        пройдет модерацию{' '}
      </p>
      <p className="text-sm text-[#afafaf] !mb-2">
        2. В изображение можно добавить свой профиль доты (без id и ника) либо
        свое фото, все остальное - не пройдет модерацию
      </p>
      <p className="text-sm text-[#afafaf] !mb-2">
        3. Поиск конкретных людей - не пройдет модерацию
      </p>
      <p className="text-sm text-[#afafaf] !mb-2">
        4. Сервис в стадии разработки, возможны баги за содействие в поиске -
        будем рады наградить значком тестера
      </p>

      <div
        rel="noopener noreferrer"
        onClick={() => nextStep()}
        className="bg-[#7C87ED] flex !mt-8 justify-center rounded-[18px] w-full !p-3 outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
      >
        Перейти к созданию
      </div>
    </BottomSheet>
  );
}
