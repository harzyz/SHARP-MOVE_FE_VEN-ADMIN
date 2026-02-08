"use client";

import { SearchBar, Tabs } from "@/components/ui";
import type { CustomerAccountStatus } from "@/types";

interface CustomerFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: CustomerAccountStatus | "all";
  onStatusChange: (status: CustomerAccountStatus | "all") => void;
}

const STATUS_TABS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "suspended", label: "Suspended" },
  { key: "banned", label: "Banned" },
  { key: "deactivated", label: "Deactivated" },
];

export function CustomerFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: CustomerFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <SearchBar
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search by name, email, or phone..."
        className="sm:w-72"
      />
      <Tabs
        tabs={STATUS_TABS}
        activeTab={statusFilter}
        onTabChange={(key) => onStatusChange(key as CustomerAccountStatus | "all")}
      />
    </div>
  );
}
