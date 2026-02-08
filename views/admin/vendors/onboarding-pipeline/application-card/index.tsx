import { StatusBadge, SharpmoveButton } from "@/components/ui";
import { formatRelativeTime } from "@/lib/utils";
import type { VendorApplication } from "@/types";

interface ApplicationCardProps {
  application: VendorApplication;
  onApprove: (id: string) => void;
  onReject: (id: string, reason: string) => void;
}

const statusColorMap: Record<string, "success" | "warning" | "error" | "info" | "neutral"> = {
  application_submitted: "info",
  documents_under_review: "warning",
  site_inspection_pending: "warning",
  approved: "success",
  rejected: "error",
};

export function ApplicationCard({ application, onApprove, onReject }: ApplicationCardProps) {
  const isActionable = !["approved", "rejected"].includes(application.status);
  const docsApproved = application.documents.filter((d) => d.status === "approved").length;
  const totalDocs = application.documents.length;

  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">{application.vendorName}</p>
          <p className="text-xs text-foreground-muted">{application.ownerName}</p>
        </div>
        <StatusBadge
          label={application.status.replace(/_/g, " ")}
          colorScheme={statusColorMap[application.status] || "neutral"}
        />
      </div>

      <div className="mt-3 space-y-1.5 text-xs text-foreground-muted">
        <p>{application.email} &middot; {application.phone}</p>
        <p>{application.address}</p>
        <p>Cuisine: {application.cuisineTypes.join(", ")}</p>
        <p>Applied {formatRelativeTime(application.submittedAt)}</p>
        <p>Documents: {docsApproved}/{totalDocs} approved</p>
      </div>

      {application.rejectionReason && (
        <div className="mt-2 rounded-lg border border-red-200 bg-red-50 p-2">
          <p className="text-xs text-red-600">{application.rejectionReason}</p>
        </div>
      )}

      {isActionable && (
        <div className="mt-3 flex gap-2">
          <SharpmoveButton
            size="sm"
            colorScheme="success"
            className="flex-1"
            onClick={() => onApprove(application.id)}
          >
            Approve
          </SharpmoveButton>
          <SharpmoveButton
            size="sm"
            variant="outline"
            colorScheme="error"
            className="flex-1"
            onClick={() => onReject(application.id, "Application rejected by admin")}
          >
            Reject
          </SharpmoveButton>
        </div>
      )}
    </div>
  );
}
