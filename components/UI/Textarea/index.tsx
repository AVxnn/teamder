'use client';

import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export default function Textarea({
  label,
  className,
  ...props
}: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="text-sm !mb-2 block text-white">{label}</label>
      )}
      <textarea
        className={`
          bg-transparent text-white w-full h-[64px] rounded-[24px] !px-4 !py-3 text-sm outline outline-[#363636] resize-none focus:ring-2 focus:ring-[#7C87ED] ${className}`}
        rows={4}
        {...props}
      />
    </div>
  );
}
