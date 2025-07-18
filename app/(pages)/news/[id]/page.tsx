'use client';

import { notFound } from 'next/navigation';

export default function NewsPage() {
  // const news = newsList.find((n) => String(n.id) === params.id);
  const news = { title: '', date: '', content: '' };

  if (!news) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0F0505] to-[#310F0F] flex justify-center items-center px-4">
      <div className="max-w-xl w-full bg-[#140A0A] rounded-3xl border border-[#363636] p-8 text-white shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{news.title}</h1>
          <div className="text-xs text-gray-400 mb-6">
            {new Date(news.date).toLocaleDateString('ru-RU')}
          </div>
          <p className="text-gray-300 leading-relaxed">{news.content}</p>
        </div>
      </div>
    </div>
  );
}
