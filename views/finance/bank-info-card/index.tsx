"use client";

import { SharpmoveButton } from "@/components/ui";
import type { BankAccount } from "@/types";

interface BankInfoCardProps {
  account: BankAccount;
}

export function BankInfoCard({ account }: BankInfoCardProps) {
  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs">
      <h3 className="text-sm font-semibold text-foreground">Bank Account</h3>
      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground-muted">Bank</span>
          <span className="text-sm font-medium text-foreground">{account.bankName}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground-muted">Account Name</span>
          <span className="text-sm font-medium text-foreground">{account.accountName}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground-muted">Account Number</span>
          <span className="text-sm font-medium text-foreground">{account.accountNumber}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground-muted">Status</span>
          {account.isVerified ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-success-600">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Verified
            </span>
          ) : (
            <span className="text-xs font-semibold text-warning-600">Pending Verification</span>
          )}
        </div>
      </div>
      <div className="mt-4">
        <SharpmoveButton variant="outline" colorScheme="neutral" size="sm" fullWidth>
          Update Bank Details
        </SharpmoveButton>
      </div>
    </div>
  );
}
