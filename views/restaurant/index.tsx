"use client";

import { use, useState, useMemo } from "react";
import { RESTAURANTS_NEAR_YOU } from "@/lib/mock-data";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/lib/mock-data";
import { RestaurantHeader } from "./restaurant-header";
import { MenuCategories } from "./menu-categories";
import { MenuGrid } from "./menu-grid";
import { MenuItemModal } from "./menu-item-modal";
import type { MenuItem } from "@/types/ordering";

export interface RestaurantViewProps {
  params: Promise<{ id: string }>;
}

export function RestaurantView({ params }: RestaurantViewProps) {
  const { id } = use(params);
  const [activeCategory, setActiveCategory] = useState("popular");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const restaurant = RESTAURANTS_NEAR_YOU.find((r) => r.id === id);
  const restaurantMenuItems = useMemo(
    () => MENU_ITEMS.filter((item) => item.restaurantId === id),
    [id]
  );

  const filteredItems = useMemo(
    () => restaurantMenuItems.filter((item) => item.categoryId === activeCategory),
    [restaurantMenuItems, activeCategory]
  );

  const availableCategories = useMemo(() => {
    const catIds = new Set(restaurantMenuItems.map((item) => item.categoryId));
    return MENU_CATEGORIES.filter((cat) => catIds.has(cat.id));
  }, [restaurantMenuItems]);

  if (!restaurant) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-foreground-muted">
        Restaurant not found.
      </div>
    );
  }

  return (
    <>
      <RestaurantHeader restaurant={restaurant} />
      <MenuCategories
        categories={availableCategories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />
      <MenuGrid items={filteredItems} onItemClick={setSelectedItem} />
      <MenuItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  );
}
