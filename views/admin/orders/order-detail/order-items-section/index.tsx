import { formatCurrency } from "@/lib/utils";
import type { AdminOrderItem } from "@/types";

interface OrderItemsSectionProps {
  items: AdminOrderItem[];
}

export function OrderItemsSection({ items }: OrderItemsSectionProps) {
  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
      <h3 className="text-sm font-semibold text-foreground">Order Items</h3>
      <div className="mt-3 space-y-0">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b border-border py-2.5 last:border-b-0"
          >
            <div>
              <p className="text-sm text-foreground">{item.name}</p>
              {item.modifiers && item.modifiers.length > 0 && (
                <p className="text-xs text-foreground-muted">{item.modifiers.join(", ")}</p>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm text-foreground">
                {item.quantity} x {formatCurrency(item.unitPrice)}
              </p>
              <p className="text-xs font-medium text-foreground-muted">
                {formatCurrency(item.quantity * item.unitPrice)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
