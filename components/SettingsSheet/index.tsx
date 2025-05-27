import React, { useState } from 'react';
import BottomSheet from '@/components/UI/BottomSheet';
import Shield from '@/public/icons/Shield';
import App from '@/public/icons/App';

const switchBase =
  'relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none';
const switchChecked = 'bg-[#7C87ED]';
const switchUnchecked = 'bg-[#363636]';
const switchThumb =
  'inline-block w-5 h-5 transform bg-white rounded-full transition-transform';

export default function SettingsSheet({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [darkTheme, setDarkTheme] = useState(true);
  const [notifications, setNotifications] = useState(false);

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Настройки">
      <div className="text-left text-white">
        {/* Настройки приложения */}
        <div className="!mb-6">
          <div className="flex items-center gap-2 !mb-3 text-gray-400 text-sm">
            <App />
            <span>Настройки приложения</span>
          </div>
          <div className="flex flex-col gap-3 !pl-5">
            <label className="flex items-center justify-between cursor-pointer">
              <span>Темная тема</span>
              <span className="leading-0">
                <input
                  type="checkbox"
                  checked={darkTheme}
                  onChange={() => setDarkTheme((v) => !v)}
                  className="sr-only"
                />
                <span
                  className={
                    switchBase +
                    ' ' +
                    (darkTheme ? switchChecked : switchUnchecked)
                  }
                >
                  <span
                    className={
                      switchThumb +
                      (darkTheme ? ' translate-x-5' : ' translate-x-1')
                    }
                  />
                </span>
              </span>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span>Уведомления</span>
              <span>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications((v) => !v)}
                  className="sr-only"
                />
                <span
                  className={
                    switchBase +
                    ' ' +
                    (notifications ? switchChecked : switchUnchecked)
                  }
                >
                  <span
                    className={
                      switchThumb +
                      (notifications ? ' translate-x-5' : ' translate-x-1')
                    }
                  />
                </span>
              </span>
            </label>
          </div>
        </div>
        {/* Помощь и правила */}
        <div className="!mb-6">
          <div className="flex items-center gap-2 !mb-3 text-gray-400 text-sm">
            <Shield />
            <span>Помощь и правила</span>
          </div>
          <div className="flex flex-col gap-3 !pl-6">
            <button className="text-left text-white hover:text-[#7C87ED] transition-colors">
              Политика конфиденциальности
            </button>
            <button className="text-left text-white hover:text-[#7C87ED] transition-colors">
              Еще важная инфа
            </button>
            <button className="text-left text-white hover:text-[#7C87ED] transition-colors">
              Правила сервиса
            </button>
            <button className="text-left text-white hover:text-[#7C87ED] transition-colors">
              Управление подпиской
            </button>
          </div>
        </div>
        {/* Кнопки */}
        <div className="flex flex-col gap-3">
          <button className="w-full !py-3 rounded-3xl bg-[#7C87ED] text-white text-lg font-medium hover:bg-[#6a7be0] transition-colors">
            Наш телеграм канал
          </button>
          <button className="w-full !py-3 rounded-3xl border border-[#363636] text-white text-lg font-medium hover:bg-[#1a1a1a] transition-colors">
            Удалить карточку
          </button>
        </div>
      </div>
    </BottomSheet>
  );
}
