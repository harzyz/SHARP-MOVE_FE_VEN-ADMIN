"use client";

import { StatusBadge, SharpmoveButton } from "@/components/ui";
import { formatRelativeTime } from "@/lib/utils";
import type { RiderApplication, RiderOnboardingStatus } from "@/types";

interface RiderApplicationsProps {
  applications: RiderApplication[];
  onApprove: (applicationId: string) => void;
  onReject: (applicationId: string, reason: string) => void;
}

const statusColorMap: Record<RiderOnboardingStatus, "success" | "warning" | "error" | "info" | "neutral"> = {
  application_submitted: "info",
  documents_under_review: "warning",
  training_pending: "warning",
  approved: "success",
  rejected: "error",
};

const statusLabelMap: Record<RiderOnboardingStatus, string> = {
  application_submitted: "Submitted",
  documents_under_review: "Docs Review",
  training_pending: "Training Pending",
  approved: "Approved",
  rejected: "Rejected",
};

export function RiderApplications({
  applications,
  onApprove,
  onReject,
}: RiderApplicationsProps) {
  if (applications.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-foreground-muted">
        No rider applications at this time.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {applications.map((app) => {
        const isActionable = !["approved", "rejected"].includes(app.status);

        return (
          <div
            key={app.id}
            className="rounded-xl border border-border bg-background p-4 shadow-xs"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">{app.name}</p>
                <p className="text-xs text-foreground-muted">{app.phone}</p>
              </div>
              <StatusBadge
                label={statusLabelMap[app.status]}
                colorScheme={statusColorMap[app.status]}
              />
            </div>

            <div className="mt-3 space-y-1.5 text-xs text-foreground-muted">
              <p>{app.email}</p>
              <p>Vehicle: {app.vehicleType}</p>
              <p>Zone: {app.zone}</p>
              <p>Applied {formatRelativeTime(app.submittedAt)}</p>
            </div>

            {app.rejectionReason && (
              <div className="mt-2 rounded-lg border border-red-200 bg-red-50 p-2">
                <p className="text-xs text-red-600">{app.rejectionReason}</p>
              </div>
            )}

            {app.reviewedAt && app.reviewedBy && (
              <div className="mt-2 text-xs text-foreground-muted">
                Reviewed by {app.reviewedBy} {formatRelativeTime(app.reviewedAt)}
              </div>
            )}

            {isActionable && (
              <div className="mt-3 flex gap-2">
                <SharpmoveButton
                  size="sm"
                  colorScheme="success"
                  className="flex-1"
                  onClick={() => onApprove(app.id)}
                >
                  Approve
                </SharpmoveButton>
                <SharpmoveButton
                  size="sm"
                  variant="outline"
                  colorScheme="error"
                  className="flex-1"
                  onClick={() => onReject(app.id, "Application rejected by admin")}
                >
                  Reject
                </SharpmoveButton>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
