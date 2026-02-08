"use client";

import { StatCard } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";
import { MOCK_ANALYTICS_METRICS } from "@/lib/mock-data";
import type { AnalyticsMetric } from "@/types";

function formatMetricValue(metric: AnalyticsMetric): string {
  switch (metric.format) {
    case "currency":
      return formatCurrency(metric.value);
    case "percentage":
      return `${metric.value}%`;
    case "duration":
      return `${metric.value} min`;
    default:
      return metric.value.toLocaleString();
  }
}

function formatTrendValue(metric: AnalyticsMetric): string {
  const abs = Math.abs(metric.trendPercentage);
  return `${abs}% vs last period`;
}

export function MetricsGrid() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 xl:grid-cols-4">
      {MOCK_ANALYTICS_METRICS.map((metric) => (
        <StatCard
          key={metric.id}
          label={metric.label}
          value={formatMetricValue(metric)}
          trend={{
            direction: metric.trend,
            value: formatTrendValue(metric),
          }}
        />
      ))}
    </div>
  );
}
