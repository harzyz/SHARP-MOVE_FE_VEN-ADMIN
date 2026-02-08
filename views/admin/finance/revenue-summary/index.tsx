"use client";

import { StatCard } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";
import type { RevenueSummary } from "@/types";

interface RevenueSummaryProps {
  summary: RevenueSummary;
}

export function RevenueSummaryGrid({ summary }: RevenueSummaryProps) {
  const metrics = [
    { label: "Total Revenue", value: summary.totalRevenue },
    { label: "Commissions", value: summary.totalCommissions },
    { label: "Delivery Fees", value: summary.totalDeliveryFees },
    { label: "Service Fees", value: summary.totalServiceFees },
    { label: "Refunds", value: summary.totalRefunds },
    { label: "Promo Costs", value: summary.totalPromoCosts },
    { label: "Net Revenue", value: summary.netRevenue },
  ];

  return (
    <div>
      <p className="mb-3 text-xs font-medium text-foreground-muted">
        Period: {summary.period}
      </p>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {metrics.map((metric) => (
          <StatCard
            key={metric.label}
            label={metric.label}
            value={formatCurrency(metric.value)}
          />
        ))}
      </div>
    </div>
  );
}
