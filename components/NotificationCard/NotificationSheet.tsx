import React, { useEffect, useState } from 'react';
import BottomSheet from '@/components/UI/BottomSheet';
import NotificationCard, { NotificationType } from './index';
import { useSnapshot } from 'valtio';
import { userStore } from '@/store/user';

export interface Notification {
  _id: string;
  type: NotificationType;
  title: string;
  subtitle?: string;
  user?: { name: string; avatar: string };
  isRead?: boolean;
}

// const notifications = [
//   {
//     type: 'waiting' as NotificationType,
//     user: demoUser,
//     title: 'Ожидает от вас ответа',
//   },
//   {
//     type: 'like' as NotificationType,
//     user: demoUser,
//     title: 'Лайкнул вас',
//   },
//   {
//     type: 'superlike' as NotificationType,
//     user: demoUser,
//     title: 'Поставил вам суперлайк',
//   },
//   {
//     type: 'moderation-fail' as NotificationType,
//     title: 'Ваша карточка',
//     subtitle: 'не прошла модерацию, создайте заново',
//   },
//   {
//     type: 'moderation-success' as NotificationType,
//     title: 'Ваша карточка',
//     subtitle: 'прошла модерацию',
//   },
// ];

export default function NotificationSheet({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const snap = useSnapshot(userStore);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchNotifications = async () => {
    if (!snap.user?.id) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/notifications?telegramId=${snap.user.id}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        },
      );
      const data = await res.json();
      if (data.status === 'success') setNotifications(data.notifications);
      else setError('Ошибка получения уведомлений');
    } catch {
      setError('Ошибка получения уведомлений');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchNotifications();
    // eslint-disable-next-line
  }, [isOpen]);

  // const handleReadAll = async () => {
  //   if (!snap.user?.id) return;
  //   await fetch('/api/notifications/read-all', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ telegramId: snap.user.id }),
  //   });
  //   fetchNotifications();
  // };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Уведомления">
      <div className="flex flex-col gap-2 !mt-[1px]">
        {loading && (
          <div className="text-white text-center py-4">Загрузка...</div>
        )}
        {error && <div className="text-red-500 text-center py-4">{error}</div>}
        {!loading && !error && notifications.length === 0 && (
          <div className="text-gray-400 text-center py-4">Нет уведомлений</div>
        )}
        {notifications.map((n) => (
          <NotificationCard key={n._id} {...n} />
        ))}
      </div>
    </BottomSheet>
  );
}
