"use client";

import { cn } from "@/lib/utils";

export interface DeliveryInstructionsProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function DeliveryInstructions({ value, onChange, className }: DeliveryInstructionsProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-background p-4", className)}>
      <h3 className="mb-3 text-sm font-semibold text-foreground sm:text-base">
        Delivery Instructions
      </h3>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Gate code, landmark, floor number..."
        rows={3}
        className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
      />
    </div>
  );
}
