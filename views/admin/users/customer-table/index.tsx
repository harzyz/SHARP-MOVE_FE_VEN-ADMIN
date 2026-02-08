"use client";

import { useRouter } from "next/navigation";
import { DataTable, StatusBadge, type DataTableColumn } from "@/components/ui";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import type { CustomerUser } from "@/types";

interface CustomerTableProps {
  customers: CustomerUser[];
}

const statusColorMap: Record<string, "success" | "warning" | "error" | "info" | "neutral"> = {
  active: "success",
  suspended: "warning",
  banned: "error",
  deactivated: "neutral",
};

export function CustomerTable({ customers }: CustomerTableProps) {
  const router = useRouter();

  const columns: DataTableColumn<CustomerUser>[] = [
    {
      key: "name",
      header: "Customer",
      render: (c) => (
        <div>
          <p className="font-medium">{c.name}</p>
          <p className="text-xs text-foreground-muted">{c.email}</p>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone",
      className: "hidden sm:table-cell",
      render: (c) => c.phone,
    },
    {
      key: "status",
      header: "Status",
      render: (c) => (
        <div className="flex items-center gap-2">
          <StatusBadge label={c.accountStatus} colorScheme={statusColorMap[c.accountStatus] || "neutral"} />
          {c.isFraudFlagged && (
            <span className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-bold text-red-700">
              FRAUD
            </span>
          )}
        </div>
      ),
    },
    {
      key: "orders",
      header: "Orders",
      className: "hidden lg:table-cell",
      render: (c) => c.totalOrders,
    },
    {
      key: "spent",
      header: "Total Spent",
      className: "hidden lg:table-cell",
      render: (c) => formatCurrency(c.totalSpent),
    },
    {
      key: "lastActive",
      header: "Last Active",
      className: "hidden sm:table-cell",
      render: (c) => formatRelativeTime(c.lastActiveAt),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={customers}
      keyExtractor={(c) => c.id}
      onRowClick={(c) => router.push(`/admin/users/${c.id}`)}
      emptyMessage="No customers found"
    />
  );
}
