// ============================================
// VENDOR ORDER TYPES
// ============================================

export type VendorOrderStatus =
  | "new"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";

export interface VendorOrderItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  modifiers?: string[];
  specialInstructions?: string;
}

export interface VendorOrder {
  id: string;
  orderNumber: string;
  status: VendorOrderStatus;
  customerName: string;
  customerPhone: string;
  items: VendorOrderItem[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  specialInstructions?: string;
  placedAt: string;
  acceptedAt?: string;
  prepStartedAt?: string;
  readyAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  cancelReason?: string;
  estimatedPrepTime: number;
  deliveryAddress: string;
  paymentMethod: "card" | "transfer" | "wallet" | "cash";
}

// ============================================
// MENU MANAGEMENT TYPES
// ============================================

export interface VendorMenuCategory {
  id: string;
  name: string;
  sortOrder: number;
  itemCount: number;
}

export interface VendorMenuModifier {
  id: string;
  name: string;
  price: number;
}

export interface VendorMenuModifierGroup {
  id: string;
  name: string;
  required: boolean;
  maxSelections: number;
  modifiers: VendorMenuModifier[];
}

export interface VendorMenuItem {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  isAvailable: boolean;
  prepTime: number;
  modifierGroups: VendorMenuModifierGroup[];
  sortOrder: number;
}

// ============================================
// ANALYTICS TYPES
// ============================================

export type DateRangePreset =
  | "today"
  | "yesterday"
  | "last7days"
  | "thisMonth"
  | "custom";

export interface AnalyticsKPI {
  label: string;
  value: number;
  previousValue?: number;
  format: "currency" | "number" | "percentage" | "duration";
}

export interface PopularItem {
  id: string;
  name: string;
  ordersCount: number;
  revenue: number;
}

export interface DailySalesPoint {
  date: string;
  orders: number;
  revenue: number;
}

export interface AnalyticsData {
  kpis: AnalyticsKPI[];
  popularItems: PopularItem[];
  salesTrend: DailySalesPoint[];
}

// ============================================
// FINANCE / PAYOUT TYPES
// ============================================

export type PayoutStatus = "paid" | "pending" | "processing";

export interface PayoutRecord {
  id: string;
  periodStart: string;
  periodEnd: string;
  grossSales: number;
  commission: number;
  deliveryFees: number;
  netPayout: number;
  status: PayoutStatus;
  paidAt?: string;
  transactionRef?: string;
}

export interface BankAccount {
  bankName: string;
  accountName: string;
  accountNumber: string;
  isVerified: boolean;
}

// ============================================
// STORE PROFILE TYPES
// ============================================

export interface OperatingHours {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface StoreProfile {
  id: string;
  name: string;
  description: string;
  cuisineTypes: string[];
  logoUrl?: string;
  coverUrl?: string;
  address: string;
  phone: string;
  email: string;
  isOpen: boolean;
  operatingHours: OperatingHours[];
  deliveryRadius: number;
  minimumOrder: number;
  defaultPrepTime: number;
  rating: number;
  totalReviews: number;
}

// ============================================
// SUPPORT TYPES
// ============================================

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface VendorSupportTicket {
  subject: string;
  category: string;
  message: string;
  orderId?: string;
}

// ============================================
// ACTIVITY FEED TYPE
// ============================================

export type ActivityType =
  | "new_order"
  | "order_accepted"
  | "order_ready"
  | "order_completed"
  | "order_cancelled"
  | "item_out_of_stock"
  | "payout_received";

export interface ActivityEvent {
  id: string;
  type: ActivityType;
  message: string;
  timestamp: string;
  orderId?: string;
}
