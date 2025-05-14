'use client';

import NavBar from '@/components/navbar';
import useTelegramWebApp from '@/hooks/useTelegramWebApp';
import { userStore } from '@/store/user';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);
  const tgWebApp = useTelegramWebApp();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const isTutorialCompleted = localStorage.getItem('tutorial') === 'true';
    if (!isTutorialCompleted) {
      router.push('/tutorial');
    } else {
    }
  }, []);

  useEffect(() => {
    if (window.Telegram && tgWebApp) {
      tgWebApp.disableVerticalSwipes();
      tgWebApp.ready();
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && tgWebApp) {
      if (!tgWebApp) {
        tgWebApp?.expand();

        tgWebApp.setBackgroundColor('#140A0A');
        tgWebApp.headerColor = '#140A0A';
        tgWebApp.ready();

        tgWebApp.enableClosingConfirmation();
      }
    }

    const user = tgWebApp?.initDataUnsafe?.user;
    console.log(user, 'user');
    if (isClient && user) {
      userStore.user.id = user.id;
      userStore.user.first_name = user.first_name;
      userStore.user.last_name = user.last_name;
      userStore.user.username = user.username;
      userStore.user.photo_url = user.photo_url;
    }
  }, [isClient]);

  return (
    <div className="h-screen ">
      {children}
      <NavBar />
    </div>
  );
}
