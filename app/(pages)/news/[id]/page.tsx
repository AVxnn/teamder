'use client';

import { notFound } from 'next/navigation';

export default function NewsPage() {
  // const news = newsList.find((n) => String(n.id) === params.id);
  const news = { title: '', date: '', content: '' };

  if (!news) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0F0505] to-[#310F0F] flex justify-center items-center px-4">
      <div className="max-w-xl w-full bg-[#140A0A] rounded-3xl border border-[#363636] p-8 text-white shadow-xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-[#7C87ED] flex-shrink-0" />
          <div>
            <div className="text-2xl font-bold mb-1">{news.title}</div>
            <div className="text-xs text-gray-400">{news.date}</div>
          </div>
        </div>
        <div className="text-base whitespace-pre-line mt-4">{news.content}</div>
      </div>
    </div>
  );
}
