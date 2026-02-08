"use client";

import { useRouter } from "next/navigation";
import { DataTable, StatusBadge, type DataTableColumn } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";
import type { AdminVendor } from "@/types";

interface VendorTableProps {
  vendors: AdminVendor[];
}

const statusColorMap: Record<string, "success" | "warning" | "error" | "info" | "neutral"> = {
  active: "success",
  suspended: "error",
  inactive: "neutral",
  pending_approval: "warning",
};

export function VendorTable({ vendors }: VendorTableProps) {
  const router = useRouter();

  const columns: DataTableColumn<AdminVendor>[] = [
    {
      key: "name",
      header: "Vendor",
      render: (v) => (
        <div>
          <p className="font-medium">{v.name}</p>
          <p className="text-xs text-foreground-muted">{v.ownerName}</p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (v) => (
        <div className="flex items-center gap-1.5">
          <StatusBadge label={v.status.replace(/_/g, " ")} colorScheme={statusColorMap[v.status] || "neutral"} />
          {v.isOpen && (
            <span className="size-2 rounded-full bg-green-500" title="Open now" />
          )}
        </div>
      ),
    },
    {
      key: "orders",
      header: "Orders",
      className: "hidden sm:table-cell",
      render: (v) => v.totalOrders.toLocaleString(),
    },
    {
      key: "revenue",
      header: "Revenue",
      className: "hidden lg:table-cell",
      render: (v) => formatCurrency(v.totalRevenue),
    },
    {
      key: "rating",
      header: "Rating",
      className: "hidden sm:table-cell",
      render: (v) => (
        <div className="flex items-center gap-1">
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5 text-amber-400">
            <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
          </svg>
          <span className="text-sm">{v.rating.toFixed(1)}</span>
          <span className="text-xs text-foreground-muted">({v.totalReviews})</span>
        </div>
      ),
    },
    {
      key: "commission",
      header: "Commission",
      className: "hidden lg:table-cell",
      render: (v) => `${v.commissionRate}%`,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={vendors}
      keyExtractor={(v) => v.id}
      onRowClick={(v) => router.push(`/admin/vendors/${v.id}`)}
      emptyMessage="No vendors found"
    />
  );
}
