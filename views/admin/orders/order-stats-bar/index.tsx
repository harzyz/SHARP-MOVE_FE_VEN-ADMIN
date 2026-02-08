import { cn } from "@/lib/utils";

interface OrderStatsBarProps {
  orderCounts: Record<string, number>;
}

const statItems = [
  { key: "pending", label: "Pending", color: "bg-amber-500" },
  { key: "preparing", label: "Preparing", color: "bg-blue-500" },
  { key: "on_the_way", label: "En Route", color: "bg-purple-500" },
  { key: "delivered", label: "Delivered", color: "bg-green-500" },
  { key: "disputed", label: "Disputed", color: "bg-red-500" },
];

export function OrderStatsBar({ orderCounts }: OrderStatsBarProps) {
  return (
    <div className="flex flex-wrap gap-3 sm:gap-5">
      {statItems.map((item) => (
        <div key={item.key} className="flex items-center gap-2">
          <div className={cn("size-2.5 rounded-full", item.color)} />
          <span className="text-xs text-foreground-muted">{item.label}</span>
          <span className="text-sm font-semibold text-foreground">
            {orderCounts[item.key] || 0}
          </span>
        </div>
      ))}
    </div>
  );
}
