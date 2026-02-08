"use client";

import { createContext, useContext, useReducer, useMemo, useCallback, type ReactNode } from "react";
import type { SupportTicket, TicketStatus, TicketPriority, TicketCategory } from "@/types";
import { MOCK_SUPPORT_TICKETS } from "@/lib/mock-data";

const ITEMS_PER_PAGE = 10;

// ---- State ----
interface AdminSupportState {
  tickets: SupportTicket[];
  searchQuery: string;
  statusFilter: TicketStatus | "all";
  priorityFilter: TicketPriority | "all";
  categoryFilter: TicketCategory | "all";
  currentPage: number;
}

// ---- Actions ----
type AdminSupportAction =
  | { type: "SET_SEARCH_QUERY"; query: string }
  | { type: "SET_STATUS_FILTER"; status: TicketStatus | "all" }
  | { type: "SET_PRIORITY_FILTER"; priority: TicketPriority | "all" }
  | { type: "SET_CATEGORY_FILTER"; category: TicketCategory | "all" }
  | { type: "SET_PAGE"; page: number }
  | { type: "ASSIGN_TICKET"; ticketId: string; assignee: string }
  | { type: "UPDATE_STATUS"; ticketId: string; status: TicketStatus }
  | { type: "ADD_MESSAGE"; ticketId: string; message: string; sender: string };

function updateTicket(tickets: SupportTicket[], ticketId: string, updates: Partial<SupportTicket>): SupportTicket[] {
  return tickets.map((t) => (t.id === ticketId ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t));
}

function adminSupportReducer(state: AdminSupportState, action: AdminSupportAction): AdminSupportState {
  switch (action.type) {
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.query, currentPage: 1 };
    case "SET_STATUS_FILTER":
      return { ...state, statusFilter: action.status, currentPage: 1 };
    case "SET_PRIORITY_FILTER":
      return { ...state, priorityFilter: action.priority, currentPage: 1 };
    case "SET_CATEGORY_FILTER":
      return { ...state, categoryFilter: action.category, currentPage: 1 };
    case "SET_PAGE":
      return { ...state, currentPage: action.page };
    case "ASSIGN_TICKET":
      return { ...state, tickets: updateTicket(state.tickets, action.ticketId, { assignedTo: action.assignee }) };
    case "UPDATE_STATUS": {
      const updates: Partial<SupportTicket> = { status: action.status };
      if (action.status === "resolved") updates.resolvedAt = new Date().toISOString();
      return { ...state, tickets: updateTicket(state.tickets, action.ticketId, updates) };
    }
    case "ADD_MESSAGE":
      return {
        ...state,
        tickets: state.tickets.map((t) =>
          t.id === action.ticketId
            ? {
                ...t,
                updatedAt: new Date().toISOString(),
                messages: [
                  ...t.messages,
                  { id: `msg-${Date.now()}`, sender: action.sender, senderRole: "admin" as const, message: action.message, timestamp: new Date().toISOString() },
                ],
              }
            : t
        ),
      };
    default:
      return state;
  }
}

// ---- Context ----
interface AdminSupportContextValue {
  tickets: SupportTicket[];
  filteredTickets: SupportTicket[];
  searchQuery: string;
  statusFilter: TicketStatus | "all";
  priorityFilter: TicketPriority | "all";
  categoryFilter: TicketCategory | "all";
  currentPage: number;
  totalPages: number;
  ticketCounts: Record<string, number>;
  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: TicketStatus | "all") => void;
  setPriorityFilter: (priority: TicketPriority | "all") => void;
  setCategoryFilter: (category: TicketCategory | "all") => void;
  setPage: (page: number) => void;
  assignTicket: (ticketId: string, assignee: string) => void;
  updateStatus: (ticketId: string, status: TicketStatus) => void;
  addMessage: (ticketId: string, message: string, sender: string) => void;
  getTicket: (ticketId: string) => SupportTicket | undefined;
}

const AdminSupportContext = createContext<AdminSupportContextValue | null>(null);

