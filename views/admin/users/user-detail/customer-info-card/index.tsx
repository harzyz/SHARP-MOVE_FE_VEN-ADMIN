import { StatusBadge } from "@/components/ui";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { CustomerUser } from "@/types";

interface CustomerInfoCardProps {
  customer: CustomerUser;
}

const statusColorMap: Record<string, "success" | "warning" | "error" | "neutral"> = {
  active: "success",
  suspended: "warning",
  banned: "error",
  deactivated: "neutral",
};

export function CustomerInfoCard({ customer }: CustomerInfoCardProps) {
  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-800">
            {customer.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">{customer.name}</h2>
            <p className="text-sm text-foreground-muted">{customer.email}</p>
          </div>
        </div>
        <StatusBadge label={customer.accountStatus} colorScheme={statusColorMap[customer.accountStatus] || "neutral"} />
      </div>

      {customer.isFraudFlagged && (
        <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3">
          <p className="text-xs font-semibold text-red-700">Fraud Flagged</p>
          <p className="mt-0.5 text-xs text-red-600">{customer.fraudFlagReason}</p>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div>
          <p className="text-xs text-foreground-muted">Phone</p>
          <p className="text-sm font-medium text-foreground">{customer.phone}</p>
        </div>
        <div>
          <p className="text-xs text-foreground-muted">Joined</p>
          <p className="text-sm font-medium text-foreground">
            {formatDate(customer.joinedAt, { year: "numeric", month: "short", day: "numeric" })}
          </p>
        </div>
        <div>
          <p className="text-xs text-foreground-muted">Total Orders</p>
          <p className="text-sm font-medium text-foreground">{customer.totalOrders}</p>
        </div>
        <div>
          <p className="text-xs text-foreground-muted">Total Spent</p>
          <p className="text-sm font-medium text-foreground">{formatCurrency(customer.totalSpent)}</p>
        </div>
      </div>

      {customer.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {customer.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-medium text-foreground-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
