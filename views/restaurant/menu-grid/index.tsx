"use client";

import { SharpmoveButton } from "@/components/ui";
import { cn, formatCurrency } from "@/lib/utils";
import { useCart } from "@/contexts";
import type { MenuItem } from "@/types/ordering";

export interface MenuGridProps {
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
  className?: string;
}

export function MenuGrid({ items, onItemClick, className }: MenuGridProps) {
  const { addItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-foreground-muted">
        No items in this category.
      </div>
    );
  }

  return (
    <section className={cn("mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8", className)}>
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => item.isAvailable && onItemClick(item)}
            className={cn(
              "flex gap-3 rounded-xl border border-border bg-background p-3 transition-shadow sm:flex-col sm:p-4",
              item.isAvailable
                ? "cursor-pointer hover:shadow-md"
                : "opacity-50"
            )}
          >
            {/* Image placeholder */}
            <div className="flex size-20 shrink-0 items-center justify-center rounded-lg bg-background-muted text-xs text-foreground-muted sm:h-32 sm:w-full">
              {item.name.charAt(0)}
            </div>

            {/* Info */}
            <div className="flex min-w-0 flex-1 flex-col">
              <h3 className="text-sm font-semibold text-foreground sm:text-base">
                {item.name}
              </h3>
              <p className="mt-0.5 line-clamp-2 text-xs text-foreground-muted">
                {item.description}
              </p>
              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="text-sm font-bold text-foreground">
                  {formatCurrency(item.price)}
                </span>
                {item.isAvailable ? (
                  <SharpmoveButton
                    size="sm"
                    variant="soft"
                    colorScheme="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem(item);
                    }}
                  >
                    Add
                  </SharpmoveButton>
                ) : (
                  <span className="text-xs font-medium text-foreground-muted">
                    Unavailable
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
