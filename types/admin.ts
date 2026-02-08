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
