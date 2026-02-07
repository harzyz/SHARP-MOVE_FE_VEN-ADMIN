"use client";

import Link from "next/link";
import { RatingStars } from "@/components/ui";
import { useFavourites } from "@/contexts";
import { cn, formatCurrency } from "@/lib/utils";
import type { Restaurant } from "@/lib/mock-data";

export interface RestaurantHeaderProps {
  restaurant: Restaurant;
  className?: string;
}

export function RestaurantHeader({ restaurant, className }: RestaurantHeaderProps) {
  const { isFavourite, toggleFavourite } = useFavourites();
  const fav = isFavourite(restaurant.id);

  return (
    <section className={cn("mx-auto max-w-7xl px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8", className)}>
      {/* Back link */}
      <Link
        href="/explore"
        className="mb-3 inline-flex items-center gap-1.5 text-sm text-foreground-muted transition-colors hover:text-foreground sm:mb-4"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
          <path
            fillRule="evenodd"
            d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
            clipRule="evenodd"
          />
        </svg>
        Back
      </Link>

      {/* Restaurant info */}
      <div className="flex items-start gap-4">
        {/* Placeholder image */}
        <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-background-muted text-2xl font-bold text-foreground-muted sm:size-20">
          {restaurant.name.charAt(0)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h1 className="truncate text-xl font-bold text-foreground sm:text-2xl">
              {restaurant.name}
            </h1>
            <span
              className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold sm:text-xs",
                restaurant.isOpen
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              )}
            >
              {restaurant.isOpen ? "Open" : "Closed"}
            </span>
            <button
              type="button"
              onClick={() => toggleFavourite(restaurant.id)}
              className="ml-auto shrink-0"
            >
              {fav ? (
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 text-red-500">
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-6 text-foreground-muted">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              )}
            </button>
          </div>

          <p className="mt-0.5 text-xs text-foreground-muted sm:text-sm">
            {restaurant.cuisines.join(" · ")}
          </p>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground-muted sm:text-sm">
            <span className="inline-flex items-center gap-1">
              <RatingStars rating={restaurant.rating} size="sm" />
              <span className="font-medium text-foreground">{restaurant.rating}</span>
              ({restaurant.reviewCount})
            </span>
            <span>{restaurant.deliveryTime}</span>
            <span>Delivery {formatCurrency(restaurant.deliveryFee)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
