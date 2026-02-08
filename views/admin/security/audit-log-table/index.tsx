"use client";

import { DataTable, type DataTableColumn } from "@/components/ui";
import { formatRelativeTime } from "@/lib/utils";
import { MOCK_AUDIT_LOG } from "@/lib/mock-data";
import type { AuditLogEntry, AdminRole } from "@/types";

const roleLabelMap: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  operations_admin: "Operations",
  finance_admin: "Finance",
  support_admin: "Support",
  viewer: "Viewer",
};

function getActionDotColor(action: string): string {
  if (/create|approve/i.test(action)) return "bg-success-500";
  if (/suspend|ban|deactivat/i.test(action)) return "bg-error-500";
  if (/update|toggl|refund|escalat/i.test(action)) return "bg-info-500";
  return "bg-neutral-400";
}

const columns: DataTableColumn<AuditLogEntry>[] = [
  {
    key: "action",
    header: "Action",
    render: (e) => (
      <span className="inline-flex items-center gap-2">
        <span className={`inline-block size-2 shrink-0 rounded-full ${getActionDotColor(e.action)}`} />
        <code className="font-mono text-xs">{e.action}</code>
      </span>
    ),
  },
  {
    key: "description",
    header: "Description",
    render: (e) => (
      <span className="line-clamp-2 max-w-xs text-sm">{e.description}</span>
    ),
  },
  {
    key: "performedBy",
    header: "Performed By",
    render: (e) => (
      <div>
        <p className="font-medium">{e.performedBy}</p>
        <p className="text-xs text-foreground-muted">
          {roleLabelMap[e.performedByRole]}
        </p>
      </div>
    ),
  },
  {
    key: "target",
    header: "Target",
    className: "hidden sm:table-cell",
    render: (e) =>
      e.targetType ? (
        <span className="text-foreground-muted">
          {e.targetType}
          {e.targetId ? ` / ${e.targetId}` : ""}
        </span>
      ) : (
        <span className="text-foreground-muted">&mdash;</span>
      ),
  },
  {
    key: "ipAddress",
    header: "IP Address",
    className: "hidden lg:table-cell",
    render: (e) => (
      <code className="font-mono text-xs text-foreground-muted">
        {e.ipAddress}
      </code>
    ),
  },
  {
    key: "timestamp",
    header: "Timestamp",
    className: "hidden sm:table-cell",
    render: (e) => (
      <span className="text-foreground-muted">
        {formatRelativeTime(e.timestamp)}
      </span>
    ),
  },
];

export function AuditLogTable() {
  return (
    <DataTable
      columns={columns}
      data={MOCK_AUDIT_LOG}
      keyExtractor={(e) => e.id}
      emptyMessage="No audit log entries found"
    />
  );
}
