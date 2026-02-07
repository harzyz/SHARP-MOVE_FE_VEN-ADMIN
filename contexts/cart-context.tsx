"use client";

import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import type { MenuItem, CartItem } from "@/types/ordering";

/* ------------------------------------------------------------------ */
/*  State                                                              */
/* ------------------------------------------------------------------ */
interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

/* ------------------------------------------------------------------ */
/*  Actions                                                            */
/* ------------------------------------------------------------------ */
type CartAction =
  | { type: "ADD_ITEM"; menuItem: MenuItem; quantity: number; specialInstructions?: string }
  | { type: "REMOVE_ITEM"; menuItemId: string }
  | { type: "UPDATE_QUANTITY"; menuItemId: string; quantity: number }
  | { type: "CLEAR_CART" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const idx = state.items.findIndex(
        (i) => i.menuItem.id === action.menuItem.id
      );
      if (idx >= 0) {
        const updated = [...state.items];
        updated[idx] = {
          ...updated[idx],
          quantity: updated[idx].quantity + action.quantity,
          specialInstructions:
            action.specialInstructions ?? updated[idx].specialInstructions,
        };
        return { items: updated };
      }
      return {
        items: [
          ...state.items,
          {
            menuItem: action.menuItem,
            quantity: action.quantity,
            specialInstructions: action.specialInstructions,
          },
        ],
      };
    }

    case "REMOVE_ITEM":
      return {
        items: state.items.filter((i) => i.menuItem.id !== action.menuItemId),
      };

    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return {
          items: state.items.filter(
            (i) => i.menuItem.id !== action.menuItemId
          ),
        };
      }
      return {
        items: state.items.map((i) =>
          i.menuItem.id === action.menuItemId
            ? { ...i, quantity: action.quantity }
            : i
        ),
      };
    }

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
}

/* ------------------------------------------------------------------ */
/*  Context value                                                      */
/* ------------------------------------------------------------------ */
interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  serviceFee: number;
  addItem: (menuItem: MenuItem, quantity?: number, specialInstructions?: string) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, i) => sum + i.menuItem.price * i.quantity,
    0
  );
  const serviceFee = Math.max(100, Math.round(subtotal * 0.05));

  const value: CartContextValue = {
    items: state.items,
    itemCount,
    subtotal,
    serviceFee,
    addItem: (menuItem, quantity = 1, specialInstructions) =>
      dispatch({ type: "ADD_ITEM", menuItem, quantity, specialInstructions }),
    removeItem: (menuItemId) =>
      dispatch({ type: "REMOVE_ITEM", menuItemId }),
    updateQuantity: (menuItemId, quantity) =>
      dispatch({ type: "UPDATE_QUANTITY", menuItemId, quantity }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
