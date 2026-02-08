"use client";

import type { RiderZone } from "@/types";

interface ZoneGridProps {
  zones: RiderZone[];
}

export function ZoneGrid({ zones }: ZoneGridProps) {
  if (zones.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-foreground-muted">
        No zones configured yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {zones.map((zone) => (
        <div
          key={zone.id}
          className="rounded-xl border border-border bg-background p-4 shadow-xs"
        >
          <h3 className="text-sm font-semibold text-foreground">{zone.name}</h3>

          <div className="mt-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground-muted">Riders Online</span>
              <span className="text-sm font-medium text-foreground">
                {zone.ridersOnline}
                <span className="text-xs font-normal text-foreground-muted">
                  {" "}/ {zone.ridersTotal}
                </span>
              </span>
            </div>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
              <div
                className="h-full rounded-full bg-success-500 transition-all"
                style={{
                  width: zone.ridersTotal > 0
                    ? `${(zone.ridersOnline / zone.ridersTotal) * 100}%`
                    : "0%",
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground-muted">Pending Deliveries</span>
              <span className="text-sm font-medium text-foreground">
                {zone.pendingDeliveries}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
