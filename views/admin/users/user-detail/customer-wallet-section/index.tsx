import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { CustomerWalletTransaction } from "@/types";

interface CustomerWalletSectionProps {
  balance: number;
  transactions: CustomerWalletTransaction[];
}

export function CustomerWalletSection({ balance, transactions }: CustomerWalletSectionProps) {
  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Wallet</h3>
        <p className="text-base font-bold text-foreground">{formatCurrency(balance)}</p>
      </div>

      <div className="mt-3">
        {transactions.length === 0 ? (
          <p className="py-4 text-center text-sm text-foreground-muted">No transactions</p>
        ) : (
          <div className="space-y-0">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between border-b border-border py-2.5 last:border-b-0"
              >
                <div>
                  <p className="text-sm text-foreground">{tx.description}</p>
                  <p className="text-xs text-foreground-muted">{formatRelativeTime(tx.timestamp)}</p>
                </div>
                <span
                  className={cn(
                    "text-sm font-medium",
                    tx.type === "credit" ? "text-green-600" : "text-red-500"
                  )}
                >
                  {tx.type === "credit" ? "+" : "-"}{formatCurrency(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
