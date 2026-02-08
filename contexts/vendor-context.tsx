"use client";

import { createContext, useContext, useReducer, useMemo, useCallback, type ReactNode } from "react";
import type { StoreProfile, OperatingHours } from "@/types";
import { MOCK_STORE_PROFILE } from "@/lib/mock-data";

// ---- State ----
interface VendorState {
  profile: StoreProfile;
}

// ---- Actions ----
type VendorAction =
  | { type: "UPDATE_PROFILE"; data: Partial<StoreProfile> }
  | { type: "TOGGLE_STORE_OPEN" }
  | { type: "UPDATE_HOURS"; hours: OperatingHours[] };

// ---- Reducer ----
function vendorReducer(state: VendorState, action: VendorAction): VendorState {
  switch (action.type) {
    case "UPDATE_PROFILE":
      return { profile: { ...state.profile, ...action.data } };
    case "TOGGLE_STORE_OPEN":
      return { profile: { ...state.profile, isOpen: !state.profile.isOpen } };
    case "UPDATE_HOURS":
      return { profile: { ...state.profile, operatingHours: action.hours } };
    default:
      return state;
  }
}

// ---- Context ----
interface VendorContextValue {
  profile: StoreProfile;
  isStoreOpen: boolean;
  toggleStoreOpen: () => void;
  updateProfile: (data: Partial<StoreProfile>) => void;
  updateHours: (hours: OperatingHours[]) => void;
}

const VendorContext = createContext<VendorContextValue | null>(null);

// ---- Provider ----
export function VendorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(vendorReducer, {
    profile: MOCK_STORE_PROFILE,
  });

  const toggleStoreOpen = useCallback(() => dispatch({ type: "TOGGLE_STORE_OPEN" }), []);
  const updateProfile = useCallback((data: Partial<StoreProfile>) => dispatch({ type: "UPDATE_PROFILE", data }), []);
  const updateHours = useCallback((hours: OperatingHours[]) => dispatch({ type: "UPDATE_HOURS", hours }), []);

  const value = useMemo<VendorContextValue>(
    () => ({
      profile: state.profile,
      isStoreOpen: state.profile.isOpen,
      toggleStoreOpen,
      updateProfile,
      updateHours,
    }),
    [state.profile, toggleStoreOpen, updateProfile, updateHours]
  );

  return <VendorContext.Provider value={value}>{children}</VendorContext.Provider>;
}

// ---- Hook ----
export function useVendor(): VendorContextValue {
  const ctx = useContext(VendorContext);
  if (!ctx) throw new Error("useVendor must be used within a VendorProvider");
  return ctx;
}
