"use client";

import { Modal, StatusBadge, SharpmoveButton } from "@/components/ui";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import type { VendorOrder, VendorOrderStatus } from "@/types";

interface OrderDetailModalProps {
  order: VendorOrder | undefined;
  open: boolean;
  onClose: () => void;
  onAccept?: (id: string) => void;
  onMarkReady?: (id: string) => void;
  onComplete?: (id: string) => void;
  onCancel?: (id: string) => void;
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

interface TimelineEntry {
  label: string;
  time: string | undefined;
}

function getTimeline(order: VendorOrder): TimelineEntry[] {
  const entries: TimelineEntry[] = [
    { label: "Placed", time: order.placedAt },
  ];
  if (order.acceptedAt) entries.push({ label: "Accepted", time: order.acceptedAt });
  if (order.prepStartedAt) entries.push({ label: "Prep Started", time: order.prepStartedAt });
  if (order.readyAt) entries.push({ label: "Ready", time: order.readyAt });
  if (order.completedAt) entries.push({ label: "Completed", time: order.completedAt });
  if (order.cancelledAt) entries.push({ label: "Cancelled", time: order.cancelledAt });
  return entries;
}

export function OrderDetailModal({
  order,
  open,
  onClose,
  onAccept,
  onMarkReady,
  onComplete,
  onCancel,
}: OrderDetailModalProps) {
  if (!order) return null;

  const badge = statusBadgeConfig[order.status];
  const timeline = getTimeline(order);

  return (
    <Modal open={open} onClose={onClose}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-foreground">{order.orderNumber}</h2>
          <StatusBadge label={badge.label} colorScheme={badge.colorScheme} />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-foreground-muted hover:bg-neutral-100"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Customer Info */}
      <div className="mt-4 rounded-lg border border-border p-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">Customer</h3>
        <p className="mt-1 text-sm font-medium text-foreground">{order.customerName}</p>
        <p className="text-xs text-foreground-muted">{order.customerPhone}</p>
        <p className="mt-1 text-xs text-foreground-muted">{order.deliveryAddress}</p>
        <p className="mt-1 text-xs text-foreground-muted">
          Payment: <span className="capitalize">{order.paymentMethod}</span>
        </p>
      </div>

      {/* Timeline */}
      <div className="mt-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">Timeline</h3>
        <div className="mt-2 space-y-2">
          {timeline.map((entry) => (
            <div key={entry.label} className="flex items-center justify-between text-sm">
              <span className="text-foreground">{entry.label}</span>
              <span className="text-foreground-muted">
                {entry.time ? formatRelativeTime(entry.time) : "—"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Cancel Reason */}
      {order.cancelReason && (
        <div className="mt-3 rounded-lg border border-error-200 bg-error-50 p-3">
          <p className="text-xs font-medium text-error-700">Reason: {order.cancelReason}</p>
        </div>
      )}

      {/* Items */}
      <div className="mt-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">Items</h3>
        <div className="mt-2 divide-y divide-border">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-start justify-between py-2">
              <div className="min-w-0 flex-1">
                <p className="text-sm text-foreground">
                  {item.quantity}x {item.name}
                </p>
                {item.modifiers && item.modifiers.length > 0 && (
                  <p className="text-xs text-foreground-muted">{item.modifiers.join(", ")}</p>
                )}
                {item.specialInstructions && (
                  <p className="text-xs italic text-warning-600">{item.specialInstructions}</p>
                )}
              </div>
              <span className="ml-3 shrink-0 text-sm font-medium text-foreground">
                {formatCurrency(item.unitPrice * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Special Instructions */}
      {order.specialInstructions && (
        <div className="mt-3 rounded-lg border border-warning-200 bg-warning-50 p-3">
          <h4 className="text-xs font-semibold text-warning-700">Special Instructions</h4>
          <p className="mt-0.5 text-sm text-warning-800">{order.specialInstructions}</p>
        </div>
      )}

      {/* Price Breakdown */}
      <div className="mt-4 space-y-1 border-t border-border pt-3">
        <div className="flex justify-between text-sm">
          <span className="text-foreground-muted">Subtotal</span>
          <span className="text-foreground">{formatCurrency(order.subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-foreground-muted">Delivery Fee</span>
          <span className="text-foreground">{formatCurrency(order.deliveryFee)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-foreground-muted">Service Fee</span>
          <span className="text-foreground">{formatCurrency(order.serviceFee)}</span>
        </div>
        <div className="flex justify-between text-sm font-bold">
          <span className="text-foreground">Total</span>
          <span className="text-foreground">{formatCurrency(order.total)}</span>
        </div>
      </div>

      {/* Actions */}
      {(order.status === "new" || order.status === "preparing" || order.status === "ready") && (
        <div className="mt-5 flex flex-wrap gap-2">
          {order.status === "new" && (
            <>
              <SharpmoveButton
                colorScheme="success"
                fullWidth
                onClick={() => {
                  onAccept?.(order.id);
                  onClose();
                }}
              >
                Accept Order
              </SharpmoveButton>
              <SharpmoveButton
                variant="outline"
                colorScheme="error"
                fullWidth
                onClick={() => {
                  onCancel?.(order.id);
                  onClose();
                }}
              >
                Decline Order
              </SharpmoveButton>
            </>
          )}
          {order.status === "preparing" && (
            <SharpmoveButton
              colorScheme="primary"
              fullWidth
              onClick={() => {
                onMarkReady?.(order.id);
                onClose();
              }}
            >
              Mark as Ready
            </SharpmoveButton>
          )}
          {order.status === "ready" && (
            <SharpmoveButton
              colorScheme="success"
              fullWidth
              onClick={() => {
                onComplete?.(order.id);
                onClose();
              }}
            >
              Mark as Completed
            </SharpmoveButton>
          )}
        </div>
      )}
    </Modal>
  );
}
