'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';
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
  hoursPlayed: number;
  wins: number;
  losses: number;
  discordLink: string;
  steamLink: string;
  cardImage: string; // base64 или URL
};

export default function CreateCardPage() {
  const snap = useSnapshot(userStore);
  const router = useRouter();
  const [step, setStep] = useState<Step>('rules');

  const [formData, setFormData] = useState<FormData>({
    telegramId: 0,
    nickname: '',
    about: '',
    lookingFor: '',
    steamId: '',
    rating: 0,
    hoursPlayed: 0,
    wins: 0,
    losses: 0,
    discordLink: '',
    steamLink: '',
    cardImage: '',
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = async () => {
    const currentIndex = steps.indexOf(step);

    if (step === 'step3') {
      try {
        if (snap?.user?.id) {
          const response = await axios.post(
            'http://localhost:3002/api/profile/create',
            { ...formData, telegramId: snap.user.id },
          );
          if (response.data.success) {
            console.log('✅ Карточка создана');
            router.push('/');
          } else {
            console.error('⚠️ Ошибка создания:', response.data.error);
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
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) setStep(steps[currentIndex - 1]);
  };

  const renderStep = () => {
    switch (step) {
      case 'rules':
        return <RulesModal nextStep={nextStep} key="rules" />;
      case 'step1':
        return (
          <CreateCardFirst
            key="step1"
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            handleChange={handleChange}
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
          />
        );
      // другие шаги — аналогично
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto bg-gradient-to-tr from-[#0F0505] to-[#310F0F] h-screen overflow-hidden relative flex justify-center">
      <TeamderHeader />
      <AnimatePresence mode="wait">
        <TDImage
          src={
            step === 'step3'
              ? '/img/illustrations/fight.png'
              : step === 'step1'
              ? '/img/illustrations/fire.png'
              : step === 'step2'
              ? '/img/illustrations/night.png'
              : '/img/illustrations/rules.png'
          }
          alt="Rules"
          className="rounded-[42px] !mt-[96px] object-cover !mb-6 w-full !mx-6 max-w-[480px] max-h-[280px]"
        />
        {renderStep()}
      </AnimatePresence>
    </div>
  );
}
