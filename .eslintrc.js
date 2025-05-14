module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Используем парсер для TypeScript
  parserOptions: {
    project: './tsconfig.json', // Указываем на конфиг TypeScript
    tsconfigRootDir: __dirname,
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'next/core-web-vitals', // Базовая конфигурация для Next.js
    'eslint:recommended', // Рекомендации от ESLint
    'plugin:@typescript-eslint/recommended', // Рекомендации для TypeScript
    'plugin:prettier/recommended', // Интеграция с Prettier
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off', // Разрешаем использовать any (если нужно)
    'prettier/prettier': [
      'error',
      {
        semi: true, // Добавляем точку с запятой
        singleQuote: true, // Используем одинарные кавычки
        trailingComma: 'all', // Везде, где можно, ставим запятую в конце
        printWidth: 80, // Максимальная длина строки
        tabWidth: 2, // Размер отступа
        useTabs: false, // Используем пробелы для отступов
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Правила для TypeScript файлов
      rules: {
        '@next/next/no-page-custom-font': 'off', // Отключаем ошибку на кастомные шрифты
      },
    },
  ],
};
