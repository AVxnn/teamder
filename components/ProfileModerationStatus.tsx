import React from 'react';
import { ModerationStatus } from '@/store/user';

const statusMap: Record<
  ModerationStatus,
  { icon: React.ReactNode; text: string; color: string }
> = {
  pending: {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1226_1125)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.0038 0.998047C5.93991 0.998047 0.995972 5.93498 0.995972 11.9979C0.995972 18.0608 5.94091 23.0038 12.0038 23.0038C18.0668 23.0038 23.0017 18.0608 23.0017 11.9979C23.0017 5.93498 18.0668 0.998047 12.0038 0.998047ZM12.0038 2.99802C13.1862 2.99605 14.3573 3.2275 15.45 3.67911C16.5427 4.13072 17.5355 4.7936 18.3714 5.62974C19.2074 6.46588 19.87 7.45882 20.3214 8.55162C20.7728 9.64441 21.004 10.8156 21.0017 11.9979C21.0041 13.1806 20.773 14.3521 20.3218 15.4453C19.8705 16.5385 19.208 17.5318 18.3721 18.3685C17.5362 19.2051 16.5434 19.8686 15.4506 20.3208C14.3578 20.773 13.1865 21.0051 12.0038 21.0038C10.8207 21.0052 9.64882 20.7733 8.55541 20.3213C7.462 19.8692 6.4685 19.2059 5.63178 18.3694C4.79505 17.5328 4.13155 16.5395 3.67926 15.4462C3.22696 14.3529 2.99476 13.1811 2.99595 11.9979C2.99595 7.01597 7.0219 2.99802 12.0038 2.99802ZM11.9878 4.984C11.8557 4.98529 11.725 5.01278 11.6036 5.06487C11.4821 5.11696 11.3721 5.19262 11.2801 5.28747C11.188 5.38232 11.1157 5.49448 11.0672 5.61747C11.0188 5.74046 10.9952 5.87183 10.9978 6.00398V11.9979C10.9984 12.1295 11.0249 12.2597 11.0759 12.381C11.1268 12.5023 11.2013 12.6124 11.2948 12.7049L15.2948 16.7068C15.3873 16.8021 15.4979 16.8779 15.62 16.9299C15.7422 16.982 15.8734 17.0092 16.0062 17.0099C16.139 17.0107 16.2705 16.985 16.3933 16.9344C16.516 16.8837 16.6274 16.8092 16.721 16.715C16.8146 16.6209 16.8886 16.5091 16.9385 16.386C16.9884 16.263 17.0134 16.1313 17.0119 15.9985C17.0104 15.8658 16.9824 15.7347 16.9297 15.6128C16.877 15.491 16.8005 15.3809 16.7048 15.2889L12.9998 11.5839V6.00398C13.0025 5.86997 12.9782 5.73679 12.9284 5.61235C12.8786 5.48791 12.8043 5.37475 12.7099 5.2796C12.6155 5.18445 12.5029 5.10925 12.3789 5.05847C12.2548 5.00769 12.1219 4.98236 11.9878 4.984Z"
            fill="#EDC57C"
          />
        </g>
        <defs>
          <clipPath id="clip0_1226_1125">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    text: 'Карточка на модерации',
    color: 'text-[#FFD54F] border-[#FFD54F]',
  },
  approved: {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28">
        <circle cx="14" cy="14" r="13" fill="#7C87ED" />
        <path
          d="M9 15l4 4 6-8"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    text: 'Модерация пройдена',
    color: 'text-[#7C87ED] border-[#7C87ED]',
  },
  rejected: {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28">
        <circle cx="14" cy="14" r="13" fill="#E57373" />
        <path
          d="M9 9l10 10M19 9L9 19"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    text: 'Модерация не пройдена',
    color: 'text-[#E57373] border-[#E57373]',
  },
};

export default function ProfileModerationStatus({
  status,
  onClick,
}: {
  status: ModerationStatus;
  onClick?: () => void;
}) {
  const s = statusMap[status] || statusMap['pending'];
  const isStatus = status === 'rejected' || status === 'approved';
  return (
    <div
      className={`flex items-center gap-3 outline outline-[#363636] rounded-3xl border !px-4 !py-4 !mb-4 bg-[#140A0A] ${
        s.color
      } ${isStatus ? 'cursor-pointer hover:bg-[#2a1515]/60 transition' : ''}`}
      onClick={isStatus && onClick ? onClick : undefined}
    >
      <span>{s.icon}</span>
      <span className="font-medium text-base">{s.text}</span>
    </div>
  );
}
