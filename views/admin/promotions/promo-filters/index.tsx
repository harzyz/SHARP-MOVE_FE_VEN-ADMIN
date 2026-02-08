"use client";

import { SearchBar, Tabs } from "@/components/ui";
import type { PromoStatus } from "@/types";

interface PromoFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: PromoStatus | "all";
  onStatusChange: (status: PromoStatus | "all") => void;
}

export function PromoFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: PromoFiltersProps) {
  const tabs = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "scheduled", label: "Scheduled" },
    { key: "expired", label: "Expired" },
    { key: "paused", label: "Paused" },
  ];

  return (
    <div className="space-y-3">
      <SearchBar
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search by promo code or description..."
        className="sm:w-80"
      />
      <Tabs
        tabs={tabs}
        activeTab={statusFilter}
        onTabChange={(key) => onStatusChange(key as PromoStatus | "all")}
      />
    </div>
  );
}
