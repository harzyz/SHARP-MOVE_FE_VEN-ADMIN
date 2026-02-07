"use client";

import Link from "next/link";
import { SharpmoveButton } from "@/components/ui/sharpmove-button";
import { cn } from "@/lib/utils";

export interface RiderPromotionProps {
  className?: string;
}

export function RiderPromotion({ className }: RiderPromotionProps) {
  return (
    <section
      id="rider-signup"
      className={cn(
        "border-t border-border bg-background py-16 sm:py-24",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-background-muted">
              <div className="flex size-full items-center justify-center text-foreground-muted">
                <span className="text-sm">Rider image</span>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Become a Sharp Move Rider
            </h2>
            <p className="mt-4 text-lg text-foreground-muted">
              Deliver and earn.
            </p>
            <ul className="mt-6 space-y-3 text-foreground-muted">
              <li className="flex items-center gap-2">
                <span
                  className="size-2 rounded-full bg-primary-500"
                  aria-hidden
                />
                Flexible hours
              </li>
              <li className="flex items-center gap-2">
                <span
                  className="size-2 rounded-full bg-primary-500"
                  aria-hidden
                />
                Good earnings
              </li>
              <li className="flex items-center gap-2">
                <span
                  className="size-2 rounded-full bg-primary-500"
                  aria-hidden
                />
                Be your own boss
              </li>
            </ul>
            <Link href="#rider-signup" className="mt-8 inline-block">
              <SharpmoveButton colorScheme="primary" size="lg">
                Sign up to ride
              </SharpmoveButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
