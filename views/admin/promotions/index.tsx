"use client";

import { Tabs, Pagination } from "@/components/ui";
import { useAdminPromotions } from "@/contexts";
import { PromoFilters } from "./promo-filters";
import { PromoTable } from "./promo-table";
import { CampaignList } from "./campaign-list";

export function AdminPromotionsView() {
  const {
    filteredPromoCodes,
    campaigns,
    searchQuery,
    statusFilter,
    currentPage,
    totalPages,
    activeTab,
    setSearchQuery,
    setStatusFilter,
    setPage,
    setActiveTab,
    pausePromo,
    activatePromo,
    pauseCampaign,
    activateCampaign,
  } = useAdminPromotions();

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-foreground sm:text-xl">Promotions</h1>
          <p className="mt-1 text-sm text-foreground-muted">
            Manage promo codes, campaigns, and discount programs
          </p>
        </div>
      </div>

      {/* Tab toggle: Promo Codes vs Campaigns */}
      <div className="mt-5">
        <Tabs
          tabs={[
            { key: "promos", label: "Promo Codes" },
            { key: "campaigns", label: "Campaigns" },
          ]}
          activeTab={activeTab}
          onTabChange={(key) => setActiveTab(key as "promos" | "campaigns")}
        />
      </div>

      {activeTab === "promos" ? (
        <>
          {/* Filters */}
          <div className="mt-4">
            <PromoFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
            />
          </div>

          {/* Table */}
          <div className="mt-4 rounded-xl border border-border bg-background shadow-xs">
            <PromoTable
              promos={filteredPromoCodes}
              onPause={pausePromo}
              onActivate={activatePromo}
            />
          </div>

          {/* Pagination */}
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
          <CampaignList
            campaigns={campaigns}
            onPause={pauseCampaign}
            onActivate={activateCampaign}
          />
        </div>
      )}
    </div>
  );
}
