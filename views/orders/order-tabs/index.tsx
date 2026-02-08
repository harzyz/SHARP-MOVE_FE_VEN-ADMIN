"use client";

import { Chip } from "@/components/ui";
import type { VendorOrderStatus } from "@/types";

interface Tab {
  key: VendorOrderStatus | "all";
  label: string;
  count: number;
}

interface OrderTabsProps {
  activeTab: VendorOrderStatus | "all";
  onTabChange: (tab: VendorOrderStatus | "all") => void;
  counts: Record<VendorOrderStatus | "all", number>;
}

export function OrderTabs({ activeTab, onTabChange, counts }: OrderTabsProps) {
  const tabs: Tab[] = [
    { key: "new", label: "New", count: counts.new },
    { key: "preparing", label: "Preparing", count: counts.preparing },
    { key: "ready", label: "Ready", count: counts.ready },
    { key: "completed", label: "Completed", count: counts.completed },
    { key: "cancelled", label: "Cancelled", count: counts.cancelled },
    { key: "all", label: "All", count: counts.all },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {tabs.map((tab) => (
        <Chip
          key={tab.key}
          isActive={activeTab === tab.key}
          onClick={() => onTabChange(tab.key)}
        >
          {tab.label}
          {tab.count > 0 && (
            <span className="ml-1 text-xs opacity-80">({tab.count})</span>
          )}
        </Chip>
      ))}
    </div>
  );
}
