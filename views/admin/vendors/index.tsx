"use client";

import { Tabs, Pagination } from "@/components/ui";
import { useAdminVendors } from "@/contexts";
import { VendorFilters } from "./vendor-filters";
import { VendorTable } from "./vendor-table";
import { OnboardingPipeline } from "./onboarding-pipeline";

export function AdminVendorsView() {
  const {
    filteredVendors,
    searchQuery,
    statusFilter,
    currentPage,
    totalPages,
    activeTab,
    setSearchQuery,
    setStatusFilter,
    setPage,
    setActiveTab,
  } = useAdminVendors();

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-foreground sm:text-xl">Vendor Management</h1>
          <p className="mt-1 text-sm text-foreground-muted">Manage vendors and onboarding pipeline</p>
        </div>
      </div>

      {/* Tab toggle: Vendors vs Pipeline */}
      <div className="mt-5">
        <Tabs
          tabs={[
            { key: "vendors", label: "Active Vendors" },
            { key: "pipeline", label: "Onboarding Pipeline" },
          ]}
          activeTab={activeTab}
          onTabChange={(key) => setActiveTab(key as "vendors" | "pipeline")}
        />
      </div>

      {activeTab === "vendors" ? (
        <>
          <div className="mt-4">
            <VendorFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
            />
          </div>
          <div className="mt-4 rounded-xl border border-border bg-background shadow-xs">
            <VendorTable vendors={filteredVendors} />
          </div>
          <div className="mt-4 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </>
      ) : (
        <div className="mt-4">
          <OnboardingPipeline />
        </div>
      )}
    </div>
  );
}
