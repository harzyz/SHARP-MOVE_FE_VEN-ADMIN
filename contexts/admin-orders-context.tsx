"use client";

import { createContext, useContext, useReducer, useMemo, useCallback, type ReactNode } from "react";
import type { AdminOrder, AdminOrderStatus, AdminOrderPriority, OrderDispute, AdminOrderTimelineEvent } from "@/types";
import { MOCK_ADMIN_ORDERS, MOCK_ORDER_DISPUTES, MOCK_ORDER_TIMELINES } from "@/lib/mock-data";

const ITEMS_PER_PAGE = 10;

// ---- State ----
interface AdminOrdersState {
  orders: AdminOrder[];
  disputes: OrderDispute[];
  timelines: Record<string, AdminOrderTimelineEvent[]>;
  searchQuery: string;
  statusFilter: AdminOrderStatus | "all";
  priorityFilter: AdminOrderPriority | "all";
  currentPage: number;
}

// ---- Actions ----
type AdminOrdersAction =
  | { type: "SET_SEARCH_QUERY"; query: string }
  | { type: "SET_STATUS_FILTER"; status: AdminOrderStatus | "all" }
  | { type: "SET_PRIORITY_FILTER"; priority: AdminOrderPriority | "all" }
  | { type: "SET_PAGE"; page: number }
  | { type: "UPDATE_ORDER_STATUS"; orderId: string; status: AdminOrderStatus }
  | { type: "ADD_ADMIN_NOTE"; orderId: string; note: string }
  | { type: "ESCALATE_ORDER"; orderId: string }
  | { type: "ISSUE_REFUND"; orderId: string }
  | { type: "REASSIGN_RIDER"; orderId: string; riderName: string; riderId: string }
  | { type: "RESOLVE_DISPUTE"; disputeId: string; resolution: string };

// ---- Reducer ----
function updateOrder(orders: AdminOrder[], orderId: string, updates: Partial<AdminOrder>): AdminOrder[] {
  return orders.map((o) => (o.id === orderId ? { ...o, ...updates } : o));
}

function adminOrdersReducer(state: AdminOrdersState, action: AdminOrdersAction): AdminOrdersState {
  const now = new Date().toISOString();

  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.query, currentPage: 1 };
    case "SET_STATUS_FILTER":
      return { ...state, statusFilter: action.status, currentPage: 1 };
    case "SET_PRIORITY_FILTER":
      return { ...state, priorityFilter: action.priority, currentPage: 1 };
    case "SET_PAGE":
      return { ...state, currentPage: action.page };
    case "UPDATE_ORDER_STATUS":
      return { ...state, orders: updateOrder(state.orders, action.orderId, { status: action.status }) };
    case "ADD_ADMIN_NOTE":
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.id === action.orderId
            ? { ...o, adminNotes: o.adminNotes ? `${o.adminNotes}\n${action.note}` : action.note }
            : o
        ),
      };
    case "ESCALATE_ORDER":
      return { ...state, orders: updateOrder(state.orders, action.orderId, { priority: "urgent" }) };
    case "ISSUE_REFUND":
      return {
        ...state,
        orders: updateOrder(state.orders, action.orderId, {
          status: "refunded",
          paymentStatus: "refunded",
          cancelledAt: now,
        }),
      };
    case "REASSIGN_RIDER":
      return {
        ...state,
        orders: updateOrder(state.orders, action.orderId, {
          riderName: action.riderName,
          riderId: action.riderId,
        }),
      };
    case "RESOLVE_DISPUTE":
      return {
        ...state,
        disputes: state.disputes.map((d) =>
          d.id === action.disputeId
            ? { ...d, status: "resolved", resolvedAt: now, resolution: action.resolution }
            : d
        ),
      };
    default:
      return state;
  }
}

// ---- Context ----
interface AdminOrdersContextValue {
  orders: AdminOrder[];
  filteredOrders: AdminOrder[];
  disputes: OrderDispute[];
  searchQuery: string;
  statusFilter: AdminOrderStatus | "all";
  priorityFilter: AdminOrderPriority | "all";
  currentPage: number;
  totalPages: number;
  orderCounts: Record<string, number>;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: AdminOrderStatus | "all") => void;
  setPriorityFilter: (priority: AdminOrderPriority | "all") => void;
  setPage: (page: number) => void;
  updateOrderStatus: (orderId: string, status: AdminOrderStatus) => void;
  addAdminNote: (orderId: string, note: string) => void;
  escalateOrder: (orderId: string) => void;
  issueRefund: (orderId: string) => void;
  reassignRider: (orderId: string, riderName: string, riderId: string) => void;
  resolveDispute: (disputeId: string, resolution: string) => void;
  getOrder: (orderId: string) => AdminOrder | undefined;
  getOrderTimeline: (orderId: string) => AdminOrderTimelineEvent[];
}

