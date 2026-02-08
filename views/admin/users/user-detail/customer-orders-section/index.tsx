import { DataTable, StatusBadge, type DataTableColumn } from "@/components/ui";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import type { CustomerOrderHistory } from "@/types";

interface CustomerOrdersSectionProps {
  orders: CustomerOrderHistory[];
}

const statusColorMap: Record<string, "success" | "warning" | "error" | "info" | "neutral"> = {
  delivered: "success",
  on_the_way: "info",
  preparing: "warning",
  cancelled: "error",
  pending: "neutral",
};

export function CustomerOrdersSection({ orders }: CustomerOrdersSectionProps) {
  const columns: DataTableColumn<CustomerOrderHistory>[] = [
    {
      key: "orderNumber",
      header: "Order",
      render: (o) => <span className="font-medium">{o.orderNumber}</span>,
    },
    {
      key: "vendor",
      header: "Vendor",
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
        <StatusBadge label={o.status.replace(/_/g, " ")} colorScheme={statusColorMap[o.status] || "neutral"} />
      ),
    },
    {
      key: "date",
      header: "Date",
      className: "hidden sm:table-cell",
      render: (o) => formatRelativeTime(o.placedAt),
    },
  ];

  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
      <h3 className="text-sm font-semibold text-foreground">Order History</h3>
      <div className="mt-3">
        {orders.length === 0 ? (
          <p className="py-4 text-center text-sm text-foreground-muted">No order history available</p>
        ) : (
          <DataTable
            columns={columns}
            data={orders}
            keyExtractor={(o) => o.orderId}
            emptyMessage="No orders"
          />
        )}
      </div>
    </div>
  );
}
