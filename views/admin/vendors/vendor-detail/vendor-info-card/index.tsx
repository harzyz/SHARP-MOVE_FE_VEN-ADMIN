import { StatusBadge } from "@/components/ui";
import { formatDate } from "@/lib/utils";
import type { AdminVendor } from "@/types";

interface VendorInfoCardProps {
  vendor: AdminVendor;
}

const statusColorMap: Record<string, "success" | "warning" | "error" | "neutral"> = {
  active: "success",
  suspended: "error",
  inactive: "neutral",
  pending_approval: "warning",
};

export function VendorInfoCard({ vendor }: VendorInfoCardProps) {
  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-800">
            {vendor.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">{vendor.name}</h2>
            <p className="text-sm text-foreground-muted">{vendor.ownerName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge label={vendor.status.replace(/_/g, " ")} colorScheme={statusColorMap[vendor.status] || "neutral"} />
          {vendor.isOpen && (
            <span className="rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-bold text-green-700">OPEN</span>
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div>
          <p className="text-xs text-foreground-muted">Email</p>
          <p className="text-sm text-foreground">{vendor.email}</p>
        </div>
        <div>
          <p className="text-xs text-foreground-muted">Phone</p>
          <p className="text-sm text-foreground">{vendor.phone}</p>
        </div>
        <div>
          <p className="text-xs text-foreground-muted">Joined</p>
          <p className="text-sm text-foreground">
            {formatDate(vendor.joinedAt, { year: "numeric", month: "short", day: "numeric" })}
          </p>
        </div>
        <div>
          <p className="text-xs text-foreground-muted">Cuisine</p>
          <p className="text-sm text-foreground">{vendor.cuisineTypes.join(", ")}</p>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-xs text-foreground-muted">Address</p>
        <p className="text-sm text-foreground">{vendor.address}</p>
      </div>

      {/* Rating */}
      <div className="mt-3 flex items-center gap-2">
        <div className="flex items-center gap-1">
          <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 text-amber-400">
            <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
          </svg>
          <span className="text-sm font-medium text-foreground">{vendor.rating.toFixed(1)}</span>
        </div>
        <span className="text-xs text-foreground-muted">({vendor.totalReviews} reviews)</span>
      </div>
    </div>
  );
}
