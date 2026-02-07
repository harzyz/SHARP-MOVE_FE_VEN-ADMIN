"use client";

import Link from "next/link";
import { SharpmoveButton } from "@/components/ui/sharpmove-button";
import { cn } from "@/lib/utils";

export interface RestaurantPartnershipProps {
  className?: string;
}

export function RestaurantPartnership({
  className,
}: RestaurantPartnershipProps) {
  return (
    <section
      id="vendor-signup"
      className={cn(
        "border-t border-border bg-background-subtle py-16 sm:py-24",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            Partner your restaurant with Sharp Move
          </h2>
          <p className="mt-4 text-lg text-foreground-muted">
            Grow your business.
          </p>
          <ul className="mt-6 space-y-2 text-foreground-muted">
            <li>Reach more customers</li>
            <li>Increase your sales</li>
            <li>Reliable delivery network</li>
          </ul>
          <Link href="#vendor-signup" className="mt-8 inline-block">
            <SharpmoveButton colorScheme="primary" size="lg">
              Register your restaurant
            </SharpmoveButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
