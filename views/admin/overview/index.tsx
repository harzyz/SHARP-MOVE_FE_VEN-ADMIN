"use client";

import { MOCK_ADMIN_KPIS, MOCK_SYSTEM_ALERTS, MOCK_ADMIN_ACTIVITY } from "@/lib/mock-data";
import { KpiGrid } from "./kpi-grid";
import { SystemAlerts } from "./system-alerts";
import { AdminActivityFeed } from "./admin-activity-feed";
import { PlatformStats } from "./platform-stats";
import { MapPlaceholder } from "./map-placeholder";

export function AdminOverviewView() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <h1 className="text-lg font-bold text-foreground sm:text-xl">Overview</h1>
      <p className="mt-1 text-sm text-foreground-muted">Platform command center</p>

      {/* KPI Grid */}
      <div className="mt-5">
        <KpiGrid kpis={MOCK_ADMIN_KPIS} />
      </div>

      {/* System Alerts */}
      <div className="mt-5">
        <SystemAlerts alerts={MOCK_SYSTEM_ALERTS} />
      </div>

      {/* Platform Quick Stats */}
      <div className="mt-5">
        <PlatformStats
          totalUsers={18750}
          totalVendors={342}
          totalOrders={3420}
          activeRiders={128}
        />
      </div>

      {/* Two-column: Activity Feed + Map */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <AdminActivityFeed events={MOCK_ADMIN_ACTIVITY} />
        <MapPlaceholder />
      </div>
    </div>
  );
}
