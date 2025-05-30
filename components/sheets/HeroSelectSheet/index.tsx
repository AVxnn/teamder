'use client';

import BottomSheet from '@/components/UI/BottomSheet';
import { FC, useEffect, useState } from 'react';

interface Hero {
  id: number;
  name: string;
  localized_name: string;
  image_url: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedHeroes: string[];
  onSave: (heroes: string[]) => void;
}

const HeroSelectSheet: FC<Props> = ({
  isOpen,
  onClose,
  selectedHeroes,
  onSave,
}) => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [selected, setSelected] = useState<string[]>(selectedHeroes);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/heroes`,
        );
        const data = await response.json();
        setHeroes(data);
      } catch (error) {
        console.error('Error fetching heroes:', error);
      }
    };

    if (isOpen) {
      fetchHeroes();
    }
  }, [isOpen]);

  const handleHeroSelect = (heroName: string) => {
    setSelected((prev) => {
      if (prev.includes(heroName)) {
        return prev.filter((name) => name !== heroName);
      }
      if (prev.length < 3) {
        return [...prev, heroName];
      }
      return prev;
    });
  };

  const handleSave = () => {
    onSave(selected);
    onClose();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Выберите героев"
      titleClassName="w-full text-center text-[18px]"
    >
      <div className="max-h-[360px] overflow-y-auto">
        <div className="grid grid-cols-2 gap-2 !p-4">
          {heroes.map((hero) => (
            <button
              key={hero.id}
              onClick={() => handleHeroSelect(hero.localized_name)}
              className={`flex items-center justify-between !p-3 rounded-lg border ${
                selected.includes(hero.localized_name)
                  ? 'bg-[#7C87ED] border-[#7C87ED] text-white'
                  : 'border-[#343434] text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <img
                  src={hero.image_url}
                  alt={hero.localized_name}
                  className="w-8 h-8 rounded object-cover"
                />
                <span>{hero.localized_name}</span>
              </div>
              {selected.includes(hero.localized_name) && (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="!p-4">
        <button
          onClick={handleSave}
          className="w-full bg-[#7C87ED] text-white text-center !py-3 rounded-[18px] outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform"
        >
          Сохранить
        </button>
      </div>
    </BottomSheet>
  );
};

export default HeroSelectSheet;
