import type { PromoCode, Campaign } from "@/types";

const now = new Date();
function daysAgo(days: number): string {
  return new Date(now.getTime() - days * 86400000).toISOString();
}
function daysFromNow(days: number): string {
  return new Date(now.getTime() + days * 86400000).toISOString();
}

export const MOCK_PROMO_CODES: PromoCode[] = [
  {
    id: "promo-001", code: "WELCOME50", description: "50% off first order for new users",
    type: "percentage", value: 50, minOrderAmount: 2000, maxDiscount: 3000,
    usageLimit: 5000, usedCount: 3420, status: "active",
    startDate: "2025-12-01T00:00:00Z", endDate: daysFromNow(30),
    createdBy: "Adebayo Ogunlesi", applicableVendors: [],
  },
  {
    id: "promo-002", code: "FREEDELIVERY", description: "Free delivery on all orders above NGN 3,000",
    type: "free_delivery", value: 0, minOrderAmount: 3000,
    usageLimit: 10000, usedCount: 6780, status: "active",
    startDate: "2026-01-01T00:00:00Z", endDate: daysFromNow(45),
    createdBy: "Adebayo Ogunlesi", applicableVendors: [],
  },
  {
    id: "promo-003", code: "VAL2026", description: "NGN 1,000 off Valentine's orders",
    type: "fixed_amount", value: 1000, minOrderAmount: 5000,
    usageLimit: 2000, usedCount: 2000, status: "expired",
    startDate: "2026-02-10T00:00:00Z", endDate: "2026-02-15T23:59:59Z",
    createdBy: "Adebayo Ogunlesi", applicableVendors: [],
  },
  {
    id: "promo-004", code: "BUKKA20", description: "20% off at Bukka Hut",
    type: "percentage", value: 20, minOrderAmount: 2500, maxDiscount: 2000,
    usageLimit: 1000, usedCount: 340, status: "active",
    startDate: "2026-01-15T00:00:00Z", endDate: daysFromNow(20),
    createdBy: "Adebayo Ogunlesi", applicableVendors: ["vend-001"],
  },
  {
    id: "promo-005", code: "WEEKEND500", description: "NGN 500 off weekend orders",
    type: "fixed_amount", value: 500, minOrderAmount: 2000,
    usageLimit: 3000, usedCount: 0, status: "scheduled",
    startDate: daysFromNow(2), endDate: daysFromNow(4),
    createdBy: "Adebayo Ogunlesi", applicableVendors: [],
  },
  {
    id: "promo-006", code: "BOGO_PIZZA", description: "Buy one get one free at Domino's",
    type: "buy_one_get_one", value: 0, minOrderAmount: 8000,
    usageLimit: 500, usedCount: 120, status: "paused",
    startDate: "2026-01-20T00:00:00Z", endDate: daysFromNow(15),
    createdBy: "Adebayo Ogunlesi", applicableVendors: ["vend-003"],
  },
  {
    id: "promo-007", code: "REFER2026", description: "NGN 500 for referrer and referee",
    type: "fixed_amount", value: 500, minOrderAmount: 1500,
    usageLimit: 0, usedCount: 890, status: "active",
    startDate: "2026-01-01T00:00:00Z", endDate: daysFromNow(60),
    createdBy: "Adebayo Ogunlesi", applicableVendors: [],
  },
];

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: "camp-001", name: "New User Acquisition", description: "Drive new signups through welcome discount and social ads",
    status: "active", budget: 5000000, spent: 3200000,
    startDate: "2025-12-01T00:00:00Z", endDate: daysFromNow(30),
    targetAudience: "New users (0 orders)", promoCodes: ["WELCOME50"],
    impressions: 125000, conversions: 3420,
  },
  {
    id: "camp-002", name: "Free Delivery February", description: "Boost order frequency with free delivery all month",
    status: "active", budget: 8000000, spent: 4100000,
    startDate: "2026-02-01T00:00:00Z", endDate: "2026-02-28T23:59:59Z",
    targetAudience: "All users", promoCodes: ["FREEDELIVERY"],
    impressions: 280000, conversions: 6780,
  },
  {
    id: "camp-003", name: "Valentine's Special", description: "Special discounts for Valentine's week",
    status: "expired", budget: 2000000, spent: 2000000,
    startDate: "2026-02-10T00:00:00Z", endDate: "2026-02-15T23:59:59Z",
    targetAudience: "All users", promoCodes: ["VAL2026"],
    impressions: 85000, conversions: 2000,
  },
  {
    id: "camp-004", name: "Weekend Warrior", description: "Encourage weekend ordering with recurring discounts",
    status: "scheduled", budget: 3000000, spent: 0,
    startDate: daysFromNow(2), endDate: daysFromNow(30),
    targetAudience: "Users with 3+ orders", promoCodes: ["WEEKEND500"],
    impressions: 0, conversions: 0,
  },
];
