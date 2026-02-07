"use client";

import Link from "next/link";
import { RatingStars } from "@/components/ui";
import { useFavourites } from "@/contexts";
import { cn, formatCurrency } from "@/lib/utils";
import type { Restaurant } from "@/lib/mock-data";

export interface FavouriteCardProps {
  restaurant: Restaurant;
  className?: string;
}

export function FavouriteCard({ restaurant, className }: FavouriteCardProps) {
  const { toggleFavourite } = useFavourites();

  return (
    <Link
      href={`/restaurant/${restaurant.id}`}
      className={cn(
        "group relative flex overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-shadow hover:shadow-md sm:flex-col",
        className
      )}
    >
      {/* Image placeholder */}
      <div className="relative w-28 shrink-0 bg-background-muted sm:w-full sm:aspect-[16/10]">
        <div className="flex size-full items-center justify-center text-xs text-foreground-muted sm:text-sm">
          {restaurant.name}
        </div>
        {!restaurant.isOpen && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/50">
            <span className="rounded-full bg-background px-2 py-0.5 text-xs font-medium text-foreground sm:px-3 sm:py-1 sm:text-sm">
              Closed
            </span>
          </div>
        )}
      </div>

      {/* Heart button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavourite(restaurant.id);
        }}
        className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white/80 transition-colors hover:bg-white"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 text-red-500">
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
      </button>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col justify-center p-3">
        <h3 className="truncate text-sm font-semibold text-foreground sm:text-base">
          {restaurant.name}
        </h3>
        <div className="mt-0.5 flex items-center gap-1.5 text-xs sm:mt-1 sm:gap-2 sm:text-sm">
          <RatingStars rating={restaurant.rating} size="sm" />
          <span className="text-foreground-muted">({restaurant.reviewCount})</span>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-1 text-xs text-foreground-muted sm:mt-1.5">
          <span>{restaurant.cuisines.join(" \u00B7 ")}</span>
          <span>\u00B7</span>
          <span>{restaurant.deliveryTime}</span>
          <span className="hidden sm:inline">\u00B7</span>
          <span className="hidden sm:inline">Delivery {formatCurrency(restaurant.deliveryFee)}</span>
        </div>
        <span className="mt-0.5 text-xs text-foreground-muted sm:hidden">
          Delivery {formatCurrency(restaurant.deliveryFee)}
        </span>
      </div>
    </Link>
  );
}
