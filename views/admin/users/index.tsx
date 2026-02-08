"use client";

import { Pagination } from "@/components/ui";
import { useAdminUsers } from "@/contexts";
import { CustomerFilters } from "./customer-filters";
import { CustomerTable } from "./customer-table";

export function AdminUsersView() {
  const {
    filteredCustomers,
    searchQuery,
    statusFilter,
    currentPage,
    totalPages,
    setSearchQuery,
    setStatusFilter,
    setPage,
  } = useAdminUsers();

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <h1 className="text-lg font-bold text-foreground sm:text-xl">User Management</h1>
      <p className="mt-1 text-sm text-foreground-muted">Manage customer accounts</p>

      <div className="mt-5">
        <CustomerFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />
      </div>

      <div className="mt-4 rounded-xl border border-border bg-background shadow-xs">
        <CustomerTable customers={filteredCustomers} />
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
