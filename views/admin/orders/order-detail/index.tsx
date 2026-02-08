"use client";

import { use } from "react";
import Link from "next/link";
import { useAdminOrders } from "@/contexts";
import { OrderInfoCard } from "./order-info-card";
import { OrderItemsSection } from "./order-items-section";
import { OrderTimelineSection } from "./order-timeline-section";
import { OrderInterventionPanel } from "./order-intervention-panel";
import { OrderDisputeSection } from "./order-dispute-section";

interface AdminOrderDetailViewProps {
  params: Promise<{ orderId: string }>;
}

export function AdminOrderDetailView({ params }: AdminOrderDetailViewProps) {
  const { orderId } = use(params);
  const {
    getOrder,
    getOrderTimeline,
    disputes,
    updateOrderStatus,
    addAdminNote,
    escalateOrder,
    issueRefund,
    resolveDispute,
  } = useAdminOrders();

  const order = getOrder(orderId);
  const timeline = getOrderTimeline(orderId);
  const dispute = disputes.find((d) => d.orderId === orderId);

  if (!order) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <p className="text-sm text-foreground-muted">Order not found</p>
        <Link href="/admin/orders" className="mt-2 text-sm text-primary hover:underline">
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      {/* Back link */}
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-1 text-sm text-foreground-muted hover:text-foreground"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back to Orders
      </Link>

      <div className="mt-4 grid gap-5 lg:grid-cols-3">
        {/* Left column: Info + Items + Timeline */}
        <div className="space-y-5 lg:col-span-2">
          <OrderInfoCard order={order} />
          <OrderItemsSection items={order.items} />
          <OrderTimelineSection events={timeline} />
        </div>

        {/* Right column: Actions + Dispute */}
        <div className="space-y-5">
          <OrderInterventionPanel
            order={order}
            onUpdateStatus={(status) => updateOrderStatus(orderId, status)}
            onAddNote={(note) => addAdminNote(orderId, note)}
            onEscalate={() => escalateOrder(orderId)}
            onIssueRefund={() => issueRefund(orderId)}
          />
          <OrderDisputeSection
            dispute={dispute}
            onResolve={resolveDispute}
          />
        </div>
      </div>
    </div>
  );
}
