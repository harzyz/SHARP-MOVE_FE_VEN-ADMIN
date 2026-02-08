"use client";

import { Pagination } from "@/components/ui";
import { useAdminOrders } from "@/contexts";
import { OrderFilters } from "./order-filters";
import { OrderStatsBar } from "./order-stats-bar";
import { OrderTable } from "./order-table";

export function AdminOrdersView() {
  const {
    filteredOrders,
    searchQuery,
    statusFilter,
    currentPage,
    totalPages,
    orderCounts,
    setSearchQuery,
    setStatusFilter,
    setPage,
  } = useAdminOrders();

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <h1 className="text-lg font-bold text-foreground sm:text-xl">Order Management</h1>
      <p className="mt-1 text-sm text-foreground-muted">Monitor and manage all platform orders</p>

      {/* Stats bar */}
      <div className="mt-5">
        <OrderStatsBar orderCounts={orderCounts} />
      </div>

      {/* Filters */}
      <div className="mt-4">
        <OrderFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          orderCounts={orderCounts}
        />
      </div>

      {/* Table */}
      <div className="mt-4 rounded-xl border border-border bg-background shadow-xs">
        <OrderTable orders={filteredOrders} />
      </div>

      {/* Pagination */}
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
