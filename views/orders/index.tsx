"use client";

import { useOrders } from "@/contexts";
import { OrderCard } from "./order-card";
import { EmptyOrders } from "./empty-orders";

export function OrdersView() {
  const { orders } = useOrders();

  if (orders.length === 0) {
    return <EmptyOrders />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <h1 className="mb-4 text-xl font-bold text-foreground sm:mb-6 sm:text-2xl">
        My Orders
      </h1>
      <div className="space-y-3">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
