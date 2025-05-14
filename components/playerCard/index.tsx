// components/PlayerCard.tsx
'use client';

import { getPlayerData } from '@/lib/dota-api';
import { useEffect, useState } from 'react';
import PlayerCardSkeleton from '../skeletons/PlayerCard';
import { getHeroInfo } from '@/lib/dota-heroes';
import Image from 'next/image';

interface PlayerData {
  profile: {
    account_id: number;
    personaname: string;
    avatarfull: string;
    steamid: string;
    last_login?: string;
    country_code?: string;
  };
  mmr: {
    estimate?: number;
    rank?: number;
  };
  winLoss: {
    win: number;
    lose: number;
    last_match_time?: number;
  };
  mostPlayedHero: {
    hero_id: number;
    games: number;
    win: number;
    with_games: number;
    against_games: number;
  };
  recentMatches?: {
    match_id: number;
    hero_id: number;
    result: boolean;
    duration: number;
    kills: number;
    deaths: number;
    assists: number;
  }[];
}

export default function PlayerCard({ accountId }: { accountId: string }) {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [heroData, setHeroData] = useState<{
    id: number;
    games: number;
    short: string;
    win: number;
    full: string;
  }>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPlayerData(accountId);
        if (data?.mostPlayedHero) {
          const heroInfo = await getHeroInfo(data.mostPlayedHero);
          setHeroData({
            id: heroInfo.id,
            games: data.mostPlayedHero.games,
            short: heroInfo.short,
            win: data.mostPlayedHero.win,
            full: heroInfo.full,
          });
        }
        setPlayerData(data);
      } catch (err) {
        setError('Не удалось загрузить данные игрока');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accountId]);

  if (loading) return <PlayerCardSkeleton />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!playerData)
    return <div className="text-white p-4">Данные не найдены</div>;

  const winRate = (
    (playerData.winLoss.win /
      (playerData.winLoss.win + playerData.winLoss.lose)) *
    100
  ).toFixed(1);
  console.log(playerData);

  const lastLoginDate = playerData.profile.last_login
    ? new Date(playerData.profile.last_login).toLocaleDateString()
    : 'Неизвестно';

  const winRateHero = ((heroData.win / heroData.games) * 100).toFixed(1);

  return (
    <div className="max-w-2xl bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden shadow-lg">
      {/* Профиль игрока */}
      <div className="p-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={playerData.profile.avatarfull}
              alt={playerData.profile.personaname}
              className="w-20 h-20 rounded-full border-2 border-blue-500"
            />
            {playerData.profile.country_code && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full overflow-hidden border border-gray-700">
                <Image
                  src={`https://flagsapi.com/${playerData.profile.country_code}/flat/64.png`}
                  alt="Country flag"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              {playerData.profile.personaname}
            </h2>
            <p className="text-gray-300">ID: {playerData.profile.account_id}</p>
            <p className="text-gray-400 text-sm">
              Последний вход: {lastLoginDate}
            </p>
          </div>
        </div>
      </div>

      {/* Контент табов */}
      <div className="p-6 pt-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <StatCard
            title="MMR"
            value={playerData.mmr?.estimate ?? 'N/A'}
            color="blue"
            subValue={
              playerData.mmr?.rank ? `Rank: ${playerData.mmr.rank}` : ''
            }
          />
          <StatCard title="Win Rate" value={`${winRate}%`} color="green" />
          <StatCard title="Wins" value={playerData.winLoss.win} color="green" />
          <StatCard
            title="Losses"
            value={playerData.winLoss.lose}
            color="red"
          />
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-3">
            Часто используемые герои
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-700 p-3 rounded-lg flex items-center">
              <Image
                src={`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroData.short}.png`}
                className="w-12 h-12 mr-3"
                alt={heroData.full}
              />
              <div>
                <p className="text-white font-medium">{heroData.full}</p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-300">{heroData?.games} игр</span>
                  <span
                    className={`font-semibold ${
                      parseFloat(winRate) >= 50
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    {winRateHero}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Компонент карточки статистики
function StatCard({
  title,
  value,
  color,
  subValue,
}: {
  title: string;
  value: string | number;
  color: 'blue' | 'green' | 'red' | 'purple' | 'yellow';
  subValue?: string;
}) {
  const colorClasses = {
    blue: 'text-blue-400',
    green: 'text-green-400',
    red: 'text-red-400',
    purple: 'text-purple-400',
    yellow: 'text-yellow-400',
  };

  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className={`text-2xl font-bold ${colorClasses[color]}`}>{value}</p>
      {subValue && <p className="text-gray-400 text-xs mt-1">{subValue}</p>}
    </div>
  );
}
