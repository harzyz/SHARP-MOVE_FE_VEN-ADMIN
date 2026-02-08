"use client";

import { createContext, useContext, useReducer, useMemo, useCallback, type ReactNode } from "react";
import type { CustomerUser, CustomerAccountStatus } from "@/types";
import { MOCK_CUSTOMERS } from "@/lib/mock-data";

const ITEMS_PER_PAGE = 10;

// ---- State ----
interface AdminUsersState {
  customers: CustomerUser[];
  searchQuery: string;
  statusFilter: CustomerAccountStatus | "all";
  currentPage: number;
}

// ---- Actions ----
type AdminUsersAction =
  | { type: "SET_SEARCH_QUERY"; query: string }
  | { type: "SET_STATUS_FILTER"; status: CustomerAccountStatus | "all" }
  | { type: "SET_PAGE"; page: number }
  | { type: "SUSPEND_CUSTOMER"; customerId: string }
  | { type: "ACTIVATE_CUSTOMER"; customerId: string }
  | { type: "BAN_CUSTOMER"; customerId: string }
  | { type: "FLAG_FRAUD"; customerId: string; reason: string }
  | { type: "CLEAR_FRAUD_FLAG"; customerId: string }
  | { type: "ADJUST_WALLET"; customerId: string; amount: number };

// ---- Reducer ----
function updateCustomer(
  customers: CustomerUser[],
  customerId: string,
  updates: Partial<CustomerUser>
): CustomerUser[] {
  return customers.map((c) => (c.id === customerId ? { ...c, ...updates } : c));
}

function adminUsersReducer(state: AdminUsersState, action: AdminUsersAction): AdminUsersState {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.query, currentPage: 1 };
    case "SET_STATUS_FILTER":
      return { ...state, statusFilter: action.status, currentPage: 1 };
    case "SET_PAGE":
      return { ...state, currentPage: action.page };
    case "SUSPEND_CUSTOMER":
      return { ...state, customers: updateCustomer(state.customers, action.customerId, { accountStatus: "suspended" }) };
    case "ACTIVATE_CUSTOMER":
      return { ...state, customers: updateCustomer(state.customers, action.customerId, { accountStatus: "active" }) };
    case "BAN_CUSTOMER":
      return { ...state, customers: updateCustomer(state.customers, action.customerId, { accountStatus: "banned" }) };
    case "FLAG_FRAUD":
      return { ...state, customers: updateCustomer(state.customers, action.customerId, { isFraudFlagged: true, fraudFlagReason: action.reason }) };
    case "CLEAR_FRAUD_FLAG":
      return { ...state, customers: updateCustomer(state.customers, action.customerId, { isFraudFlagged: false, fraudFlagReason: undefined }) };
    case "ADJUST_WALLET":
      return {
        ...state,
        customers: state.customers.map((c) =>
          c.id === action.customerId ? { ...c, walletBalance: c.walletBalance + action.amount } : c
        ),
      };
    default:
      return state;
  }
}

// ---- Context ----
interface AdminUsersContextValue {
  customers: CustomerUser[];
  filteredCustomers: CustomerUser[];
  searchQuery: string;
  statusFilter: CustomerAccountStatus | "all";
  currentPage: number;
  totalPages: number;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: CustomerAccountStatus | "all") => void;
  setPage: (page: number) => void;
  suspendCustomer: (customerId: string) => void;
  activateCustomer: (customerId: string) => void;
  banCustomer: (customerId: string) => void;
  flagFraud: (customerId: string, reason: string) => void;
  clearFraudFlag: (customerId: string) => void;
  adjustWallet: (customerId: string, amount: number) => void;
  getCustomer: (customerId: string) => CustomerUser | undefined;
}

const AdminUsersContext = createContext<AdminUsersContextValue | null>(null);

// ---- Provider ----
export function AdminUsersProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(adminUsersReducer, {
    customers: MOCK_CUSTOMERS,
    searchQuery: "",
    statusFilter: "all",
    currentPage: 1,
  });

  const filteredCustomers = useMemo(() => {
    let result = state.customers;
    if (state.statusFilter !== "all") {
      result = result.filter((c) => c.accountStatus === state.statusFilter);
    }
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.email.toLowerCase().includes(q) ||
          c.phone.includes(q)
      );
    }
    return result;
  }, [state.customers, state.statusFilter, state.searchQuery]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE)), [filteredCustomers.length]);

  const paginatedCustomers = useMemo(() => {
    const start = (state.currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCustomers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCustomers, state.currentPage]);

  const setSearchQuery = useCallback((query: string) => dispatch({ type: "SET_SEARCH_QUERY", query }), []);
  const setStatusFilter = useCallback((status: CustomerAccountStatus | "all") => dispatch({ type: "SET_STATUS_FILTER", status }), []);
  const setPage = useCallback((page: number) => dispatch({ type: "SET_PAGE", page }), []);
  const suspendCustomer = useCallback((customerId: string) => dispatch({ type: "SUSPEND_CUSTOMER", customerId }), []);
  const activateCustomer = useCallback((customerId: string) => dispatch({ type: "ACTIVATE_CUSTOMER", customerId }), []);
  const banCustomer = useCallback((customerId: string) => dispatch({ type: "BAN_CUSTOMER", customerId }), []);
  const flagFraud = useCallback((customerId: string, reason: string) => dispatch({ type: "FLAG_FRAUD", customerId, reason }), []);
  const clearFraudFlag = useCallback((customerId: string) => dispatch({ type: "CLEAR_FRAUD_FLAG", customerId }), []);
  const adjustWallet = useCallback((customerId: string, amount: number) => dispatch({ type: "ADJUST_WALLET", customerId, amount }), []);
  const getCustomer = useCallback((customerId: string) => state.customers.find((c) => c.id === customerId), [state.customers]);

  const value = useMemo<AdminUsersContextValue>(
    () => ({
      customers: state.customers,
      filteredCustomers: paginatedCustomers,
      searchQuery: state.searchQuery,
      statusFilter: state.statusFilter,
      currentPage: state.currentPage,
      totalPages,
      setSearchQuery,
      setStatusFilter,
      setPage,
      suspendCustomer,
      activateCustomer,
      banCustomer,
      flagFraud,
      clearFraudFlag,
      adjustWallet,
      getCustomer,
    }),
    [state.customers, paginatedCustomers, state.searchQuery, state.statusFilter, state.currentPage, totalPages, setSearchQuery, setStatusFilter, setPage, suspendCustomer, activateCustomer, banCustomer, flagFraud, clearFraudFlag, adjustWallet, getCustomer]
  );

  return (
    <AdminUsersContext.Provider value={value}>
      {children}
    </AdminUsersContext.Provider>
  );
}

// ---- Hook ----
export function useAdminUsers(): AdminUsersContextValue {
  const ctx = useContext(AdminUsersContext);
  if (!ctx) throw new Error("useAdminUsers must be used within an AdminUsersProvider");
  return ctx;
}
