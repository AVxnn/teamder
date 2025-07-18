'use client';

import UserHeader from '@/components/headers/userHeader';
import ProfileCard from '@/components/profileCard';
import ProfileSlider from '@/components/profileSlider';
import { motion } from 'framer-motion';
import GoldBenefitsCard from '@/components/goldBenefitsCard';
import InfoEditBlock from '@/components/InfoEditBlock';
import Book from '@/public/icons/Book';
import News from '@/public/icons/News';
import Settings from '@/public/icons/Settings';
import { useRouter } from 'next/navigation';
import useTelegramWebApp from '@/hooks/useTelegramWebApp';
import { useEffect, useState } from 'react';
import { useSnapshot } from 'valtio';
import { userStore } from '@/store/user';
import { NavLink } from '@/components/UI/NavLink';
import SettingsSheet from '@/components/SettingsSheet';
import NewsSheet from '@/components/NewsSheet';
import ProfileModerationStatus from '@/components/ProfileModerationStatus';
import ProfileModerationRejectedSheet from '@/components/ProfileModerationRejectedSheet';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const snap = useSnapshot(userStore);

  const { webApp: tgWebApp } = useTelegramWebApp();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  const [showRejectedSheet, setShowRejectedSheet] = useState(false);
  const [showStatusModeration, setShowStatusModeration] = useState(false);

  useEffect(() => {
    console.log(tgWebApp);
    if (!tgWebApp) return;

    if (!tgWebApp.BackButton.isVisible) {
      tgWebApp.BackButton.show();
    }

    tgWebApp.BackButton.show();
    tgWebApp.BackButton.onClick(() => router.push('/'));

    return () => {
      tgWebApp.BackButton.offClick(() => router.push('/'));
      tgWebApp.BackButton.hide();
    };
  }, [tgWebApp]);

  useEffect(() => {
    const moderationStatus = snap.user?.profile?.moderationStatus;

    // Проверяем, получен ли профиль вообще
    if (!snap.user?.profile) {
      // Если профиль еще не загружен, не делаем ничего
      return;
    }

    if (!moderationStatus) {
      // Если нет статуса модерации, удаляем из localStorage
      localStorage.removeItem('showStatusModeration');
      setShowStatusModeration(false);
      return;
    }

    if (moderationStatus === 'pending') {
      // Pending всегда отображается
      setShowStatusModeration(true);
      localStorage.setItem('showStatusModeration', 'true');
    } else if (moderationStatus === 'rejected') {
      // Rejected всегда отображается
      setShowStatusModeration(true);
      localStorage.setItem('showStatusModeration', 'true');
    } else if (moderationStatus === 'approved') {
      // Approved можно закрыть, проверяем localStorage
      const savedState = localStorage.getItem('showStatusModeration');
      if (savedState === null || savedState === 'true') {
        // Если нет сохраненного состояния или оно true, показываем
        setShowStatusModeration(true);
        localStorage.setItem('showStatusModeration', 'true');
      } else if (savedState === 'false') {
        // Если сохранено как false, скрываем
        setShowStatusModeration(false);
        // НЕ перезаписываем localStorage, оставляем 'false'
      }
    } else if (moderationStatus === 'deleted') {
      // Deleted не показывает статус модерации
      setShowStatusModeration(false);
      localStorage.removeItem('showStatusModeration');
    }
  }, [snap.user?.profile?.moderationStatus, snap.user?.profile]);

  // Функция для обработки клика по статусу модерации
  const handleModerationStatusClick = () => {
    const moderationStatus = snap.user?.profile?.moderationStatus;

    if (moderationStatus === 'rejected') {
      localStorage.setItem('showStatusModeration', 'false');
      setShowRejectedSheet(true);
    } else if (moderationStatus === 'approved') {
      setShowStatusModeration(false);
      localStorage.setItem('showStatusModeration', 'false');
    }
  };

  return (
    <main className="flex justify-center overflow-auto">
      <UserHeader />
      <div className="!pt-[84px] !pb-[112px] !px-6 w-full max-w-[560px] overflow-y-scroll">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className=""
        >
          <h2 className="text-[16px] text-[#ffffff] font-medium !mb-4">
            Ваш профиль
          </h2>

          {/* Отображение статуса модерации */}
          {snap.user?.profile?.moderationStatus &&
            showStatusModeration &&
            snap.user.profile.moderationStatus !== 'deleted' && (
              <ProfileModerationStatus
                status={snap.user.profile.moderationStatus}
                onClick={handleModerationStatusClick}
              />
            )}

          {/* Кнопка создания карточки для deleted статуса */}
          {snap.user?.profile?.moderationStatus === 'deleted' && (
            <Link
              href="/create"
              className="bg-[#140A0A] text-white flex justify-center items-center rounded-full w-full !p-3 outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
            >
              Создать карточку
            </Link>
          )}
        </motion.div>

        {/* Отображение карточки профиля только если статус не deleted */}
        {snap.user?.profile?.moderationStatus !== 'deleted' ? (
          <ProfileCard
            isSocial={false}
            telegramId={0}
            username=""
            firstName=""
            photoUrl=""
            nickname={snap.user?.profile?.nickname}
            rating={snap.user?.profile?.rating}
            preferredRoles={[...(snap.user?.profile?.preferredRoles || [])]}
            preferredHeroes={[...(snap.user?.profile?.preferredHeroes || [])]}
            lookingFor={snap.user?.profile?.lookingFor}
            about={snap.user?.profile?.about}
            imageUrl={snap.user?.profile?.cardImage}
            discordUrl={snap.user?.profile?.discordLink}
            steamLink={snap.user?.profile?.steamLink}
          />
        ) : null}

        <ProfileSlider
          likes={
            snap.user?.likesLimit?.dailyLimit -
            snap.user?.likesLimit?.likesUsedToday
          }
          superLikes={
            snap.user?.superLikesLimit?.dailyLimit -
            snap.user?.superLikesLimit?.superLikesUsedToday
          }
          onLikeClick={() => {}}
          onSuperLikeClick={() => {}}
        />
        <GoldBenefitsCard />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mx-auto !px-4 text-white rounded-[32px] !mt-3"
        >
          <div className="flex justify-around gap-3 mt-6 !px-4">
            <NavLink
              href="/tutorial"
              rel="noopener noreferrer"
              className="bg-[#140A0A] flex justify-center rounded-[24px] w-full !p-3 outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
            >
              <Book />
            </NavLink>
            <div
              rel="noopener noreferrer"
              className="bg-[#140A0A] flex justify-center rounded-[24px] w-full !p-3 outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
              onClick={() => setNewsOpen(true)}
            >
              <News />
            </div>
            <div
              rel="noopener noreferrer"
              className="bg-[#140A0A] flex justify-center rounded-[24px] w-full !p-3 outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings />
            </div>
          </div>
        </motion.div>
        <InfoEditBlock />
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-[16px] !mt-6 text-[#ffffff] font-medium !mb-4"
        >
          Админ панель
        </motion.h2>
        {snap.user?.role === 'admin' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mx-auto text-white rounded-[32px] !mt-3"
          >
            <div className="flex justify-around gap-3 mt-6">
              <NavLink
                href="/admin/moderation"
                rel="noopener noreferrer"
                className="bg-[#140A0A] flex justify-center text-center rounded-[24px] w-full !p-3 outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
              >
                Карточки
              </NavLink>
              <NavLink
                href="/admin/moderation"
                rel="noopener noreferrer"
                className="bg-[#140A0A] flex justify-center text-center rounded-[24px] w-full !p-3 outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
              >
                Жалобы
              </NavLink>
            </div>
          </motion.div>
        )}
      </div>

      <SettingsSheet
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
      <NewsSheet isOpen={newsOpen} onClose={() => setNewsOpen(false)} />
      <ProfileModerationRejectedSheet
        isOpen={showRejectedSheet}
        onClose={() => setShowRejectedSheet(false)}
        onCreate={() => {
          setShowRejectedSheet(false);
          localStorage.setItem('tutorial', 'true');
          router.push('/create');
        }}
      />
    </main>
  );
}
