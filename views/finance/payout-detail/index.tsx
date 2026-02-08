"use client";

import { Modal, StatusBadge } from "@/components/ui";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { PayoutRecord, PayoutStatus } from "@/types";

interface PayoutDetailProps {
  payout: PayoutRecord | null;
  open: boolean;
  onClose: () => void;
}

const statusBadgeConfig: Record<
  PayoutStatus,
  { label: string; colorScheme: "info" | "warning" | "success" | "error" | "neutral" }
> = {
  paid: { label: "Paid", colorScheme: "success" },
  processing: { label: "Processing", colorScheme: "warning" },
  pending: { label: "Pending", colorScheme: "info" },
};

export function PayoutDetail({ payout, open, onClose }: PayoutDetailProps) {
  if (!payout) return null;
  const badge = statusBadgeConfig[payout.status];
  const dateOpts: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-foreground">Payout Details</h2>
          <StatusBadge label={badge.label} colorScheme={badge.colorScheme} />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-foreground-muted hover:bg-neutral-100"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Period */}
      <div className="mt-4 rounded-lg border border-border p-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">Period</h3>
        <p className="mt-1 text-sm text-foreground">
          {formatDate(payout.periodStart, dateOpts)} – {formatDate(payout.periodEnd, dateOpts)}
        </p>
      </div>

      {/* Breakdown */}
      <div className="mt-4 space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted">Breakdown</h3>
        <div className="flex justify-between text-sm">
          <span className="text-foreground-muted">Gross Sales</span>
          <span className="text-foreground">{formatCurrency(payout.grossSales)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-foreground-muted">Commission (15%)</span>
          <span className="text-error-600">-{formatCurrency(payout.commission)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-foreground-muted">Delivery Fees (Collected)</span>
          <span className="text-foreground-muted">-{formatCurrency(payout.deliveryFees)}</span>
        </div>
        <div className="flex justify-between border-t border-border pt-2 text-sm font-bold">
          <span className="text-foreground">Net Payout</span>
          <span className="text-foreground">{formatCurrency(payout.netPayout)}</span>
        </div>
      </div>

      {/* Transaction Ref */}
      {payout.transactionRef && (
        <div className="mt-4 rounded-lg border border-border p-3">
          <p className="text-xs text-foreground-muted">Transaction Reference</p>
          <p className="mt-0.5 text-sm font-mono text-foreground">{payout.transactionRef}</p>
        </div>
      )}

      {/* Paid At */}
      {payout.paidAt && (
        <div className="mt-3 text-sm text-foreground-muted">
          Paid on {formatDate(payout.paidAt, { ...dateOpts, hour: "2-digit", minute: "2-digit" })}
        </div>
      )}
    </Modal>
  );
}
