"use client";

import { useMemo } from "react";
import { useCart } from "@/contexts";
import { RESTAURANTS_NEAR_YOU } from "@/lib/mock-data";
import type { CartGroup } from "@/types/ordering";
import { CartItems } from "./cart-items";
import { PriceBreakdown } from "./price-breakdown";
import { EmptyCart } from "./empty-cart";

export function CartView() {
  const { items, subtotal, serviceFee } = useCart();

  const groups: CartGroup[] = useMemo(() => {
    const map = new Map<string, CartGroup>();
    for (const item of items) {
      const rid = item.menuItem.restaurantId;
      if (!map.has(rid)) {
        const restaurant = RESTAURANTS_NEAR_YOU.find((r) => r.id === rid);
        map.set(rid, {
          restaurantId: rid,
          restaurantName: restaurant?.name ?? "Unknown",
          deliveryFee: restaurant?.deliveryFee ?? 500,
          items: [],
        });
      }
      map.get(rid)!.items.push(item);
    }
    return Array.from(map.values());
  }, [items]);

  const totalDeliveryFee = groups.reduce((sum, g) => sum + g.deliveryFee, 0);

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <h1 className="mb-4 text-xl font-bold text-foreground sm:mb-6 sm:text-2xl">
        Your Cart
      </h1>

      <div className="grid gap-4 lg:grid-cols-[1fr_340px] lg:gap-6">
        <CartItems groups={groups} />
        <PriceBreakdown
          subtotal={subtotal}
          deliveryFee={totalDeliveryFee}
          serviceFee={serviceFee}
        />
      </div>
    </div>
  );
}
