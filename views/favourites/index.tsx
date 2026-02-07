"use client";

import { useMemo } from "react";
import { useFavourites } from "@/contexts";
import { RESTAURANTS_NEAR_YOU } from "@/lib/mock-data";
import { FavouriteCard } from "./favourite-card";
import { EmptyFavourites } from "./empty-favourites";

export function FavouritesView() {
  const { favouriteIds } = useFavourites();

  const favouriteRestaurants = useMemo(
    () => RESTAURANTS_NEAR_YOU.filter((r) => favouriteIds.includes(r.id)),
    [favouriteIds]
  );

  if (favouriteRestaurants.length === 0) {
    return <EmptyFavourites />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <h1 className="mb-4 text-xl font-bold text-foreground sm:mb-6 sm:text-2xl">
        My Favourites
      </h1>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {favouriteRestaurants.map((restaurant) => (
          <FavouriteCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
}
