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

  const tgWebApp = useTelegramWebApp();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  const [showRejectedSheet, setShowRejectedSheet] = useState(false);
  const [showStatusModeration, setShowStatusModeration] = useState(true);

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
    const val = localStorage.getItem('showStatusModeration');
    if (snap.user?.profile?.moderationStatus === 'rejected') {
      setShowStatusModeration(true);
      localStorage.setItem('showStatusModeration', 'true');
    } else if (!val) setShowStatusModeration(false);
  }, [snap.user?.profile?.moderationStatus]);

  return (
    <main className="bg-gradient-to-tr flex justify-center from-[#0F0505] to-[#310F0F] h-screen overflow-auto">
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
          {snap.user?.profile?.moderationStatus === 'deleted' ? (
            <Link
              href="/create"
              className="bg-[#140A0A] text-white flex justify-center items-center rounded-full w-full !p-3 outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
            >
              Создать карточку
            </Link>
          ) : (
            snap.user?.profile?.moderationStatus &&
            showStatusModeration && (
              <ProfileModerationStatus
                status={snap.user.profile.moderationStatus}
                onClick={() => {
                  if (snap.user.profile.moderationStatus === 'rejected') {
                    localStorage.setItem('showStatusModeration', 'false');
                    setShowRejectedSheet(true);
                  }
                  if (snap.user.profile.moderationStatus === 'approved') {
                    setShowStatusModeration(false);
                    localStorage.setItem('showStatusModeration', 'false');
                  }
                }}
              />
            )
          )}
        </motion.div>
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
        ) : (
          <></>
        )}
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
              className="bg-[#140A0A] flex justify-center rounded-full w-full !p-3 outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
            >
              <Book />
            </NavLink>
            <div
              rel="noopener noreferrer"
              className="bg-[#140A0A] flex justify-center rounded-full w-full !p-3 outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
              onClick={() => setNewsOpen(true)}
            >
              <News />
            </div>
            <div
              rel="noopener noreferrer"
              className="bg-[#140A0A] flex justify-center rounded-full w-full !p-3 outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
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
                className="bg-[#140A0A] flex justify-center text-center rounded-full w-full !p-3 outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
              >
                Карточки
              </NavLink>
              <NavLink
                href="/admin/moderation"
                rel="noopener noreferrer"
                className="bg-[#140A0A] flex justify-center text-center rounded-full w-full !p-3 outline outline-[#363636] hover:scale-105 active:scale-105 transition-transform cursor-pointer"
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
