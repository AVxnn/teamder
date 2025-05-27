import React from 'react';
import BottomSheet from '@/components/UI/BottomSheet';

export default function ProfileModerationRejectedSheet({
  isOpen,
  onClose,
  onCreate,
}: {
  isOpen: boolean;
  onClose: () => void;
  onCreate: () => void;
}) {
  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Модерация не пройдена"
    >
      <div className="flex flex-col items-center gap-6">
        <img
          src="/img/illustrations/rejected.png"
          alt="Модерация не пройдена"
          className="w-full max-w-xs rounded-2xl"
        />
        <button
          className="w-full !py-3 rounded-3xl bg-[#7C87ED] text-white text-lg font-medium hover:bg-[#6a7be0] transition-colors"
          onClick={onCreate}
        >
          Создать карточку заново
        </button>
      </div>
    </BottomSheet>
  );
}
