// ============================================
// ADMIN AUTH TYPES
// ============================================

export type AdminRole =
  | "super_admin"
  | "operations_admin"
  | "finance_admin"
  | "support_admin"
  | "viewer";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  avatarUrl?: string;
  lastLoginAt: string;
  isActive: boolean;
  createdAt: string;
}

// ============================================
// ADMIN OVERVIEW / SYSTEM HEALTH TYPES
// ============================================

export interface AdminKPI {
  id: string;
  label: string;
  value: number;
  previousValue?: number;
  format: "currency" | "number" | "percentage" | "duration";
  trend?: "up" | "down" | "flat";
  trendPercentage?: number;
}

export type SystemAlertSeverity = "critical" | "warning" | "info";

export interface SystemAlert {
  id: string;
  severity: SystemAlertSeverity;
  title: string;
  message: string;
  timestamp: string;
  isResolved: boolean;
}

export type AdminActivityType =
  | "new_user_signup"
  | "new_vendor_application"
  | "order_flagged"
  | "payout_processed"
  | "system_alert"
  | "vendor_approved"
  | "vendor_suspended"
  | "order_escalated"
  | "user_banned";

export interface AdminActivityEvent {
  id: string;
  type: AdminActivityType;
  message: string;
  timestamp: string;
  entityId?: string;
  entityType?: "user" | "vendor" | "order" | "rider";
}

// ============================================
// USER MANAGEMENT TYPES
// ============================================

export type CustomerAccountStatus = "active" | "suspended" | "banned" | "deactivated";

export interface CustomerAddress {
  id: string;
  label: string;
  address: string;
  isDefault: boolean;
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  accountStatus: CustomerAccountStatus;
  joinedAt: string;
  lastActiveAt: string;
  totalOrders: number;
  totalSpent: number;
  walletBalance: number;
  isFraudFlagged: boolean;
  fraudFlagReason?: string;
  addresses: CustomerAddress[];
  tags: string[];
}

export interface CustomerOrderHistory {
  orderId: string;
  orderNumber: string;
  vendorName: string;
  total: number;
  status: string;
  placedAt: string;
}

export interface CustomerWalletTransaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  timestamp: string;
  balanceAfter: number;
}

// ============================================
// ADMIN ORDER MANAGEMENT TYPES
// ============================================

export type AdminOrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "picked_up"
  | "on_the_way"
  | "delivered"
  | "cancelled"
  | "disputed"
  | "refunded";

export type AdminOrderPriority = "normal" | "high" | "urgent";

export interface AdminOrderItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  modifiers?: string[];
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  status: AdminOrderStatus;
  priority: AdminOrderPriority;
  customerName: string;
  customerId: string;
  vendorName: string;
  vendorId: string;
  riderName?: string;
  riderId?: string;
  items: AdminOrderItem[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  discount: number;
  total: number;
  paymentMethod: "card" | "transfer" | "wallet" | "cash";
  paymentStatus: "paid" | "pending" | "refunded" | "failed";
  deliveryAddress: string;
  specialInstructions?: string;
  placedAt: string;
  confirmedAt?: string;
  prepStartedAt?: string;
  readyAt?: string;
  pickedUpAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
  isDisputed: boolean;
  disputeReason?: string;
  adminNotes?: string;
}

export interface AdminOrderTimelineEvent {
  id: string;
  orderId: string;
  event: string;
  description: string;
  timestamp: string;
  actor: string;
  actorRole: "system" | "customer" | "vendor" | "rider" | "admin";
}

export type DisputeStatus = "open" | "investigating" | "resolved" | "escalated";

export interface OrderDispute {
  id: string;
  orderId: string;
  status: DisputeStatus;
  reason: string;
  description: string;
  filedBy: string;
  filedAt: string;
  resolvedAt?: string;
  resolution?: string;
  adminAssignee?: string;
}

// ============================================
// VENDOR MANAGEMENT TYPES
// ============================================

export type VendorOnboardingStatus =
  | "application_submitted"
  | "documents_under_review"
  | "site_inspection_pending"
  | "approved"
  | "rejected";

export type AdminVendorStatus = "active" | "suspended" | "inactive" | "pending_approval";

export interface AdminVendor {
  id: string;
  name: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  cuisineTypes: string[];
  status: AdminVendorStatus;
  onboardingStatus: VendorOnboardingStatus;
  logoUrl?: string;
  joinedAt: string;
  totalOrders: number;
  totalRevenue: number;
  rating: number;
  totalReviews: number;
  commissionRate: number;
  isOpen: boolean;
  lastActiveAt: string;
  performanceScore: number;
  avgPrepTime: number;
  cancellationRate: number;
  currentBalance: number;
  totalPaid: number;
}

export interface VendorDocument {
  id: string;
  name: string;
  type: "business_registration" | "food_license" | "id_card" | "bank_statement" | "other";
  status: "pending" | "approved" | "rejected";
  uploadedAt: string;
}

export interface VendorApplication {
  id: string;
  vendorName: string;
  ownerName: string;
  email: string;
  phone: string;
  address: string;
  cuisineTypes: string[];
  status: VendorOnboardingStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
  documents: VendorDocument[];
}

export interface VendorPerformanceMetric {
  label: string;
  value: number;
  format: "number" | "percentage" | "currency" | "duration";
  trend?: "up" | "down" | "flat";
}

