"use client";

import { useRouter } from "next/navigation";
import { DataTable, StatusBadge, type DataTableColumn } from "@/components/ui";
import type { Rider, RiderStatus } from "@/types";

interface RiderTableProps {
  riders: Rider[];
}

const statusColorMap: Record<RiderStatus, "success" | "warning" | "error" | "info" | "neutral"> = {
  online: "success",
  offline: "neutral",
  on_delivery: "info",
  suspended: "error",
};

const statusLabelMap: Record<RiderStatus, string> = {
  online: "Online",
  offline: "Offline",
  on_delivery: "On Delivery",
  suspended: "Suspended",
};

export function RiderTable({ riders }: RiderTableProps) {
  const router = useRouter();

  const columns: DataTableColumn<Rider>[] = [
    {
      key: "name",
      header: "Name",
      render: (r) => (
        <div>
          <p className="font-medium">{r.name}</p>
          <p className="text-xs text-foreground-muted">{r.email}</p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (r) => (
        <StatusBadge
          label={statusLabelMap[r.status]}
          colorScheme={statusColorMap[r.status]}
        />
      ),
    },
    {
      key: "zone",
      header: "Zone",
      className: "hidden sm:table-cell",
      render: (r) => r.zone,
    },
    {
      key: "vehicle",
      header: "Vehicle",
      className: "hidden lg:table-cell",
      render: (r) => (
        <div>
          <p className="text-sm">{r.vehicleType}</p>
          {r.licensePlate && (
            <p className="text-xs text-foreground-muted">{r.licensePlate}</p>
          )}
        </div>
      ),
    },
    {
      key: "deliveries",
      header: "Deliveries",
      className: "hidden sm:table-cell",
      render: (r) => r.totalDeliveries.toLocaleString(),
    },
    {
      key: "rating",
      header: "Rating",
      className: "hidden sm:table-cell",
      render: (r) => (
        <div className="flex items-center gap-1">
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5 text-amber-400">
            <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
          </svg>
          <span className="text-sm">{r.rating.toFixed(1)}</span>
          <span className="text-xs text-foreground-muted">({r.totalRatings})</span>
        </div>
      ),
    },
    {
      key: "avgTime",
      header: "Avg Time",
      className: "hidden lg:table-cell",
      render: (r) => `${r.avgDeliveryTime} min`,
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={riders}
      keyExtractor={(r) => r.id}
      onRowClick={(r) => router.push(`/admin/riders/${r.id}`)}
      emptyMessage="No riders found"
    />
  );
}
