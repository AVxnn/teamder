'use client';

import BottomSheet from '@/components/UI/BottomSheet';
import { FC, useState } from 'react';
import { DotaRole, Hero } from '@/store/user';
import RoleSelectSheet from '../RoleSelectSheet';
import HeroSelectSheet from '../HeroSelectSheet';

interface Filters {
  minRating?: number;
  maxRating?: number;
  preferredRoles?: DotaRole[];
  preferredHeroes?: Hero[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onFiltersChange: (filters: Filters) => void;
  currentFilters: Filters;
  setShowFilters: (show: boolean) => void;
}

const FilterSheet: FC<Props> = ({
  isOpen,
  onClose,
  onFiltersChange,
  currentFilters,
  setShowFilters,
}) => {
  const [filters, setFilters] = useState<Filters>(currentFilters);
  const [isRoleSheetOpen, setIsRoleSheetOpen] = useState(false);
  const [isHeroSheetOpen, setIsHeroSheetOpen] = useState(false);

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleApply = () => {
    onFiltersChange(filters);
    setShowFilters(false);
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Фильтры"
      titleClassName="w-full text-center text-[18px]"
    >
      <div className="p-4 space-y-4">
        {/* Рейтинг */}
        <div className="space-y-2">
          <label className="text-sm text-[#AFAFAF]">Рейтинг</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="От"
              value={filters.minRating || ''}
              onChange={(e) =>
                handleFilterChange({ minRating: Number(e.target.value) })
              }
              className="w-full bg-[#1a1a1a] rounded-lg !px-3 !py-2 outline outline-[#363636] text-white"
            />
            <input
              type="number"
              placeholder="До"
              value={filters.maxRating || ''}
              onChange={(e) =>
                handleFilterChange({ maxRating: Number(e.target.value) })
              }
              className="w-full bg-[#1a1a1a] rounded-lg !px-3 !py-2 outline outline-[#363636] text-white"
            />
          </div>
        </div>

        {/* Роли */}
        <div className="space-y-2 !mt-4">
          <label className="text-sm !mb-1 text-[#AFAFAF]">Роли</label>
          <button
            onClick={() => setIsRoleSheetOpen(true)}
            className="w-full bg-[#1a1a1a] rounded-lg !px-3 !py-2 outline outline-[#363636] text-white text-left hover:bg-[#2a2a2a] transition-colors"
          >
            {filters.preferredRoles?.length
              ? filters.preferredRoles.join(', ')
              : 'Выберите роли'}
          </button>
        </div>

        {/* Герои */}
        <div className="space-y-2 !mt-4">
          <label className="text-sm !mb-1 text-[#AFAFAF]">Любимые герои</label>
          <button
            onClick={() => setIsHeroSheetOpen(true)}
            className="w-full bg-[#1a1a1a] rounded-lg !px-3 !py-2 outline outline-[#363636] text-white text-left hover:bg-[#2a2a2a] transition-colors"
          >
            {filters.preferredHeroes?.length
              ? filters.preferredHeroes.map((h) => h.localized_name).join(', ')
              : 'Выберите героев'}
          </button>
        </div>

        <div className="flex gap-2 !mt-6">
          {/* Кнопка сброса */}
          <button
            onClick={() => {
              setFilters({});
              onFiltersChange({});
              setShowFilters(false);
            }}
            className="w-full bg-[#1a1a1a] text-white text-center !py-3 rounded-[18px] outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform"
          >
            Сбросить
          </button>

          {/* Кнопка применения */}
          <button
            onClick={handleApply}
            className="w-full bg-[#7C87ED] text-white text-center !py-3 rounded-[18px] outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform"
          >
            Применить
          </button>
        </div>
      </div>

      {/* Вложенные sheets */}
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
          handleFilterChange({
            preferredHeroes: heroes.map((name) => ({
              id: 0,
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
    </BottomSheet>
  );
};

export default FilterSheet;
