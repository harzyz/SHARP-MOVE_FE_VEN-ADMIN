import type { AnalyticsMetric } from "@/types";

export const MOCK_ANALYTICS_METRICS: AnalyticsMetric[] = [
  { id: "am-1", label: "Gross Merchandise Value", value: 12450000, previousValue: 10800000, format: "currency", trend: "up", trendPercentage: 15 },
  { id: "am-2", label: "Total Orders", value: 3420, previousValue: 2980, format: "number", trend: "up", trendPercentage: 15 },
  { id: "am-3", label: "Active Users (MAU)", value: 18750, previousValue: 17200, format: "number", trend: "up", trendPercentage: 9 },
  { id: "am-4", label: "Average Order Value", value: 3640, previousValue: 3960, format: "currency", trend: "down", trendPercentage: -8 },
  { id: "am-5", label: "Customer Retention", value: 68, previousValue: 62, format: "percentage", trend: "up", trendPercentage: 10 },
  { id: "am-6", label: "Avg Delivery Time", value: 32, previousValue: 35, format: "duration", trend: "down", trendPercentage: -9 },
  { id: "am-7", label: "Repeat Order Rate", value: 45, previousValue: 40, format: "percentage", trend: "up", trendPercentage: 13 },
  { id: "am-8", label: "Vendor Churn Rate", value: 2.1, previousValue: 3.4, format: "percentage", trend: "down", trendPercentage: -38 },
  { id: "am-9", label: "Support Tickets / 1000 Orders", value: 12, previousValue: 15, format: "number", trend: "down", trendPercentage: -20 },
  { id: "am-10", label: "App Rating (iOS/Android)", value: 4.6, previousValue: 4.5, format: "number", trend: "up", trendPercentage: 2 },
  { id: "am-11", label: "New User Signups (MTD)", value: 1420, previousValue: 1180, format: "number", trend: "up", trendPercentage: 20 },
  { id: "am-12", label: "Rider Utilization Rate", value: 74, previousValue: 68, format: "percentage", trend: "up", trendPercentage: 9 },
];
