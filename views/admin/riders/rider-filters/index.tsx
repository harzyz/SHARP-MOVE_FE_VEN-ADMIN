"use client";

import { SearchBar, Tabs } from "@/components/ui";
import type { RiderStatus } from "@/types";

interface RiderFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: RiderStatus | "all";
  onStatusChange: (status: RiderStatus | "all") => void;
}

const STATUS_TABS = [
  { key: "all", label: "All" },
  { key: "online", label: "Online" },
  { key: "on_delivery", label: "On Delivery" },
  { key: "offline", label: "Offline" },
  { key: "suspended", label: "Suspended" },
];

export function RiderFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: RiderFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <SearchBar
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search by rider name, email, or zone..."
        className="sm:w-72"
      />
      <Tabs
        tabs={STATUS_TABS}
        activeTab={statusFilter}
        onTabChange={(key) => onStatusChange(key as RiderStatus | "all")}
      />
    </div>
  );
}
