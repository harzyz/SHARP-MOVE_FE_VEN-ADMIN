"use client";

import { DataTable, StatusBadge, SharpmoveButton, type DataTableColumn } from "@/components/ui";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { PromoCode, PromoStatus, PromoType } from "@/types";

interface PromoTableProps {
  promos: PromoCode[];
  onPause: (promoId: string) => void;
  onActivate: (promoId: string) => void;
}

const statusColorMap: Record<PromoStatus, "success" | "warning" | "error" | "info" | "neutral"> = {
  active: "success",
  scheduled: "info",
  expired: "error",
  paused: "neutral",
};

const typeLabels: Record<PromoType, string> = {
  percentage: "Percentage",
  fixed_amount: "Fixed Amount",
  free_delivery: "Free Delivery",
  buy_one_get_one: "BOGO",
};

function formatPromoValue(type: PromoType, value: number): string {
  switch (type) {
    case "percentage":
      return `${value}%`;
    case "fixed_amount":
      return formatCurrency(value);
    case "free_delivery":
      return "Free";
    case "buy_one_get_one":
      return "Buy 1 Get 1";
  }
}

export function PromoTable({ promos, onPause, onActivate }: PromoTableProps) {
  const columns: DataTableColumn<PromoCode>[] = [
    {
      key: "code",
      header: "Code",
      render: (p) => (
        <span className="font-bold font-mono text-xs">{p.code}</span>
      ),
    },
    {
      key: "type",
      header: "Type",
      className: "hidden sm:table-cell",
      render: (p) => (
        <span className="text-xs">{typeLabels[p.type]}</span>
      ),
    },
    {
      key: "value",
      header: "Value",
      render: (p) => (
        <span className="text-xs font-medium">{formatPromoValue(p.type, p.value)}</span>
      ),
    },
    {
      key: "usage",
      header: "Usage",
      render: (p) => {
        const pct = p.usageLimit > 0 ? Math.min((p.usedCount / p.usageLimit) * 100, 100) : 0;
        return (
          <div className="min-w-[100px]">
            <div className="flex items-center justify-between text-xs text-foreground-muted">
              <span>{p.usedCount}</span>
              <span>/ {p.usageLimit}</span>
            </div>
            <div className="mt-1 h-1.5 w-full rounded-full bg-neutral-200">
              <div
                className="h-1.5 rounded-full bg-primary-500 transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      render: (p) => (
        <StatusBadge label={p.status} colorScheme={statusColorMap[p.status]} />
      ),
    },
    {
      key: "dates",
      header: "Dates",
      className: "hidden lg:table-cell",
      render: (p) => (
        <div className="text-xs text-foreground-muted">
          <div>{formatDate(p.startDate)}</div>
          <div className="text-foreground-muted/60">to {formatDate(p.endDate)}</div>
        </div>
      ),
    },
    {
      key: "actions",
      header: "",
      render: (p) => {
        if (p.status === "expired") return null;
        const isActive = p.status === "active";
        return (
          <SharpmoveButton
            size="sm"
            variant="outline"
            colorScheme={isActive ? "warning" : "success"}
            onClick={(e) => {
              e.stopPropagation();
              isActive ? onPause(p.id) : onActivate(p.id);
            }}
          >
            {isActive ? "Pause" : "Activate"}
          </SharpmoveButton>
        );
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={promos}
      keyExtractor={(p) => p.id}
      emptyMessage="No promo codes found"
    />
  );
}
