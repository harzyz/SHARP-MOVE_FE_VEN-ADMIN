"use client";

import { cn } from "@/lib/utils";
import type { PaymentMethod } from "@/types/ordering";

const METHODS: { id: PaymentMethod; label: string; description: string }[] = [
  { id: "card", label: "Card", description: "Pay with debit/credit card" },
  { id: "transfer", label: "Bank Transfer", description: "Pay via bank transfer" },
  { id: "wallet", label: "Wallet", description: "Pay from your wallet balance" },
  { id: "cash", label: "Cash", description: "Pay on delivery" },
];

export interface PaymentMethodPickerProps {
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
  className?: string;
}

export function PaymentMethodPicker({
  selected,
  onSelect,
  className,
}: PaymentMethodPickerProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-background p-4", className)}>
      <h3 className="mb-3 text-sm font-semibold text-foreground sm:text-base">
        Payment Method
      </h3>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {METHODS.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => onSelect(method.id)}
            className={cn(
              "rounded-lg border p-3 text-left transition-colors",
              selected === method.id
                ? "border-primary-500 bg-primary-50 ring-1 ring-primary-500"
                : "border-border hover:border-primary-300"
            )}
          >
            <span className="block text-sm font-medium text-foreground">
              {method.label}
            </span>
            <span className="mt-0.5 block text-xs text-foreground-muted">
              {method.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
