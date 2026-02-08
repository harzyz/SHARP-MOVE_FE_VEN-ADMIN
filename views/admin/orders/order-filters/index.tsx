"use client";

import { SearchBar, Tabs } from "@/components/ui";
import type { AdminOrderStatus } from "@/types";

interface OrderFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: AdminOrderStatus | "all";
  onStatusChange: (status: AdminOrderStatus | "all") => void;
  orderCounts: Record<string, number>;
}

export function OrderFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  orderCounts,
}: OrderFiltersProps) {
  const tabs = [
    { key: "all", label: "All", count: orderCounts.all || 0 },
    { key: "pending", label: "Pending", count: orderCounts.pending || 0 },
    { key: "confirmed", label: "Confirmed", count: orderCounts.confirmed || 0 },
    { key: "preparing", label: "Preparing", count: orderCounts.preparing || 0 },
    { key: "ready", label: "Ready", count: orderCounts.ready || 0 },
    { key: "on_the_way", label: "En Route", count: orderCounts.on_the_way || 0 },
    { key: "delivered", label: "Delivered", count: orderCounts.delivered || 0 },
    { key: "disputed", label: "Disputed", count: orderCounts.disputed || 0 },
  ];

  return (
    <div className="space-y-3">
      <SearchBar
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search by order #, customer, or vendor..."
        className="sm:w-80"
      />
      <Tabs
        tabs={tabs}
        activeTab={statusFilter}
        onTabChange={(key) => onStatusChange(key as AdminOrderStatus | "all")}
      />
    </div>
  );
}
