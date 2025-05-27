'use client';

import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { userStore } from '@/store/user';
import UserHeader from '@/components/headers/userHeader';

// Типы для профиля и пользователя
export type UserRole = 'admin' | 'user' | 'premium';
export type ModerationStatus = 'pending' | 'approved' | 'rejected';

interface Profile {
  moderationStatus: ModerationStatus;
  moderationComment?: string;
  avatarUrl?: string;
  about?: string;
  nickname?: string;
  lookingFor?: string;
  steamId?: string;
  rating?: number;
  hoursPlayed?: number;
  wins?: number;
  losses?: number;
  discordLink?: string;
  steamLink?: string;
  cardImage?: string;
  moderatedAt?: string;
  moderatedBy?: string;
}

interface ModerationUser {
  telegramId: string;
  username: string;
  firstName: string;
  photoUrl?: string;
  role: UserRole;
  profile: Profile;
}

export default function ModerationPage() {
  const snap = useSnapshot(userStore);
  // Ожидаем, что userStore.user содержит role и telegramId
  const user = snap.user;
  const [profiles, setProfiles] = useState<ModerationUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [moderating, setModerating] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id || user.role !== 'admin') return;
    fetchPendingProfiles();
  }, [user?.id, user?.role]);

  const fetchPendingProfiles = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/moderation/pending`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ telegramId: user.id }),
        },
      );
      const data = await response.json();
      if (data.success) {
        setProfiles(data.profiles);
        setLoading(false);
      } else {
        setError('Ошибка загрузки профилей');
        setLoading(false);
      }
    } catch {
      setError('Ошибка загрузки профилей');
      setLoading(false);
    }
  };

  const handleModeration = async (profileId: string, approved: boolean) => {
    setModerating(profileId);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/moderation/moderate`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: approved ? 'approved' : 'rejected',
            userId: profileId,
            telegramId: user.id,
          }),
        },
      );
      const data = await response.json();
      if (data.success) {
        fetchPendingProfiles();
      } else {
        setError('Ошибка модерации');
      }
    } catch {
      setError('Ошибка модерации');
    } finally {
      setModerating(null);
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="text-white p-8 text-center text-xl">
        Доступ запрещён. Только для администраторов.
      </div>
    );
  }

  if (loading)
    return <div className="text-white !p-8">Загрузка карточек...</div>;
  if (error) return <div className="text-red-500 !p-8">{error}</div>;

  return (
    <div className="bg-gradient-to-tr from-[#0F0505] to-[#310F0F] h-screen overflow-hidden relative">
      <UserHeader />
      <div className="!px-6 !pt-[84px]">
        <h1 className="text-[16px] text-[#ffffff] font-medium !mb-4">
          Модерация карточек
        </h1>
        {profiles.length === 0 && (
          <div className="text-gray-400">Нет карточек на модерацию</div>
        )}
        <div className="flex flex-col gap-4">
          {profiles.map((profile) => (
            <div
              key={profile.telegramId}
              className="bg-[#140A0A] border border-[#363636] rounded-2xl !p-4 flex items-center gap-4"
            >
              <img
                src={profile.profile.avatarUrl || '/default-avatar.png'}
                alt={profile.firstName}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="text-lg font-semibold text-white">
                  {profile.firstName}
                </div>
                <div className="text-sm text-gray-400">@{profile.username}</div>
                <div className="text-sm text-white !mt-2">
                  {profile.profile.about}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white !px-4 !py-2 rounded"
                  disabled={moderating === profile.telegramId}
                  onClick={() => handleModeration(profile.telegramId, true)}
                >
                  Подтвердить
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white !px-4 !py-2 rounded"
                  disabled={moderating === profile.telegramId}
                  onClick={() => handleModeration(profile.telegramId, false)}
                >
                  Отклонить
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
