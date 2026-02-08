"use client";

import { DataTable, StatusBadge, type DataTableColumn } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";
import type { RiderPayout } from "@/types";

interface RiderPayoutsProps {
  payouts: RiderPayout[];
}

const payoutStatusColorMap: Record<string, "success" | "warning" | "error" | "info" | "neutral"> = {
  pending: "warning",
  processing: "info",
  completed: "success",
  failed: "error",
};

export function RiderPayouts({ payouts }: RiderPayoutsProps) {
  const columns: DataTableColumn<RiderPayout>[] = [
    {
      key: "riderName",
      header: "Rider Name",
      render: (p) => (
        <p className="text-sm font-medium">{p.riderName}</p>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (p) => formatCurrency(p.amount),
    },
    {
      key: "deliveries",
      header: "Deliveries",
      className: "hidden sm:table-cell",
      render: (p) => p.deliveries.toLocaleString(),
    },
    {
      key: "period",
      header: "Period",
      className: "hidden sm:table-cell",
      render: (p) => p.period,
    },
    {
      key: "status",
      header: "Status",
      render: (p) => (
        <StatusBadge
          label={p.status.charAt(0).toUpperCase() + p.status.slice(1)}
          colorScheme={payoutStatusColorMap[p.status] || "neutral"}
        />
      ),
    },
  ];

  return (
    <div className="rounded-xl border border-border bg-background shadow-xs">
      <DataTable
        columns={columns}
        data={payouts}
        keyExtractor={(p) => p.id}
        emptyMessage="No payouts recorded yet"
      />
    </div>
  );
}
