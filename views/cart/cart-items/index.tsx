"use client";

import { QuantityStepper } from "@/components/ui";
import { cn, formatCurrency } from "@/lib/utils";
import { useCart } from "@/contexts";
import type { CartGroup } from "@/types/ordering";

export interface CartItemsProps {
  groups: CartGroup[];
  className?: string;
}

export function CartItems({ groups, className }: CartItemsProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className={cn("space-y-4", className)}>
      {groups.map((group) => (
        <div key={group.restaurantId} className="rounded-xl border border-border bg-background p-4">
          {/* Restaurant header */}
          <div className="mb-3 flex items-center justify-between border-b border-border pb-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground sm:text-base">
                {group.restaurantName}
              </h3>
              <p className="text-xs text-foreground-muted">
                Delivery: {formatCurrency(group.deliveryFee)}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-3">
            {group.items.map((cartItem) => (
              <div key={cartItem.menuItem.id} className="flex gap-3">
                {/* Image placeholder */}
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-background-muted text-xs text-foreground-muted">
                  {cartItem.menuItem.name.charAt(0)}
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="truncate text-sm font-medium text-foreground">
                        {cartItem.menuItem.name}
                      </h4>
                      {cartItem.specialInstructions && (
                        <p className="truncate text-xs text-foreground-muted">
                          {cartItem.specialInstructions}
                        </p>
                      )}
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-foreground">
                      {formatCurrency(cartItem.menuItem.price * cartItem.quantity)}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-3">
                    <QuantityStepper
                      value={cartItem.quantity}
                      min={0}
                      onChange={(val) => {
                        if (val <= 0) {
                          removeItem(cartItem.menuItem.id);
                        } else {
                          updateQuantity(cartItem.menuItem.id, val);
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(cartItem.menuItem.id)}
                      className="text-xs text-red-500 transition-colors hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
