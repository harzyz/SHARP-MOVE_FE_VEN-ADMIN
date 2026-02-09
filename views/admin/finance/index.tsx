"use client";

import { Tabs } from "@/components/ui";
import { useState } from "react";
import { MOCK_REVENUE_SUMMARY, MOCK_PLATFORM_TRANSACTIONS, MOCK_VENDOR_PAYOUT_SUMMARIES } from "@/lib/mock-data";
import { RevenueSummaryGrid } from "./revenue-summary";
import { TransactionTable } from "./transaction-table";
import { VendorPayouts } from "./vendor-payouts";

type FinanceTab = "overview" | "transactions" | "payouts";

export function AdminFinanceView() {
  const [activeTab, setActiveTab] = useState<FinanceTab>("overview");

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-foreground sm:text-xl">Finance</h1>
          <p className="mt-1 text-sm text-foreground-muted">
            Revenue tracking, transactions, and vendor payouts
          </p>
        </div>
      </div>

      <div className="mt-5">
        <Tabs
          tabs={[
            { key: "overview", label: "Revenue Overview" },
            { key: "transactions", label: "Transactions" },
            { key: "payouts", label: "Vendor Payouts" },
          ]}
          activeTab={activeTab}
          onTabChange={(key) => setActiveTab(key as FinanceTab)}
        />
      </div>

      {activeTab === "overview" && (
        <div className="mt-4">
          <RevenueSummaryGrid summary={MOCK_REVENUE_SUMMARY} />
        </div>
      )}

      {activeTab === "transactions" && (
        <div className="mt-4 rounded-xl border border-border bg-background shadow-xs">
          <TransactionTable transactions={MOCK_PLATFORM_TRANSACTIONS} />
        </div>
      )}

      {activeTab === "payouts" && (
        <div className="mt-4 rounded-xl border border-border bg-background shadow-xs">
          <VendorPayouts payouts={MOCK_VENDOR_PAYOUT_SUMMARIES} />
        </div>
      )}
    </div>
  );
}
