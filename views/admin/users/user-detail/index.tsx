"use client";

import { use } from "react";
import Link from "next/link";
import { useAdminUsers } from "@/contexts";
import { MOCK_CUSTOMER_ORDER_HISTORY, MOCK_CUSTOMER_WALLET_TRANSACTIONS } from "@/lib/mock-data";
import { CustomerInfoCard } from "./customer-info-card";
import { CustomerOrdersSection } from "./customer-orders-section";
import { CustomerWalletSection } from "./customer-wallet-section";
import { CustomerActionsPanel } from "./customer-actions-panel";
import { CustomerAddressesSection } from "./customer-addresses-section";

interface AdminUserDetailViewProps {
  params: Promise<{ userId: string }>;
}

export function AdminUserDetailView({ params }: AdminUserDetailViewProps) {
  const { userId } = use(params);
  const { getCustomer, suspendCustomer, activateCustomer, banCustomer, flagFraud, clearFraudFlag } = useAdminUsers();

  const customer = getCustomer(userId);
  const orderHistory = MOCK_CUSTOMER_ORDER_HISTORY[userId] || [];
  const walletTransactions = MOCK_CUSTOMER_WALLET_TRANSACTIONS[userId] || [];

  if (!customer) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <p className="text-sm text-foreground-muted">Customer not found</p>
        <Link href="/admin/users" className="mt-2 text-sm text-primary hover:underline">
          Back to Users
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      {/* Back link */}
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-1 text-sm text-foreground-muted hover:text-foreground"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back to Users
      </Link>

      <div className="mt-4 grid gap-5 lg:grid-cols-3">
        {/* Left column: Info + Orders + Wallet */}
        <div className="space-y-5 lg:col-span-2">
          <CustomerInfoCard customer={customer} />
          <CustomerOrdersSection orders={orderHistory} />
          <CustomerWalletSection
            balance={customer.walletBalance}
            transactions={walletTransactions}
          />
        </div>

        {/* Right column: Actions + Addresses */}
        <div className="space-y-5">
          <CustomerActionsPanel
            customer={customer}
            onSuspend={() => suspendCustomer(userId)}
            onActivate={() => activateCustomer(userId)}
            onBan={() => banCustomer(userId)}
            onFlagFraud={(reason) => flagFraud(userId, reason)}
            onClearFraudFlag={() => clearFraudFlag(userId)}
          />
          <CustomerAddressesSection addresses={customer.addresses} />
        </div>
      </div>
    </div>
  );
}
