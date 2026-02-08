"use client";

import { DataTable, StatusBadge, type DataTableColumn } from "@/components/ui";
import { formatRelativeTime } from "@/lib/utils";
import { MOCK_ADMIN_USERS } from "@/lib/mock-data";
import type { AdminUserEntry, AdminRole } from "@/types";

const roleColorMap: Record<AdminRole, "error" | "warning" | "info" | "success" | "neutral"> = {
  super_admin: "error",
  operations_admin: "warning",
  finance_admin: "info",
  support_admin: "success",
  viewer: "neutral",
};

const roleLabelMap: Record<AdminRole, string> = {
  super_admin: "Super Admin",
  operations_admin: "Operations",
  finance_admin: "Finance",
  support_admin: "Support",
  viewer: "Viewer",
};

const columns: DataTableColumn<AdminUserEntry>[] = [
  {
    key: "name",
    header: "Name",
    render: (u) => (
      <div>
        <p className="font-medium">{u.name}</p>
        <p className="text-xs text-foreground-muted">{u.email}</p>
      </div>
    ),
  },
  {
    key: "role",
    header: "Role",
    render: (u) => (
      <StatusBadge
        label={roleLabelMap[u.role]}
        colorScheme={roleColorMap[u.role]}
      />
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (u) => (
      <span
        className={
          u.isActive
            ? "inline-flex items-center gap-1.5 text-sm font-medium text-success-700"
            : "inline-flex items-center gap-1.5 text-sm font-medium text-foreground-muted"
        }
      >
        <span
          className={
            u.isActive
              ? "inline-block size-2 rounded-full bg-success-500"
              : "inline-block size-2 rounded-full bg-neutral-300"
          }
        />
        {u.isActive ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    key: "lastLogin",
    header: "Last Login",
    className: "hidden sm:table-cell",
    render: (u) => (
      <span className="text-foreground-muted">
        {formatRelativeTime(u.lastLoginAt)}
      </span>
    ),
  },
  {
    key: "invitedBy",
    header: "Invited By",
    className: "hidden lg:table-cell",
    render: (u) => (
      <span className="text-foreground-muted">{u.invitedBy}</span>
    ),
  },
];

export function AdminUsersTable() {
  return (
    <DataTable
      columns={columns}
      data={MOCK_ADMIN_USERS}
      keyExtractor={(u) => u.id}
      emptyMessage="No admin users found"
    />
  );
}
