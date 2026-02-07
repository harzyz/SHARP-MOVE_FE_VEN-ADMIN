"use client";

import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types/ordering";

const STATUS_CONFIG: Record<OrderStatus, { label: string; classes: string }> = {
  pending: { label: "Pending", classes: "bg-neutral-100 text-neutral-700" },
  confirmed: { label: "Confirmed", classes: "bg-blue-100 text-blue-700" },
  preparing: { label: "Preparing", classes: "bg-amber-100 text-amber-700" },
  "on-the-way": { label: "On the Way", classes: "bg-primary-100 text-primary-800" },
  delivered: { label: "Delivered", classes: "bg-green-100 text-green-700" },
};

export interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        config.classes,
        className
      )}
    >
      {config.label}
    </span>
  );
}
