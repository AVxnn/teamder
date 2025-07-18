'use client';

import { SnackbarProvider } from 'notistack';
import { ReactNode } from 'react';

interface NotificationProviderProps {
  children: ReactNode;
}

export default function NotificationProvider({
  children,
}: NotificationProviderProps) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      autoHideDuration={4000}
      style={{
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #363636',
      }}
    >
      {children}
    </SnackbarProvider>
  );
}
