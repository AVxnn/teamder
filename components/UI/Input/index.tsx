'use client';

import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="text-sm !mb-2 block text-white">{label}</label>
      )}
      <input
        className={`
          bg-transparent text-white w-full rounded-[24px] !px-4 !py-3 text-sm outline outline-[#363636] focus:ring-2 focus:ring-[#7C87ED]
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
