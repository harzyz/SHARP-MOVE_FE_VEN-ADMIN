"use client";

import { Pagination } from "@/components/ui";
import { useAdminSupport } from "@/contexts";
import { TicketFilters } from "./ticket-filters";
import { TicketTable } from "./ticket-table";

export function AdminSupportView() {
  const {
    filteredTickets,
    searchQuery,
    statusFilter,
    priorityFilter,
    currentPage,
    totalPages,
    ticketCounts,
    setSearchQuery,
    setStatusFilter,
    setPriorityFilter,
    setPage,
  } = useAdminSupport();

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-foreground sm:text-xl">Support</h1>
          <p className="mt-1 text-sm text-foreground-muted">
            Manage customer support tickets and escalations
          </p>
        </div>
      </div>

      <div className="mt-4">
        <TicketFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityChange={setPriorityFilter}
          ticketCounts={ticketCounts}
        />
      </div>

      <div className="mt-4 rounded-xl border border-border bg-background shadow-xs">
        <TicketTable tickets={filteredTickets} />
      </div>

      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
