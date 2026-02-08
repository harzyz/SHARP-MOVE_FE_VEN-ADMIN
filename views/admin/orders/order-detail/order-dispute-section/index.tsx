"use client";

import { useState } from "react";
import { SharpmoveButton, SharpmoveInput, StatusBadge } from "@/components/ui";
import { formatRelativeTime } from "@/lib/utils";
import type { OrderDispute } from "@/types";

interface OrderDisputeSectionProps {
  dispute: OrderDispute | undefined;
  onResolve: (disputeId: string, resolution: string) => void;
}

const statusColorMap: Record<string, "success" | "warning" | "error" | "info" | "neutral"> = {
  open: "error",
  investigating: "warning",
  resolved: "success",
  escalated: "error",
};

export function OrderDisputeSection({ dispute, onResolve }: OrderDisputeSectionProps) {
  const [resolution, setResolution] = useState("");

  if (!dispute) return null;

  function handleResolve() {
    if (!resolution.trim() || !dispute) return;
    onResolve(dispute.id, resolution.trim());
    setResolution("");
  }

  return (
    <div className="rounded-xl border border-red-200 bg-red-50/50 p-4 shadow-xs sm:p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-red-800">Dispute</h3>
        <StatusBadge label={dispute.status} colorScheme={statusColorMap[dispute.status] || "neutral"} />
      </div>

      <div className="mt-3 space-y-2">
        <div>
          <p className="text-xs text-foreground-muted">Reason</p>
          <p className="text-sm font-medium text-foreground">{dispute.reason}</p>
        </div>
        <div>
          <p className="text-xs text-foreground-muted">Description</p>
          <p className="text-sm text-foreground">{dispute.description}</p>
        </div>
        <div className="flex gap-4">
          <div>
            <p className="text-xs text-foreground-muted">Filed By</p>
            <p className="text-sm text-foreground">{dispute.filedBy}</p>
          </div>
          <div>
            <p className="text-xs text-foreground-muted">Filed</p>
            <p className="text-sm text-foreground">{formatRelativeTime(dispute.filedAt)}</p>
          </div>
          {dispute.adminAssignee && (
            <div>
              <p className="text-xs text-foreground-muted">Assigned To</p>
              <p className="text-sm text-foreground">{dispute.adminAssignee}</p>
            </div>
          )}
        </div>

        {dispute.resolution && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3">
            <p className="text-xs font-semibold text-green-700">Resolution</p>
            <p className="mt-0.5 text-xs text-green-600">{dispute.resolution}</p>
          </div>
        )}

        {dispute.status !== "resolved" && (
          <div className="mt-3">
            <SharpmoveInput
              label="Resolution"
              value={resolution}
              onChange={(e) => setResolution(e.target.value)}
            />
            <SharpmoveButton
              size="sm"
              colorScheme="success"
              className="mt-2 w-full"
              onClick={handleResolve}
              disabled={!resolution.trim()}
            >
              Resolve Dispute
            </SharpmoveButton>
          </div>
        )}
      </div>
    </div>
  );
}
