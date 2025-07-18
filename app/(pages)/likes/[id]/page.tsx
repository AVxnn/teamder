'use client';

import TeamderHeader from '@/components/headers/teamderHeader';
import { MatchPending } from '@/components/MatchPending';
import { MatchReceived } from '@/components/MatchReceived';
import ProfileCard from '@/components/profileCard';
import useTelegramWebApp from '@/hooks/useTelegramWebApp';
import { useRouter } from 'next/navigation';
import { useEffect, useState, use } from 'react';
import { MatchLike } from '@/components/MatchLike';
import { DotaRole, Hero } from '@/store/user';

type MatchInfo = {
  fromUser: boolean;
  toUser: boolean;
};

type UserProfile = {
  telegramId: number;
  username: string;
  firstName: string;
  photoUrl: string;
  profile: {
    nickname: string;
    banner: string;
    about: string;
    lookingFor: string;
    rating: number;
    hoursPlayed: number;
    wins: number;
    losses: number;
    preferredRoles: string[];
    preferredHeroes: Hero[];
    cardImage: string;
    steamId?: string;
    discordLink?: string;
    steamLink?: string;
  };
};

type ProfileResponse = {
  user: UserProfile;
};

// Добавим функцию для проверки, является ли строка DotaRole
const isDotaRole = (role: string): role is DotaRole => {
  return ['CARRY', 'MID', 'OFFLANE', 'SOFT_SUPPORT', 'HARD_SUPPORT'].includes(
    role,
  );
};

export default function LikesUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { webApp: tgWebApp } = useTelegramWebApp();
  const router = useRouter();
  const [matchInfo, setMatchInfo] = useState<MatchInfo | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSocials, setShowSocials] = useState(false);

  useEffect(() => {
    if (!tgWebApp) return;

    if (!tgWebApp.BackButton.isVisible) {
      tgWebApp.BackButton.show();
    }

    tgWebApp.BackButton.show();
    tgWebApp.BackButton.onClick(() => router.push('/likes'));

    return () => {
      tgWebApp.BackButton.offClick(() => router.push('/likes'));
    };
  }, [tgWebApp, router]);

  useEffect(() => {
    const fetchMatchInfo = async () => {
      try {
        setLoading(true);
        setError(null);

        const telegramId = tgWebApp?.initDataUnsafe?.user?.id;
        if (!telegramId) {
          throw new Error('Telegram ID not found');
        }

        const toTelegramId = parseInt(resolvedParams.id);
        if (isNaN(toTelegramId)) {
          throw new Error('Invalid user ID');
        }

        // Получаем информацию о лайках
        const matchResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/recommendations/likes-between`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ telegramId, toTelegramId }),
          },
        );

        if (!matchResponse.ok) {
          throw new Error('Failed to fetch match info');
        }

        const matchData: MatchInfo = await matchResponse.json();
        setMatchInfo(matchData);

        // Получаем профиль пользователя
        const profileResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/profile/${toTelegramId}`,
        );

        if (!profileResponse.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const profileData: ProfileResponse = await profileResponse.json();
        setUserProfile(profileData.user);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (tgWebApp) {
      fetchMatchInfo();
    }
  }, [tgWebApp, resolvedParams.id]);

  if (loading) {
    return (
      <main className="bg-gradient-to-tr flex justify-center from-[#0F0505] to-[#310F0F] h-screen overflow-auto">
        <TeamderHeader />
        <div className="!pt-[84px] !pb-[112px] !px-6 w-full max-w-[560px] overflow-y-scroll">
          <div className="text-white text-center">Загрузка...</div>
        </div>
      </main>
    );
  }

  if (error || !userProfile) {
    return (
      <main className="bg-gradient-to-tr flex justify-center from-[#0F0505] to-[#310F0F] h-screen overflow-auto">
        <TeamderHeader />
        <div className="!pt-[84px] !pb-[112px] !px-6 w-full max-w-[560px] overflow-y-scroll">
          <div className="text-red-500 text-center">
            {error || 'Профиль не найден'}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gradient-to-tr flex justify-center from-[#0F0505] to-[#310F0F] h-screen overflow-auto">
      <TeamderHeader />
      <div className="!pt-[84px] !pb-[112px] !px-6 w-full max-w-[560px] overflow-y-scroll">
        <ProfileCard
          nickname={userProfile.profile.nickname}
          rating={userProfile.profile.rating}
          preferredRoles={userProfile.profile.preferredRoles.filter(isDotaRole)}
          preferredHeroes={userProfile.profile.preferredHeroes}
          lookingFor={userProfile.profile.lookingFor}
          about={userProfile.profile.about}
          imageUrl={userProfile.profile.cardImage}
          isSocial={showSocials}
          steamId={userProfile.profile.steamId}
          discordUrl={userProfile.profile.discordLink}
          steamLink={userProfile.profile.steamLink}
          telegramId={userProfile.telegramId}
          username={userProfile.username}
          firstName={userProfile.firstName}
          photoUrl={userProfile.photoUrl}
          hoursPlayed={userProfile.profile.hoursPlayed}
          wins={userProfile.profile.wins}
          losses={userProfile.profile.losses}
        />
        {matchInfo?.fromUser && matchInfo?.toUser ? (
          <MatchReceived
            userId={userProfile.telegramId}
            onShowSocials={setShowSocials}
          />
        ) : !matchInfo?.fromUser ? (
          <MatchLike userId={userProfile.telegramId} />
        ) : (
          <MatchPending userId={userProfile.telegramId} />
        )}
      </div>
    </main>
  );
}
