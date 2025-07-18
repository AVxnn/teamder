import useTelegramWebApp from '@/hooks/useTelegramWebApp';
import { useEffect, useState } from 'react';

export type Platform = 'mobile' | 'desktop' | 'web' | 'unknown';

export const useTelegramPlatform = () => {
  const tgWebApp = useTelegramWebApp();
  const [platform, setPlatform] = useState<Platform>('unknown');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!tgWebApp) return;

    const detectPlatform = () => {
      const tgPlatform = tgWebApp.platform;

      if (tgPlatform === 'ios' || tgPlatform === 'android') {
        setPlatform('mobile');
      } else if (
        tgPlatform === 'macos' ||
        tgPlatform === 'windows' ||
        tgPlatform === 'linux'
      ) {
        setPlatform('desktop');
      } else if (tgPlatform === 'web') {
        setPlatform('web');
      } else {
        setPlatform('unknown');
      }

      setIsReady(true);
    };

    detectPlatform();
  }, [tgWebApp]);

  return {
    platform,
    isReady,
    isMobile: platform === 'mobile',
    isDesktop: platform === 'desktop',
  };
};
