"use client";

import { Tabs } from "@/components/ui";
import { useState } from "react";
import { FeatureFlagsList } from "./feature-flags";
import { MaintenanceWindowsList } from "./maintenance-windows";
import { PlatformSettingsList } from "./platform-settings";

type SystemTab = "flags" | "maintenance" | "settings";

export function AdminSystemView() {
  const [activeTab, setActiveTab] = useState<SystemTab>("flags");

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-foreground sm:text-xl">System Configuration</h1>
          <p className="mt-1 text-sm text-foreground-muted">
            Feature flags, maintenance windows, and platform settings
          </p>
        </div>
      </div>

      <div className="mt-5">
        <Tabs
          tabs={[
            { key: "flags", label: "Feature Flags" },
            { key: "maintenance", label: "Maintenance" },
            { key: "settings", label: "Platform Settings" },
          ]}
          activeTab={activeTab}
          onTabChange={(key) => setActiveTab(key as SystemTab)}
        />
      </div>

      {activeTab === "flags" && (
        <div className="mt-4">
          <FeatureFlagsList />
        </div>
      )}

      {activeTab === "maintenance" && (
        <div className="mt-4">
          <MaintenanceWindowsList />
        </div>
      )}

      {activeTab === "settings" && (
        <div className="mt-4">
          <PlatformSettingsList />
        </div>
      )}
    </div>
  );
}
