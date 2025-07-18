export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  language_code?: string;
  is_premium?: boolean;
  added_to_attachment_menu?: boolean;
  allows_write_to_pm?: boolean;
}

export interface TelegramInitDataUnsafe {
  user?: TelegramUser;
  [key: string]: any;
}

export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: TelegramInitDataUnsafe;
  expand(): void;
  close(): void;
  backgroundColor: string;
  headerColor: string;
  platform: string;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  expand(): void;
  close(): void;
  disableVerticalSwipes(): void;
  requestFullscreen(): void;
  setBackgroundColor(color: string): void;
  enableClosingConfirmation(): void;
  disableClosingConfirmation(): void;
  openTelegramLink(url: string): void;
  BackButton: {
    isVisible: boolean;
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
    offClick: (callback: () => void) => void;
  };
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy') => void;
  };
  onEvent: (event: string, callback: () => void) => void;
  ready: () => void;
  // другие методы, если нужно
}
