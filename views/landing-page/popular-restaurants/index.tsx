"use client";

import Link from "next/link";
import { SharpmoveButton } from "@/components/ui/sharpmove-button";
import { cn } from "@/lib/utils";

export interface PopularRestaurant {
  id: string;
  name: string;
  category?: string;
  imageUrl?: string;
}

const PLACEHOLDER_RESTAURANTS: PopularRestaurant[] = [
  { id: "1", name: "Fast Food", category: "Category" },
  { id: "2", name: "African", category: "Category" },
  { id: "3", name: "Drinks", category: "Category" },
  { id: "4", name: "Desserts", category: "Category" },
  { id: "5", name: "Partner 1", category: "Restaurant" },
  { id: "6", name: "Partner 2", category: "Restaurant" },
];

export interface PopularRestaurantsProps {
  /** Optional list to override placeholder data */
  items?: PopularRestaurant[];
  className?: string;
}

export function PopularRestaurants({
  items = PLACEHOLDER_RESTAURANTS,
  className,
}: PopularRestaurantsProps) {
  return (
    <section
      className={cn(
        "border-t border-border bg-background py-16 sm:py-24",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Order from your favourite restaurants
            </h2>
            <p className="mt-2 text-lg text-foreground-muted">
              Popular categories.
            </p>
          </div>
          <Link href="#all-restaurants" className="shrink-0">
            <SharpmoveButton variant="outline" colorScheme="primary" size="sm">
              View All
            </SharpmoveButton>
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`#restaurant-${item.id}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background-muted/50 transition-colors hover:border-primary-300 hover:bg-primary-50/50 dark:hover:border-primary-600 dark:hover:bg-primary-950/50"
            >
              <div className="aspect-square w-full bg-background-muted">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-foreground-muted">
                    <span className="text-xs">{item.category ?? "Image"}</span>
                  </div>
                )}
              </div>
              <p className="p-3 text-center text-sm font-medium text-foreground group-hover:text-primary-700 dark:group-hover:text-primary-300">
                {item.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
