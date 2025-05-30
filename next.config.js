/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3002',
        pathname: '/uploads/**',
      },
      // Если у вас есть продакшн домен, добавьте его тоже
      {
        protocol: 'https',
        hostname: 'team-der.ru',
        pathname: '/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
