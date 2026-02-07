"use client";

import { cn, formatCurrency, formatDate, capitalize } from "@/lib/utils";
import type { OrderSummary } from "@/types/ordering";
import { OrderStatusBadge } from "@/views/orders/order-status-badge";

export interface OrderDetailsCardProps {
  order: OrderSummary;
  className?: string;
}

export function OrderDetailsCard({ order, className }: OrderDetailsCardProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-background p-4 sm:p-5", className)}>
      <h3 className="mb-4 text-sm font-semibold text-foreground sm:text-base">
        Order Details
      </h3>

      <dl className="space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-foreground-muted">Order ID</dt>
          <dd className="font-medium text-foreground">#{order.id}</dd>
        </div>

        <div className="flex justify-between">
          <dt className="text-foreground-muted">Status</dt>
          <dd><OrderStatusBadge status={order.status} /></dd>
        </div>

        <div className="flex justify-between">
          <dt className="text-foreground-muted">Restaurant</dt>
          <dd className="text-right font-medium text-foreground">{order.restaurantName}</dd>
        </div>

        <div className="flex justify-between gap-4">
          <dt className="shrink-0 text-foreground-muted">Address</dt>
          <dd className="text-right text-foreground">{order.deliveryAddress}</dd>
        </div>

        {order.deliveryInstructions && (
          <div className="flex justify-between gap-4">
            <dt className="shrink-0 text-foreground-muted">Instructions</dt>
            <dd className="text-right text-foreground">{order.deliveryInstructions}</dd>
          </div>
        )}

        <div className="flex justify-between">
          <dt className="text-foreground-muted">Payment</dt>
          <dd className="font-medium text-foreground">{capitalize(order.paymentMethod)}</dd>
        </div>

        <div className="flex justify-between">
          <dt className="text-foreground-muted">Placed</dt>
          <dd className="text-foreground">
            {formatDate(order.placedAt, { dateStyle: "medium", timeStyle: "short" })}
          </dd>
        </div>

        {/* Price breakdown */}
        <div className="border-t border-border pt-3 space-y-2">
          <div className="flex justify-between text-foreground-muted">
            <span>Subtotal</span>
            <span>{formatCurrency(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-foreground-muted">
            <span>Delivery Fee</span>
            <span>{formatCurrency(order.deliveryFee)}</span>
          </div>
          <div className="flex justify-between text-foreground-muted">
            <span>Service Fee</span>
            <span>{formatCurrency(order.serviceFee)}</span>
          </div>
          <div className="flex justify-between pt-1 font-bold text-foreground">
            <span>Total</span>
            <span>{formatCurrency(order.total)}</span>
          </div>
        </div>
      </dl>
    </div>
  );
}
