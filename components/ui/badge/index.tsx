"use client";

import { cn } from "@/lib/utils";

export interface BadgeProps {
  count: number;
  className?: string;
}

export function Badge({ count, className }: BadgeProps) {
  if (count <= 0) return null;

  return (
    <span
      className={cn(
        "absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold text-white",
        className
      )}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}
