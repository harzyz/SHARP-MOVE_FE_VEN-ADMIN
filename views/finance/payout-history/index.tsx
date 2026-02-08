"use client";

import { StatusBadge } from "@/components/ui";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { PayoutRecord, PayoutStatus } from "@/types";

interface PayoutHistoryProps {
  payouts: PayoutRecord[];
  onViewDetail: (payout: PayoutRecord) => void;
}

const statusBadgeConfig: Record<
  PayoutStatus,
  { label: string; colorScheme: "info" | "warning" | "success" | "error" | "neutral" }
> = {
  paid: { label: "Paid", colorScheme: "success" },
  processing: { label: "Processing", colorScheme: "warning" },
  pending: { label: "Pending", colorScheme: "info" },
};

function formatPeriod(start: string, end: string): string {
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  return `${formatDate(start, opts)} – ${formatDate(end, opts)}`;
}

export function PayoutHistory({ payouts, onViewDetail }: PayoutHistoryProps) {
  return (
    <div className="rounded-xl border border-border bg-background shadow-xs">
      <div className="px-4 py-3">
        <h3 className="text-sm font-semibold text-foreground">Payout History</h3>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block">
        <table className="w-full">
          <thead>
            <tr className="border-y border-border text-left text-xs font-semibold uppercase tracking-wider text-foreground-muted">
              <th className="px-4 py-2">Period</th>
              <th className="px-4 py-2">Gross Sales</th>
              <th className="px-4 py-2">Net Payout</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {payouts.map((payout) => {
              const badge = statusBadgeConfig[payout.status];
              return (
                <tr key={payout.id} className="hover:bg-background-muted/50">
                  <td className="px-4 py-3 text-sm text-foreground">
                    {formatPeriod(payout.periodStart, payout.periodEnd)}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {formatCurrency(payout.grossSales)}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-foreground">
                    {formatCurrency(payout.netPayout)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge label={badge.label} colorScheme={badge.colorScheme} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => onViewDetail(payout)}
                      className="text-sm font-medium text-primary-600 hover:text-primary-700"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="divide-y divide-border sm:hidden">
        {payouts.map((payout) => {
          const badge = statusBadgeConfig[payout.status];
          return (
            <button
              key={payout.id}
              type="button"
              onClick={() => onViewDetail(payout)}
              className="w-full px-4 py-3 text-left hover:bg-background-muted/50"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">
                  {formatPeriod(payout.periodStart, payout.periodEnd)}
                </span>
                <StatusBadge label={badge.label} colorScheme={badge.colorScheme} />
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs text-foreground-muted">Net Payout</span>
                <span className="text-sm font-semibold text-foreground">
                  {formatCurrency(payout.netPayout)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
