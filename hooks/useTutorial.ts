import { useRouter } from 'next/navigation';

export const useTutorial = () => {
  const router = useRouter();

  const checkTutorial = () => {
    const isTutorialCompleted = localStorage.getItem('tutorial') === 'true';

    if (!isTutorialCompleted) {
      router.push('/tutorial');
    }
  };

  return { checkTutorial };
};
