import Close from '@/public/icons/Close';
import Like from '@/public/icons/Like';
import Star from '@/public/icons/Star';
import { motion } from 'framer-motion';

export function ActionButtons({
  onDislike,
  onSuperLike,
  onLike,
}: {
  onDislike: () => void;
  onSuperLike: () => void;
  onLike: () => void;
}) {
  return (
    <div className="flex justify-center gap-4 !pt-[360px] !pb-2">
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onDislike}
        className="w-16 h-16 rounded-[48px] outline outline-[#363636] flex items-center justify-center bg-[#140A0A] hover:scale-110 active:scale-110 transition-transform cursor-pointer"
      >
        <Close />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onSuperLike}
        className="w-12 h-12 rounded-[48px] outline outline-[#363636] flex items-center justify-center bg-[#140A0A] hover:scale-110 active:scale-110 transition-transform cursor-pointer"
      >
        <Star />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onLike}
        className="w-16 h-16 rounded-[48px] outline outline-[#363636] flex items-center justify-center bg-[#140A0A] hover:scale-110 active:scale-110 transition-transform cursor-pointer"
      >
        <Like />
      </motion.div>
    </div>
  );
}
