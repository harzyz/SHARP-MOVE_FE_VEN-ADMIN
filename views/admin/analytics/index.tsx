"use client";

import { MetricsGrid } from "./metrics-grid";
import { ChartPlaceholder } from "./chart-placeholder";

export function AdminAnalyticsView() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <h1 className="text-lg font-bold text-foreground sm:text-xl">Analytics</h1>
      <p className="mt-1 text-sm text-foreground-muted">
        Platform performance metrics and trends
      </p>

      {/* Metrics Grid */}
      <div className="mt-5">
        <MetricsGrid />
      </div>

      {/* Chart Placeholders — 2x2 Grid */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <ChartPlaceholder title="Revenue Over Time" />
        <ChartPlaceholder title="Orders by Status" />
        <ChartPlaceholder title="User Growth" />
        <ChartPlaceholder title="Top Vendors by Revenue" />
      </div>
    </div>
  );
}
