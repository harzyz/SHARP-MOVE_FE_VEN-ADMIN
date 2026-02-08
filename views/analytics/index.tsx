"use client";

import { useState } from "react";
import { MOCK_ANALYTICS_DATA } from "@/lib/mock-data";
import { ChartPlaceholder } from "@/components/shared/chart-placeholder";
import type { DateRangePreset } from "@/types";
import { DateRangeSelector } from "./date-range-selector";
import { KPICards } from "./kpi-cards";
import { PopularItems } from "./popular-items";

export function AnalyticsView() {
  const [preset, setPreset] = useState<DateRangePreset>("last7days");
  const data = MOCK_ANALYTICS_DATA;

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Analytics</h1>
          <p className="mt-1 text-sm text-foreground-muted">
            Track your restaurant performance
          </p>
        </div>
      </div>

      {/* Date Range */}
      <div className="mt-4">
        <DateRangeSelector activePreset={preset} onPresetChange={setPreset} />
      </div>

      {/* KPIs */}
      <div className="mt-4">
        <KPICards kpis={data.kpis} />
      </div>

      {/* Chart + Popular Items */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ChartPlaceholder title="Sales Trend" className="h-full" />
        </div>
        <PopularItems items={data.popularItems} />
      </div>

      {/* Additional Charts */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <ChartPlaceholder title="Orders by Hour" />
        <ChartPlaceholder title="Revenue by Category" />
      </div>
    </div>
  );
}
