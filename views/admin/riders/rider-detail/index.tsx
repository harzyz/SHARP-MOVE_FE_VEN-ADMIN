"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useAdminRiders } from "@/contexts";
import { StatusBadge, SharpmoveButton, ConfirmDialog } from "@/components/ui";
import { formatCurrency, formatRelativeTime } from "@/lib/utils";
import type { RiderStatus } from "@/types";

interface AdminRiderDetailViewProps {
  params: Promise<{ riderId: string }>;
}

const statusColorMap: Record<RiderStatus, "success" | "warning" | "error" | "info" | "neutral"> = {
  online: "success",
  offline: "neutral",
  on_delivery: "info",
  suspended: "error",
};

const statusLabelMap: Record<RiderStatus, string> = {
  online: "Online",
  offline: "Offline",
  on_delivery: "On Delivery",
  suspended: "Suspended",
};

export function AdminRiderDetailView({ params }: AdminRiderDetailViewProps) {
  const { riderId } = use(params);
  const { getRider, suspendRider, activateRider } = useAdminRiders();
  const [confirmAction, setConfirmAction] = useState<"suspend" | "activate" | null>(null);

  const rider = getRider(riderId);

  if (!rider) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <p className="text-sm text-foreground-muted">Rider not found</p>
        <Link href="/admin/riders" className="mt-2 text-sm text-primary hover:underline">
          Back to Riders
        </Link>
      </div>
    );
  }

  const confirmConfig = {
    suspend: {
      title: "Suspend Rider",
      message: `Are you sure you want to suspend ${rider.name}? They will no longer receive delivery assignments.`,
      label: "Suspend",
      colorScheme: "error" as const,
      onConfirm: () => suspendRider(riderId),
    },
    activate: {
      title: "Activate Rider",
      message: `Are you sure you want to reactivate ${rider.name}?`,
      label: "Activate",
      colorScheme: "primary" as const,
      onConfirm: () => activateRider(riderId),
    },
  };

  const current = confirmAction ? confirmConfig[confirmAction] : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <Link
        href="/admin/riders"
        className="inline-flex items-center gap-1 text-sm text-foreground-muted hover:text-foreground"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back to Riders
      </Link>

      <div className="mt-4 grid gap-5 lg:grid-cols-3">
        {/* Left column: Rider info and stats */}
        <div className="space-y-5 lg:col-span-2">
          {/* Rider profile card */}
          <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-800">
                  {rider.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-base font-semibold text-foreground">{rider.name}</h2>
                  <p className="text-sm text-foreground-muted">{rider.email}</p>
                </div>
              </div>
              <StatusBadge
                label={statusLabelMap[rider.status]}
                colorScheme={statusColorMap[rider.status]}
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div>
                <p className="text-xs text-foreground-muted">Phone</p>
                <p className="text-sm text-foreground">{rider.phone}</p>
              </div>
              <div>
                <p className="text-xs text-foreground-muted">Zone</p>
                <p className="text-sm text-foreground">{rider.zone}</p>
              </div>
              <div>
                <p className="text-xs text-foreground-muted">Vehicle</p>
                <p className="text-sm text-foreground">{rider.vehicleType}</p>
                {rider.licensePlate && (
                  <p className="text-xs text-foreground-muted">{rider.licensePlate}</p>
                )}
              </div>
              <div>
                <p className="text-xs text-foreground-muted">Joined</p>
                <p className="text-sm text-foreground">{formatRelativeTime(rider.joinedAt)}</p>
              </div>
            </div>

            {rider.lastActiveAt && (
              <div className="mt-3">
                <p className="text-xs text-foreground-muted">
                  Last active {formatRelativeTime(rider.lastActiveAt)}
                </p>
              </div>
            )}
          </div>

          {/* Stats grid */}
          <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
            <h3 className="text-sm font-semibold text-foreground">Performance</h3>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              <div className="rounded-lg bg-surface p-3">
                <p className="text-xs text-foreground-muted">Total Deliveries</p>
                <p className="mt-1 text-lg font-bold text-foreground">
                  {rider.totalDeliveries.toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg bg-surface p-3">
                <p className="text-xs text-foreground-muted">Total Earnings</p>
                <p className="mt-1 text-lg font-bold text-foreground">
                  {formatCurrency(rider.totalEarnings)}
                </p>
              </div>
              <div className="rounded-lg bg-surface p-3">
                <p className="text-xs text-foreground-muted">Avg Delivery Time</p>
                <p className="mt-1 text-lg font-bold text-foreground">
                  {rider.avgDeliveryTime} min
                </p>
              </div>
              <div className="rounded-lg bg-surface p-3">
                <p className="text-xs text-foreground-muted">Completion Rate</p>
                <p className="mt-1 text-lg font-bold text-foreground">
                  {rider.completionRate}%
                </p>
              </div>
              <div className="rounded-lg bg-surface p-3">
                <p className="text-xs text-foreground-muted">Rating</p>
                <div className="mt-1 flex items-center gap-1">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4 text-amber-400">
                    <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
                  </svg>
                  <span className="text-lg font-bold text-foreground">{rider.rating.toFixed(1)}</span>
                  <span className="text-xs text-foreground-muted">({rider.totalRatings})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Balance card */}
          <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
            <h3 className="text-sm font-semibold text-foreground">Financials</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-surface p-3">
                <p className="text-xs text-foreground-muted">Current Balance</p>
                <p className="mt-1 text-lg font-bold text-foreground">
                  {formatCurrency(rider.currentBalance)}
                </p>
              </div>
              <div className="rounded-lg bg-surface p-3">
                <p className="text-xs text-foreground-muted">Total Earnings</p>
                <p className="mt-1 text-lg font-bold text-foreground">
                  {formatCurrency(rider.totalEarnings)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Actions */}
        <div className="space-y-5">
          <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
            <h3 className="text-sm font-semibold text-foreground">Rider Actions</h3>
            <div className="mt-3 space-y-2">
              {rider.status !== "suspended" && (
                <SharpmoveButton
                  variant="outline"
                  colorScheme="error"
                  size="sm"
                  className="w-full"
                  onClick={() => setConfirmAction("suspend")}
                >
                  Suspend Rider
                </SharpmoveButton>
              )}
              {rider.status === "suspended" && (
                <SharpmoveButton
                  variant="outline"
                  colorScheme="success"
                  size="sm"
                  className="w-full"
                  onClick={() => setConfirmAction("activate")}
                >
                  Activate Rider
                </SharpmoveButton>
              )}
            </div>
          </div>

          {/* Quick info panel */}
          <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
            <h3 className="text-sm font-semibold text-foreground">Quick Info</h3>
            <div className="mt-3 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-foreground-muted">Availability</span>
                <span className="font-medium text-foreground">
                  {rider.isAvailable ? "Available" : "Unavailable"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground-muted">Vehicle</span>
                <span className="font-medium text-foreground">{rider.vehicleType}</span>
              </div>
              {rider.licensePlate && (
                <div className="flex items-center justify-between">
                  <span className="text-foreground-muted">License Plate</span>
                  <span className="font-medium text-foreground">{rider.licensePlate}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-foreground-muted">Zone</span>
                <span className="font-medium text-foreground">{rider.zone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {current && (
        <ConfirmDialog
          open={!!confirmAction}
          onClose={() => setConfirmAction(null)}
          onConfirm={current.onConfirm}
          title={current.title}
          message={current.message}
          confirmLabel={current.label}
          confirmColorScheme={current.colorScheme}
        />
      )}
    </div>
  );
}
