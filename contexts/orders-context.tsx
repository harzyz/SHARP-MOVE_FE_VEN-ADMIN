"use client";

import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import type { OrderSummary, OrderStatus } from "@/types/ordering";
import { MOCK_ORDER_HISTORY } from "@/lib/mock-data";

/* ------------------------------------------------------------------ */
/*  State                                                              */
/* ------------------------------------------------------------------ */
interface OrdersState {
  orders: OrderSummary[];
}

const initialState: OrdersState = { orders: MOCK_ORDER_HISTORY };

/* ------------------------------------------------------------------ */
/*  Actions                                                            */
/* ------------------------------------------------------------------ */
type OrdersAction =
  | { type: "PLACE_ORDER"; order: OrderSummary }
  | { type: "UPDATE_STATUS"; orderId: string; status: OrderStatus };

function ordersReducer(state: OrdersState, action: OrdersAction): OrdersState {
  switch (action.type) {
    case "PLACE_ORDER":
      return { orders: [action.order, ...state.orders] };

    case "UPDATE_STATUS":
      return {
        orders: state.orders.map((o) =>
          o.id === action.orderId ? { ...o, status: action.status } : o
        ),
      };

    default:
      return state;
  }
}

/* ------------------------------------------------------------------ */
/*  Context value                                                      */
/* ------------------------------------------------------------------ */
interface OrdersContextValue {
  orders: OrderSummary[];
  placeOrder: (order: OrderSummary) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrder: (orderId: string) => OrderSummary | undefined;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */
export function OrdersProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(ordersReducer, initialState);

  const value: OrdersContextValue = {
    orders: state.orders,
    placeOrder: (order) => dispatch({ type: "PLACE_ORDER", order }),
    updateOrderStatus: (orderId, status) =>
      dispatch({ type: "UPDATE_STATUS", orderId, status }),
    getOrder: (orderId) => state.orders.find((o) => o.id === orderId),
  };

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */
export function useOrders(): OrdersContextValue {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within an OrdersProvider");
  return ctx;
}
