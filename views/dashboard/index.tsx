"use client";

import { MetricsCards } from "./metrics-cards";
import { ActivityFeed } from "./activity-feed";
import { QuickActions } from "./quick-actions";
import { ChartPlaceholder } from "@/components/shared/chart-placeholder";

export function DashboardView() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
      <p className="mt-1 text-sm text-foreground-muted">
        Overview of your restaurant performance
      </p>

      {/* Metrics */}
      <div className="mt-6">
        <MetricsCards />
      </div>

      {/* Activity Feed + Quick Actions */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
        <div className="space-y-4">
          <QuickActions />
          <ChartPlaceholder title="Sales Trend" />
        </div>
      </div>

      {/* Chart Placeholders Row */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <ChartPlaceholder title="Popular Items" />
        <ChartPlaceholder title="Order Volume" />
      </div>
    </div>
  );
}
