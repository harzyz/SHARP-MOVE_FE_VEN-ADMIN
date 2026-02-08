"use client";

import { createContext, useContext, useReducer, useMemo, useCallback, type ReactNode } from "react";
import type { AdminVendor, AdminVendorStatus, VendorApplication } from "@/types";
import { MOCK_ADMIN_VENDORS, MOCK_VENDOR_APPLICATIONS } from "@/lib/mock-data";

const ITEMS_PER_PAGE = 10;

// ---- State ----
interface AdminVendorsState {
  vendors: AdminVendor[];
  applications: VendorApplication[];
  searchQuery: string;
  statusFilter: AdminVendorStatus | "all";
  currentPage: number;
  activeTab: "vendors" | "pipeline";
}

// ---- Actions ----
type AdminVendorsAction =
  | { type: "SET_SEARCH_QUERY"; query: string }
  | { type: "SET_STATUS_FILTER"; status: AdminVendorStatus | "all" }
  | { type: "SET_PAGE"; page: number }
  | { type: "SET_ACTIVE_TAB"; tab: "vendors" | "pipeline" }
  | { type: "SUSPEND_VENDOR"; vendorId: string }
  | { type: "ACTIVATE_VENDOR"; vendorId: string }
  | { type: "UPDATE_COMMISSION"; vendorId: string; rate: number }
  | { type: "APPROVE_APPLICATION"; applicationId: string }
  | { type: "REJECT_APPLICATION"; applicationId: string; reason: string };

// ---- Reducer ----
function updateVendor(vendors: AdminVendor[], vendorId: string, updates: Partial<AdminVendor>): AdminVendor[] {
  return vendors.map((v) => (v.id === vendorId ? { ...v, ...updates } : v));
}

function adminVendorsReducer(state: AdminVendorsState, action: AdminVendorsAction): AdminVendorsState {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.query, currentPage: 1 };
    case "SET_STATUS_FILTER":
      return { ...state, statusFilter: action.status, currentPage: 1 };
    case "SET_PAGE":
      return { ...state, currentPage: action.page };
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.tab, searchQuery: "", statusFilter: "all", currentPage: 1 };
    case "SUSPEND_VENDOR":
      return { ...state, vendors: updateVendor(state.vendors, action.vendorId, { status: "suspended", isOpen: false }) };
    case "ACTIVATE_VENDOR":
      return { ...state, vendors: updateVendor(state.vendors, action.vendorId, { status: "active" }) };
    case "UPDATE_COMMISSION":
      return { ...state, vendors: updateVendor(state.vendors, action.vendorId, { commissionRate: action.rate }) };
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
interface AdminVendorsContextValue {
  vendors: AdminVendor[];
  filteredVendors: AdminVendor[];
  applications: VendorApplication[];
  searchQuery: string;
  statusFilter: AdminVendorStatus | "all";
  currentPage: number;
  totalPages: number;
  activeTab: "vendors" | "pipeline";
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: AdminVendorStatus | "all") => void;
  setPage: (page: number) => void;
  setActiveTab: (tab: "vendors" | "pipeline") => void;
  suspendVendor: (vendorId: string) => void;
  activateVendor: (vendorId: string) => void;
  updateCommission: (vendorId: string, rate: number) => void;
  approveApplication: (applicationId: string) => void;
  rejectApplication: (applicationId: string, reason: string) => void;
  getVendor: (vendorId: string) => AdminVendor | undefined;
}

const AdminVendorsContext = createContext<AdminVendorsContextValue | null>(null);

// ---- Provider ----
export function AdminVendorsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(adminVendorsReducer, {
    vendors: MOCK_ADMIN_VENDORS,
    applications: MOCK_VENDOR_APPLICATIONS,
    searchQuery: "",
    statusFilter: "all",
    currentPage: 1,
    activeTab: "vendors",
  });

  const filteredVendors = useMemo(() => {
    let result = state.vendors;
    if (state.statusFilter !== "all") {
      result = result.filter((v) => v.status === state.statusFilter);
    }
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.ownerName.toLowerCase().includes(q) ||
          v.email.toLowerCase().includes(q)
      );
    }
    return result;
  }, [state.vendors, state.statusFilter, state.searchQuery]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(filteredVendors.length / ITEMS_PER_PAGE)), [filteredVendors.length]);

  const paginatedVendors = useMemo(() => {
    const start = (state.currentPage - 1) * ITEMS_PER_PAGE;
    return filteredVendors.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredVendors, state.currentPage]);

  const setSearchQuery = useCallback((query: string) => dispatch({ type: "SET_SEARCH_QUERY", query }), []);
  const setStatusFilter = useCallback((status: AdminVendorStatus | "all") => dispatch({ type: "SET_STATUS_FILTER", status }), []);
  const setPage = useCallback((page: number) => dispatch({ type: "SET_PAGE", page }), []);
  const setActiveTab = useCallback((tab: "vendors" | "pipeline") => dispatch({ type: "SET_ACTIVE_TAB", tab }), []);
  const suspendVendor = useCallback((vendorId: string) => dispatch({ type: "SUSPEND_VENDOR", vendorId }), []);
  const activateVendor = useCallback((vendorId: string) => dispatch({ type: "ACTIVATE_VENDOR", vendorId }), []);
  const updateCommission = useCallback((vendorId: string, rate: number) => dispatch({ type: "UPDATE_COMMISSION", vendorId, rate }), []);
  const approveApplication = useCallback((applicationId: string) => dispatch({ type: "APPROVE_APPLICATION", applicationId }), []);
  const rejectApplication = useCallback((applicationId: string, reason: string) => dispatch({ type: "REJECT_APPLICATION", applicationId, reason }), []);
  const getVendor = useCallback((vendorId: string) => state.vendors.find((v) => v.id === vendorId), [state.vendors]);

  const value = useMemo<AdminVendorsContextValue>(
    () => ({
      vendors: state.vendors,
      filteredVendors: paginatedVendors,
      applications: state.applications,
      searchQuery: state.searchQuery,
      statusFilter: state.statusFilter,
      currentPage: state.currentPage,
      totalPages,
      activeTab: state.activeTab,
      setSearchQuery,
      setStatusFilter,
      setPage,
      setActiveTab,
      suspendVendor,
      activateVendor,
      updateCommission,
      approveApplication,
      rejectApplication,
      getVendor,
    }),
    [state.vendors, paginatedVendors, state.applications, state.searchQuery, state.statusFilter, state.currentPage, totalPages, state.activeTab, setSearchQuery, setStatusFilter, setPage, setActiveTab, suspendVendor, activateVendor, updateCommission, approveApplication, rejectApplication, getVendor]
  );

  return (
    <AdminVendorsContext.Provider value={value}>
      {children}
    </AdminVendorsContext.Provider>
  );
}

// ---- Hook ----
export function useAdminVendors(): AdminVendorsContextValue {
  const ctx = useContext(AdminVendorsContext);
  if (!ctx) throw new Error("useAdminVendors must be used within an AdminVendorsProvider");
  return ctx;
}
