// InfiniteProfilesGrid.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Search from '@/public/icons/Search';
import Filter from '@/public/icons/Filter';
import { useRouter } from 'next/navigation';

type User = {
  telegramId: number;
  username: string;
  firstName: string;
  photoUrl: string;
  profile: {
    nickname: string;
    banner: string;
  };
};

type Like = {
  date: string;
  isMutual: boolean;
  type?: 'regular' | 'super';
  user?: User;
};

export default function LikesList() {
  const [activeTab, setActiveTab] = useState<'received' | 'given'>('received');
  const [profiles, setProfiles] = useState<Like[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const router = useRouter();

  // Загрузка лайков
  const fetchLikes = async () => {
    try {
      setLoading(true);
      setError(null);

      const telegramId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
      if (!telegramId) {
        throw new Error('Telegram ID not found');
      }

      const endpoint =
        activeTab === 'received' ? 'likes-received' : 'likes-given';
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recommendations/${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ telegramId }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch likes');
      }

      const data: Like[] = await response.json();
      // Проверяем наличие данных
      if (!Array.isArray(data)) {
        setProfiles([]);
        return;
      }
      setProfiles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load likes');
      console.error('Error fetching likes:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [activeTab]);

  // Фильтрация по поиску
  const filteredProfiles = profiles.filter((profile) =>
    profile.user?.firstName.toLowerCase().includes(search.toLowerCase()),
  );

  const handlerOpenCard = (telegramId: number) => {
    router.push(`/likes/${telegramId}`);
  };

  return (
    <div className="text-white h-[calc(100vh - 200px)] w-full">
      {/* Поиск */}
      <div className="flex gap-2 !mb-4 items-center">
        <div className="relative w-full">
          <input
            placeholder="Поиск"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="!pl-12 h-[48px] w-full bg-[#1F1F1F] text-white placeholder:text-gray-400 rounded-full"
          />
          <div className="absolute left-4 top-3.5">
            <Search />
          </div>
        </div>
        <button className="!p-3 w-[48px] h-[48px] max-w-[48px] rounded-full bg-[#1F1F1F] border border-[#363636]">
          <Filter />
        </button>
      </div>

      {/* Табы */}
      <div className="flex gap-2 !mb-4">
        <button
          onClick={() => setActiveTab('received')}
          className={`flex-1 !py-3 rounded-3xl transition-colors ${
            activeTab === 'received'
              ? 'bg-[#7C87ED] text-white'
              : 'bg-[#1F1F1F] text-gray-400'
          }`}
        >
          Кто лайкнул меня
        </button>
        <button
          onClick={() => setActiveTab('given')}
          className={`flex-1 !py-3 rounded-3xl transition-colors ${
            activeTab === 'given'
              ? 'bg-[#7C87ED] text-white'
              : 'bg-[#1F1F1F] text-gray-400'
          }`}
        >
          Кого я лайкнул
        </button>
      </div>

      {/* Список профилей */}
      <div className="grid grid-cols-2 gap-3 h-[calc(100vh-254px)] !pb-32 overflow-auto !p-0.5">
        {error ? (
          <div className="col-span-2 text-red-500 text-center py-4">
            {error}
          </div>
        ) : loading ? (
          <div className="col-span-2 text-gray-400 text-center py-4">
            Загрузка...
          </div>
        ) : filteredProfiles.length === 0 ? (
          <div className="col-span-2 text-gray-400 text-center py-4">
            {search ? 'Ничего не найдено' : 'Нет лайков'}
          </div>
        ) : (
          filteredProfiles.map(
            (profile) =>
              profile.user && (
                <motion.div
                  key={profile.user.telegramId}
                  onClick={() => handlerOpenCard(profile.user.telegramId)}
                  className="bg-[#1B0B0B] rounded-[32px] !p-4 outline outline-[#363636] cursor-pointer active:scale-95 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <div className="flex items-center gap-2 !mb-3">
                    <Image
                      src={profile.user.photoUrl}
                      alt="avatar"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span>{profile.user.firstName}</span>
                  </div>
                  <Image
                    src={profile.user.profile.banner}
                    alt="banner"
                    width={126}
                    height={82}
                    className="rounded-[24px] w-full max-h-[82px] object-cover"
                  />
                </motion.div>
              ),
          )
        )}
      </div>
    </div>
  );
}
