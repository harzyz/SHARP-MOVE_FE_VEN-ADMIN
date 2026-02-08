import type { PlatformTransaction, RevenueSummary, VendorPayoutSummary } from "@/types";

const now = new Date();
function hoursAgo(hours: number): string {
  return new Date(now.getTime() - hours * 3600000).toISOString();
}
function daysAgo(days: number): string {
  return new Date(now.getTime() - days * 86400000).toISOString();
}

export const MOCK_REVENUE_SUMMARY: RevenueSummary = {
  totalRevenue: 12450000,
  totalCommissions: 1867500,
  totalDeliveryFees: 624000,
  totalServiceFees: 312000,
  totalRefunds: 185000,
  totalPromoCosts: 320000,
  netRevenue: 2298500,
  period: "February 2026 (MTD)",
};

export const MOCK_PLATFORM_TRANSACTIONS: PlatformTransaction[] = [
  { id: "ptx-001", type: "order_payment", description: "Order #3422 — Amara Nwosu", amount: 5600, direction: "inflow", entityId: "aord-001", entityName: "Bukka Hut", timestamp: hoursAgo(1), status: "completed" },
  { id: "ptx-002", type: "commission", description: "Commission on Order #3422 (15%)", amount: 840, direction: "inflow", entityId: "aord-001", entityName: "Bukka Hut", timestamp: hoursAgo(1), status: "completed" },
  { id: "ptx-003", type: "order_payment", description: "Order #3421 — Chioma Okeke", amount: 4250, direction: "inflow", entityId: "aord-002", entityName: "Chicken Republic", timestamp: hoursAgo(3), status: "completed" },
  { id: "ptx-004", type: "vendor_payout", description: "Payout to Bukka Hut — Weekly", amount: 1250000, direction: "outflow", entityName: "Bukka Hut", timestamp: daysAgo(1), status: "completed" },
  { id: "ptx-005", type: "rider_payout", description: "Payout to Chinedu Eze — Weekly", amount: 85000, direction: "outflow", entityName: "Chinedu Eze", timestamp: daysAgo(1), status: "completed" },
  { id: "ptx-006", type: "refund", description: "Refund — Order #3410 (delivery failure)", amount: 2550, direction: "outflow", entityId: "aord-013", entityName: "Solomon Adegoke", timestamp: daysAgo(1), status: "completed" },
  { id: "ptx-007", type: "order_payment", description: "Order #3419 — Olumide Falade", amount: 12500, direction: "inflow", entityId: "aord-004", entityName: "Domino's Pizza", timestamp: hoursAgo(5), status: "completed" },
  { id: "ptx-008", type: "promo_cost", description: "Promo WELCOME50 applied to Order #3420", amount: 550, direction: "outflow", entityId: "aord-003", timestamp: hoursAgo(4), status: "completed" },
  { id: "ptx-009", type: "vendor_payout", description: "Payout to Chicken Republic — Weekly", amount: 980000, direction: "outflow", entityName: "Chicken Republic", timestamp: daysAgo(1), status: "completed" },
  { id: "ptx-010", type: "order_payment", description: "Order #3418 — Kemi Oladipo", amount: 7650, direction: "inflow", entityId: "aord-005", entityName: "Kilimanjaro", timestamp: hoursAgo(1), status: "completed" },
  { id: "ptx-011", type: "refund", description: "Refund — Order #3419 (duplicate charge)", amount: 12500, direction: "outflow", entityId: "aord-004", entityName: "Olumide Falade", timestamp: hoursAgo(2), status: "pending" },
  { id: "ptx-012", type: "vendor_payout", description: "Payout to Domino's Pizza — Weekly", amount: 1540000, direction: "outflow", entityName: "Domino's Pizza", timestamp: daysAgo(1), status: "completed" },
  { id: "ptx-013", type: "rider_payout", description: "Payout to Tolu Ajayi — Weekly", amount: 92000, direction: "outflow", entityName: "Tolu Ajayi", timestamp: daysAgo(1), status: "completed" },
  { id: "ptx-014", type: "commission", description: "Commission on Order #3419 (10%)", amount: 1250, direction: "inflow", entityId: "aord-004", entityName: "Domino's Pizza", timestamp: hoursAgo(5), status: "completed" },
  { id: "ptx-015", type: "order_payment", description: "Order #3416 — Obinna Agu", amount: 4450, direction: "inflow", entityId: "aord-007", entityName: "Tantalizers", timestamp: hoursAgo(0.5), status: "pending" },
];

export const MOCK_VENDOR_PAYOUT_SUMMARIES: VendorPayoutSummary[] = [
  { id: "vps-001", vendorId: "vend-001", vendorName: "Bukka Hut", amount: 1250000, ordersCount: 142, commissionDeducted: 220500, period: "Jan 27 - Feb 2", status: "completed", paidAt: daysAgo(1) },
  { id: "vps-002", vendorId: "vend-002", vendorName: "Chicken Republic", amount: 980000, ordersCount: 178, commissionDeducted: 133600, period: "Jan 27 - Feb 2", status: "completed", paidAt: daysAgo(1) },
  { id: "vps-003", vendorId: "vend-003", vendorName: "Domino's Pizza", amount: 1540000, ordersCount: 98, commissionDeducted: 171100, period: "Jan 27 - Feb 2", status: "completed", paidAt: daysAgo(1) },
  { id: "vps-004", vendorId: "vend-004", vendorName: "Kilimanjaro", amount: 880000, ordersCount: 112, commissionDeducted: 155300, period: "Jan 27 - Feb 2", status: "completed", paidAt: daysAgo(1) },
  { id: "vps-005", vendorId: "vend-005", vendorName: "Sweet Sensation", amount: 420000, ordersCount: 85, commissionDeducted: 74100, period: "Jan 27 - Feb 2", status: "processing" },
  { id: "vps-006", vendorId: "vend-006", vendorName: "Tantalizers", amount: 560000, ordersCount: 76, commissionDeducted: 98800, period: "Jan 27 - Feb 2", status: "pending" },
  { id: "vps-007", vendorId: "vend-007", vendorName: "The Place", amount: 720000, ordersCount: 128, commissionDeducted: 98200, period: "Jan 27 - Feb 2", status: "pending" },
];
