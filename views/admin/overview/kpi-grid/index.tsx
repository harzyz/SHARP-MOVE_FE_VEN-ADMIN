"use client";

import { StatCard } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";
import type { AdminKPI } from "@/types";

interface KpiGridProps {
  kpis: AdminKPI[];
}

function formatKpiValue(kpi: AdminKPI): string {
  switch (kpi.format) {
    case "currency":
      return formatCurrency(kpi.value);
    case "percentage":
      return `${kpi.value}%`;
    case "duration":
      return `${kpi.value} min`;
    default:
      return kpi.value.toLocaleString();
  }
}

function formatTrendValue(kpi: AdminKPI): string {
  if (kpi.trendPercentage === undefined) return "";
  const abs = Math.abs(kpi.trendPercentage);
  return `${abs}% vs last month`;
}

export function KpiGrid({ kpis }: KpiGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
      {kpis.map((kpi) => (
        <StatCard
          key={kpi.id}
          label={kpi.label}
          value={formatKpiValue(kpi)}
          trend={
            kpi.trend && kpi.trendPercentage !== undefined
              ? { direction: kpi.trend, value: formatTrendValue(kpi) }
              : undefined
          }
        />
      ))}
    </div>
  );
}
