import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export const StarRating = ({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onChange,
}: StarRatingProps) => {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxRating }).map((_, index) => {
        const filled = index < Math.floor(rating);
        const partial = index === Math.floor(rating) && rating % 1 !== 0;

        return (
          <button
            key={index}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(index + 1)}
            className={cn(
              "relative",
              interactive && "cursor-pointer hover:scale-110 transition-transform"
            )}
          >
            <Star
              className={cn(
                sizes[size],
                filled
                  ? "fill-google-yellow text-google-yellow"
                  : "fill-muted text-muted"
              )}
            />
            {partial && (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${(rating % 1) * 100}%` }}
              >
                <Star
                  className={cn(sizes[size], "fill-google-yellow text-google-yellow")}
                />
              </div>
            )}
          </button>
        );
      })}
      {rating > 0 && (
        <span className="ml-1 text-sm text-muted-foreground">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};
