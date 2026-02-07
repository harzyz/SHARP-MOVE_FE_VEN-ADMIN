"use client";

import { cn, formatCurrency } from "@/lib/utils";
import type { CartItem } from "@/types/ordering";

export interface TrackingOrderItemsProps {
  items: CartItem[];
  className?: string;
}

export function TrackingOrderItems({ items, className }: TrackingOrderItemsProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-background p-4 sm:p-5", className)}>
      <h3 className="mb-3 text-sm font-semibold text-foreground sm:text-base">
        Items
      </h3>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.menuItem.id} className="flex items-center justify-between text-sm">
            <span className="text-foreground-muted">
              {item.quantity}x {item.menuItem.name}
            </span>
            <span className="font-medium text-foreground">
              {formatCurrency(item.menuItem.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
