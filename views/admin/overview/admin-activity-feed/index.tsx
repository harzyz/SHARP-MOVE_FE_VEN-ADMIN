"use client";

import { formatRelativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { AdminActivityEvent, AdminActivityType } from "@/types";

interface AdminActivityFeedProps {
  events: AdminActivityEvent[];
}

const typeStyles: Record<AdminActivityType, { dot: string; label: string }> = {
  new_user_signup: { dot: "bg-green-500", label: "User" },
  new_vendor_application: { dot: "bg-purple-500", label: "Vendor" },
  order_flagged: { dot: "bg-red-500", label: "Order" },
  payout_processed: { dot: "bg-blue-500", label: "Finance" },
  system_alert: { dot: "bg-amber-500", label: "System" },
  vendor_approved: { dot: "bg-green-500", label: "Vendor" },
  vendor_suspended: { dot: "bg-red-500", label: "Vendor" },
  order_escalated: { dot: "bg-amber-500", label: "Order" },
  user_banned: { dot: "bg-red-500", label: "User" },
};

export function AdminActivityFeed({ events }: AdminActivityFeedProps) {
  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
      <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
      <div className="mt-3 max-h-[400px] space-y-0 overflow-y-auto">
        {events.map((event) => {
          const style = typeStyles[event.type];
          return (
            <div
              key={event.id}
              className="flex items-start gap-3 border-b border-border py-2.5 last:border-b-0"
            >
              <div className={cn("mt-1.5 size-2 shrink-0 rounded-full", style.dot)} />
              <div className="min-w-0 flex-1">
                <p className="text-sm text-foreground">{event.message}</p>
                <div className="mt-0.5 flex items-center gap-2">
                  <span className="text-xs text-foreground-muted">
                    {formatRelativeTime(event.timestamp)}
                  </span>
                  <span className="rounded bg-surface px-1.5 py-0.5 text-[10px] font-medium text-foreground-muted">
                    {style.label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
