"use client";

import { createContext, useContext, useReducer, useMemo, useCallback, type ReactNode } from "react";
import type { AdminUser } from "@/types";
import { MOCK_ADMIN_USER } from "@/lib/mock-data";

// ---- State ----
interface AdminAuthState {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ---- Actions ----
type AdminAuthAction =
  | { type: "LOGIN_SUCCESS"; admin: AdminUser }
  | { type: "LOGOUT" }
  | { type: "SET_LOADING"; isLoading: boolean };

// ---- Reducer ----
function adminAuthReducer(state: AdminAuthState, action: AdminAuthAction): AdminAuthState {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { admin: action.admin, isAuthenticated: true, isLoading: false };
    case "LOGOUT":
      return { admin: null, isAuthenticated: false, isLoading: false };
    case "SET_LOADING":
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
}

// ---- Context ----
interface AdminAuthContextValue {
  admin: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

// ---- Provider ----
export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(adminAuthReducer, {
    admin: MOCK_ADMIN_USER,
    isAuthenticated: true,
    isLoading: false,
  });

  const login = useCallback((_email: string, _password: string) => {
    dispatch({ type: "SET_LOADING", isLoading: true });
    // Mock: always succeed
    setTimeout(() => {
      dispatch({ type: "LOGIN_SUCCESS", admin: MOCK_ADMIN_USER });
    }, 500);
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
  }, []);

  const value = useMemo<AdminAuthContextValue>(
    () => ({
      admin: state.admin,
      isAuthenticated: state.isAuthenticated,
      isLoading: state.isLoading,
      login,
      logout,
    }),
    [state.admin, state.isAuthenticated, state.isLoading, login, logout]
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

// ---- Hook ----
export function useAdminAuth(): AdminAuthContextValue {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  return ctx;
}
