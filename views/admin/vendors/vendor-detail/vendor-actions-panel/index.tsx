"use client";

import { useState } from "react";
import { SharpmoveButton, ConfirmDialog } from "@/components/ui";
import type { AdminVendor } from "@/types";

interface VendorActionsPanelProps {
  vendor: AdminVendor;
  onSuspend: () => void;
  onActivate: () => void;
}

export function VendorActionsPanel({ vendor, onSuspend, onActivate }: VendorActionsPanelProps) {
  const [confirmAction, setConfirmAction] = useState<"suspend" | "activate" | null>(null);

  const confirmConfig = {
    suspend: {
      title: "Suspend Vendor",
      message: `Are you sure you want to suspend ${vendor.name}? They will not be able to receive orders.`,
      label: "Suspend",
      colorScheme: "error" as const,
      onConfirm: onSuspend,
    },
    activate: {
      title: "Activate Vendor",
      message: `Are you sure you want to reactivate ${vendor.name}?`,
      label: "Activate",
      colorScheme: "primary" as const,
      onConfirm: onActivate,
    },
  };

  const current = confirmAction ? confirmConfig[confirmAction] : null;

  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
      <h3 className="text-sm font-semibold text-foreground">Vendor Actions</h3>
      <div className="mt-3 space-y-2">
        {vendor.status === "active" && (
          <SharpmoveButton
            variant="outline"
            colorScheme="error"
            size="sm"
            className="w-full"
            onClick={() => setConfirmAction("suspend")}
          >
            Suspend Vendor
          </SharpmoveButton>
        )}
        {(vendor.status === "suspended" || vendor.status === "inactive") && (
          <SharpmoveButton
            variant="outline"
            colorScheme="success"
            size="sm"
            className="w-full"
            onClick={() => setConfirmAction("activate")}
          >
            Activate Vendor
          </SharpmoveButton>
        )}
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
