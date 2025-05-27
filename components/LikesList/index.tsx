// InfiniteProfilesGrid.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Search from '@/public/icons/Search';
import { userStore } from '@/store/user';
import Filter from '@/public/icons/Filter';
import { useSnapshot } from 'valtio';
import { useRouter } from 'next/navigation';

// Тип карточки
interface Profile {
  id: number;
  nickname: string;
  avatar: string;
  banner: string;
}

// Фейковый API для примера
const fetchProfiles = async (
  page: number,
  search: string,
): Promise<Profile[]> => {
  await new Promise((r) => setTimeout(r, 300));
  return Array.from({ length: 10 }, (_, i) => {
    const id = page * 10 + i;
    return {
      id,
      nickname: `Vxnn${search}${id}`,
      avatar: '/img/avatar.png',
      banner: '/img/tutorial/tutorial_1.png',
    };
  });
};

export default function LikesList() {
  const snap = useSnapshot(userStore);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [page, setPage] = useState(0);
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 1 },
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loading]);

  // Подгрузка
  useEffect(() => {
    setLoading(true);
    fetchProfiles(page, search).then((newProfiles) => {
      setProfiles((prev) => [...prev, ...newProfiles]);
      setLoading(false);
    });
  }, [page]);

  // Поиск (перезапуск)
  const handleSearch = (val: string) => {
    setSearch(val);
    setProfiles([]);
    setPage(0);
  };

  const handlerOpenCard = () => {
    router.push('/likes/1');
  };

  return (
    <div className="text-white h-[calc(100vh - 200px)] w-full">
      <div className="flex gap-2 !mb-4 items-center">
        <div className="relative w-full">
          <input
            placeholder="Поиск"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
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

      <div className="grid grid-cols-2 gap-3  h-[calc(100vh-154px)] !pb-32 overflow-auto !p-0.5">
        {profiles.map((profile) => (
          <motion.div
            key={profile.id}
            onClick={() => handlerOpenCard()}
            className="bg-[#1B0B0B] rounded-[32px] !p-4 outline outline-[#363636] cursor-pointer active:scale-95 transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: `0.1` }}
          >
            <div className="flex items-center gap-2 !mb-3">
              <Image
                src={snap.user.photo_url}
                alt="avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span>{profile.nickname}</span>
            </div>
            <Image
              src={profile.banner}
              alt="banner"
              width={126}
              height={82}
              className="rounded-[24px] w-full max-h-[82px] object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Loader */}
      <div ref={loaderRef} className="h-16 flex justify-center items-center">
        {loading && <span className="text-sm text-gray-400">Загрузка...</span>}
      </div>
    </div>
  );
}
