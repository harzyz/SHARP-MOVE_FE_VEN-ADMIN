"use client";

import { DataTable, StatusBadge, type DataTableColumn } from "@/components/ui";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import type { VendorPayoutSummary } from "@/types";

interface VendorPayoutsProps {
  payouts: VendorPayoutSummary[];
}

const statusColorMap: Record<VendorPayoutSummary["status"], "success" | "warning" | "error" | "info"> = {
  completed: "success",
  processing: "info",
  pending: "warning",
  failed: "error",
};

export function VendorPayouts({ payouts }: VendorPayoutsProps) {
  const columns: DataTableColumn<VendorPayoutSummary>[] = [
    {
      key: "vendorName",
      header: "Vendor",
      render: (p) => <span className="font-medium">{p.vendorName}</span>,
    },
    {
      key: "amount",
      header: "Amount",
      render: (p) => formatCurrency(p.amount),
    },
    {
      key: "ordersCount",
      header: "Orders",
      render: (p) => p.ordersCount.toLocaleString(),
    },
    {
      key: "commissionDeducted",
      header: "Commission",
      className: "hidden sm:table-cell",
      render: (p) => formatCurrency(p.commissionDeducted),
    },
    {
      key: "period",
      header: "Period",
      className: "hidden lg:table-cell",
      render: (p) => p.period,
    },
    {
      key: "status",
      header: "Status",
      render: (p) => (
        <StatusBadge
          label={p.status}
          colorScheme={statusColorMap[p.status]}
        />
      ),
    },
    {
      key: "paidAt",
      header: "Paid At",
      className: "hidden sm:table-cell",
      render: (p) => (p.paidAt ? formatRelativeTime(p.paidAt) : "\u2014"),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={payouts}
      keyExtractor={(p) => p.id}
      emptyMessage="No vendor payouts found"
    />
  );
}
