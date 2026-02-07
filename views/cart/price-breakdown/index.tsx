"use client";

import Link from "next/link";
import { SharpmoveButton } from "@/components/ui";
import { cn, formatCurrency } from "@/lib/utils";

export interface PriceBreakdownProps {
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  className?: string;
}

export function PriceBreakdown({
  subtotal,
  deliveryFee,
  serviceFee,
  className,
}: PriceBreakdownProps) {
  const total = subtotal + deliveryFee + serviceFee;

  return (
    <div className={cn("rounded-xl border border-border bg-background p-4", className)}>
      <h3 className="mb-3 text-sm font-semibold text-foreground sm:text-base">
        Price Summary
      </h3>

      <div className="space-y-2 text-sm">
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
        <div className="border-t border-border pt-2">
          <div className="flex justify-between font-bold text-foreground">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      <Link href="/checkout" className="mt-4 block">
        <SharpmoveButton colorScheme="primary" className="w-full">
          Proceed to Checkout · {formatCurrency(total)}
        </SharpmoveButton>
      </Link>
    </div>
  );
}
