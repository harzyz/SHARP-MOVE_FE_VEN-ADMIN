"use client";

import { cn } from "@/lib/utils";
import { PROMO_BANNERS } from "@/lib/mock-data";

export interface PromoBannersProps {
  /** Root class name */
  className?: string;
}

export function PromoBanners({ className }: PromoBannersProps) {
  return (
    <section className={cn("mx-auto max-w-7xl px-4 pb-2 sm:px-6 lg:px-8", className)}>
      <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory sm:gap-4">
        {PROMO_BANNERS.map((banner) => (
          <div
            key={banner.id}
            className={cn(
              "relative min-w-[240px] shrink-0 snap-start rounded-xl p-4 sm:min-w-[320px] sm:rounded-2xl sm:p-6",
              banner.bgColor,
              banner.textColor
            )}
          >
            {banner.badgeText && (
              <span className="mb-2 inline-block rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-semibold text-foreground sm:mb-3 sm:px-2.5 sm:text-xs">
                {banner.badgeText}
              </span>
            )}
            <h3 className="text-base font-bold sm:text-xl">{banner.title}</h3>
            <p className="mt-0.5 text-xs opacity-80 sm:mt-1 sm:text-sm">{banner.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
