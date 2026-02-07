"use client";

import { cn } from "@/lib/utils";

export interface RatingStarsProps {
  /** Rating value 0-5 */
  rating: number;
  /** Max stars to show */
  max?: number;
  /** Size */
  size?: "sm" | "md";
  /** Root class name */
  className?: string;
}

const sizeMap = {
  sm: "size-3.5",
  md: "size-4.5",
} as const;

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function RatingStars({
  rating,
  max = 5,
  size = "sm",
  className,
}: RatingStarsProps) {
  const iconSize = sizeMap[size];

  return (
    <span className={cn("inline-flex items-center gap-0.5", className)}>
      {Array.from({ length: max }, (_, i) => (
        <StarIcon
          key={i}
          className={cn(
            iconSize,
            i < Math.round(rating)
              ? "text-secondary-500"
              : "text-neutral-300"
          )}
        />
      ))}
      <span className="ml-1 text-sm font-medium text-foreground">
        {rating.toFixed(1)}
      </span>
    </span>
  );
}

RatingStars.displayName = "RatingStars";

export { RatingStars };
