'use client';

import BottomSheet from '@/components/UI/BottomSheet';
import { FC } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedRoles: string[];
  onSave: (roles: string[]) => void;
}

const DOTA_ROLES = [
  { id: 'CARRY', name: 'Керри', icon: '🎯' },
  { id: 'MID', name: 'Мид', icon: '⚔️' },
  { id: 'OFFLANE', name: 'Оффлейн', icon: '🛡️' },
  { id: 'SOFT_SUPPORT', name: 'Саппорт 4', icon: '💫' },
  { id: 'HARD_SUPPORT', name: 'Саппорт 5', icon: '✨' },
] as const;

const RoleSelectSheet: FC<Props> = ({
  isOpen,
  onClose,
  selectedRoles,
  onSave,
}) => {
  const handleRoleSelect = (roleId: string) => {
    const newRoles = selectedRoles.includes(roleId)
      ? selectedRoles.filter((r) => r !== roleId)
      : selectedRoles.length < 3
      ? [...selectedRoles, roleId]
      : selectedRoles;

    onSave(newRoles);
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Выберите роли"
      titleClassName="w-full text-center text-[18px]"
    >
      <div className="max-h-[360px] overflow-y-auto">
        <div className="grid grid-cols-2 gap-2 !p-4">
          {DOTA_ROLES.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className={`flex items-center justify-between !p-3 rounded-lg border ${
                selectedRoles.includes(role.id)
                  ? 'bg-[#7C87ED] border-[#7C87ED] text-white'
                  : 'border-[#343434] text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{role.icon}</span>
                <span>{role.name}</span>
              </div>
              {selectedRoles.includes(role.id) && (
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
          onClick={onClose}
          className="w-full bg-[#7C87ED] text-white text-center !py-3 rounded-[18px] outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform"
        >
          Готово
        </button>
      </div>
    </BottomSheet>
  );
};

export default RoleSelectSheet;
