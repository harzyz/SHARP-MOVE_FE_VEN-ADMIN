import type { CustomerAddress } from "@/types";

interface CustomerAddressesSectionProps {
  addresses: CustomerAddress[];
}

export function CustomerAddressesSection({ addresses }: CustomerAddressesSectionProps) {
  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
      <h3 className="text-sm font-semibold text-foreground">Saved Addresses</h3>
      <div className="mt-3 space-y-2">
        {addresses.length === 0 ? (
          <p className="py-2 text-sm text-foreground-muted">No saved addresses</p>
        ) : (
          addresses.map((addr) => (
            <div
              key={addr.id}
              className="flex items-start gap-2 rounded-lg border border-border p-3"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="mt-0.5 size-4 shrink-0 text-foreground-muted"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                />
              </svg>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{addr.label}</p>
                  {addr.isDefault && (
                    <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                      Default
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-foreground-muted">{addr.address}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
