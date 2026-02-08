"use client";

import { SearchBar, Tabs } from "@/components/ui";
import type { AdminVendorStatus } from "@/types";

interface VendorFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: AdminVendorStatus | "all";
  onStatusChange: (status: AdminVendorStatus | "all") => void;
}

const STATUS_TABS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "suspended", label: "Suspended" },
  { key: "inactive", label: "Inactive" },
  { key: "pending_approval", label: "Pending" },
];

export function VendorFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: VendorFiltersProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <SearchBar
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search by vendor name, owner, or email..."
        className="sm:w-72"
      />
      <Tabs
        tabs={STATUS_TABS}
        activeTab={statusFilter}
        onTabChange={(key) => onStatusChange(key as AdminVendorStatus | "all")}
      />
    </div>
  );
}
