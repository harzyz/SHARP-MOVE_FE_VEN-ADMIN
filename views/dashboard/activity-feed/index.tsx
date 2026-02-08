"use client";

import { cn, formatRelativeTime } from "@/lib/utils";
import { MOCK_ACTIVITY_FEED } from "@/lib/mock-data";
import type { ActivityType } from "@/types";

const dotColor: Record<ActivityType, string> = {
  new_order: "bg-info-500",
  order_accepted: "bg-primary-500",
  order_ready: "bg-success-500",
  order_completed: "bg-success-600",
  order_cancelled: "bg-error-500",
  item_out_of_stock: "bg-warning-500",
  payout_received: "bg-secondary-500",
};

export function ActivityFeed() {
  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs">
      <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
      <div className="mt-3 max-h-80 space-y-0 overflow-y-auto">
        {MOCK_ACTIVITY_FEED.map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-3 border-b border-border py-3 last:border-b-0"
          >
            <span
              className={cn("mt-1.5 size-2 shrink-0 rounded-full", dotColor[event.type])}
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-foreground">{event.message}</p>
              <p className="mt-0.5 text-xs text-foreground-muted">
                {formatRelativeTime(event.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
