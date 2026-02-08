"use client";

import { createContext, useContext, useReducer, useMemo, useCallback, type ReactNode } from "react";
import type { VendorMenuCategory, VendorMenuItem } from "@/types";
import { VENDOR_MENU_CATEGORIES, VENDOR_MENU_ITEMS } from "@/lib/mock-data";
import { generateId } from "@/lib/utils";

// ---- State ----
interface MenuState {
  categories: VendorMenuCategory[];
  items: VendorMenuItem[];
}

// ---- Actions ----
type MenuAction =
  | { type: "ADD_CATEGORY"; category: VendorMenuCategory }
  | { type: "UPDATE_CATEGORY"; categoryId: string; name: string }
  | { type: "DELETE_CATEGORY"; categoryId: string }
  | { type: "REORDER_CATEGORIES"; categoryIds: string[] }
  | { type: "ADD_ITEM"; item: VendorMenuItem }
  | { type: "UPDATE_ITEM"; item: VendorMenuItem }
  | { type: "DELETE_ITEM"; itemId: string }
  | { type: "TOGGLE_AVAILABILITY"; itemId: string };

// ---- Reducer ----
function menuReducer(state: MenuState, action: MenuAction): MenuState {
  switch (action.type) {
    case "ADD_CATEGORY":
      return { ...state, categories: [...state.categories, action.category] };

    case "UPDATE_CATEGORY":
      return {
        ...state,
        categories: state.categories.map((c) =>
          c.id === action.categoryId ? { ...c, name: action.name } : c
        ),
      };

    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter((c) => c.id !== action.categoryId),
        items: state.items.filter((i) => i.categoryId !== action.categoryId),
      };

    case "REORDER_CATEGORIES":
      return {
        ...state,
        categories: action.categoryIds
          .map((id, idx) => {
            const cat = state.categories.find((c) => c.id === id);
            return cat ? { ...cat, sortOrder: idx + 1 } : null;
          })
          .filter(Boolean) as VendorMenuCategory[],
      };

    case "ADD_ITEM": {
      const newItems = [...state.items, action.item];
      const categories = state.categories.map((c) =>
        c.id === action.item.categoryId
          ? { ...c, itemCount: newItems.filter((i) => i.categoryId === c.id).length }
          : c
      );
      return { categories, items: newItems };
    }

    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map((i) => (i.id === action.item.id ? action.item : i)),
      };

    case "DELETE_ITEM": {
      const deletedItem = state.items.find((i) => i.id === action.itemId);
      const newItems = state.items.filter((i) => i.id !== action.itemId);
      const categories = deletedItem
        ? state.categories.map((c) =>
            c.id === deletedItem.categoryId
              ? { ...c, itemCount: newItems.filter((i) => i.categoryId === c.id).length }
              : c
          )
        : state.categories;
      return { categories, items: newItems };
    }

    case "TOGGLE_AVAILABILITY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.itemId ? { ...i, isAvailable: !i.isAvailable } : i
        ),
      };

    default:
      return state;
  }
}

// ---- Context ----
interface MenuContextValue {
  categories: VendorMenuCategory[];
  items: VendorMenuItem[];
  addCategory: (name: string) => void;
  updateCategory: (categoryId: string, name: string) => void;
  deleteCategory: (categoryId: string) => void;
  reorderCategories: (categoryIds: string[]) => void;
  addItem: (item: Omit<VendorMenuItem, "id" | "sortOrder">) => void;
  updateItem: (item: VendorMenuItem) => void;
  deleteItem: (itemId: string) => void;
  toggleAvailability: (itemId: string) => void;
  getItemsByCategory: (categoryId: string) => VendorMenuItem[];
  searchItems: (query: string) => VendorMenuItem[];
}

const MenuContext = createContext<MenuContextValue | null>(null);

// ---- Provider ----
export function MenuProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(menuReducer, {
    categories: VENDOR_MENU_CATEGORIES,
    items: VENDOR_MENU_ITEMS,
  });

  const addCategory = useCallback((name: string) => {
    const category: VendorMenuCategory = {
      id: generateId("cat"),
      name,
      sortOrder: 999,
      itemCount: 0,
    };
    dispatch({ type: "ADD_CATEGORY", category });
  }, []);

  const updateCategory = useCallback((categoryId: string, name: string) => {
    dispatch({ type: "UPDATE_CATEGORY", categoryId, name });
  }, []);

  const deleteCategory = useCallback((categoryId: string) => {
    dispatch({ type: "DELETE_CATEGORY", categoryId });
  }, []);

  const reorderCategories = useCallback((categoryIds: string[]) => {
    dispatch({ type: "REORDER_CATEGORIES", categoryIds });
  }, []);

  const addItem = useCallback((item: Omit<VendorMenuItem, "id" | "sortOrder">) => {
    const newItem: VendorMenuItem = {
      ...item,
      id: generateId("vmi"),
      sortOrder: 999,
    };
    dispatch({ type: "ADD_ITEM", item: newItem });
  }, []);

  const updateItem = useCallback((item: VendorMenuItem) => {
    dispatch({ type: "UPDATE_ITEM", item });
  }, []);

  const deleteItem = useCallback((itemId: string) => {
    dispatch({ type: "DELETE_ITEM", itemId });
  }, []);

  const toggleAvailability = useCallback((itemId: string) => {
    dispatch({ type: "TOGGLE_AVAILABILITY", itemId });
  }, []);

  const getItemsByCategory = useCallback(
    (categoryId: string) => state.items.filter((i) => i.categoryId === categoryId),
    [state.items]
  );

  const searchItems = useCallback(
    (query: string) => {
      const q = query.toLowerCase();
      return state.items.filter(
        (i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
      );
    },
    [state.items]
  );

  const value = useMemo<MenuContextValue>(
    () => ({
      categories: state.categories,
      items: state.items,
      addCategory,
      updateCategory,
      deleteCategory,
      reorderCategories,
      addItem,
      updateItem,
      deleteItem,
      toggleAvailability,
      getItemsByCategory,
      searchItems,
    }),
    [state.categories, state.items, addCategory, updateCategory, deleteCategory, reorderCategories, addItem, updateItem, deleteItem, toggleAvailability, getItemsByCategory, searchItems]
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

// ---- Hook ----
export function useMenu(): MenuContextValue {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be used within a MenuProvider");
  return ctx;
}
