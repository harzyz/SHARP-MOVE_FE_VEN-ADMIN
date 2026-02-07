"use client";

import { use } from "react";
import Link from "next/link";
import { useOrders } from "@/contexts";
import { OrderStatusTimeline } from "./order-status-timeline";
import { TrackingOrderItems } from "./tracking-order-items";
import { OrderDetailsCard } from "./order-details-card";

export interface OrderTrackingViewProps {
  params: Promise<{ id: string }>;
}

export function OrderTrackingView({ params }: OrderTrackingViewProps) {
  const { id } = use(params);
  const { getOrder } = useOrders();
  const order = getOrder(id);

  if (!order) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-foreground-muted">
        Order not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      {/* Back link */}
      <Link
        href="/orders"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-foreground-muted transition-colors hover:text-foreground sm:mb-6"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="size-4">
          <path
            fillRule="evenodd"
            d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
            clipRule="evenodd"
          />
        </svg>
        Back to Orders
      </Link>

      <h1 className="mb-4 text-xl font-bold text-foreground sm:mb-6 sm:text-2xl">
        Order #{order.id}
      </h1>

      <div className="grid gap-4 lg:grid-cols-[1fr_380px] lg:gap-6">
        {/* Left column */}
        <div className="space-y-4">
          <OrderStatusTimeline
            currentStatus={order.status}
            estimatedDelivery={order.estimatedDelivery}
          />
          <TrackingOrderItems items={order.items} />
        </div>

        {/* Right column */}
        <OrderDetailsCard order={order} />
      </div>
    </div>
  );
}
