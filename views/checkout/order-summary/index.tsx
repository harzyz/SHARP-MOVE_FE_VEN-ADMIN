"use client";

import { useState } from "react";
import { cn, formatCurrency } from "@/lib/utils";
import { useCart } from "@/contexts";

export interface OrderSummaryProps {
  deliveryFee: number;
  className?: string;
}

export function OrderSummary({ deliveryFee, className }: OrderSummaryProps) {
  const { items, subtotal, serviceFee } = useCart();
  const [expanded, setExpanded] = useState(false);
  const total = subtotal + deliveryFee + serviceFee;

  return (
    <div className={cn("rounded-xl border border-border bg-background p-4", className)}>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between"
      >
        <h3 className="text-sm font-semibold text-foreground sm:text-base">
          Order Summary ({items.length} {items.length === 1 ? "item" : "items"})
        </h3>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className={cn(
            "size-5 text-foreground-muted transition-transform",
            expanded && "rotate-180"
          )}
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {expanded && (
        <div className="mt-3 space-y-2 border-t border-border pt-3">
          {items.map((item) => (
            <div key={item.menuItem.id} className="flex justify-between text-sm">
              <span className="text-foreground-muted">
                {item.quantity}x {item.menuItem.name}
              </span>
              <span className="text-foreground">
                {formatCurrency(item.menuItem.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-3 space-y-2 border-t border-border pt-3 text-sm">
        <div className="flex justify-between text-foreground-muted">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-foreground-muted">
          <span>Delivery Fee</span>
          <span>{formatCurrency(deliveryFee)}</span>
        </div>
        <div className="flex justify-between text-foreground-muted">
          <span>Service Fee</span>
          <span>{formatCurrency(serviceFee)}</span>
        </div>
        <div className="flex justify-between pt-1 font-bold text-foreground">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}
