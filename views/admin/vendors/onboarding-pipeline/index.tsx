"use client";

import { useAdminVendors } from "@/contexts";
import { ApplicationCard } from "./application-card";

export function OnboardingPipeline() {
  const { applications, approveApplication, rejectApplication } = useAdminVendors();

  const columns = [
    { key: "application_submitted", label: "Submitted" },
    { key: "documents_under_review", label: "Docs Review" },
    { key: "site_inspection_pending", label: "Site Inspection" },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {columns.map((col) => {
        const apps = applications.filter((a) => a.status === col.key);
        return (
          <div key={col.key}>
            <div className="flex items-center gap-2 rounded-lg bg-surface px-3 py-2">
              <h4 className="text-xs font-semibold text-foreground">{col.label}</h4>
              <span className="rounded-full bg-background px-1.5 py-0.5 text-[10px] font-medium text-foreground-muted">
                {apps.length}
              </span>
            </div>
            <div className="mt-2 space-y-2">
              {apps.length === 0 ? (
                <p className="py-6 text-center text-xs text-foreground-muted">No applications</p>
              ) : (
                apps.map((app) => (
                  <ApplicationCard
                    key={app.id}
                    application={app}
                    onApprove={approveApplication}
                    onReject={rejectApplication}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
