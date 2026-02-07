"use client";

import { SharpmoveInput } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface DeliveryAddressProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function DeliveryAddress({ value, onChange, className }: DeliveryAddressProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-background p-4", className)}>
      <h3 className="mb-3 text-sm font-semibold text-foreground sm:text-base">
        Delivery Address
      </h3>
      <SharpmoveInput
        label="Address"
        placeholder=" "
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
