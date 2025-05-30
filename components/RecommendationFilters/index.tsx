'use client';

import { FC, useState } from 'react';
import { DotaRole, Hero } from '@/store/user';
import RoleSelectSheet from '../sheets/RoleSelectSheet';
import HeroSelectSheet from '../sheets/HeroSelectSheet';

interface Filters {
  minRating?: number;
  maxRating?: number;
  preferredRoles?: DotaRole[];
  preferredHeroes?: Hero[];
}

interface Props {
  onFiltersChange: (filters: Filters) => void;
}

const RecommendationFilters: FC<Props> = ({ onFiltersChange }) => {
  const [filters, setFilters] = useState<Filters>({});
  const [isRoleSheetOpen, setIsRoleSheetOpen] = useState(false);
  const [isHeroSheetOpen, setIsHeroSheetOpen] = useState(false);

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  return (
    <div className="bg-[#140A0A] rounded-2xl p-4 outline outline-[#363636] text-white">
      <h3 className="text-lg font-medium mb-4">Фильтры</h3>

      {/* Рейтинг */}
      <div className="space-y-2 mb-4">
        <label className="text-sm text-[#AFAFAF]">Рейтинг</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="От"
            value={filters.minRating || ''}
            onChange={(e) =>
              handleFilterChange({ minRating: Number(e.target.value) })
            }
            className="w-full bg-[#1a1a1a] rounded-lg px-3 py-2 outline outline-[#363636] text-white"
          />
          <input
            type="number"
            placeholder="До"
            value={filters.maxRating || ''}
            onChange={(e) =>
              handleFilterChange({ maxRating: Number(e.target.value) })
            }
            className="w-full bg-[#1a1a1a] rounded-lg px-3 py-2 outline outline-[#363636] text-white"
          />
        </div>
      </div>

      {/* Роли */}
      <div className="space-y-2 mb-4">
        <label className="text-sm text-[#AFAFAF]">Роли</label>
        <button
          onClick={() => setIsRoleSheetOpen(true)}
          className="w-full bg-[#1a1a1a] rounded-lg px-3 py-2 outline outline-[#363636] text-white text-left hover:bg-[#2a2a2a] transition-colors"
        >
          {filters.preferredRoles?.length
            ? filters.preferredRoles.join(', ')
            : 'Выберите роли'}
        </button>
      </div>

      {/* Герои */}
      <div className="space-y-2 mb-4">
        <label className="text-sm text-[#AFAFAF]">Любимые герои</label>
        <button
          onClick={() => setIsHeroSheetOpen(true)}
          className="w-full bg-[#1a1a1a] rounded-lg px-3 py-2 outline outline-[#363636] text-white text-left hover:bg-[#2a2a2a] transition-colors"
        >
          {filters.preferredHeroes?.length
            ? filters.preferredHeroes.map((h) => h.localized_name).join(', ')
            : 'Выберите героев'}
        </button>
      </div>

      {/* Сброс фильтров */}
      <button
        onClick={() => {
          setFilters({});
          onFiltersChange({});
        }}
        className="w-full bg-[#7C87ED] text-white text-center py-3 rounded-[18px] outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform"
      >
        Сбросить фильтры
      </button>

      {/* Sheets */}
      <RoleSelectSheet
        isOpen={isRoleSheetOpen}
        onClose={() => setIsRoleSheetOpen(false)}
        selectedRoles={filters.preferredRoles || []}
        onSave={(roles: DotaRole[]) => handleFilterChange({ preferredRoles: roles })}
      />

      <HeroSelectSheet
        isOpen={isHeroSheetOpen}
        onClose={() => setIsHeroSheetOpen(false)}
        selectedHeroes={
          filters.preferredHeroes?.map((h) => h.localized_name) || []
        }
        onSave={(heroes) => {
          // Здесь нужно преобразовать имена героев обратно в объекты Hero
          // Это потребует дополнительной логики для получения полных данных о героях
          handleFilterChange({
            preferredHeroes: heroes.map((name) => ({
              id: 0, // Эти данные нужно будет получить с сервера
              name: name.toLowerCase().replace(' ', '_'),
              localized_name: name,
              image_url: `https://cdn.dota2.com/apps/dota2/images/heroes/${name
                .toLowerCase()
                .replace(' ', '_')}_icon.png`,
              _id: name,
            })),
          });
        }}
      />
    </div>
  );
};

export default RecommendationFilters;
