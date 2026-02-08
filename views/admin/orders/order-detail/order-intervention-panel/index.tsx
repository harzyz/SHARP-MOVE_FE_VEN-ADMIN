"use client";

import { useState } from "react";
import { SharpmoveButton, SharpmoveInput, ConfirmDialog } from "@/components/ui";
import type { AdminOrder, AdminOrderStatus } from "@/types";

interface OrderInterventionPanelProps {
  order: AdminOrder;
  onUpdateStatus: (status: AdminOrderStatus) => void;
  onAddNote: (note: string) => void;
  onEscalate: () => void;
  onIssueRefund: () => void;
}

export function OrderInterventionPanel({
  order,
  onUpdateStatus,
  onAddNote,
  onEscalate,
  onIssueRefund,
}: OrderInterventionPanelProps) {
  const [note, setNote] = useState("");
  const [confirmAction, setConfirmAction] = useState<"refund" | "cancel" | null>(null);

  function handleAddNote() {
    if (!note.trim()) return;
    onAddNote(note.trim());
    setNote("");
  }

  const confirmConfig = {
    refund: {
      title: "Issue Refund",
      message: `Issue a full refund of the order ${order.orderNumber}? This will refund the customer and mark the order as refunded.`,
      label: "Issue Refund",
      colorScheme: "error" as const,
      onConfirm: onIssueRefund,
    },
    cancel: {
      title: "Cancel Order",
      message: `Cancel order ${order.orderNumber}? This action cannot be undone.`,
      label: "Cancel Order",
      colorScheme: "error" as const,
      onConfirm: () => onUpdateStatus("cancelled"),
    },
  };

  const current = confirmAction ? confirmConfig[confirmAction] : null;

  const canEscalate = order.priority !== "urgent";
  const canCancel = !["cancelled", "refunded", "delivered"].includes(order.status);
  const canRefund = order.paymentStatus === "paid" && !["refunded"].includes(order.status);

  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
      <h3 className="text-sm font-semibold text-foreground">Admin Actions</h3>

      {/* Add note */}
      <div className="mt-3">
        <SharpmoveInput
          label="Add Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <SharpmoveButton
          size="sm"
          variant="outline"
          className="mt-2 w-full"
          onClick={handleAddNote}
          disabled={!note.trim()}
        >
          Add Note
        </SharpmoveButton>
      </div>

      <hr className="my-3 border-border" />

      <div className="space-y-2">
        {canEscalate && (
          <SharpmoveButton
            size="sm"
            variant="outline"
            colorScheme="warning"
            className="w-full"
            onClick={onEscalate}
          >
            Escalate to Urgent
          </SharpmoveButton>
        )}

        {canCancel && (
          <SharpmoveButton
            size="sm"
            variant="outline"
            colorScheme="error"
            className="w-full"
            onClick={() => setConfirmAction("cancel")}
          >
            Cancel Order
          </SharpmoveButton>
        )}

        {canRefund && (
          <SharpmoveButton
            size="sm"
            variant="outline"
            colorScheme="error"
            className="w-full"
            onClick={() => setConfirmAction("refund")}
          >
            Issue Refund
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
