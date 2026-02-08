"use client";

import { use } from "react";
import Link from "next/link";
import { useAdminVendors } from "@/contexts";
import { VendorInfoCard } from "./vendor-info-card";
import { VendorPerformanceSection } from "./vendor-performance-section";
import { VendorFinancialSection } from "./vendor-financial-section";
import { VendorCommissionSettings } from "./vendor-commission-settings";
import { VendorActionsPanel } from "./vendor-actions-panel";

interface AdminVendorDetailViewProps {
  params: Promise<{ vendorId: string }>;
}

export function AdminVendorDetailView({ params }: AdminVendorDetailViewProps) {
  const { vendorId } = use(params);
  const { getVendor, suspendVendor, activateVendor, updateCommission } = useAdminVendors();

  const vendor = getVendor(vendorId);

  if (!vendor) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <p className="text-sm text-foreground-muted">Vendor not found</p>
        <Link href="/admin/vendors" className="mt-2 text-sm text-primary hover:underline">
          Back to Vendors
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      {/* Back link */}
      <Link
        href="/admin/vendors"
        className="inline-flex items-center gap-1 text-sm text-foreground-muted hover:text-foreground"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back to Vendors
      </Link>

      <div className="mt-4 grid gap-5 lg:grid-cols-3">
        {/* Left column: Info + Performance + Financials */}
        <div className="space-y-5 lg:col-span-2">
          <VendorInfoCard vendor={vendor} />
          <VendorPerformanceSection vendor={vendor} />
          <VendorFinancialSection vendor={vendor} />
        </div>

        {/* Right column: Commission + Actions */}
        <div className="space-y-5">
          <VendorCommissionSettings
            currentRate={vendor.commissionRate}
            onUpdate={(rate) => updateCommission(vendorId, rate)}
          />
          <VendorActionsPanel
            vendor={vendor}
            onSuspend={() => suspendVendor(vendorId)}
            onActivate={() => activateVendor(vendorId)}
          />
        </div>
      </div>
    </div>
  );
}
