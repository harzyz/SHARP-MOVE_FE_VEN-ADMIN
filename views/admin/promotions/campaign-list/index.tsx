"use client";

import { StatusBadge, SharpmoveButton } from "@/components/ui";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Campaign, PromoStatus } from "@/types";

interface CampaignListProps {
  campaigns: Campaign[];
  onPause: (campaignId: string) => void;
  onActivate: (campaignId: string) => void;
}

const statusColorMap: Record<PromoStatus, "success" | "warning" | "error" | "info" | "neutral"> = {
  active: "success",
  scheduled: "info",
  expired: "error",
  paused: "neutral",
};

export function CampaignList({ campaigns, onPause, onActivate }: CampaignListProps) {
  if (campaigns.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-sm text-foreground-muted">
        No campaigns found
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {campaigns.map((campaign) => {
        const budgetPct = campaign.budget > 0
          ? Math.min((campaign.spent / campaign.budget) * 100, 100)
          : 0;
        const isActive = campaign.status === "active";
        const isExpired = campaign.status === "expired";
        const conversionRate = campaign.impressions > 0
          ? ((campaign.conversions / campaign.impressions) * 100).toFixed(1)
          : "0.0";

        return (
          <div
            key={campaign.id}
            className="rounded-xl border border-border bg-background p-4 shadow-xs"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-bold text-foreground">
                  {campaign.name}
                </h3>
                <p className="mt-0.5 text-xs text-foreground-muted line-clamp-2">
                  {campaign.description}
                </p>
              </div>
              <StatusBadge
                label={campaign.status}
                colorScheme={statusColorMap[campaign.status]}
              />
            </div>

            {/* Budget bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">Budget</span>
                <span className="text-foreground-muted">
                  {formatCurrency(campaign.spent)} / {formatCurrency(campaign.budget)}
                </span>
              </div>
              <div className="mt-1.5 h-2 w-full rounded-full bg-neutral-200">
                <div
                  className={`h-2 rounded-full transition-all ${
                    budgetPct >= 90 ? "bg-error-500" : budgetPct >= 70 ? "bg-warning-500" : "bg-success-500"
                  }`}
                  style={{ width: `${budgetPct}%` }}
                />
              </div>
            </div>

            {/* Stats grid */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-foreground-muted">
                  Impressions
                </p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">
                  {campaign.impressions.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-foreground-muted">
                  Conversions
                </p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">
                  {campaign.conversions.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-foreground-muted">
                  Conv. Rate
                </p>
                <p className="mt-0.5 text-sm font-semibold text-foreground">
                  {conversionRate}%
                </p>
              </div>
            </div>

            {/* Meta */}
            <div className="mt-4 space-y-2 border-t border-border pt-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground-muted">Target Audience</span>
                <span className="font-medium text-foreground">{campaign.targetAudience}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground-muted">Period</span>
                <span className="text-foreground">
                  {formatDate(campaign.startDate)} &ndash; {formatDate(campaign.endDate)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground-muted">Promo Codes</span>
                <span className="font-medium text-foreground">
                  {campaign.promoCodes.length} code{campaign.promoCodes.length !== 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Actions */}
            {!isExpired && (
              <div className="mt-4">
                <SharpmoveButton
                  size="sm"
                  variant="outline"
                  colorScheme={isActive ? "warning" : "success"}
                  fullWidth
                  onClick={() =>
                    isActive ? onPause(campaign.id) : onActivate(campaign.id)
                  }
                >
                  {isActive ? "Pause Campaign" : "Activate Campaign"}
                </SharpmoveButton>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
