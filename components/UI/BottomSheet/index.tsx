'use client';

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useAnimation,
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
  titleClassName?: string;
  children: React.ReactNode;
};

export default function BottomSheet({
  isOpen,
  onClose,
  title,
  removeBg,
  removeDrag,
  titleClassName,
  removeX,
  children,
}: BottomSheetProps) {
  const y = useMotionValue(0);
  const controls = useAnimation();
  const dragControls = useDragControls();
  const sheetRef = useRef<HTMLDivElement>(null);

  // Закрытие по клику вне области
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (
      sheetRef.current &&
      !sheetRef.current.contains(e.target as Node) &&
      !removeBg
    ) {
      onClose();
    }
  };

  // Анимация при открытии
  useEffect(() => {
    if (isOpen) {
      controls.start({
        y: 0,
        transition: { type: 'spring', damping: 25, stiffness: 200 },
      });
    }
  }, [isOpen, controls]);

  // Обработка свайпа вниз
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = async (_: any, info: any) => {
    const offset = info.offset.y;
    const velocity = info.velocity.y;

    if (offset > 100 || velocity > 800) {
      await controls.start({ y: 500, transition: { duration: 0.2 } });
      onClose();
    } else {
      controls.start({
        y: 0,
        transition: { type: 'spring', damping: 25, stiffness: 200 },
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={handleBackdropClick}
        >
          {!removeBg ? (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          ) : null}

          <motion.div
            className="relative z-10 max-w-[512px] w-full mx-auto bg-[#140A0A] text-white rounded-t-[42px] outline outline-[#363636] shadow-xl before:content-[''] before:absolute before:bottom-[-256] before:left-0 before:w-full before:h-64 before:bg-[#140A0A]"
            ref={sheetRef}
            drag={!removeDrag ? 'y' : null}
            dragListener={false}
            dragControls={dragControls}
            style={{ y }}
            animate={controls}
            initial={{ y: 500 }}
            exit={{ y: 500, transition: { duration: 0.2 } }}
            onDragEnd={handleDragEnd}
            dragElastic={0.2}
            dragConstraints={{ top: 0, bottom: 0 }}
          >
            {/* Перетаскиваемая зона */}
            {!removeDrag ? (
              <div
                className="cursor-grab active:cursor-grabbing"
                onPointerDown={(e) => dragControls.start(e)}
              >
                <div className="w-full flex justify-center !pt-3">
                  <div className="before:content-[''] before:block before:w-10 before:h-1.5 before:bg-gray-600 before:rounded-full" />
                </div>
              </div>
            ) : null}

            {/* Заголовок и кнопка закрытия */}
            <div className="flex items-center justify-between !px-4 !py-4 border-b border-[#363636]">
              <h2 className={`text-lg font-semibold ${titleClassName}`}>
                {title}
              </h2>
              {!removeX ? (
                <button
                  onClick={onClose}
                  className="!p-2 text-white hover:text-gray-400 cursor-pointer"
                >
                  <Close fill={'#afafaf'} className="w-6 h-6" />
                </button>
              ) : null}
            </div>

            {/* Контент */}
            <div className="!px-6 !pb-8 max-h-[70vh] overflow-y-auto">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
