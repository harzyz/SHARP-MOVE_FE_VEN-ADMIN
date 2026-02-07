"use client";

import { SharpmoveButton } from "@/components/ui";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDate } from "@/lib/utils";
import { RECENT_ORDERS } from "@/lib/mock-data";

export interface QuickReorderProps {
  /** Root class name */
  className?: string;
}

export function QuickReorder({ className }: QuickReorderProps) {
  if (RECENT_ORDERS.length === 0) return null;

  return (
    <section className={cn("mx-auto max-w-7xl px-4 py-4 sm:py-6 sm:px-6 lg:px-8", className)}>
      {/* Section heading */}
      <div className="mb-3 sm:mb-4">
        <h2 className="text-lg font-semibold text-foreground sm:text-xl">Quick Reorder</h2>
        <p className="mt-0.5 text-xs text-foreground-muted sm:text-sm">Your recent orders</p>
      </div>

      {/* Horizontal scroll */}
      <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-2 snap-x sm:gap-4">
        {RECENT_ORDERS.map((order) => (
          <div
            key={order.id}
            className="flex min-w-[230px] shrink-0 snap-start gap-3 rounded-xl border border-border bg-background p-3 sm:min-w-[260px] sm:p-4"
          >
            {/* Image placeholder */}
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-background-muted text-xs text-foreground-muted">
              {order.restaurantName.charAt(0)}
            </div>

            {/* Details */}
            <div className="flex min-w-0 flex-1 flex-col">
              <h3 className="truncate text-sm font-medium text-foreground">
                {order.restaurantName}
              </h3>
              <p className="truncate text-xs text-foreground-muted">
                {order.items}
              </p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">
                  {formatCurrency(order.total)}
                </span>
                <span className="text-xs text-foreground-muted">
                  {formatDate(order.date)}
                </span>
              </div>
              <SharpmoveButton
                size="sm"
                variant="soft"
                colorScheme="primary"
                className="mt-2 self-start"
              >
                Reorder
              </SharpmoveButton>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
