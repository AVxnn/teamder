import { TelegramWebApp } from '@/types/telegram';

export const isTelegramWebApp = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!window.Telegram?.WebApp;
};

export const getTelegramPlatform = (): string => {
  if (typeof window === 'undefined') return 'unknown';
  return window.Telegram?.WebApp?.platform || 'unknown';
};

export const isMobileOrDesktopTelegram = (): boolean => {
  const platform = getTelegramPlatform();
  return (
    platform === 'ios' ||
    platform === 'android' ||
    platform === 'macos' ||
    platform === 'tdesktop'
  );
};

export const isWebBrowser = (): boolean => {
  const platform = getTelegramPlatform();
  return platform === 'unknown' || platform === 'web' || platform === '';
};

export const shouldApplyFullscreen = (): boolean => {
  return isTelegramWebApp() && isMobileOrDesktopTelegram();
};

export const getTelegramWebApp = (): TelegramWebApp | null => {
  if (typeof window === 'undefined') return null;
  return window.Telegram?.WebApp || null;
};
