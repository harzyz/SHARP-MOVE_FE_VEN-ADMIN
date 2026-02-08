import type { AnalyticsData } from "@/types";

export const MOCK_ANALYTICS_DATA: AnalyticsData = {
  kpis: [
    { label: "Total Sales", value: 247500, previousValue: 218000, format: "currency" },
    { label: "Number of Orders", value: 68, previousValue: 55, format: "number" },
    { label: "Average Order Value", value: 3640, previousValue: 3960, format: "currency" },
  ],
  popularItems: [
    { id: "vmi-1", name: "Jollof Rice", ordersCount: 42, revenue: 105000 },
    { id: "vmi-4", name: "Fried Rice & Chicken", ordersCount: 35, revenue: 105000 },
    { id: "vmi-2", name: "Pounded Yam & Egusi", ordersCount: 28, revenue: 98000 },
    { id: "vmi-3", name: "Suya Platter", ordersCount: 22, revenue: 99000 },
    { id: "vmi-13", name: "Sharwarma (Large)", ordersCount: 18, revenue: 54000 },
  ],
  salesTrend: [
    { date: "2026-02-01", orders: 12, revenue: 42500 },
    { date: "2026-02-02", orders: 8, revenue: 28000 },
    { date: "2026-02-03", orders: 15, revenue: 51200 },
    { date: "2026-02-04", orders: 10, revenue: 35800 },
    { date: "2026-02-05", orders: 9, revenue: 31500 },
    { date: "2026-02-06", orders: 14, revenue: 48500 },
    { date: "2026-02-07", orders: 11, revenue: 38000 },
  ],
};
