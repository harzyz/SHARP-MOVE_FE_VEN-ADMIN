export interface MenuCategory {
  id: string;
  label: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface CartGroup {
  restaurantId: string;
  restaurantName: string;
  deliveryFee: number;
  items: CartItem[];
}

export type PaymentMethod = "card" | "transfer" | "wallet" | "cash";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "on-the-way"
  | "delivered";

export interface OrderSummary {
  id: string;
  restaurantName: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  deliveryAddress: string;
  deliveryInstructions?: string;
  status: OrderStatus;
  estimatedDelivery: string;
  placedAt: string;
}
