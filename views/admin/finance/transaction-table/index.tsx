"use client";

import { DataTable, StatusBadge, type DataTableColumn } from "@/components/ui";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import type { PlatformTransaction } from "@/types";

interface TransactionTableProps {
  transactions: PlatformTransaction[];
}

const typeLabels: Record<PlatformTransaction["type"], string> = {
  order_payment: "Order Payment",
  vendor_payout: "Vendor Payout",
  rider_payout: "Rider Payout",
  refund: "Refund",
  commission: "Commission",
  promo_cost: "Promo Cost",
};

const statusColorMap: Record<PlatformTransaction["status"], "success" | "warning" | "error"> = {
  completed: "success",
  pending: "warning",
  failed: "error",
};

export function TransactionTable({ transactions }: TransactionTableProps) {
  const columns: DataTableColumn<PlatformTransaction>[] = [
    {
      key: "type",
      header: "Type",
      render: (t) => (
        <div className="flex items-center gap-2">
          <span
            className={`inline-block size-2 shrink-0 rounded-full ${
              t.direction === "inflow" ? "bg-green-500" : "bg-red-500"
            }`}
          />
          <span className="font-medium">{typeLabels[t.type]}</span>
        </div>
      ),
    },
    {
      key: "description",
      header: "Description",
      className: "hidden sm:table-cell",
      render: (t) => (
        <span className="text-foreground-muted">{t.description}</span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (t) => (
        <span
          className={
            t.direction === "inflow"
              ? "font-medium text-green-600"
              : "font-medium text-red-500"
          }
        >
          {t.direction === "inflow" ? "+" : "-"}
          {formatCurrency(t.amount)}
        </span>
      ),
    },
    {
      key: "entity",
      header: "Entity",
      className: "hidden lg:table-cell",
      render: (t) => t.entityName || "\u2014",
    },
    {
      key: "time",
      header: "Time",
      className: "hidden sm:table-cell",
      render: (t) => formatRelativeTime(t.timestamp),
    },
    {
      key: "status",
      header: "Status",
      render: (t) => (
        <StatusBadge
          label={t.status}
          colorScheme={statusColorMap[t.status]}
        />
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={transactions}
      keyExtractor={(t) => t.id}
      emptyMessage="No transactions found"
    />
  );
}
