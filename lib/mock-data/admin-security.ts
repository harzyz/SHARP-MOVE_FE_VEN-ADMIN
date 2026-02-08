import type { AdminUserEntry, AuditLogEntry, AdminRole } from "@/types";

const now = new Date();
function hoursAgo(hours: number): string {
  return new Date(now.getTime() - hours * 3600000).toISOString();
}
function daysAgo(days: number): string {
  return new Date(now.getTime() - days * 86400000).toISOString();
}

export const MOCK_ADMIN_USERS: AdminUserEntry[] = [
  { id: "adm-001", name: "Adebayo Ogunlesi", email: "adebayo@kiakia.ng", role: "super_admin" as AdminRole, isActive: true, lastLoginAt: hoursAgo(0.5), createdAt: "2025-01-01T00:00:00Z", invitedBy: "System" },
  { id: "adm-002", name: "Funke Adeyemi", email: "funke@kiakia.ng", role: "operations_admin" as AdminRole, isActive: true, lastLoginAt: hoursAgo(2), createdAt: "2025-02-15T00:00:00Z", invitedBy: "Adebayo Ogunlesi" },
  { id: "adm-003", name: "Emeka Obi", email: "emeka@kiakia.ng", role: "finance_admin" as AdminRole, isActive: true, lastLoginAt: hoursAgo(4), createdAt: "2025-03-01T00:00:00Z", invitedBy: "Adebayo Ogunlesi" },
  { id: "adm-004", name: "Halima Bello", email: "halima@kiakia.ng", role: "support_admin" as AdminRole, isActive: true, lastLoginAt: daysAgo(1), createdAt: "2025-04-10T00:00:00Z", invitedBy: "Adebayo Ogunlesi" },
  { id: "adm-005", name: "David Okafor", email: "david@kiakia.ng", role: "viewer" as AdminRole, isActive: true, lastLoginAt: daysAgo(3), createdAt: "2025-06-01T00:00:00Z", invitedBy: "Funke Adeyemi" },
  { id: "adm-006", name: "Aisha Mohammed", email: "aisha@kiakia.ng", role: "operations_admin" as AdminRole, isActive: false, lastLoginAt: daysAgo(30), createdAt: "2025-05-20T00:00:00Z", invitedBy: "Adebayo Ogunlesi" },
  { id: "adm-007", name: "Chidi Nwankwo", email: "chidi@kiakia.ng", role: "support_admin" as AdminRole, isActive: true, lastLoginAt: hoursAgo(6), createdAt: "2025-07-15T00:00:00Z", invitedBy: "Funke Adeyemi" },
];

export const MOCK_AUDIT_LOG: AuditLogEntry[] = [
  { id: "aud-001", action: "vendor.suspended", description: "Suspended vendor 'Sweet Sensation' for failed health inspection", performedBy: "Funke Adeyemi", performedByRole: "operations_admin" as AdminRole, targetType: "vendor", targetId: "vend-005", ipAddress: "105.112.34.56", timestamp: hoursAgo(1) },
  { id: "aud-002", action: "order.refunded", description: "Issued refund of NGN 12,500 for order #3419 (duplicate charge)", performedBy: "Adebayo Ogunlesi", performedByRole: "super_admin" as AdminRole, targetType: "order", targetId: "aord-004", ipAddress: "105.112.34.57", timestamp: hoursAgo(2) },
  { id: "aud-003", action: "user.banned", description: "Banned user 'Solomon Adegoke' for repeated fraudulent chargebacks", performedBy: "Funke Adeyemi", performedByRole: "operations_admin" as AdminRole, targetType: "user", targetId: "cust-013", ipAddress: "105.112.34.56", timestamp: hoursAgo(3) },
  { id: "aud-004", action: "rider.suspended", description: "Suspended rider 'Segun Adekunle' for customer complaints", performedBy: "Funke Adeyemi", performedByRole: "operations_admin" as AdminRole, targetType: "rider", targetId: "rider-008", ipAddress: "105.112.34.56", timestamp: hoursAgo(5) },
  { id: "aud-005", action: "promo.created", description: "Created promo code WEEKEND500 — NGN 500 off weekend orders", performedBy: "Adebayo Ogunlesi", performedByRole: "super_admin" as AdminRole, targetType: "promo", targetId: "promo-005", ipAddress: "105.112.34.57", timestamp: hoursAgo(8) },
  { id: "aud-006", action: "settings.updated", description: "Updated default commission rate from 12% to 15%", performedBy: "Adebayo Ogunlesi", performedByRole: "super_admin" as AdminRole, targetType: "setting", targetId: "ps-001", ipAddress: "105.112.34.57", timestamp: daysAgo(1) },
  { id: "aud-007", action: "vendor.approved", description: "Approved vendor application for 'Mama Cass'", performedBy: "Funke Adeyemi", performedByRole: "operations_admin" as AdminRole, targetType: "vendor", targetId: "vapp-003", ipAddress: "105.112.34.56", timestamp: daysAgo(1) },
  { id: "aud-008", action: "payout.processed", description: "Processed weekly vendor payouts — 7 vendors, total NGN 6,350,000", performedBy: "Emeka Obi", performedByRole: "finance_admin" as AdminRole, targetType: "payout", ipAddress: "105.112.34.58", timestamp: daysAgo(1) },
  { id: "aud-009", action: "feature_flag.toggled", description: "Disabled feature flag 'Group Orders'", performedBy: "Adebayo Ogunlesi", performedByRole: "super_admin" as AdminRole, targetType: "feature_flag", targetId: "ff-005", ipAddress: "105.112.34.57", timestamp: daysAgo(2) },
  { id: "aud-010", action: "admin.invited", description: "Invited 'Chidi Nwankwo' as support_admin", performedBy: "Funke Adeyemi", performedByRole: "operations_admin" as AdminRole, targetType: "admin", targetId: "adm-007", ipAddress: "105.112.34.56", timestamp: daysAgo(3) },
  { id: "aud-011", action: "maintenance.scheduled", description: "Scheduled 'Database Migration v4.2' for Feb 10", performedBy: "Adebayo Ogunlesi", performedByRole: "super_admin" as AdminRole, targetType: "maintenance", targetId: "mw-001", ipAddress: "105.112.34.57", timestamp: daysAgo(3) },
  { id: "aud-012", action: "rider.approved", description: "Approved rider application for 'Yinka Babalola'", performedBy: "Funke Adeyemi", performedByRole: "operations_admin" as AdminRole, targetType: "rider", targetId: "rapp-003", ipAddress: "105.112.34.56", timestamp: daysAgo(4) },
  { id: "aud-013", action: "admin.deactivated", description: "Deactivated admin account 'Aisha Mohammed'", performedBy: "Adebayo Ogunlesi", performedByRole: "super_admin" as AdminRole, targetType: "admin", targetId: "adm-006", ipAddress: "105.112.34.57", timestamp: daysAgo(5) },
  { id: "aud-014", action: "campaign.created", description: "Created campaign 'Weekend Warrior' with budget NGN 3,000,000", performedBy: "Adebayo Ogunlesi", performedByRole: "super_admin" as AdminRole, targetType: "campaign", targetId: "camp-004", ipAddress: "105.112.34.57", timestamp: daysAgo(5) },
  { id: "aud-015", action: "order.escalated", description: "Escalated order #3410 dispute to super admin", performedBy: "Halima Bello", performedByRole: "support_admin" as AdminRole, targetType: "order", targetId: "aord-013", ipAddress: "105.112.34.59", timestamp: daysAgo(6) },
];