// ---- Provider ----
export function AdminSupportProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(adminSupportReducer, {
    tickets: MOCK_SUPPORT_TICKETS,
    searchQuery: "",
    statusFilter: "all",
    priorityFilter: "all",
    categoryFilter: "all",
    currentPage: 1,
  });

  const filteredTickets = useMemo(() => {
    let result = state.tickets;
    if (state.statusFilter !== "all") {
      result = result.filter((t) => t.status === state.statusFilter);
    }
    if (state.priorityFilter !== "all") {
      result = result.filter((t) => t.priority === state.priorityFilter);
    }
    if (state.categoryFilter !== "all") {
      result = result.filter((t) => t.category === state.categoryFilter);
    }
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.ticketNumber.toLowerCase().includes(q) ||
          t.subject.toLowerCase().includes(q) ||
          t.customerName.toLowerCase().includes(q)
      );
    }
    return result;
  }, [state.tickets, state.statusFilter, state.priorityFilter, state.categoryFilter, state.searchQuery]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(filteredTickets.length / ITEMS_PER_PAGE)), [filteredTickets.length]);

  const paginatedTickets = useMemo(() => {
    const start = (state.currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTickets.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTickets, state.currentPage]);

  const ticketCounts = useMemo(() => {
    const counts: Record<string, number> = { all: state.tickets.length };
    for (const t of state.tickets) {
      counts[t.status] = (counts[t.status] || 0) + 1;
    }
    return counts;
  }, [state.tickets]);

  const setSearchQuery = useCallback((query: string) => dispatch({ type: "SET_SEARCH_QUERY", query }), []);
  const setStatusFilter = useCallback((status: TicketStatus | "all") => dispatch({ type: "SET_STATUS_FILTER", status }), []);
  const setPriorityFilter = useCallback((priority: TicketPriority | "all") => dispatch({ type: "SET_PRIORITY_FILTER", priority }), []);
  const setCategoryFilter = useCallback((category: TicketCategory | "all") => dispatch({ type: "SET_CATEGORY_FILTER", category }), []);
  const setPage = useCallback((page: number) => dispatch({ type: "SET_PAGE", page }), []);
  const assignTicket = useCallback((ticketId: string, assignee: string) => dispatch({ type: "ASSIGN_TICKET", ticketId, assignee }), []);
  const updateStatus = useCallback((ticketId: string, status: TicketStatus) => dispatch({ type: "UPDATE_STATUS", ticketId, status }), []);
  const addMessage = useCallback((ticketId: string, message: string, sender: string) => dispatch({ type: "ADD_MESSAGE", ticketId, message, sender }), []);
  const getTicket = useCallback((ticketId: string) => state.tickets.find((t) => t.id === ticketId), [state.tickets]);

  const value = useMemo<AdminSupportContextValue>(
    () => ({
      tickets: state.tickets,
      filteredTickets: paginatedTickets,
      searchQuery: state.searchQuery,
      statusFilter: state.statusFilter,
      priorityFilter: state.priorityFilter,
      categoryFilter: state.categoryFilter,
      currentPage: state.currentPage,
      totalPages,
      ticketCounts,
      setSearchQuery,
      setStatusFilter,
      setPriorityFilter,
      setCategoryFilter,
      setPage,
      assignTicket,
      updateStatus,
      addMessage,
      getTicket,
    }),
    [state.tickets, paginatedTickets, state.searchQuery, state.statusFilter, state.priorityFilter, state.categoryFilter, state.currentPage, totalPages, ticketCounts, setSearchQuery, setStatusFilter, setPriorityFilter, setCategoryFilter, setPage, assignTicket, updateStatus, addMessage, getTicket]
  );

  return (
    <AdminSupportContext.Provider value={value}>
      {children}
    </AdminSupportContext.Provider>
  );
}

// ---- Hook ----
export function useAdminSupport(): AdminSupportContextValue {
  const ctx = useContext(AdminSupportContext);
  if (!ctx) throw new Error("useAdminSupport must be used within an AdminSupportProvider");
  return ctx;
}
