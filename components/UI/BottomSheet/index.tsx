'use client';

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useAnimation,
  type Variants,
  type Transition,
} from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useDragControls } from 'framer-motion';
import Close from '@/public/icons/Close';

type BottomSheetProps = {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  removeBg?: boolean;
  removeX?: boolean;
  removeDrag?: boolean;
  disableAnimation?: boolean;
  customAnimation?: {
    backdrop?: Variants;
    sheet?: Variants;
    transition?: Transition;
  };
  titleClassName?: string;
  children: React.ReactNode;
};

const defaultAnimation: {
  backdrop: Variants;
  sheet: Variants;
  transition: Transition;
} = {
  backdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  sheet: {
    initial: { y: 500 },
    animate: { y: 0 },
    exit: { y: 500 },
  },
  transition: {
    type: 'spring',
    damping: 25,
    stiffness: 200,
  },
};

export default function BottomSheet({
  isOpen,
  onClose,
  title,
  removeBg,
  removeDrag,
  titleClassName,
  disableAnimation = false,
  customAnimation,
  removeX,
  children,
}: BottomSheetProps) {
  const y = useMotionValue(0);
  const controls = useAnimation();
  const dragControls = useDragControls();
  const sheetRef = useRef<HTMLDivElement>(null);

  // Мерджим кастомные анимации с дефолтными

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (
      sheetRef.current &&
      !sheetRef.current.contains(e.target as Node) &&
      !removeBg
    ) {
      onClose?.();
    }
  };

  useEffect(() => {
    if (disableAnimation) return;

    if (isOpen) {
      controls.start('animate');
    }
  }, [isOpen, controls, disableAnimation]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = async (_: any, info: any) => {
    if (disableAnimation) {
      onClose?.();
      return;
    }

    const offset = info.offset.y;
    const velocity = info.velocity.y;

    if (offset > 100 || velocity > 800) {
      await controls.start('exit');
      onClose?.();
    } else {
      controls.start('animate');
    }
  };

  const mergedAnimation = {
    backdrop: {
      ...defaultAnimation.backdrop,
      ...(customAnimation?.backdrop || {}),
    },
    sheet: {
      ...defaultAnimation.sheet,
      ...(customAnimation?.sheet || {}),
    },
    transition: {
      ...defaultAnimation.transition,
      ...(customAnimation?.transition || {}),
    },
  };

  // Пропсы для анимации
  const getAnimationProps = () => {
    if (disableAnimation) {
      return {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      };
    }

    return {
      initial: 'initial',
      animate: 'animate',
      exit: 'exit',
      variants: mergedAnimation.backdrop,
      transition: mergedAnimation.transition,
    };
  };

  const getSheetAnimationProps = () => {
    const dragDirection: 'y' | false = !removeDrag ? 'y' : false;

    const baseProps = {
      drag: dragDirection,
      dragConstraints: { top: 0, bottom: 0 },
      dragElastic: 0.2,
      dragListener: !disableAnimation && !removeDrag,
      dragControls,
      onDragEnd: disableAnimation ? undefined : handleDragEnd,
      ref: sheetRef,
    };

    if (disableAnimation) {
      return {
        ...baseProps,
        initial: { y: 0 },
        animate: { y: 0 },
        exit: { y: 0 },
        transition: { duration: 0 },
      };
    }

    return {
      ...baseProps,
      initial: 'initial',
      animate: controls,
      exit: 'exit',
      variants: mergedAnimation.sheet,
      transition: mergedAnimation.transition,
      style: { y },
    };
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center"
          {...getAnimationProps()}
          onMouseDown={handleBackdropClick}
        >
          {!removeBg && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          )}

          <motion.div
            className="relative z-10 max-w-[512px] w-full mx-auto bg-[#fff] dark:bg-[#140A0A] text-white rounded-t-[42px] outline outline-[#363636] shadow-xl before:content-[''] before:absolute before:bottom-[-256] before:left-0 before:w-full before:h-64 before:bg-[#140A0A]"
            {...getSheetAnimationProps()}
          >
            {!removeDrag && (
              <div
                className="cursor-grab active:cursor-grabbing"
                onPointerDown={(e) =>
                  !disableAnimation && dragControls.start(e)
                }
              >
                <div className="w-full flex justify-center !pt-3">
                  <div className="before:content-[''] before:block before:w-10 before:h-1.5 before:bg-gray-600 before:rounded-full" />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between !px-4 !py-4 border-b border-[#363636]">
              <h2 className={`text-lg font-semibold ${titleClassName}`}>
                {title}
              </h2>
              {!removeX && (
                <button
                  onClick={onClose}
                  className="!p-2 text-white hover:text-gray-400 cursor-pointer"
                >
                  <Close fill={'#afafaf'} className="w-6 h-6" />
                </button>
              )}
            </div>

            <div className="!px-6 !pb-8 max-h-[70vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