// ============================================
// SHARED ADMIN TYPES
// ============================================

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface TableSortConfig {
  key: string;
  direction: "asc" | "desc";
}

export interface TableFilterConfig {
  key: string;
  value: string | string[];
  operator: "eq" | "contains" | "in" | "gte" | "lte";
}

export interface DateRangeFilter {
  startDate: string;
  endDate: string;
}

// ============================================
// RIDER MANAGEMENT TYPES
// ============================================

export type RiderStatus = "online" | "offline" | "on_delivery" | "suspended";

export type RiderOnboardingStatus =
  | "application_submitted"
  | "documents_under_review"
  | "training_pending"
  | "approved"
  | "rejected";

export interface RiderZone {
  id: string;
  name: string;
  ridersOnline: number;
  ridersTotal: number;
  pendingDeliveries: number;
}

export interface Rider {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: RiderStatus;
  onboardingStatus: RiderOnboardingStatus;
  zone: string;
  vehicleType: "motorcycle" | "bicycle" | "car";
  licensePlate?: string;
  joinedAt: string;
  lastActiveAt: string;
  totalDeliveries: number;
  totalEarnings: number;
  currentBalance: number;
  rating: number;
  totalRatings: number;
  avgDeliveryTime: number;
  completionRate: number;
  isAvailable: boolean;
}

export interface RiderApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicleType: "motorcycle" | "bicycle" | "car";
  zone: string;
  status: RiderOnboardingStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}

export interface RiderPayout {
  id: string;
  riderId: string;
  riderName: string;
  amount: number;
  deliveries: number;
  period: string;
  status: "pending" | "processing" | "completed" | "failed";
  paidAt?: string;
}

// ============================================
// FINANCE TYPES
// ============================================

export interface PlatformTransaction {
  id: string;
  type: "order_payment" | "vendor_payout" | "rider_payout" | "refund" | "commission" | "promo_cost";
  description: string;
  amount: number;
  direction: "inflow" | "outflow";
  entityId?: string;
  entityName?: string;
  timestamp: string;
  status: "completed" | "pending" | "failed";
}

export interface RevenueSummary {
  totalRevenue: number;
  totalCommissions: number;
  totalDeliveryFees: number;
  totalServiceFees: number;
  totalRefunds: number;
  totalPromoCosts: number;
  netRevenue: number;
  period: string;
}

export interface VendorPayoutSummary {
  id: string;
  vendorId: string;
  vendorName: string;
  amount: number;
  ordersCount: number;
  commissionDeducted: number;
  period: string;
  status: "pending" | "processing" | "completed" | "failed";
  paidAt?: string;
}

// ============================================
// PROMOTIONS TYPES
// ============================================

export type PromoStatus = "active" | "scheduled" | "expired" | "paused";
export type PromoType = "percentage" | "fixed_amount" | "free_delivery" | "buy_one_get_one";

export interface PromoCode {
  id: string;
  code: string;
  description: string;
  type: PromoType;
  value: number;
  minOrderAmount: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  status: PromoStatus;
  startDate: string;
  endDate: string;
  createdBy: string;
  applicableVendors: string[];
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  status: PromoStatus;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  targetAudience: string;
  promoCodes: string[];
  impressions: number;
  conversions: number;
}

// ============================================
// ANALYTICS TYPES
// ============================================

export interface AnalyticsMetric {
  id: string;
  label: string;
  value: number;
  previousValue: number;
  format: "currency" | "number" | "percentage" | "duration";
  trend: "up" | "down" | "flat";
  trendPercentage: number;
}

export interface AnalyticsChartData {
  label: string;
  datasets: { name: string; values: number[] }[];
  labels: string[];
}

// ============================================
// SUPPORT TYPES
// ============================================

export type TicketStatus = "open" | "in_progress" | "awaiting_response" | "resolved" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "urgent";
export type TicketCategory = "order_issue" | "payment" | "account" | "vendor_complaint" | "rider_complaint" | "technical" | "other";

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  customerName: string;
  customerId: string;
  customerEmail: string;
  assignedTo?: string;
  relatedOrderId?: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  messages: TicketMessage[];
}

export interface TicketMessage {
  id: string;
  sender: string;
  senderRole: "customer" | "admin";
  message: string;
  timestamp: string;
}

// ============================================
// SYSTEM CONFIG TYPES
// ============================================

export interface FeatureFlag {
  id: string;
  key: string;
  label: string;
  description: string;
  isEnabled: boolean;
  updatedAt: string;
  updatedBy: string;
}

export interface MaintenanceWindow {
  id: string;
  title: string;
  description: string;
  scheduledStart: string;
  scheduledEnd: string;
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
  affectedServices: string[];
  createdBy: string;
}

export interface PlatformSetting {
  id: string;
  key: string;
  label: string;
  value: string;
  type: "string" | "number" | "boolean" | "percentage";
  category: "general" | "orders" | "payments" | "delivery" | "notifications";
  description: string;
}

// ============================================
// SECURITY / AUDIT TYPES
// ============================================

export interface AdminUserEntry {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  isActive: boolean;
  lastLoginAt: string;
  createdAt: string;
  invitedBy: string;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  description: string;
  performedBy: string;
  performedByRole: AdminRole;
  targetType?: string;
  targetId?: string;
  ipAddress: string;
  timestamp: string;
}
