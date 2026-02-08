import { StatCard } from "@/components/ui";
import type { AdminVendor } from "@/types";

interface VendorPerformanceSectionProps {
  vendor: AdminVendor;
}

export function VendorPerformanceSection({ vendor }: VendorPerformanceSectionProps) {
  const metrics = [
    {
      label: "Performance Score",
      value: `${vendor.performanceScore}/100`,
      trend: vendor.performanceScore >= 80
        ? { direction: "up" as const, value: "Good" }
        : { direction: "down" as const, value: "Needs improvement" },
    },
    {
      label: "Avg Prep Time",
      value: `${vendor.avgPrepTime} min`,
    },
    {
      label: "Cancellation Rate",
      value: `${vendor.cancellationRate}%`,
      trend: vendor.cancellationRate <= 3
        ? { direction: "down" as const, value: "Low" }
        : { direction: "up" as const, value: "High" },
    },
    {
      label: "Total Orders",
      value: vendor.totalOrders.toLocaleString(),
    },
  ];

  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
      <h3 className="text-sm font-semibold text-foreground">Performance Metrics</h3>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {metrics.map((m) => (
          <StatCard key={m.label} label={m.label} value={m.value} trend={m.trend} />
        ))}
      </div>
    </div>
  );
}
