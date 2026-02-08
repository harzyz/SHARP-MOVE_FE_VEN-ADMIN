"use client";

import { SearchBar, Tabs } from "@/components/ui";
import type { TicketStatus, TicketPriority } from "@/types";

interface TicketFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: TicketStatus | "all";
  onStatusChange: (status: TicketStatus | "all") => void;
  priorityFilter: TicketPriority | "all";
  onPriorityChange: (priority: TicketPriority | "all") => void;
  ticketCounts: Record<string, number>;
}

export function TicketFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  ticketCounts,
}: TicketFiltersProps) {
  const tabs = [
    { key: "all", label: "All", count: ticketCounts.all || 0 },
    { key: "open", label: "Open", count: ticketCounts.open || 0 },
    { key: "in_progress", label: "In Progress", count: ticketCounts.in_progress || 0 },
    { key: "awaiting_response", label: "Awaiting Response", count: ticketCounts.awaiting_response || 0 },
    { key: "resolved", label: "Resolved", count: ticketCounts.resolved || 0 },
    { key: "closed", label: "Closed", count: ticketCounts.closed || 0 },
  ];

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search by ticket #, subject, or customer..."
          className="sm:w-80"
        />

        <select
          value={priorityFilter}
          onChange={(e) => onPriorityChange(e.target.value as TicketPriority | "all")}
          className="h-9 rounded-lg border border-border bg-background px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>

      <Tabs
        tabs={tabs}
        activeTab={statusFilter}
        onTabChange={(key) => onStatusChange(key as TicketStatus | "all")}
      />
    </div>
  );
}
