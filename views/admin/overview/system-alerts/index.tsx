"use client";

import { useState } from "react";
import { AlertBanner } from "@/components/ui";
import type { SystemAlert } from "@/types";

interface SystemAlertsProps {
  alerts: SystemAlert[];
}

export function SystemAlerts({ alerts: initialAlerts }: SystemAlertsProps) {
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());

  const visibleAlerts = initialAlerts.filter(
    (a) => !a.isResolved && !dismissedIds.has(a.id)
  );

  function handleDismiss(id: string) {
    setDismissedIds((prev) => new Set(prev).add(id));
  }

  if (visibleAlerts.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
        <h3 className="text-sm font-semibold text-foreground">System Alerts</h3>
        <p className="mt-3 text-sm text-foreground-muted">No active alerts</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">System Alerts</h3>
        <span className="rounded-full bg-error-100 px-2 py-0.5 text-xs font-medium text-error-700">
          {visibleAlerts.length} active
        </span>
      </div>
      <div className="mt-3 space-y-2">
        {visibleAlerts.map((alert) => (
          <AlertBanner
            key={alert.id}
            severity={alert.severity}
            title={alert.title}
            message={alert.message}
            onDismiss={() => handleDismiss(alert.id)}
          />
        ))}
      </div>
    </div>
  );
}
