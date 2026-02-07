"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { SharpmoveButton } from "@/components/ui";
import { useCart, useOrders } from "@/contexts";
import { RESTAURANTS_NEAR_YOU } from "@/lib/mock-data";
import { formatCurrency, generateId } from "@/lib/utils";
import type { PaymentMethod, OrderSummary as OrderSummaryType } from "@/types/ordering";
import { DeliveryAddress } from "./delivery-address";
import { DeliveryInstructions } from "./delivery-instructions";
import { PaymentMethodPicker } from "./payment-method";
import { OrderSummary } from "./order-summary";
import { OrderSuccessModal } from "./order-success-modal";

export function CheckoutView() {
  const router = useRouter();
  const { items, subtotal, serviceFee, clearCart } = useCart();
  const { placeOrder } = useOrders();

  const [address, setAddress] = useState("");
  const [instructions, setInstructions] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [orderId, setOrderId] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalDeliveryFee = useMemo(() => {
    const restaurantIds = new Set(items.map((i) => i.menuItem.restaurantId));
    let fee = 0;
    for (const rid of restaurantIds) {
      const restaurant = RESTAURANTS_NEAR_YOU.find((r) => r.id === rid);
      fee += restaurant?.deliveryFee ?? 500;
    }
    return fee;
  }, [items]);

  const total = subtotal + totalDeliveryFee + serviceFee;

  // Redirect to cart if empty and no order placed
  if (items.length === 0 && !orderPlaced) {
    router.replace("/cart");
    return null;
  }

  const handlePlaceOrder = () => {
    if (!address.trim()) return;
    const id = generateId("ORD").toUpperCase();

    // Derive restaurant name(s)
    const restaurantIds = [...new Set(items.map((i) => i.menuItem.restaurantId))];
    const restaurantName = restaurantIds
      .map((rid) => RESTAURANTS_NEAR_YOU.find((r) => r.id === rid)?.name ?? "Unknown")
      .join(" & ");

    const order: OrderSummaryType = {
      id,
      restaurantName,
      items: [...items],
      subtotal,
      deliveryFee: totalDeliveryFee,
      serviceFee,
      total,
      paymentMethod,
      deliveryAddress: address,
      deliveryInstructions: instructions || undefined,
      status: "pending",
      estimatedDelivery: "25–35 min",
      placedAt: new Date().toISOString(),
    };

    placeOrder(order);
    setOrderId(id);
    setOrderPlaced(true);
    clearCart();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <h1 className="mb-4 text-xl font-bold text-foreground sm:mb-6 sm:text-2xl">
        Checkout
      </h1>

      <div className="grid gap-4 lg:grid-cols-[1fr_380px] lg:gap-6">
        {/* Left column: form */}
        <div className="space-y-4">
          <DeliveryAddress value={address} onChange={setAddress} />
          <DeliveryInstructions value={instructions} onChange={setInstructions} />
          <PaymentMethodPicker selected={paymentMethod} onSelect={setPaymentMethod} />
        </div>

        {/* Right column: summary + place order */}
        <div className="space-y-4">
          <OrderSummary deliveryFee={totalDeliveryFee} />
          <SharpmoveButton
            colorScheme="primary"
            className="w-full"
            disabled={!address.trim()}
            onClick={handlePlaceOrder}
          >
            Place Order · {formatCurrency(total)}
          </SharpmoveButton>
        </div>
      </div>

      <OrderSuccessModal
        open={orderPlaced}
        orderId={orderId}
        estimatedDelivery="25–35 min"
      />
    </div>
  );
}
