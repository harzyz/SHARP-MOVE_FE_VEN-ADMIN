"use client";

import { useRouter } from "next/navigation";
import { DataTable, StatusBadge, type DataTableColumn } from "@/components/ui";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { AdminOrder } from "@/types";

interface OrderTableProps {
  orders: AdminOrder[];
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

const priorityStyles: Record<string, string> = {
  normal: "",
  high: "text-amber-600 font-medium",
  urgent: "text-red-600 font-bold",
};

export function OrderTable({ orders }: OrderTableProps) {
  const router = useRouter();

  const columns: DataTableColumn<AdminOrder>[] = [
    {
      key: "orderNumber",
      header: "Order",
      render: (o) => (
        <div>
          <span className="font-medium">{o.orderNumber}</span>
          {o.priority !== "normal" && (
            <span className={cn("ml-1.5 text-[10px] uppercase", priorityStyles[o.priority])}>
              {o.priority}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      render: (o) => o.customerName,
    },
    {
      key: "vendor",
      header: "Vendor",
      className: "hidden sm:table-cell",
      render: (o) => o.vendorName,
    },
    {
      key: "total",
      header: "Total",
      render: (o) => formatCurrency(o.total),
    },
    {
      key: "status",
      header: "Status",
      render: (o) => (
        <div className="flex items-center gap-1.5">
          <StatusBadge label={o.status.replace(/_/g, " ")} colorScheme={statusColorMap[o.status] || "neutral"} />
          {o.isDisputed && (
            <span className="rounded bg-red-100 px-1 py-0.5 text-[9px] font-bold text-red-700">
              DISPUTE
            </span>
          )}
        </div>
      ),
    },
    {
      key: "payment",
      header: "Payment",
      className: "hidden lg:table-cell",
      render: (o) => (
        <span className="text-xs capitalize">{o.paymentMethod} / {o.paymentStatus}</span>
      ),
    },
    {
      key: "time",
      header: "Placed",
      className: "hidden sm:table-cell",
      render: (o) => formatRelativeTime(o.placedAt),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={orders}
      keyExtractor={(o) => o.id}
      onRowClick={(o) => router.push(`/admin/orders/${o.id}`)}
      emptyMessage="No orders found"
    />
  );
}
