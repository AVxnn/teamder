import React from 'react';

// Иконки можно заменить на ваши SVG или импортировать
const icons = {
  waiting: (
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
  like: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.538 1.5C15.1845 1.5 13.1295 2.919 12 4.773C10.8705 2.919 8.8155 1.5 6.462 1.5C2.892 1.5 0 4.3485 0 7.863C0 9.6225 0.702 11.232 1.8465 12.4095C4.4445 15.081 12 22.5 12 22.5C12 22.5 19.5555 15.081 22.1535 12.4095C23.3384 11.1928 24.001 9.56131 24 7.863C24 4.3485 21.108 1.5 17.538 1.5Z"
        fill="#7C87ED"
      />
    </svg>
  ),
  superlike: (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.8334 10.9418C23.9417 10.4001 23.5084 9.7501 22.9667 9.7501L16.7917 8.88343L13.9751 3.2501C13.8667 3.03343 13.7584 2.9251 13.5417 2.81676C13.0001 2.49176 12.3501 2.70843 12.0251 3.2501L9.31675 8.88343L3.14175 9.7501C2.81675 9.7501 2.60008 9.85843 2.49175 10.0751C2.05841 10.5084 2.05841 11.1584 2.49175 11.5918L6.93341 15.9251L5.85008 22.1001C5.85008 22.3168 5.85008 22.5334 5.95841 22.7501C6.28341 23.2918 6.93341 23.5084 7.47508 23.1834L13.0001 20.2584L18.5251 23.1834C18.6334 23.2918 18.8501 23.2918 19.0667 23.2918C19.1751 23.2918 19.1751 23.2918 19.2834 23.2918C19.8251 23.1834 20.2584 22.6418 20.1501 21.9918L19.0667 15.8168L23.5084 11.4834C23.7251 11.3751 23.8334 11.1584 23.8334 10.9418Z"
        fill="#EDC57C"
      />
    </svg>
  ),
  'moderation-fail': (
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
  'moderation-success': (
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
};

const bgMap: Record<string, string> = {
  waiting: 'bg-gradient-to-r from-green-700/80 to-green-500/60',
  like: 'bg-gradient-to-r from-[#2a1515] to-[#a94a4a]',
  superlike: 'bg-gradient-to-r from-[#2a1e15] to-[#a98d4a]',
  'moderation-fail': 'bg-gradient-to-r from-[#2a1515] to-[#a94a4a]',
  'moderation-success': 'bg-gradient-to-r from-[#18152a] to-[#7C87ED]',
};

export type NotificationType =
  | 'waiting'
  | 'like'
  | 'superlike'
  | 'moderation-success'
  | 'moderation-fail';

interface NotificationCardProps {
  type: NotificationType;
  user?: { name: string; avatar: string };
  title: string;
  message?: string;
}

export default function NotificationCard({
  type,
  user,
  title,
  message,
}: NotificationCardProps) {
  return (
    <div
      className={`flex items-center rounded-3xl outline outline-[#363636] !px-4 !py-3 !mb-3 ${bgMap[type]} relative`}
    >
      {user ? (
        <img
          src={user.avatar}
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover !mr-4 border-2 border-[#363636]"
        />
      ) : (
        <div className="w-12 h-12 !mr-4" />
      )}
      <div className="flex-1 min-w-0">
        <div className="text-base font-semibold text-white truncate">
          {user ? user.name : title}
        </div>
        <div
          className={`text-sm ${
            type.startsWith('moderation') ? 'font-semibold' : ''
          } text-white/80 truncate`}
        >
          {user ? title : message}
        </div>
        {!user && !message && (
          <div className="text-sm text-white/80 truncate">{title}</div>
        )}
      </div>
      <div className="!ml-4 flex-shrink-0">{icons[type]}</div>
    </div>
  );
}
