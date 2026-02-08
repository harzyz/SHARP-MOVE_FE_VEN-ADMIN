"use client";

import { formatCurrency } from "@/lib/utils";
import type { PopularItem } from "@/types";

interface PopularItemsProps {
  items: PopularItem[];
}

export function PopularItems({ items }: PopularItemsProps) {
  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs">
      <h3 className="text-sm font-semibold text-foreground">Top Selling Items</h3>
      <div className="mt-3 divide-y divide-border">
        {items.map((item, index) => (
          <div key={item.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{item.name}</p>
              <p className="text-xs text-foreground-muted">{item.ordersCount} orders</p>
            </div>
            <span className="text-sm font-semibold text-foreground">
              {formatCurrency(item.revenue)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
