import type { AdminKPI, SystemAlert, AdminActivityEvent } from "@/types";

const now = new Date();
function minutesAgo(minutes: number): string {
  return new Date(now.getTime() - minutes * 60000).toISOString();
}
function hoursAgo(hours: number): string {
  return new Date(now.getTime() - hours * 3600000).toISOString();
}

export const MOCK_ADMIN_KPIS: AdminKPI[] = [
  { id: "kpi-1", label: "Total Revenue (MTD)", value: 12450000, previousValue: 10800000, format: "currency", trend: "up", trendPercentage: 15 },
  { id: "kpi-2", label: "Total Orders (MTD)", value: 3420, previousValue: 2980, format: "number", trend: "up", trendPercentage: 15 },
  { id: "kpi-3", label: "Active Users", value: 18750, previousValue: 17200, format: "number", trend: "up", trendPercentage: 9 },
  { id: "kpi-4", label: "Active Vendors", value: 342, previousValue: 318, format: "number", trend: "up", trendPercentage: 8 },
  { id: "kpi-5", label: "Avg Order Value", value: 3640, previousValue: 3960, format: "currency", trend: "down", trendPercentage: -8 },
  { id: "kpi-6", label: "Cancellation Rate", value: 4.2, previousValue: 5.1, format: "percentage", trend: "down", trendPercentage: -18 },
  { id: "kpi-7", label: "Avg Delivery Time", value: 32, previousValue: 35, format: "duration", trend: "down", trendPercentage: -9 },
  { id: "kpi-8", label: "New Signups (Today)", value: 47, previousValue: 38, format: "number", trend: "up", trendPercentage: 24 },
];

export const MOCK_SYSTEM_ALERTS: SystemAlert[] = [
  {
    id: "alert-1",
    severity: "critical",
    title: "Payment Gateway Degraded",
    message: "Paystack API response times elevated. 3 failed transactions in last 10 minutes.",
    timestamp: minutesAgo(5),
    isResolved: false,
  },
  {
    id: "alert-2",
    severity: "warning",
    title: "High Order Volume",
    message: "Order volume 40% above average for this hour. Monitor rider availability.",
    timestamp: minutesAgo(15),
    isResolved: false,
  },
  {
    id: "alert-3",
    severity: "info",
    title: "Scheduled Maintenance",
    message: "Database maintenance window scheduled for Feb 9, 2:00 AM - 4:00 AM WAT.",
    timestamp: hoursAgo(2),
    isResolved: false,
  },
  {
    id: "alert-4",
    severity: "warning",
    title: "Rider Shortage — Lekki Zone",
    message: "Only 3 available riders in Lekki Phase 1. 8 pending deliveries in queue.",
    timestamp: minutesAgo(25),
    isResolved: false,
  },
  {
    id: "alert-5",
    severity: "critical",
    title: "Fraud Alert",
    message: "Multiple refund requests from same IP address detected. 5 accounts flagged.",
    timestamp: hoursAgo(1),
    isResolved: true,
  },
];

export const MOCK_ADMIN_ACTIVITY: AdminActivityEvent[] = [
  { id: "aa-1", type: "new_user_signup", message: "New user registered: Chioma Okeke", timestamp: minutesAgo(2), entityId: "user-021", entityType: "user" },
  { id: "aa-2", type: "order_flagged", message: "Order #3421 flagged for review — duplicate payment detected", timestamp: minutesAgo(5), entityId: "ord-3421", entityType: "order" },
  { id: "aa-3", type: "new_vendor_application", message: "New vendor application: Bukka Hut Express", timestamp: minutesAgo(8), entityId: "app-006", entityType: "vendor" },
  { id: "aa-4", type: "vendor_approved", message: "Vendor approved: Tasty Bites Lagos", timestamp: minutesAgo(12), entityId: "vend-015", entityType: "vendor" },
  { id: "aa-5", type: "order_escalated", message: "Order #3418 escalated to urgent — customer waiting 45+ min", timestamp: minutesAgo(18), entityId: "ord-3418", entityType: "order" },
  { id: "aa-6", type: "payout_processed", message: "Weekly payouts processed: 342 vendors, total ₦45.2M", timestamp: minutesAgo(30), entityType: "vendor" },
  { id: "aa-7", type: "user_banned", message: "User banned: Fake Account #1234 — multiple fraud attempts", timestamp: minutesAgo(45), entityId: "user-fake-01", entityType: "user" },
  { id: "aa-8", type: "new_user_signup", message: "New user registered: Amara Nwosu", timestamp: hoursAgo(1), entityId: "user-022", entityType: "user" },
  { id: "aa-9", type: "vendor_suspended", message: "Vendor suspended: Quick Eats — health violation reports", timestamp: hoursAgo(1.5), entityId: "vend-008", entityType: "vendor" },
  { id: "aa-10", type: "system_alert", message: "Payment gateway recovered — all transactions processing normally", timestamp: hoursAgo(2) },
  { id: "aa-11", type: "order_flagged", message: "Order #3415 disputed by customer — wrong items delivered", timestamp: hoursAgo(2.5), entityId: "ord-3415", entityType: "order" },
  { id: "aa-12", type: "new_vendor_application", message: "New vendor application: Mama Put Deluxe", timestamp: hoursAgo(3), entityId: "app-005", entityType: "vendor" },
  { id: "aa-13", type: "payout_processed", message: "Rider payouts processed: 128 riders, total ₦8.5M", timestamp: hoursAgo(4) },
  { id: "aa-14", type: "new_user_signup", message: "New user registered: Emeka Chukwu", timestamp: hoursAgo(5), entityId: "user-023", entityType: "user" },
  { id: "aa-15", type: "vendor_approved", message: "Vendor approved: Lagos Grills & Co", timestamp: hoursAgo(6), entityId: "vend-016", entityType: "vendor" },
];
