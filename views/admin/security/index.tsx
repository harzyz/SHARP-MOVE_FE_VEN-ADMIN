"use client";

import { Tabs } from "@/components/ui";
import { useState } from "react";
import { AdminUsersTable } from "./admin-users-table";
import { AuditLogTable } from "./audit-log-table";

type SecurityTab = "users" | "audit";

export function AdminSecurityView() {
  const [activeTab, setActiveTab] = useState<SecurityTab>("users");

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-foreground sm:text-xl">Security</h1>
          <p className="mt-1 text-sm text-foreground-muted">
            Admin users and audit log
          </p>
        </div>
      </div>

      <div className="mt-5">
        <Tabs
          tabs={[
            { key: "users", label: "Admin Users" },
            { key: "audit", label: "Audit Log" },
          ]}
          activeTab={activeTab}
          onTabChange={(key) => setActiveTab(key as SecurityTab)}
        />
      </div>

      {activeTab === "users" && (
        <div className="mt-4 rounded-xl border border-border bg-background shadow-xs">
          <AdminUsersTable />
        </div>
      )}

      {activeTab === "audit" && (
        <div className="mt-4 rounded-xl border border-border bg-background shadow-xs">
          <AuditLogTable />
        </div>
      )}
    </div>
  );
}
