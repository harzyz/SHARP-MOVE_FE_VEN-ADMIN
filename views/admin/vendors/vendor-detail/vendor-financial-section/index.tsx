import { formatCurrency } from "@/lib/utils";
import type { AdminVendor } from "@/types";

interface VendorFinancialSectionProps {
  vendor: AdminVendor;
}

export function VendorFinancialSection({ vendor }: VendorFinancialSectionProps) {
  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
      <h3 className="text-sm font-semibold text-foreground">Financial Overview</h3>
      <div className="mt-3 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-foreground-muted">Total Revenue</p>
          <p className="text-lg font-bold text-foreground">{formatCurrency(vendor.totalRevenue)}</p>
        </div>
        <div>
          <p className="text-xs text-foreground-muted">Current Balance</p>
          <p className="text-lg font-bold text-foreground">{formatCurrency(vendor.currentBalance)}</p>
        </div>
        <div>
          <p className="text-xs text-foreground-muted">Total Paid Out</p>
          <p className="text-sm font-medium text-foreground">{formatCurrency(vendor.totalPaid)}</p>
        </div>
        <div>
          <p className="text-xs text-foreground-muted">Commission Rate</p>
          <p className="text-sm font-medium text-foreground">{vendor.commissionRate}%</p>
        </div>
      </div>
    </div>
  );
}
