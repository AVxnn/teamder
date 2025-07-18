import useTelegramWebApp from '@/hooks/useTelegramWebApp';
import CheckBenefits from '@/public/icons/CheckBenefits';
import Minus from '@/public/icons/Minus';
import { motion } from 'framer-motion';

type Benefit = {
  label: string;
  free: boolean;
  gold: boolean;
};

const benefits: Benefit[] = [
  { label: 'Поддержка разработчиков', free: false, gold: true },
  { label: 'Неограниченные лайки', free: false, gold: true },
  { label: 'Дискорд, Стим, Телеграм', free: false, gold: true },
];

export default function GoldBenefitsCard() {
  const { webApp: tgWebApp } = useTelegramWebApp();

  const handleBuy = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payments/create-invoice`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: 'stars',
          amount: 300, // в звездах
          telegramId: tgWebApp.initDataUnsafe.user?.id,
        }),
      },
    );

    const { invoiceUrl } = await response.json();

    tgWebApp.openTelegramLink(invoiceUrl); // или .openTelegramLink(invoiceUrl)
    tgWebApp.disableClosingConfirmation();
    window.Telegram.WebApp.close();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="rounded-3xl outline outline-[#363636] bg-[#140A0A] !mt-4 !px-4 !py-4 text-white w-full"
    >
      {/* Заголовок и кнопка */}
      <div className="flex items-center justify-between !mb-4">
        <div className="flex items-center gap-2 text-2xl font-semibold">
          <span>Teamder</span>
          <span className="bg-[#E7C88C] text-[#000000] text-sm font-bold !px-3 !py-1 rounded-full">
            GOLD
          </span>
        </div>
        <button
          onClick={() => handleBuy()}
          className="bg-indigo-400 text-white text-sm !px-4 !py-1 rounded-full hover:scale-105 transition-transform cursor-pointer"
        >
          Улучшить
        </button>
      </div>

      {/* Таблица преимуществ */}
      <div className="grid grid-cols-[1fr_auto_auto] gap-x-6 gap-y-2 text-sm">
        {/* Заголовки FREE / GOLD */}
        <div className="text-[#ffffff] text-[14px]">Преимущества</div>
        <div className="text-[#AFAFAF] text-[14px]">FREE</div>
        <div className="text-[#EDC57C] text-[14px]">GOLD</div>

        {/* Список преимуществ */}
        {benefits.map((benefit, i) => (
          <>
            <div key={i} className="text-[#AFAFAF] text-[12px]">
              {benefit.label}
            </div>
            <>
              <div className="flex justify-center">
                {benefit.free ? <CheckBenefits /> : <Minus />}
              </div>
              <div className="flex justify-center">
                {benefit.gold ? <CheckBenefits /> : <Minus />}
              </div>
            </>
          </>
        ))}
      </div>
    </motion.div>
  );
}
