'use client';

import Like from '@/public/icons/Like';
import Trash from '@/public/icons/Trash';

export const MatchReceived = () => (
  <div className="flex flex-col gap-3 !mt-6 text-white">
    <div className="bg-[#161014] rounded-full !p-4 h-[48px] flex items-center outline outline-[#363636] gap-3 text-base font-base">
      <Like />
      Вас лайкнули в ответ
    </div>
    <div className="flex gap-2">
      <div
        rel="noopener noreferrer"
        className="bg-[#7C87ED] flex justify-center rounded-full w-full !p-3 outline outline-[#363636] hover:scale-105 transition-transform cursor-pointer"
      >
        Открыть соц.сети
      </div>
      <button className="!p-3 w-[48px] h-[48px] min-w-[48px] flex rounded-full items-center justify-center bg-[#140A0A] outline outline-[#363636] text-white">
        <Trash />
      </button>
    </div>
  </div>
);
