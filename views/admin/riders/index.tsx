"use client";

import { Tabs, Pagination } from "@/components/ui";
import { useAdminRiders } from "@/contexts";
import { RiderFilters } from "./rider-filters";
import { RiderTable } from "./rider-table";
import { ZoneGrid } from "./zone-grid";
import { RiderApplications } from "./rider-applications";
import { RiderPayouts } from "./rider-payouts";

export function AdminRidersView() {
  const {
    filteredRiders,
    zones,
    applications,
    payouts,
    searchQuery,
    statusFilter,
    currentPage,
    totalPages,
    activeTab,
    setSearchQuery,
    setStatusFilter,
    setPage,
    setActiveTab,
    approveApplication,
    rejectApplication,
  } = useAdminRiders();

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-foreground sm:text-xl">
            Rider Management
          </h1>
          <p className="mt-1 text-sm text-foreground-muted">
            Track riders, manage zones, review applications, and process payouts
          </p>
        </div>
      </div>

      <div className="mt-5">
        <Tabs
          tabs={[
            { key: "riders", label: "Riders" },
            { key: "zones", label: "Zones" },
            { key: "applications", label: "Applications" },
            { key: "payouts", label: "Payouts" },
          ]}
          activeTab={activeTab}
          onTabChange={(key) =>
            setActiveTab(key as "riders" | "zones" | "applications" | "payouts")
          }
        />
      </div>

      {activeTab === "riders" && (
        <>
          <div className="mt-4">
            <RiderFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
            />
          </div>
          <div className="mt-4 rounded-xl border border-border bg-background shadow-xs">
            <RiderTable riders={filteredRiders} />
          </div>
          <div className="mt-4 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </>
      )}

      {activeTab === "zones" && (
        <div className="mt-4">
          <ZoneGrid zones={zones} />
        </div>
      )}

      {activeTab === "applications" && (
        <div className="mt-4">
          <RiderApplications
            applications={applications}
            onApprove={approveApplication}
            onReject={rejectApplication}
          />
        </div>
      )}

      {activeTab === "payouts" && (
        <div className="mt-4">
          <RiderPayouts payouts={payouts} />
        </div>
      )}
    </div>
  );
}
