"use client";

import { ToggleSwitch } from "@/components/ui";
import { formatCurrency } from "@/lib/utils";
import type { VendorMenuItem } from "@/types";

interface MenuItemsTableProps {
  items: VendorMenuItem[];
  onToggleAvailability: (itemId: string) => void;
  onEdit: (item: VendorMenuItem) => void;
  onDelete: (itemId: string) => void;
}

export function MenuItemsTable({
  items,
  onToggleAvailability,
  onEdit,
  onDelete,
}: MenuItemsTableProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-background p-8 text-center shadow-xs">
        <p className="text-sm text-foreground-muted">No items found</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden rounded-xl border border-border bg-background shadow-xs sm:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wider text-foreground-muted">
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Prep Time</th>
              <th className="px-4 py-3">Available</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-background-muted/50">
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-foreground-muted line-clamp-1">{item.description}</p>
                </td>
                <td className="px-4 py-3 text-sm text-foreground">
                  {formatCurrency(item.price)}
                </td>
                <td className="px-4 py-3 text-sm text-foreground-muted">{item.prepTime} min</td>
                <td className="px-4 py-3">
                  <ToggleSwitch
                    checked={item.isAvailable}
                    onChange={() => onToggleAvailability(item.id)}
                    size="sm"
                  />
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      className="rounded-md p-1.5 text-foreground-muted hover:bg-neutral-100 hover:text-foreground"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item.id)}
                      className="rounded-md p-1.5 text-foreground-muted hover:bg-error-50 hover:text-error-600"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-3 sm:hidden">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-border bg-background p-4 shadow-xs">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">{item.name}</p>
                <p className="mt-0.5 text-xs text-foreground-muted line-clamp-2">{item.description}</p>
              </div>
              <ToggleSwitch
                checked={item.isAvailable}
                onChange={() => onToggleAvailability(item.id)}
                size="sm"
              />
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-foreground">{formatCurrency(item.price)}</span>
                <span className="text-xs text-foreground-muted">{item.prepTime} min</span>
              </div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => onEdit(item)}
                  className="rounded-md p-1.5 text-foreground-muted hover:bg-neutral-100"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  className="rounded-md p-1.5 text-foreground-muted hover:bg-error-50 hover:text-error-600"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
