"use client";

import { useState } from "react";
import { MOCK_PAYOUT_HISTORY, MOCK_BANK_ACCOUNT } from "@/lib/mock-data";
import type { PayoutRecord } from "@/types";
import { BankInfoCard } from "./bank-info-card";
import { PayoutHistory } from "./payout-history";
import { PayoutDetail } from "./payout-detail";

export function FinanceView() {
  const [selectedPayout, setSelectedPayout] = useState<PayoutRecord | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-foreground">Finance</h1>
      <p className="mt-1 text-sm text-foreground-muted">
        Manage payouts and bank information
      </p>

      {/* Bank Info + Payout Schedule */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="space-y-4">
          <BankInfoCard account={MOCK_BANK_ACCOUNT} />
          <div className="rounded-xl border border-border bg-background p-4 shadow-xs">
            <h3 className="text-sm font-semibold text-foreground">Payout Schedule</h3>
            <p className="mt-2 text-sm text-foreground-muted">
              Payouts are processed <span className="font-medium text-foreground">every Monday</span> for the
              previous week&apos;s earnings. Funds arrive within 1-2 business days.
            </p>
          </div>
        </div>
        <div className="lg:col-span-2">
          <PayoutHistory payouts={MOCK_PAYOUT_HISTORY} onViewDetail={setSelectedPayout} />
        </div>
      </div>

      {/* Detail Modal */}
      <PayoutDetail
        payout={selectedPayout}
        open={selectedPayout !== null}
        onClose={() => setSelectedPayout(null)}
      />
    </div>
  );
}
