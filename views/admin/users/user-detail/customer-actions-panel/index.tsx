"use client";

import { useState } from "react";
import { SharpmoveButton, ConfirmDialog } from "@/components/ui";
import type { CustomerUser } from "@/types";

interface CustomerActionsPanelProps {
  customer: CustomerUser;
  onSuspend: () => void;
  onActivate: () => void;
  onBan: () => void;
  onFlagFraud: (reason: string) => void;
  onClearFraudFlag: () => void;
}

export function CustomerActionsPanel({
  customer,
  onSuspend,
  onActivate,
  onBan,
  onFlagFraud,
  onClearFraudFlag,
}: CustomerActionsPanelProps) {
  const [confirmAction, setConfirmAction] = useState<"suspend" | "ban" | "activate" | null>(null);

  const confirmConfig = {
    suspend: {
      title: "Suspend Customer",
      message: `Are you sure you want to suspend ${customer.name}? They will not be able to place orders.`,
      label: "Suspend",
      colorScheme: "warning" as const,
      onConfirm: onSuspend,
    },
    ban: {
      title: "Ban Customer",
      message: `Are you sure you want to permanently ban ${customer.name}? This action is difficult to reverse.`,
      label: "Ban",
      colorScheme: "error" as const,
      onConfirm: onBan,
    },
    activate: {
      title: "Activate Customer",
      message: `Are you sure you want to reactivate ${customer.name}'s account?`,
      label: "Activate",
      colorScheme: "primary" as const,
      onConfirm: onActivate,
    },
  };

  const current = confirmAction ? confirmConfig[confirmAction] : null;

  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
      <h3 className="text-sm font-semibold text-foreground">Account Actions</h3>
      <div className="mt-3 space-y-2">
        {customer.accountStatus === "active" && (
          <>
            <SharpmoveButton
              variant="outline"
              colorScheme="warning"
              size="sm"
              className="w-full"
              onClick={() => setConfirmAction("suspend")}
            >
              Suspend Account
            </SharpmoveButton>
            <SharpmoveButton
              variant="outline"
              colorScheme="error"
              size="sm"
              className="w-full"
              onClick={() => setConfirmAction("ban")}
            >
              Ban Account
            </SharpmoveButton>
          </>
        )}
        {(customer.accountStatus === "suspended" || customer.accountStatus === "banned") && (
          <SharpmoveButton
            variant="outline"
            colorScheme="success"
            size="sm"
            className="w-full"
            onClick={() => setConfirmAction("activate")}
          >
            Reactivate Account
          </SharpmoveButton>
        )}

        <hr className="my-2 border-border" />

        {customer.isFraudFlagged ? (
          <SharpmoveButton
            variant="outline"
            colorScheme="success"
            size="sm"
            className="w-full"
            onClick={onClearFraudFlag}
          >
            Clear Fraud Flag
          </SharpmoveButton>
        ) : (
          <SharpmoveButton
            variant="outline"
            colorScheme="error"
            size="sm"
            className="w-full"
            onClick={() => onFlagFraud("Manually flagged by admin")}
          >
            Flag for Fraud
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
