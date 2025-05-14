'use client';
import { createContext, useContext, useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

type AnimationDirection = 'left' | 'right' | 'up' | 'down' | 'fade' | 'none';

interface AnimationContextType {
  direction: AnimationDirection;
  currentPath: string;
  nextPath: string | null;
  isInitialLoad: boolean;
  startTransition: (to: string, direction: AnimationDirection) => void;
  completeTransition: () => void;
}

const AnimationContext = createContext<AnimationContextType>({
  direction: 'none',
  currentPath: '/',
  nextPath: null,
  isInitialLoad: true,
  startTransition: () => {},
  completeTransition: () => {},
});

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const currentPath = usePathname();
  const [direction, setDirection] = useState<AnimationDirection>('none');
  const [nextPath, setNextPath] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const prevPath = useRef(currentPath);

  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  const startTransition = (to: string, dir: AnimationDirection) => {
    setDirection(dir);
    setNextPath(to);
    prevPath.current = currentPath;
  };

  const completeTransition = () => {
    setDirection('none');
    setNextPath(null);
  };

  return (
    <AnimationContext.Provider
      value={{
        direction,
        currentPath,
        nextPath,
        isInitialLoad,
        startTransition,
        completeTransition,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

export const useAnimation = () => useContext(AnimationContext);
