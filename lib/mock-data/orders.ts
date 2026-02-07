import { MENU_ITEMS } from "./restaurant-menus";
import type { OrderSummary } from "@/types/ordering";

function cartItem(menuItemId: string, quantity: number) {
  const menuItem = MENU_ITEMS.find((m) => m.id === menuItemId)!;
  return { menuItem, quantity };
}

export const MOCK_ORDER_HISTORY: OrderSummary[] = [
  {
    id: "ORD-HIS001",
    restaurantName: "Mama's Kitchen",
    items: [cartItem("mi-1-1", 2), cartItem("mi-1-6", 1)],
    subtotal: 5800,
    deliveryFee: 500,
    serviceFee: 290,
    total: 6590,
    paymentMethod: "card",
    deliveryAddress: "12 Admiralty Way, Lekki Phase 1, Lagos",
    status: "delivered",
    estimatedDelivery: "20–30 min",
    placedAt: "2026-02-05T14:30:00Z",
  },
  {
    id: "ORD-HIS002",
    restaurantName: "Grill Masters",
    items: [cartItem("mi-2-1", 1), cartItem("mi-2-2", 2)],
    subtotal: 5800,
    deliveryFee: 600,
    serviceFee: 290,
    total: 6690,
    paymentMethod: "transfer",
    deliveryAddress: "5 Ozumba Mbadiwe Ave, Victoria Island, Lagos",
    status: "delivered",
    estimatedDelivery: "25–35 min",
    placedAt: "2026-02-03T18:00:00Z",
  },
  {
    id: "ORD-HIS003",
    restaurantName: "Chicken Republic",
    items: [cartItem("mi-3-1", 1), cartItem("mi-3-3", 1)],
    subtotal: 3600,
    deliveryFee: 400,
    serviceFee: 180,
    total: 4180,
    paymentMethod: "wallet",
    deliveryAddress: "15 Allen Avenue, Ikeja, Lagos",
    status: "on-the-way",
    estimatedDelivery: "15–25 min",
    placedAt: "2026-02-07T12:15:00Z",
  },
  {
    id: "ORD-HIS004",
    restaurantName: "Kilimanjaro",
    items: [cartItem("mi-6-1", 1), cartItem("mi-6-5", 2)],
    subtotal: 7000,
    deliveryFee: 550,
    serviceFee: 350,
    total: 7900,
    paymentMethod: "cash",
    deliveryAddress: "8 Adeola Odeku St, Victoria Island, Lagos",
    status: "preparing",
    estimatedDelivery: "25–35 min",
    placedAt: "2026-02-07T13:00:00Z",
  },
];
