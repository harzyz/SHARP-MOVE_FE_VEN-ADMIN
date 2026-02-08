"use client";

import { useState, useMemo, useCallback } from "react";
import { useVendorOrders } from "@/contexts";
import type { VendorOrderStatus } from "@/types";
import { OrderTabs } from "./order-tabs";
import { VendorOrderCard } from "./vendor-order-card";
import { OrderDetailModal } from "./order-detail-modal";

export function OrdersView() {
  const {
    orders,
    newOrders,
    preparingOrders,
    readyOrders,
    completedOrders,
    cancelledOrders,
    acceptOrder,
    markReady,
    completeOrder,
    cancelOrder,
    getOrder,
  } = useVendorOrders();

  const [activeTab, setActiveTab] = useState<VendorOrderStatus | "all">("new");
  const [detailOrderId, setDetailOrderId] = useState<string | null>(null);

  const counts = useMemo(
    () => ({
      all: orders.length,
      new: newOrders.length,
      preparing: preparingOrders.length,
      ready: readyOrders.length,
      completed: completedOrders.length,
      cancelled: cancelledOrders.length,
    }),
    [orders, newOrders, preparingOrders, readyOrders, completedOrders, cancelledOrders]
  );

  const filteredOrders = useMemo(() => {
    switch (activeTab) {
      case "new":
        return newOrders;
      case "preparing":
        return preparingOrders;
      case "ready":
        return readyOrders;
      case "completed":
        return completedOrders;
      case "cancelled":
        return cancelledOrders;
      default:
        return orders;
    }
  }, [activeTab, orders, newOrders, preparingOrders, readyOrders, completedOrders, cancelledOrders]);

  const handleCancel = useCallback(
    (id: string) => cancelOrder(id, "Declined by vendor"),
    [cancelOrder]
  );

  const detailOrder = detailOrderId ? getOrder(detailOrderId) : undefined;

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-foreground">Orders</h1>
      <p className="mt-1 text-sm text-foreground-muted">
        Manage incoming and active orders
      </p>

      {/* Tabs */}
      <div className="mt-4">
        <OrderTabs activeTab={activeTab} onTabChange={setActiveTab} counts={counts} />
      </div>

      {/* Order List */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {filteredOrders.map((order) => (
          <VendorOrderCard
            key={order.id}
            order={order}
            onAccept={acceptOrder}
            onMarkReady={markReady}
            onComplete={completeOrder}
            onCancel={handleCancel}
            onViewDetails={setDetailOrderId}
          />
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-sm text-foreground-muted">No orders in this category</p>
        </div>
      )}

      {/* Detail Modal */}
      <OrderDetailModal
        order={detailOrder}
        open={detailOrderId !== null}
        onClose={() => setDetailOrderId(null)}
        onAccept={acceptOrder}
        onMarkReady={markReady}
        onComplete={completeOrder}
        onCancel={handleCancel}
      />
    </div>
  );
}
