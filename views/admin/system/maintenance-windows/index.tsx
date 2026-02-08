"use client";

import type { MaintenanceWindow } from "@/types";
import { StatusBadge } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import { MOCK_MAINTENANCE_WINDOWS } from "@/lib/mock-data";

const statusColorMap: Record<MaintenanceWindow["status"], "info" | "warning" | "success" | "neutral"> = {
  scheduled: "info",
  in_progress: "warning",
  completed: "success",
  cancelled: "neutral",
};

const statusLabelMap: Record<MaintenanceWindow["status"], string> = {
  scheduled: "Scheduled",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

function MaintenanceCard({ window: mw }: { window: MaintenanceWindow }) {
  return (
    <div className="rounded-lg border border-border bg-background p-4 shadow-xs">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-bold text-foreground">{mw.title}</h3>
        <StatusBadge
          label={statusLabelMap[mw.status]}
          colorScheme={statusColorMap[mw.status]}
        />
      </div>

      <p className="mt-2 text-sm text-foreground-muted">{mw.description}</p>

      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs text-foreground-muted">
        <div>
          <span className="font-medium text-foreground">Start:</span>{" "}
          {formatDate(mw.scheduledStart, {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </div>
        <div>
          <span className="font-medium text-foreground">End:</span>{" "}
          {formatDate(mw.scheduledEnd, {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {mw.affectedServices.map((service) => (
          <span
            key={service}
            className="rounded-full bg-surface px-2 py-0.5 text-xs font-medium text-foreground-muted"
          >
            {service}
          </span>
        ))}
      </div>

      <p className="mt-3 text-xs text-foreground-muted">
        Created by {mw.createdBy}
      </p>
    </div>
  );
}

export function MaintenanceWindowsList() {
  const windows = MOCK_MAINTENANCE_WINDOWS;

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {windows.map((mw) => (
        <MaintenanceCard key={mw.id} window={mw} />
      ))}
    </div>
  );
}
