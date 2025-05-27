import Like from '@/public/icons/Like';
import Plus from '@/public/icons/Plus';
import Star from '@/public/icons/Star';
import { motion } from 'framer-motion';

type LikeStatsProps = {
  likes: number;
  superLikes: number;
  onLikeClick?: () => void;
  onSuperLikeClick?: () => void;
};

export default function ProfileSlider({
  likes,
  superLikes,
  onLikeClick,
  onSuperLikeClick,
}: LikeStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex gap-4 !mt-4"
    >
      {/* Лайки */}
      <div className="flex items-center relative justify-between !px-4 !py-3 bg-[#140A0A] outline outline-[#363636] rounded-[24px] active:scale-105 w-full text-white">
        <div className="flex flex-col gap-3">
          <Like />
          <span className="text-[14px]">Осталось: {likes} Лайков</span>
        </div>
        <button
          onClick={onLikeClick}
          className="absolute top-4 right-4 text-white"
        >
          <Plus />
        </button>
      </div>

      {/* Суперлайки */}
      <div className="flex items-center relative justify-between !px-4 !py-3 bg-[#140A0A] outline outline-[#363636] rounded-[24px] active:scale-105 w-full text-white">
        <div className="flex flex-col gap-3">
          <Star />
          <span className="text-[14px]">Осталось: {superLikes} СЛайков</span>
        </div>
        <button
          onClick={onSuperLikeClick}
          className="absolute top-4 right-4 text-white"
        >
          <Plus />
        </button>
      </div>
    </motion.div>
  );
}
