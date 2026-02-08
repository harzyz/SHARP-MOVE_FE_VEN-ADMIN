import { cn } from "@/lib/utils";

export interface StatCardProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  trend?: { direction: "up" | "down" | "flat"; value: string };
  className?: string;
}

export function StatCard({ label, value, icon, trend, className }: StatCardProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-background p-4 shadow-xs", className)}>
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium text-foreground-muted">{label}</p>
          <p className="mt-1 text-xl font-bold text-foreground">{value}</p>
        </div>
        {icon && (
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-2 flex items-center gap-1">
          {trend.direction === "up" && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-3.5 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          )}
          {trend.direction === "down" && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-3.5 text-red-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
            </svg>
          )}
          <span className={cn(
            "text-xs font-medium",
            trend.direction === "up" && "text-green-600",
            trend.direction === "down" && "text-red-500",
            trend.direction === "flat" && "text-foreground-muted"
          )}>
            {trend.value}
          </span>
        </div>
      )}
    </div>
  );
}
