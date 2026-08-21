import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  showCount?: boolean;
  count?: number;
  className?: string;
}

export default function StarRating({
  rating,
  maxStars = 5,
  size = 14,
  showCount = false,
  count,
  className,
}: StarRatingProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxStars }).map((_, i) => {
          const filled = i < Math.floor(rating);
          const partial = !filled && i < rating;
          return (
            <div key={i} className="relative">
              <Star
                size={size}
                className="text-gray-200"
                fill="currentColor"
              />
              {(filled || partial) && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: filled ? '100%' : `${(rating % 1) * 100}%` }}
                >
                  <Star
                    size={size}
                    className="text-amber-400"
                    fill="currentColor"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showCount && count !== undefined && (
        <span className="text-xs text-[#8c7070]">({count})</span>
      )}
    </div>
  );
}
