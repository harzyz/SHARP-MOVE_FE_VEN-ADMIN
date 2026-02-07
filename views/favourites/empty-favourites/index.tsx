"use client";

import Link from "next/link";
import { SharpmoveButton } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface EmptyFavouritesProps {
  className?: string;
}

export function EmptyFavourites({ className }: EmptyFavouritesProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-20 text-center", className)}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="mb-4 size-16 text-foreground-muted/50"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      <h2 className="text-lg font-semibold text-foreground">No favourites yet</h2>
      <p className="mt-1 text-sm text-foreground-muted">
        Tap the heart on restaurants you love to save them here.
      </p>
      <Link href="/explore" className="mt-6">
        <SharpmoveButton colorScheme="primary">Browse Restaurants</SharpmoveButton>
      </Link>
    </div>
  );
}
