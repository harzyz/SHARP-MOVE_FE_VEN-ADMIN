"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SharpmoveButton } from "@/components/ui";
import { useCart } from "@/contexts";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import type { OrderSummary } from "@/types/ordering";
import { OrderStatusBadge } from "../order-status-badge";

export interface OrderCardProps {
  order: OrderSummary;
  className?: string;
}

export function OrderCard({ order, className }: OrderCardProps) {
  const { addItem } = useCart();
  const router = useRouter();

  const itemsSummary = order.items
    .map((i) => i.menuItem.name)
    .join(", ");

  const handleReorder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    for (const item of order.items) {
      addItem(item.menuItem, item.quantity);
    }
    router.push("/cart");
  };

  return (
    <Link
      href={`/orders/${order.id}`}
      className={cn(
        "flex gap-3 rounded-xl border border-border bg-background p-3 transition-shadow hover:shadow-md sm:p-4",
        className
      )}
    >
      {/* Restaurant initial */}
      <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-background-muted text-lg font-bold text-foreground-muted">
        {order.restaurantName.charAt(0)}
      </div>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate text-sm font-semibold text-foreground sm:text-base">
            {order.restaurantName}
          </h3>
          <OrderStatusBadge status={order.status} />
        </div>

        <p className="mt-0.5 truncate text-xs text-foreground-muted">
          {itemsSummary}
        </p>

        <div className="mt-1.5 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-foreground-muted">
            <span className="font-medium text-foreground">
              {formatCurrency(order.total)}
            </span>
            <span>
              {formatDate(order.placedAt, { dateStyle: "medium" })}
            </span>
          </div>

          {order.status === "delivered" && (
            <SharpmoveButton
              size="sm"
              variant="soft"
              colorScheme="primary"
              onClick={handleReorder}
            >
              Reorder
            </SharpmoveButton>
          )}
        </div>
      </div>
    </Link>
  );
}
