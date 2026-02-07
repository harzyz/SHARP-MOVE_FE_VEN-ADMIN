"use client";

import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  type ReactNode,
} from "react";

/* ------------------------------------------------------------------ */
/*  State                                                              */
/* ------------------------------------------------------------------ */
interface FavouritesState {
  ids: string[];
}

const initialState: FavouritesState = { ids: ["1", "6"] };

/* ------------------------------------------------------------------ */
/*  Actions                                                            */
/* ------------------------------------------------------------------ */
type FavouritesAction = { type: "TOGGLE_FAVOURITE"; restaurantId: string };

function favouritesReducer(
  state: FavouritesState,
  action: FavouritesAction
): FavouritesState {
  switch (action.type) {
    case "TOGGLE_FAVOURITE": {
      const exists = state.ids.includes(action.restaurantId);
      return {
        ids: exists
          ? state.ids.filter((id) => id !== action.restaurantId)
          : [...state.ids, action.restaurantId],
      };
    }
    default:
      return state;
  }
}

/* ------------------------------------------------------------------ */
/*  Context value                                                      */
/* ------------------------------------------------------------------ */
interface FavouritesContextValue {
  favouriteIds: string[];
  isFavourite: (restaurantId: string) => boolean;
  toggleFavourite: (restaurantId: string) => void;
}

const FavouritesContext = createContext<FavouritesContextValue | null>(null);

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */
export function FavouritesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(favouritesReducer, initialState);

  const isFavourite = useCallback(
    (restaurantId: string) => state.ids.includes(restaurantId),
    [state.ids]
  );

  const toggleFavourite = useCallback(
    (restaurantId: string) =>
      dispatch({ type: "TOGGLE_FAVOURITE", restaurantId }),
    []
  );

  const value: FavouritesContextValue = {
    favouriteIds: state.ids,
    isFavourite,
    toggleFavourite,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */
export function useFavourites(): FavouritesContextValue {
  const ctx = useContext(FavouritesContext);
  if (!ctx)
    throw new Error("useFavourites must be used within a FavouritesProvider");
  return ctx;
}
