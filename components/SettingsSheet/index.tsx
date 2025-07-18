import React, { useState } from 'react';
import BottomSheet from '@/components/UI/BottomSheet';
import Shield from '@/public/icons/Shield';
import App from '@/public/icons/App';
import { useRouter } from 'next/navigation';
import { userStore } from '@/store/user';

const switchBase =
  'relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none';
const switchChecked = 'bg-[#7C87ED]';
const switchUnchecked = 'bg-[#363636]';
const switchThumb =
  'inline-block w-5 h-5 transform bg-[#7C87ED] rounded-full transition-transform';

export default function SettingsSheet({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [notifications, setNotifications] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleDeleteProfile = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/profile/delete`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            telegramId: window.Telegram?.WebApp?.initDataUnsafe?.user?.id,
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to delete profile');
      }

      const data = await response.json();

      if (data.success) {
        // Обновляем статус модерации в userStore
        if (userStore.user.profile) {
          userStore.user.profile.moderationStatus = 'deleted';
        }
      }

      onClose();
      router.refresh();
    } catch (error) {
      console.error('Error deleting profile:', error);
      // Здесь можно добавить уведомление об ошибке
    } finally {
      setIsDeleting(false);
      setShowConfirmDialog(false);
    }
  };

  return (
    <>
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
            <button
              onClick={() => setShowConfirmDialog(true)}
              className="w-full !py-3 rounded-3xl border border-[#363636] text-white text-lg font-medium hover:bg-[#1a1a1a] transition-colors"
            >
              Удалить карточку
            </button>
          </div>
        </div>
      </BottomSheet>

      {/* Диалог подтверждения удаления */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] !p-6 rounded-2xl max-w-sm w-full !mx-4">
            <h3 className="text-xl font-semibold text-white !mb-4">
              Удалить карточку?
            </h3>
            <p className="text-gray-400 !mb-6">
              Это действие нельзя будет отменить. Все данные вашей карточки
              будут удалены.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="flex-1 !py-3 rounded-xl border border-[#363636] text-white hover:bg-[#2a2a2a] transition-colors"
                disabled={isDeleting}
              >
                Отмена
              </button>
              <button
                onClick={handleDeleteProfile}
                className="flex-1 !py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
                disabled={isDeleting}
              >
                {isDeleting ? 'Удаление...' : 'Удалить'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
