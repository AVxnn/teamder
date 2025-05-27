import React, { useState } from 'react';

type Filters = {
  minRating?: number;
  maxRating?: number;
  minGamesPlayed?: number;
  maxGamesPlayed?: number;
  lookingFor?: string;
};

type Props = {
  onFiltersChange: (filters: Filters) => void;
};

export default function RecommendationFilters({ onFiltersChange }: Props) {
  const [filters, setFilters] = useState<Filters>({});

  const handleFilterChange = (key: keyof Filters, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value ? Number(value) : undefined,
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleLookingForChange = (value: string) => {
    const newFilters = {
      ...filters,
      lookingFor: value || undefined,
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <div className="p-4 bg-[#1a1a1a] rounded-2xl">
      <h3 className="text-white text-lg font-semibold mb-4">Фильтры</h3>

      <div className="space-y-4">
        {/* Рейтинг */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">Рейтинг</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Мин"
              value={filters.minRating || ''}
              onChange={(e) => handleFilterChange('minRating', e.target.value)}
              className="flex-1 bg-[#2a2a2a] text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7C87ED]"
            />
            <input
              type="number"
              placeholder="Макс"
              value={filters.maxRating || ''}
              onChange={(e) => handleFilterChange('maxRating', e.target.value)}
              className="flex-1 bg-[#2a2a2a] text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7C87ED]"
            />
          </div>
        </div>

        {/* Количество игр */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            Количество игр
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Мин"
              value={filters.minGamesPlayed || ''}
              onChange={(e) =>
                handleFilterChange('minGamesPlayed', e.target.value)
              }
              className="flex-1 bg-[#2a2a2a] text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7C87ED]"
            />
            <input
              type="number"
              placeholder="Макс"
              value={filters.maxGamesPlayed || ''}
              onChange={(e) =>
                handleFilterChange('maxGamesPlayed', e.target.value)
              }
              className="flex-1 bg-[#2a2a2a] text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7C87ED]"
            />
          </div>
        </div>

        {/* Цель поиска */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">
            Цель поиска
          </label>
          <select
            value={filters.lookingFor || ''}
            onChange={(e) => handleLookingForChange(e.target.value)}
            className="w-full bg-[#2a2a2a] text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#7C87ED]"
          >
            <option value="">Все</option>
            <option value="team">Команда</option>
            <option value="training">Обучение</option>
            <option value="casual">Казуальные игры</option>
            <option value="tournament">Турниры</option>
          </select>
        </div>
      </div>
    </div>
  );
}
