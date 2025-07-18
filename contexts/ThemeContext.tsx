'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type AccentColor =
  | 'blue'
  | 'green'
  | 'purple'
  | 'orange'
  | 'red'
  | 'teal';

interface ThemeContextType {
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

const accentColors = {
  blue: {
    primary: '#7C87ED',
    primaryHover: '#6B7AEB',
    primaryText: '#7C87ED',
    primaryBorder: '#7C87ED',
    primaryRing: '#7C87ED',
    primaryBg: '#7C87ED',
    primaryBgHover: '#6B7AEB',
    primaryTextHover: '#6B7AEB',
  },
  green: {
    primary: '#7CED7C',
    primaryHover: '#6BED6B',
    primaryText: '#7CED7C',
    primaryBorder: '#7CED7C',
    primaryRing: '#7CED7C',
    primaryBg: '#7CED7C',
    primaryBgHover: '#6BED6B',
    primaryTextHover: '#6BED6B',
  },
  purple: {
    primary: '#ED7CED',
    primaryHover: '#EB6BEB',
    primaryText: '#ED7CED',
    primaryBorder: '#ED7CED',
    primaryRing: '#ED7CED',
    primaryBg: '#ED7CED',
    primaryBgHover: '#EB6BEB',
    primaryTextHover: '#EB6BEB',
  },
  orange: {
    primary: '#EDB87C',
    primaryHover: '#EBAA6B',
    primaryText: '#EDB87C',
    primaryBorder: '#EDB87C',
    primaryRing: '#EDB87C',
    primaryBg: '#EDB87C',
    primaryBgHover: '#EBAA6B',
    primaryTextHover: '#EBAA6B',
  },
  red: {
    primary: '#ED7C7C',
    primaryHover: '#EB6B6B',
    primaryText: '#ED7C7C',
    primaryBorder: '#ED7C7C',
    primaryRing: '#ED7C7C',
    primaryBg: '#ED7C7C',
    primaryBgHover: '#EB6B6B',
    primaryTextHover: '#EB6B6B',
  },
  teal: {
    primary: '#7CEDED',
    primaryHover: '#6BEBEB',
    primaryText: '#7CEDED',
    primaryBorder: '#7CEDED',
    primaryRing: '#7CEDED',
    primaryBg: '#7CEDED',
    primaryBgHover: '#6BEBEB',
    primaryTextHover: '#6BEBEB',
  },
};

export const getAccentColorClasses = (color: AccentColor) =>
  accentColors[color];

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [accentColor, setAccentColor] = useState<AccentColor>('blue');

  useEffect(() => {
    // Загружаем сохраненные настройки из localStorage
    const savedAccentColor = localStorage.getItem('accentColor') as AccentColor;
    if (savedAccentColor) setAccentColor(savedAccentColor);
  }, []);

  useEffect(() => {
    // Применяем темную тему к документу
    const root = document.documentElement;
    root.classList.add('dark');
  }, []);

  useEffect(() => {
    // Сохраняем акцентный цвет в localStorage
    localStorage.setItem('accentColor', accentColor);
  }, [accentColor]);

  const handleSetAccentColor = (newColor: AccentColor) => {
    setAccentColor(newColor);
  };

  return (
    <ThemeContext.Provider
      value={{
        accentColor,
        setAccentColor: handleSetAccentColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
