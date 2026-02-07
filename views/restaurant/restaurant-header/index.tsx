"use client";

import Link from "next/link";
import { RatingStars } from "@/components/ui";
import { cn, formatCurrency } from "@/lib/utils";
import type { Restaurant } from "@/lib/mock-data";

export interface RestaurantHeaderProps {
  restaurant: Restaurant;
  className?: string;
}

export function RestaurantHeader({ restaurant, className }: RestaurantHeaderProps) {
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
