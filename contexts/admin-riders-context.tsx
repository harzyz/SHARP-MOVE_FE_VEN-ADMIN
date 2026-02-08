"use client";

import { createContext, useContext, useReducer, useMemo, useCallback, type ReactNode } from "react";
import type { Rider, RiderStatus, RiderZone, RiderApplication, RiderPayout } from "@/types";
import { MOCK_RIDERS, MOCK_RIDER_ZONES, MOCK_RIDER_APPLICATIONS, MOCK_RIDER_PAYOUTS } from "@/lib/mock-data";

const ITEMS_PER_PAGE = 10;

// ---- State ----
interface AdminRidersState {
  riders: Rider[];
  zones: RiderZone[];
  applications: RiderApplication[];
  payouts: RiderPayout[];
  searchQuery: string;
  statusFilter: RiderStatus | "all";
  currentPage: number;
  activeTab: "riders" | "zones" | "applications" | "payouts";
}

// ---- Actions ----
type AdminRidersAction =
  | { type: "SET_SEARCH_QUERY"; query: string }
  | { type: "SET_STATUS_FILTER"; status: RiderStatus | "all" }
  | { type: "SET_PAGE"; page: number }
  | { type: "SET_ACTIVE_TAB"; tab: AdminRidersState["activeTab"] }
  | { type: "SUSPEND_RIDER"; riderId: string }
  | { type: "ACTIVATE_RIDER"; riderId: string }
  | { type: "APPROVE_APPLICATION"; applicationId: string }
  | { type: "REJECT_APPLICATION"; applicationId: string; reason: string };

// ---- Reducer ----
function updateRider(riders: Rider[], riderId: string, updates: Partial<Rider>): Rider[] {
  return riders.map((r) => (r.id === riderId ? { ...r, ...updates } : r));
}

function adminRidersReducer(state: AdminRidersState, action: AdminRidersAction): AdminRidersState {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.query, currentPage: 1 };
    case "SET_STATUS_FILTER":
      return { ...state, statusFilter: action.status, currentPage: 1 };
    case "SET_PAGE":
      return { ...state, currentPage: action.page };
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.tab, searchQuery: "", statusFilter: "all", currentPage: 1 };
    case "SUSPEND_RIDER":
      return { ...state, riders: updateRider(state.riders, action.riderId, { status: "suspended", isAvailable: false }) };
    case "ACTIVATE_RIDER":
      return { ...state, riders: updateRider(state.riders, action.riderId, { status: "offline", isAvailable: false }) };
    case "APPROVE_APPLICATION":
      return {
        ...state,
        applications: state.applications.map((a) =>
          a.id === action.applicationId
            ? { ...a, status: "approved", reviewedAt: new Date().toISOString(), reviewedBy: "Adebayo Ogunlesi" }
            : a
        ),
      };
    case "REJECT_APPLICATION":
      return {
        ...state,
        applications: state.applications.map((a) =>
          a.id === action.applicationId
            ? { ...a, status: "rejected", reviewedAt: new Date().toISOString(), reviewedBy: "Adebayo Ogunlesi", rejectionReason: action.reason }
            : a
        ),
      };
    default:
      return state;
  }
}

// ---- Context ----
interface AdminRidersContextValue {
  riders: Rider[];
  filteredRiders: Rider[];
  zones: RiderZone[];
  applications: RiderApplication[];
  payouts: RiderPayout[];
  searchQuery: string;
  statusFilter: RiderStatus | "all";
  currentPage: number;
  totalPages: number;
  activeTab: AdminRidersState["activeTab"];
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: RiderStatus | "all") => void;
  setPage: (page: number) => void;
  setActiveTab: (tab: AdminRidersState["activeTab"]) => void;
  suspendRider: (riderId: string) => void;
  activateRider: (riderId: string) => void;
  approveApplication: (applicationId: string) => void;
  rejectApplication: (applicationId: string, reason: string) => void;
  getRider: (riderId: string) => Rider | undefined;
}

const AdminRidersContext = createContext<AdminRidersContextValue | null>(null);

// ---- Provider ----
export function AdminRidersProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(adminRidersReducer, {
    riders: MOCK_RIDERS,
    zones: MOCK_RIDER_ZONES,
    applications: MOCK_RIDER_APPLICATIONS,
    payouts: MOCK_RIDER_PAYOUTS,
    searchQuery: "",
    statusFilter: "all",
    currentPage: 1,
    activeTab: "riders",
  });

  const filteredRiders = useMemo(() => {
    let result = state.riders;
    if (state.statusFilter !== "all") {
      result = result.filter((r) => r.status === state.statusFilter);
    }
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.zone.toLowerCase().includes(q)
      );
    }
    return result;
  }, [state.riders, state.statusFilter, state.searchQuery]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(filteredRiders.length / ITEMS_PER_PAGE)), [filteredRiders.length]);

  const paginatedRiders = useMemo(() => {
    const start = (state.currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRiders.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredRiders, state.currentPage]);

  const setSearchQuery = useCallback((query: string) => dispatch({ type: "SET_SEARCH_QUERY", query }), []);
  const setStatusFilter = useCallback((status: RiderStatus | "all") => dispatch({ type: "SET_STATUS_FILTER", status }), []);
  const setPage = useCallback((page: number) => dispatch({ type: "SET_PAGE", page }), []);
  const setActiveTab = useCallback((tab: AdminRidersState["activeTab"]) => dispatch({ type: "SET_ACTIVE_TAB", tab }), []);
  const suspendRider = useCallback((riderId: string) => dispatch({ type: "SUSPEND_RIDER", riderId }), []);
  const activateRider = useCallback((riderId: string) => dispatch({ type: "ACTIVATE_RIDER", riderId }), []);
  const approveApplication = useCallback((applicationId: string) => dispatch({ type: "APPROVE_APPLICATION", applicationId }), []);
  const rejectApplication = useCallback((applicationId: string, reason: string) => dispatch({ type: "REJECT_APPLICATION", applicationId, reason }), []);
  const getRider = useCallback((riderId: string) => state.riders.find((r) => r.id === riderId), [state.riders]);

  const value = useMemo<AdminRidersContextValue>(
    () => ({
      riders: state.riders,
      filteredRiders: paginatedRiders,
      zones: state.zones,
      applications: state.applications,
      payouts: state.payouts,
      searchQuery: state.searchQuery,
      statusFilter: state.statusFilter,
      currentPage: state.currentPage,
      totalPages,
      activeTab: state.activeTab,
      setSearchQuery,
      setStatusFilter,
      setPage,
      setActiveTab,
      suspendRider,
      activateRider,
      approveApplication,
      rejectApplication,
      getRider,
    }),
    [state.riders, paginatedRiders, state.zones, state.applications, state.payouts, state.searchQuery, state.statusFilter, state.currentPage, totalPages, state.activeTab, setSearchQuery, setStatusFilter, setPage, setActiveTab, suspendRider, activateRider, approveApplication, rejectApplication, getRider]
  );

  return (
    <AdminRidersContext.Provider value={value}>
      {children}
    </AdminRidersContext.Provider>
  );
}

// ---- Hook ----
export function useAdminRiders(): AdminRidersContextValue {
  const ctx = useContext(AdminRidersContext);
  if (!ctx) throw new Error("useAdminRiders must be used within an AdminRidersProvider");
  return ctx;
}
