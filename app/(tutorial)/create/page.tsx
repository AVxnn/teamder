'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { userStore } from '@/store/user';
import RulesModal from '@/components/sheets/rulesSheet';
import CreateCardFirst from '@/components/sheets/сreateCardFirst';
import TeamderHeader from '@/components/headers/teamderHeader';
import TDImage from '@/components/UI/TDImage';
import CreateCardSecond from '@/components/sheets/сreateCardSecond';
import сreateCardThird from '@/components/sheets/сreateCardThird';
import { useRouter } from 'next/navigation';

const steps = ['rules', 'step1', 'step2', 'step3', 'preview'] as const;
type Step = (typeof steps)[number];

type FormData = {
  telegramId: number;
  nickname: string;
  about: string;
  lookingFor: string;
  steamId: string;
  rating: number;
  preferredRoles: string[];
  preferredHeroes: string[];
  discordLink: string;
  steamLink: string;
  cardImage: string;
};

// Конфигурация анимации для изображений
const imageVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 200 : -200,
    opacity: 0,
  }),
};

export default function CreateCardPage() {
  const snap = useSnapshot(userStore);
  const router = useRouter();
  const [step, setStep] = useState<Step>('rules');
  const [direction, setDirection] = useState(1); // 1 - вперед, -1 - назад

  const [formData, setFormData] = useState<FormData>({
    telegramId: 0,
    nickname: '',
    about: '',
    lookingFor: '',
    steamId: '',
    rating: 0,
    preferredRoles: [],
    preferredHeroes: [],
    discordLink: '',
    steamLink: '',
    cardImage: '',
  });

  const handleChange = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const nextStep = async () => {
    setDirection(1); // Устанавливаем направление вперед
    const currentIndex = steps.indexOf(step);

    if (step === 'step3') {
      try {
        if (snap?.user?.id) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/profile/create`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ ...formData, telegramId: snap.user.id }),
            },
          );
          const data = await response.json();
          if (data.success) {
            console.log('✅ Карточка создана');
            userStore.user.profile = data.profile;
            router.push('/');
          } else {
            console.error('⚠️ Ошибка создания:', data.error);
            router.push('/');
          }
        }
      } catch (err) {
        console.error('❌ Ошибка при запросе:', err);
        router.push('/');
      }
      return;
    }

    if (currentIndex < steps.length - 1) setStep(steps[currentIndex + 1]);
  };

  const prevStep = () => {
    setDirection(-1); // Устанавливаем направление назад
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) setStep(steps[currentIndex - 1]);
  };

  const getImageForStep = (step: Step) => {
    switch (step) {
      case 'step3':
        return {
          src: '/img/illustrations/fight.png',
          className:
            'rounded-[42px] !mt-[80px] !mx-auto object-cover overflow-hidden !mb-6 max-w-[480px] h-full max-h-[220px]',
        };
      case 'step1':
        return {
          src: '/img/illustrations/nightfire.png',
          className:
            'rounded-[42px] !mt-[80px] !mx-auto object-cover overflow-hidden !mb-6 max-w-[480px] h-full max-h-[130px]',
        };
      case 'step2':
        return {
          src: '/img/illustrations/night.png',
          className:
            'rounded-[42px] !mt-[80px] !mx-auto object-cover overflow-hidden !mb-6 !mx-6 max-w-[480px] h-full max-h-[80px]',
        };
      default:
        return {
          src: '/img/illustrations/rules.png',
          className:
            'rounded-[42px] !mt-[80px] !mx-auto object-cover overflow-hidden !mb-6 max-w-[480px] h-full max-h-[210px]',
        };
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'rules':
        return (
          <RulesModal
            stepDirection={direction}
            nextStep={nextStep}
            key="rules"
          />
        );
      case 'step1':
        return (
          <CreateCardFirst
            key="step1"
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            handleChange={handleChange}
            stepDirection={direction}
          />
        );
      case 'step2':
        return (
          <CreateCardSecond
            key="step2"
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            handleChange={handleChange}
            stepDirection={direction}
          />
        );
      case 'step3':
        return (
          <сreateCardThird
            key="step3"
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            handleChange={handleChange}
            stepDirection={direction}
          />
        );
      default:
        return null;
    }
  };

  const imageData = getImageForStep(step);

  return (
    <div className="mx-auto bg-gradient-to-tr from-[#0F0505] to-[#310F0F] h-screen overflow-hidden relative flex justify-center">
      <TeamderHeader />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'tween', ease: 'easeInOut', duration: 0.2 }}
          className="w-full !mx-6"
        >
          <TDImage
            src={imageData.src}
            alt="Rules"
            className={imageData.className}
          />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
    </div>
  );
}
