"use client";

import Link from "next/link";
import { RatingStars } from "@/components/ui";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import { RESTAURANTS_NEAR_YOU } from "@/lib/mock-data";

export interface RestaurantsNearYouProps {
  /** Root class name */
  className?: string;
}

export function RestaurantsNearYou({ className }: RestaurantsNearYouProps) {
  return (
    <section className={cn("mx-auto max-w-7xl px-4 py-4 sm:py-6 sm:px-6 lg:px-8", className)}>
      {/* Section heading */}
      <div className="mb-3 flex items-center justify-between sm:mb-4">
        <h2 className="text-lg font-semibold text-foreground sm:text-xl">
          Restaurants Near You
        </h2>
        <button
          type="button"
          className="text-xs font-medium text-primary-600 hover:text-primary-700 sm:text-sm"
        >
          See all
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {RESTAURANTS_NEAR_YOU.map((restaurant) => (
          <Link
            key={restaurant.id}
            href={`/restaurant/${restaurant.id}`}
            className="group flex overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-shadow hover:shadow-md sm:flex-col"
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
              <span className="absolute bottom-1.5 right-1.5 hidden rounded-full bg-background/90 px-2 py-0.5 text-xs font-medium text-foreground sm:inline-block sm:bottom-2 sm:right-2">
                {restaurant.deliveryTime}
              </span>
            </div>

            {/* Info */}
            <div className="flex min-w-0 flex-1 flex-col justify-center p-3">
              <h3 className="truncate text-sm font-semibold text-foreground sm:text-base">
                {restaurant.name}
              </h3>
              <div className="mt-0.5 flex items-center gap-1.5 text-xs sm:mt-1 sm:gap-2 sm:text-sm">
                <RatingStars rating={restaurant.rating} size="sm" />
                <span className="text-foreground-muted">
                  ({restaurant.reviewCount})
                </span>
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
        ))}
      </div>
    </section>
  );
}
