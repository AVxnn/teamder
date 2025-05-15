import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';

import { Urbanist, Montserrat } from 'next/font/google';
import TelegramFullscreen from '@/components/TelegramFullscreen';
import 'react-spring-bottom-sheet/dist/style.css';

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-urbanist',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-urbanist',
});

export const metadata: Metadata = {
  title: 'TeamDer | Приложение для поиска тиммейтов',
  description: 'TeamDer поиск тиммейтов',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body
        className={`${urbanist.variable} ${montserrat.variable} antialiased`}
      >
        <TelegramFullscreen />
        {children}
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
