"use client";

import { createContext, useContext, useReducer, useMemo, useCallback, type ReactNode } from "react";
import type { PromoCode, Campaign, PromoStatus } from "@/types";
import { MOCK_PROMO_CODES, MOCK_CAMPAIGNS } from "@/lib/mock-data";

const ITEMS_PER_PAGE = 10;

// ---- State ----
interface AdminPromotionsState {
  promoCodes: PromoCode[];
  campaigns: Campaign[];
  searchQuery: string;
  statusFilter: PromoStatus | "all";
  currentPage: number;
  activeTab: "promos" | "campaigns";
}

// ---- Actions ----
type AdminPromotionsAction =
  | { type: "SET_SEARCH_QUERY"; query: string }
  | { type: "SET_STATUS_FILTER"; status: PromoStatus | "all" }
  | { type: "SET_PAGE"; page: number }
  | { type: "SET_ACTIVE_TAB"; tab: "promos" | "campaigns" }
  | { type: "PAUSE_PROMO"; promoId: string }
  | { type: "ACTIVATE_PROMO"; promoId: string }
  | { type: "PAUSE_CAMPAIGN"; campaignId: string }
  | { type: "ACTIVATE_CAMPAIGN"; campaignId: string };

function adminPromotionsReducer(state: AdminPromotionsState, action: AdminPromotionsAction): AdminPromotionsState {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.query, currentPage: 1 };
    case "SET_STATUS_FILTER":
      return { ...state, statusFilter: action.status, currentPage: 1 };
    case "SET_PAGE":
      return { ...state, currentPage: action.page };
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.tab, searchQuery: "", statusFilter: "all", currentPage: 1 };
    case "PAUSE_PROMO":
      return { ...state, promoCodes: state.promoCodes.map((p) => (p.id === action.promoId ? { ...p, status: "paused" as PromoStatus } : p)) };
    case "ACTIVATE_PROMO":
      return { ...state, promoCodes: state.promoCodes.map((p) => (p.id === action.promoId ? { ...p, status: "active" as PromoStatus } : p)) };
    case "PAUSE_CAMPAIGN":
      return { ...state, campaigns: state.campaigns.map((c) => (c.id === action.campaignId ? { ...c, status: "paused" as PromoStatus } : c)) };
    case "ACTIVATE_CAMPAIGN":
      return { ...state, campaigns: state.campaigns.map((c) => (c.id === action.campaignId ? { ...c, status: "active" as PromoStatus } : c)) };
    default:
      return state;
  }
}

// ---- Context ----
interface AdminPromotionsContextValue {
  promoCodes: PromoCode[];
  filteredPromoCodes: PromoCode[];
  campaigns: Campaign[];
  searchQuery: string;
  statusFilter: PromoStatus | "all";
  currentPage: number;
  totalPages: number;
  activeTab: "promos" | "campaigns";
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: PromoStatus | "all") => void;
  setPage: (page: number) => void;
  setActiveTab: (tab: "promos" | "campaigns") => void;
  pausePromo: (promoId: string) => void;
  activatePromo: (promoId: string) => void;
  pauseCampaign: (campaignId: string) => void;
  activateCampaign: (campaignId: string) => void;
}

const AdminPromotionsContext = createContext<AdminPromotionsContextValue | null>(null);

// ---- Provider ----
export function AdminPromotionsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(adminPromotionsReducer, {
    promoCodes: MOCK_PROMO_CODES,
    campaigns: MOCK_CAMPAIGNS,
    searchQuery: "",
    statusFilter: "all",
    currentPage: 1,
    activeTab: "promos",
  });

  const filteredPromoCodes = useMemo(() => {
    let result = state.promoCodes;
    if (state.statusFilter !== "all") {
      result = result.filter((p) => p.status === state.statusFilter);
    }
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.code.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [state.promoCodes, state.statusFilter, state.searchQuery]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(filteredPromoCodes.length / ITEMS_PER_PAGE)), [filteredPromoCodes.length]);

  const paginatedPromos = useMemo(() => {
    const start = (state.currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPromoCodes.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPromoCodes, state.currentPage]);

  const setSearchQuery = useCallback((query: string) => dispatch({ type: "SET_SEARCH_QUERY", query }), []);
  const setStatusFilter = useCallback((status: PromoStatus | "all") => dispatch({ type: "SET_STATUS_FILTER", status }), []);
  const setPage = useCallback((page: number) => dispatch({ type: "SET_PAGE", page }), []);
  const setActiveTab = useCallback((tab: "promos" | "campaigns") => dispatch({ type: "SET_ACTIVE_TAB", tab }), []);
  const pausePromo = useCallback((promoId: string) => dispatch({ type: "PAUSE_PROMO", promoId }), []);
  const activatePromo = useCallback((promoId: string) => dispatch({ type: "ACTIVATE_PROMO", promoId }), []);
  const pauseCampaign = useCallback((campaignId: string) => dispatch({ type: "PAUSE_CAMPAIGN", campaignId }), []);
  const activateCampaign = useCallback((campaignId: string) => dispatch({ type: "ACTIVATE_CAMPAIGN", campaignId }), []);

  const value = useMemo<AdminPromotionsContextValue>(
    () => ({
      promoCodes: state.promoCodes,
      filteredPromoCodes: paginatedPromos,
      campaigns: state.campaigns,
      searchQuery: state.searchQuery,
      statusFilter: state.statusFilter,
      currentPage: state.currentPage,
      totalPages,
      activeTab: state.activeTab,
      setSearchQuery,
      setStatusFilter,
      setPage,
      setActiveTab,
      pausePromo,
      activatePromo,
      pauseCampaign,
      activateCampaign,
    }),
    [state.promoCodes, paginatedPromos, state.campaigns, state.searchQuery, state.statusFilter, state.currentPage, totalPages, state.activeTab, setSearchQuery, setStatusFilter, setPage, setActiveTab, pausePromo, activatePromo, pauseCampaign, activateCampaign]
  );

  return (
    <AdminPromotionsContext.Provider value={value}>
      {children}
    </AdminPromotionsContext.Provider>
  );
}

// ---- Hook ----
export function useAdminPromotions(): AdminPromotionsContextValue {
  const ctx = useContext(AdminPromotionsContext);
  if (!ctx) throw new Error("useAdminPromotions must be used within an AdminPromotionsProvider");
  return ctx;
}
