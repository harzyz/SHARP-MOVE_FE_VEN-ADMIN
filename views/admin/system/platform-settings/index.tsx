"use client";

import type { PlatformSetting } from "@/types";
import { MOCK_PLATFORM_SETTINGS } from "@/lib/mock-data";
import { capitalize } from "@/lib/utils";

const categoryOrder: PlatformSetting["category"][] = [
  "general",
  "orders",
  "payments",
  "delivery",
  "notifications",
];

const categoryLabels: Record<PlatformSetting["category"], string> = {
  general: "General",
  orders: "Orders",
  payments: "Payments",
  delivery: "Delivery",
  notifications: "Notifications",
};

const typeIndicators: Record<PlatformSetting["type"], { label: string; className: string }> = {
  string: { label: "Text", className: "bg-info-100 text-info-700" },
  number: { label: "Number", className: "bg-warning-100 text-warning-700" },
  boolean: { label: "Boolean", className: "bg-success-100 text-success-700" },
  percentage: { label: "%", className: "bg-neutral-100 text-neutral-700" },
};

function formatSettingValue(setting: PlatformSetting): string {
  if (setting.type === "percentage") return `${setting.value}%`;
  if (setting.type === "boolean") return setting.value === "true" ? "Enabled" : "Disabled";
  if (setting.type === "number") return setting.value;
  return setting.value;
}

function SettingRow({ setting }: { setting: PlatformSetting }) {
  const indicator = typeIndicators[setting.type];

  return (
    <div className="flex flex-col gap-1 border-b border-border px-4 py-3 last:border-b-0 sm:flex-row sm:items-center sm:gap-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">{setting.label}</span>
          <span
            className={`inline-flex rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase leading-none ${indicator.className}`}
          >
            {indicator.label}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-foreground-muted">{setting.description}</p>
      </div>
      <div className="shrink-0 sm:text-right">
        <span className="text-sm font-bold text-foreground">
          {formatSettingValue(setting)}
        </span>
      </div>
    </div>
  );
}

function CategorySection({
  category,
  settings,
}: {
  category: PlatformSetting["category"];
  settings: PlatformSetting[];
}) {
  return (
    <div>
      <h3 className="text-sm font-bold text-foreground">{categoryLabels[category]}</h3>
      <div className="mt-2 rounded-lg border border-border bg-background shadow-xs">
        {settings.map((setting) => (
          <SettingRow key={setting.id} setting={setting} />
        ))}
      </div>
    </div>
  );
}

export function PlatformSettingsList() {
  const allSettings = MOCK_PLATFORM_SETTINGS;

  const grouped = categoryOrder
    .map((category) => ({
      category,
      settings: allSettings.filter((s) => s.category === category),
    }))
    .filter((group) => group.settings.length > 0);

  return (
    <div className="flex flex-col gap-6">
      {grouped.map(({ category, settings }) => (
        <CategorySection key={category} category={category} settings={settings} />
      ))}
    </div>
  );
}
