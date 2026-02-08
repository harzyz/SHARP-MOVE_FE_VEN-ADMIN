import type { FeatureFlag, MaintenanceWindow, PlatformSetting } from "@/types";

const now = new Date();
function daysAgo(days: number): string {
  return new Date(now.getTime() - days * 86400000).toISOString();
}
function daysFromNow(days: number): string {
  return new Date(now.getTime() + days * 86400000).toISOString();
}

export const MOCK_FEATURE_FLAGS: FeatureFlag[] = [
  { id: "ff-001", key: "enable_wallet_topup", label: "Wallet Top-up", description: "Allow customers to add funds to their wallet via card or transfer", isEnabled: true, updatedAt: daysAgo(30), updatedBy: "Adebayo Ogunlesi" },
  { id: "ff-002", key: "enable_scheduled_orders", label: "Scheduled Orders", description: "Allow customers to schedule orders for a future time", isEnabled: true, updatedAt: daysAgo(15), updatedBy: "Adebayo Ogunlesi" },
  { id: "ff-003", key: "enable_live_tracking", label: "Live Rider Tracking", description: "Show real-time GPS tracking of rider on map", isEnabled: true, updatedAt: daysAgo(60), updatedBy: "Adebayo Ogunlesi" },
  { id: "ff-004", key: "enable_referral_program", label: "Referral Program", description: "Allow users to refer friends and earn credits", isEnabled: true, updatedAt: daysAgo(10), updatedBy: "Adebayo Ogunlesi" },
  { id: "ff-005", key: "enable_group_orders", label: "Group Orders", description: "Allow multiple users to add items to a single order", isEnabled: false, updatedAt: daysAgo(5), updatedBy: "Adebayo Ogunlesi" },
  { id: "ff-006", key: "enable_vendor_chat", label: "Vendor Chat", description: "Allow customers to chat directly with vendors", isEnabled: false, updatedAt: daysAgo(20), updatedBy: "Adebayo Ogunlesi" },
  { id: "ff-007", key: "enable_surge_pricing", label: "Surge Pricing", description: "Apply dynamic pricing during high-demand periods", isEnabled: true, updatedAt: daysAgo(45), updatedBy: "Adebayo Ogunlesi" },
  { id: "ff-008", key: "enable_cash_payments", label: "Cash on Delivery", description: "Allow customers to pay with cash upon delivery", isEnabled: true, updatedAt: daysAgo(90), updatedBy: "Adebayo Ogunlesi" },
  { id: "ff-009", key: "enable_loyalty_points", label: "Loyalty Points", description: "Customers earn points per order redeemable for discounts", isEnabled: false, updatedAt: daysAgo(3), updatedBy: "Adebayo Ogunlesi" },
  { id: "ff-010", key: "enable_multi_vendor_cart", label: "Multi-Vendor Cart", description: "Allow items from multiple vendors in a single checkout", isEnabled: false, updatedAt: daysAgo(7), updatedBy: "Adebayo Ogunlesi" },
];

export const MOCK_MAINTENANCE_WINDOWS: MaintenanceWindow[] = [
  {
    id: "mw-001", title: "Database Migration v4.2",
    description: "Migrating order tables to new schema. Expected 15 min downtime.",
    scheduledStart: daysFromNow(3), scheduledEnd: daysFromNow(3),
    status: "scheduled", affectedServices: ["Orders", "Payments"],
    createdBy: "Adebayo Ogunlesi",
  },
  {
    id: "mw-002", title: "CDN Cache Purge",
    description: "Purging and rebuilding CDN cache for static assets and images.",
    scheduledStart: daysFromNow(1), scheduledEnd: daysFromNow(1),
    status: "scheduled", affectedServices: ["Images", "Static Assets"],
    createdBy: "Adebayo Ogunlesi",
  },
  {
    id: "mw-003", title: "Payment Gateway Update",
    description: "Upgrading Paystack integration to v3 API. Brief payment interruption.",
    scheduledStart: daysAgo(2), scheduledEnd: daysAgo(2),
    status: "completed", affectedServices: ["Payments", "Wallet"],
    createdBy: "Adebayo Ogunlesi",
  },
  {
    id: "mw-004", title: "Server Scaling (February)",
    description: "Adding 2 new app server instances to handle Valentine's traffic.",
    scheduledStart: daysAgo(5), scheduledEnd: daysAgo(5),
    status: "completed", affectedServices: ["All Services"],
    createdBy: "Adebayo Ogunlesi",
  },
  {
    id: "mw-005", title: "Push Notification Service Migration",
    description: "Migrating from FCM legacy to HTTP v1 API.",
    scheduledStart: daysFromNow(7), scheduledEnd: daysFromNow(7),
    status: "scheduled", affectedServices: ["Notifications"],
    createdBy: "Adebayo Ogunlesi",
  },
];

export const MOCK_PLATFORM_SETTINGS: PlatformSetting[] = [
  { id: "ps-001", key: "default_commission_rate", label: "Default Commission Rate", value: "15", type: "percentage", category: "payments", description: "Default commission percentage charged to vendors" },
  { id: "ps-002", key: "min_order_amount", label: "Minimum Order Amount", value: "1500", type: "number", category: "orders", description: "Minimum order amount in NGN" },
  { id: "ps-003", key: "delivery_fee_base", label: "Base Delivery Fee", value: "500", type: "number", category: "delivery", description: "Base delivery fee in NGN before distance calculation" },
  { id: "ps-004", key: "delivery_fee_per_km", label: "Delivery Fee Per KM", value: "100", type: "number", category: "delivery", description: "Additional delivery fee per kilometer" },
  { id: "ps-005", key: "max_delivery_radius_km", label: "Max Delivery Radius", value: "15", type: "number", category: "delivery", description: "Maximum delivery radius in kilometers" },
  { id: "ps-006", key: "service_fee_percentage", label: "Service Fee", value: "5", type: "percentage", category: "payments", description: "Service fee charged to customers per order" },
  { id: "ps-007", key: "payout_day", label: "Vendor Payout Day", value: "Monday", type: "string", category: "payments", description: "Day of the week vendor payouts are processed" },
  { id: "ps-008", key: "rider_payout_day", label: "Rider Payout Day", value: "Monday", type: "string", category: "payments", description: "Day of the week rider payouts are processed" },
  { id: "ps-009", key: "order_auto_cancel_minutes", label: "Auto-Cancel Timer", value: "30", type: "number", category: "orders", description: "Minutes before unconfirmed orders are auto-cancelled" },
  { id: "ps-010", key: "enable_order_notifications", label: "Order Notifications", value: "true", type: "boolean", category: "notifications", description: "Send push notifications for order status updates" },
  { id: "ps-011", key: "support_email", label: "Support Email", value: "support@kiakia.ng", type: "string", category: "general", description: "Customer-facing support email address" },
  { id: "ps-012", key: "max_concurrent_orders_per_rider", label: "Max Orders Per Rider", value: "3", type: "number", category: "delivery", description: "Maximum concurrent deliveries per rider" },
];
