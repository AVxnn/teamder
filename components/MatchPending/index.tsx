'use client';

import Time from '@/public/icons/Time';

export const MatchPending = () => (
  <div className="!mt-6 flex flex-col gap-2 text-white">
    <div className="text-sm text-center w-full text-gray-400">
      Вы можете открыть соц.сети с{' '}
      <span className="text-white font-medium">TeamDer Plus</span>
    </div>
    <div className="bg-[#161014] rounded-full !p-4 h-[48px] flex items-center outline outline-[#363636] gap-3 text-base font-base">
      <Time />
      Пользователь еще не ответил
    </div>
  </div>
);
