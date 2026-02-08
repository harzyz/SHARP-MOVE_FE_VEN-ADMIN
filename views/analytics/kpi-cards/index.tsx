"use client";

import { cn, formatCurrency } from "@/lib/utils";
import type { AnalyticsKPI } from "@/types";

interface KPICardsProps {
  kpis: AnalyticsKPI[];
}

function formatKPIValue(value: number, format: AnalyticsKPI["format"]): string {
  switch (format) {
    case "currency":
      return formatCurrency(value);
    case "percentage":
      return `${value}%`;
    case "duration":
      return `${value} min`;
    default:
      return String(value);
  }
}

function getChangePercent(current: number, previous: number | undefined): number | null {
  if (previous === undefined || previous === 0) return null;
  return Math.round(((current - previous) / previous) * 100);
}

export function KPICards({ kpis }: KPICardsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {kpis.map((kpi) => {
        const change = getChangePercent(kpi.value, kpi.previousValue);
        const isPositive = change !== null && change >= 0;

        return (
          <div key={kpi.label} className="rounded-xl border border-border bg-background p-4 shadow-xs">
            <p className="text-xs text-foreground-muted">{kpi.label}</p>
            <p className="mt-1 text-2xl font-bold text-foreground">
              {formatKPIValue(kpi.value, kpi.format)}
            </p>
            {change !== null && (
              <p
                className={cn(
                  "mt-1 text-xs font-medium",
                  isPositive ? "text-success-600" : "text-error-600"
                )}
              >
                {isPositive ? "+" : ""}
                {change}% vs last period
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
