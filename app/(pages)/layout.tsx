'use client';

import NavBar from '@/components/navbar';
import { userStore } from '@/store/user';
import { useEffect, useState } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    console.log(window.Telegram);
    tg?.expand();

    const user = tg?.initDataUnsafe?.user;
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
    <>
      {children}
      <NavBar />
    </>
  );
}
