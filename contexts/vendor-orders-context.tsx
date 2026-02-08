"use client";

import { createContext, useContext, useReducer, useMemo, useCallback, type ReactNode } from "react";
import type { VendorOrder, VendorOrderStatus } from "@/types";
import { MOCK_VENDOR_ORDERS } from "@/lib/mock-data";

// ---- State ----
interface VendorOrdersState {
  orders: VendorOrder[];
}

// ---- Actions ----
type VendorOrdersAction =
  | { type: "ACCEPT_ORDER"; orderId: string }
  | { type: "START_PREPARING"; orderId: string }
  | { type: "MARK_READY"; orderId: string }
  | { type: "COMPLETE_ORDER"; orderId: string }
  | { type: "CANCEL_ORDER"; orderId: string; reason: string }
  | { type: "SET_ORDERS"; orders: VendorOrder[] };

// ---- Reducer ----
function updateOrder(
  orders: VendorOrder[],
  orderId: string,
  updates: Partial<VendorOrder>
): VendorOrder[] {
  return orders.map((o) => (o.id === orderId ? { ...o, ...updates } : o));
}

function vendorOrdersReducer(state: VendorOrdersState, action: VendorOrdersAction): VendorOrdersState {
  const now = new Date().toISOString();

  switch (action.type) {
    case "ACCEPT_ORDER":
      return {
        orders: updateOrder(state.orders, action.orderId, {
          status: "preparing",
          acceptedAt: now,
          prepStartedAt: now,
        }),
      };
    case "START_PREPARING":
      return {
        orders: updateOrder(state.orders, action.orderId, {
          status: "preparing",
          prepStartedAt: now,
        }),
      };
    case "MARK_READY":
      return {
        orders: updateOrder(state.orders, action.orderId, {
          status: "ready",
          readyAt: now,
        }),
      };
    case "COMPLETE_ORDER":
      return {
        orders: updateOrder(state.orders, action.orderId, {
          status: "completed",
          completedAt: now,
        }),
      };
    case "CANCEL_ORDER":
      return {
        orders: updateOrder(state.orders, action.orderId, {
          status: "cancelled",
          cancelledAt: now,
          cancelReason: action.reason,
        }),
      };
    case "SET_ORDERS":
      return { orders: action.orders };
    default:
      return state;
  }
}

// ---- Context ----
interface VendorOrdersContextValue {
  orders: VendorOrder[];
  newOrders: VendorOrder[];
  preparingOrders: VendorOrder[];
  readyOrders: VendorOrder[];
  completedOrders: VendorOrder[];
  cancelledOrders: VendorOrder[];
  newOrderCount: number;
  acceptOrder: (orderId: string) => void;
  startPreparing: (orderId: string) => void;
  markReady: (orderId: string) => void;
  completeOrder: (orderId: string) => void;
  cancelOrder: (orderId: string, reason: string) => void;
  getOrder: (orderId: string) => VendorOrder | undefined;
}

const VendorOrdersContext = createContext<VendorOrdersContextValue | null>(null);

// ---- Provider ----
export function VendorOrdersProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(vendorOrdersReducer, {
    orders: MOCK_VENDOR_ORDERS,
  });

  const byStatus = useCallback(
    (status: VendorOrderStatus) => state.orders.filter((o) => o.status === status),
    [state.orders]
  );

  const newOrders = useMemo(() => byStatus("new"), [byStatus]);
  const preparingOrders = useMemo(() => byStatus("preparing"), [byStatus]);
  const readyOrders = useMemo(() => byStatus("ready"), [byStatus]);
  const completedOrders = useMemo(() => byStatus("completed"), [byStatus]);
  const cancelledOrders = useMemo(() => byStatus("cancelled"), [byStatus]);

  const acceptOrder = useCallback((orderId: string) => dispatch({ type: "ACCEPT_ORDER", orderId }), []);
  const startPreparing = useCallback((orderId: string) => dispatch({ type: "START_PREPARING", orderId }), []);
  const markReady = useCallback((orderId: string) => dispatch({ type: "MARK_READY", orderId }), []);
  const completeOrder = useCallback((orderId: string) => dispatch({ type: "COMPLETE_ORDER", orderId }), []);
  const cancelOrder = useCallback((orderId: string, reason: string) => dispatch({ type: "CANCEL_ORDER", orderId, reason }), []);
  const getOrder = useCallback((orderId: string) => state.orders.find((o) => o.id === orderId), [state.orders]);

  const value = useMemo<VendorOrdersContextValue>(
    () => ({
      orders: state.orders,
      newOrders,
      preparingOrders,
      readyOrders,
      completedOrders,
      cancelledOrders,
      newOrderCount: newOrders.length,
      acceptOrder,
      startPreparing,
      markReady,
      completeOrder,
      cancelOrder,
      getOrder,
    }),
    [state.orders, newOrders, preparingOrders, readyOrders, completedOrders, cancelledOrders, acceptOrder, startPreparing, markReady, completeOrder, cancelOrder, getOrder]
  );

  return (
    <VendorOrdersContext.Provider value={value}>
      {children}
    </VendorOrdersContext.Provider>
  );
}

// ---- Hook ----
export function useVendorOrders(): VendorOrdersContextValue {
  const ctx = useContext(VendorOrdersContext);
  if (!ctx) throw new Error("useVendorOrders must be used within a VendorOrdersProvider");
  return ctx;
}
