'use client';

import { COLORS } from '@/constants/colors';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'error';
  className?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
  size = 'md',
}: ButtonProps) {
  const getButtonClasses = () => {
    const baseClasses = 'rounded-lg transition-all duration-200 font-medium';
    const sizeClasses = {
      sm: 'px-3 py-1 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg',
    };

    const variantClasses = {
      primary: `bg-[${COLORS.primary}] hover:bg-[${
        COLORS.primaryHover
      }] text-white ${
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:scale-105 active:scale-105'
      }`,
      secondary: `bg-[${COLORS.background.primary}] text-white border border-[${
        COLORS.border
      }] ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1F1F1F]'}`,
      outline: `bg-transparent text-white border border-[${COLORS.border}] ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#222]'
      }`,
      success: `bg-[${COLORS.success}] hover:bg-[${
        COLORS.successHover
      }] text-white ${
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:scale-105 active:scale-105'
      }`,
      error: `bg-[${COLORS.error}] hover:bg-[${COLORS.errorHover}] text-white ${
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:scale-105 active:scale-105'
      }`,
    };

    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={getButtonClasses()}
    >
      {children}
    </button>
  );
}