const AdminOrdersContext = createContext<AdminOrdersContextValue | null>(null);

// ---- Provider ----
export function AdminOrdersProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(adminOrdersReducer, {
    orders: MOCK_ADMIN_ORDERS,
    disputes: MOCK_ORDER_DISPUTES,
    timelines: MOCK_ORDER_TIMELINES,
    searchQuery: "",
    statusFilter: "all",
    priorityFilter: "all",
    currentPage: 1,
  });

  const filteredOrders = useMemo(() => {
    let result = state.orders;
    if (state.statusFilter !== "all") {
      result = result.filter((o) => o.status === state.statusFilter);
    }
    if (state.priorityFilter !== "all") {
      result = result.filter((o) => o.priority === state.priorityFilter);
    }
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q) ||
          o.vendorName.toLowerCase().includes(q)
      );
    }
    return result;
  }, [state.orders, state.statusFilter, state.priorityFilter, state.searchQuery]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)), [filteredOrders.length]);

  const paginatedOrders = useMemo(() => {
    const start = (state.currentPage - 1) * ITEMS_PER_PAGE;
    return filteredOrders.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredOrders, state.currentPage]);

  const orderCounts = useMemo(() => {
    const counts: Record<string, number> = { all: state.orders.length };
    for (const order of state.orders) {
      counts[order.status] = (counts[order.status] || 0) + 1;
    }
    return counts;
  }, [state.orders]);

  const setSearchQuery = useCallback((query: string) => dispatch({ type: "SET_SEARCH_QUERY", query }), []);
  const setStatusFilter = useCallback((status: AdminOrderStatus | "all") => dispatch({ type: "SET_STATUS_FILTER", status }), []);
  const setPriorityFilter = useCallback((priority: AdminOrderPriority | "all") => dispatch({ type: "SET_PRIORITY_FILTER", priority }), []);
  const setPage = useCallback((page: number) => dispatch({ type: "SET_PAGE", page }), []);
  const updateOrderStatus = useCallback((orderId: string, status: AdminOrderStatus) => dispatch({ type: "UPDATE_ORDER_STATUS", orderId, status }), []);
  const addAdminNote = useCallback((orderId: string, note: string) => dispatch({ type: "ADD_ADMIN_NOTE", orderId, note }), []);
  const escalateOrder = useCallback((orderId: string) => dispatch({ type: "ESCALATE_ORDER", orderId }), []);
  const issueRefund = useCallback((orderId: string) => dispatch({ type: "ISSUE_REFUND", orderId }), []);
  const reassignRider = useCallback((orderId: string, riderName: string, riderId: string) => dispatch({ type: "REASSIGN_RIDER", orderId, riderName, riderId }), []);
  const resolveDispute = useCallback((disputeId: string, resolution: string) => dispatch({ type: "RESOLVE_DISPUTE", disputeId, resolution }), []);
  const getOrder = useCallback((orderId: string) => state.orders.find((o) => o.id === orderId), [state.orders]);
  const getOrderTimeline = useCallback((orderId: string) => state.timelines[orderId] || [], [state.timelines]);

  const value = useMemo<AdminOrdersContextValue>(
    () => ({
      orders: state.orders,
      filteredOrders: paginatedOrders,
      disputes: state.disputes,
      searchQuery: state.searchQuery,
      statusFilter: state.statusFilter,
      priorityFilter: state.priorityFilter,
      currentPage: state.currentPage,
      totalPages,
      orderCounts,
      setSearchQuery,
      setStatusFilter,
      setPriorityFilter,
      setPage,
      updateOrderStatus,
      addAdminNote,
      escalateOrder,
      issueRefund,
      reassignRider,
      resolveDispute,
      getOrder,
      getOrderTimeline,
    }),
    [state.orders, paginatedOrders, state.disputes, state.searchQuery, state.statusFilter, state.priorityFilter, state.currentPage, totalPages, orderCounts, setSearchQuery, setStatusFilter, setPriorityFilter, setPage, updateOrderStatus, addAdminNote, escalateOrder, issueRefund, reassignRider, resolveDispute, getOrder, getOrderTimeline]
  );

  return (
    <AdminOrdersContext.Provider value={value}>
      {children}
    </AdminOrdersContext.Provider>
  );
}

// ---- Hook ----
export function useAdminOrders(): AdminOrdersContextValue {
  const ctx = useContext(AdminOrdersContext);
  if (!ctx) throw new Error("useAdminOrders must be used within an AdminOrdersProvider");
  return ctx;
}
