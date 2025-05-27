import React from 'react';
import BottomSheet from '@/components/UI/BottomSheet';
import newsList from './newsData.json';
import { useRouter } from 'next/navigation';

export default function NewsSheet({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  const handleOpenNews = (news: (typeof newsList)[0]) => {
    router.push(`/news/${news.id}`);
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Новости">
      <div className="flex flex-col gap-4">
        {newsList.map((news) => (
          <div
            key={news.id}
            className="rounded-3xl border border-[#363636] bg-[#140A0A] !px-4 !py-4 flex flex-col gap-2 cursor-pointer hover:bg-[#1a1a1a] transition-colors relative"
            onClick={() => handleOpenNews(news)}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="text-lg font-semibold !mb-1">{news.title}</div>
                <div className="text-sm text-gray-400 truncate max-w-[220px]">
                  {news.description}
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#7C87ED] flex-shrink-0" />
            </div>
            <div className="text-xs text-gray-400 !mt-2">{news.date}</div>
          </div>
        ))}
      </div>
    </BottomSheet>
  );
}
