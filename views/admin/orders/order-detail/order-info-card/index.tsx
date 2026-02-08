import { StatusBadge } from "@/components/ui";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { AdminOrder } from "@/types";

interface OrderInfoCardProps {
  order: AdminOrder;
}

const statusColorMap: Record<string, "success" | "warning" | "error" | "info" | "neutral"> = {
  pending: "neutral",
  confirmed: "info",
  preparing: "warning",
  ready: "info",
  picked_up: "info",
  on_the_way: "info",
  delivered: "success",
  cancelled: "error",
  disputed: "error",
  refunded: "neutral",
};

export function OrderInfoCard({ order }: OrderInfoCardProps) {
  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold text-foreground">Order {order.orderNumber}</h2>
          <p className="mt-0.5 text-xs text-foreground-muted">
            Placed {formatDate(order.placedAt, { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge label={order.status.replace(/_/g, " ")} colorScheme={statusColorMap[order.status] || "neutral"} />
          {order.priority !== "normal" && (
            <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-amber-700">
              {order.priority}
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div>
          <p className="text-xs text-foreground-muted">Customer</p>
          <p className="text-sm font-medium text-foreground">{order.customerName}</p>
        </div>
        <div>
          <p className="text-xs text-foreground-muted">Vendor</p>
          <p className="text-sm font-medium text-foreground">{order.vendorName}</p>
        </div>
        <div>
          <p className="text-xs text-foreground-muted">Rider</p>
          <p className="text-sm font-medium text-foreground">{order.riderName || "Unassigned"}</p>
        </div>
        <div>
          <p className="text-xs text-foreground-muted">Payment</p>
          <p className="text-sm font-medium capitalize text-foreground">{order.paymentMethod} / {order.paymentStatus}</p>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-xs text-foreground-muted">Delivery Address</p>
        <p className="text-sm text-foreground">{order.deliveryAddress}</p>
      </div>

      {order.specialInstructions && (
        <div className="mt-3">
          <p className="text-xs text-foreground-muted">Special Instructions</p>
          <p className="text-sm italic text-foreground">{order.specialInstructions}</p>
        </div>
      )}

      {order.adminNotes && (
        <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-3">
          <p className="text-xs font-semibold text-amber-700">Admin Notes</p>
          <p className="mt-0.5 text-xs text-amber-600 whitespace-pre-line">{order.adminNotes}</p>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <div className="text-xs text-foreground-muted">
          <p>Subtotal: {formatCurrency(order.subtotal)}</p>
          <p>Delivery: {formatCurrency(order.deliveryFee)} | Service: {formatCurrency(order.serviceFee)}</p>
          {order.discount > 0 && <p>Discount: -{formatCurrency(order.discount)}</p>}
        </div>
        <p className="text-lg font-bold text-foreground">{formatCurrency(order.total)}</p>
      </div>
    </div>
  );
}
