"use client";

import { useMemo } from "react";
import { StatusBadge, SharpmoveButton } from "@/components/ui";
import { cn, formatCurrency, formatRelativeTime } from "@/lib/utils";
import type { VendorOrder, VendorOrderStatus } from "@/types";

interface VendorOrderCardProps {
  order: VendorOrder;
  onAccept?: (id: string) => void;
  onMarkReady?: (id: string) => void;
  onComplete?: (id: string) => void;
  onCancel?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

const statusBadgeConfig: Record<
  VendorOrderStatus,
  { label: string; colorScheme: "info" | "warning" | "success" | "error" | "neutral" }
> = {
  new: { label: "New", colorScheme: "info" },
  preparing: { label: "Preparing", colorScheme: "warning" },
  ready: { label: "Ready", colorScheme: "success" },
  completed: { label: "Completed", colorScheme: "neutral" },
  cancelled: { label: "Cancelled", colorScheme: "error" },
};

export function VendorOrderCard({
  order,
  onAccept,
  onMarkReady,
  onComplete,
  onCancel,
  onViewDetails,
}: VendorOrderCardProps) {
  const badge = statusBadgeConfig[order.status];

  const itemsSummary = useMemo(() => {
    if (order.items.length <= 2) {
      return order.items.map((i) => `${i.quantity}x ${i.name}`).join(", ");
    }
    const first = order.items.slice(0, 2).map((i) => `${i.quantity}x ${i.name}`).join(", ");
    return `${first} +${order.items.length - 2} more`;
  }, [order.items]);

  return (
    <div
      className={cn(
        "rounded-xl border bg-background p-4 shadow-xs transition-colors",
        order.status === "new" ? "border-info-300 bg-info-50/30" : "border-border"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-foreground">{order.orderNumber}</span>
          <StatusBadge label={badge.label} colorScheme={badge.colorScheme} />
        </div>
        <span className="text-xs text-foreground-muted">{formatRelativeTime(order.placedAt)}</span>
      </div>

      {/* Customer */}
      <p className="mt-2 text-sm text-foreground">{order.customerName}</p>

      {/* Items */}
      <p className="mt-1 text-sm text-foreground-muted">{itemsSummary}</p>

      {/* Special Instructions */}
      {order.specialInstructions && (
        <p className="mt-1 text-xs italic text-warning-600">
          Note: {order.specialInstructions}
        </p>
      )}

      {/* Total & Prep Time */}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">{formatCurrency(order.total)}</span>
        <span className="text-xs text-foreground-muted">~{order.estimatedPrepTime} min</span>
      </div>

      {/* Actions */}
      <div className="mt-3 flex flex-wrap gap-2">
        {order.status === "new" && (
          <>
            <SharpmoveButton size="sm" colorScheme="success" onClick={() => onAccept?.(order.id)}>
              Accept
            </SharpmoveButton>
            <SharpmoveButton size="sm" variant="outline" colorScheme="error" onClick={() => onCancel?.(order.id)}>
              Decline
            </SharpmoveButton>
          </>
        )}
        {order.status === "preparing" && (
          <SharpmoveButton size="sm" colorScheme="primary" onClick={() => onMarkReady?.(order.id)}>
            Mark Ready
          </SharpmoveButton>
        )}
        {order.status === "ready" && (
          <SharpmoveButton size="sm" colorScheme="success" onClick={() => onComplete?.(order.id)}>
            Complete
          </SharpmoveButton>
        )}
        <SharpmoveButton
          size="sm"
          variant="ghost"
          colorScheme="neutral"
          onClick={() => onViewDetails?.(order.id)}
        >
          View Details
        </SharpmoveButton>
      </div>
    </div>
  );
}
