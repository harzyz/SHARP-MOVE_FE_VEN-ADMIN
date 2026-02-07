"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SearchBar } from "./search-bar";
import { CategoryFilters } from "./category-filters";
import { PromoBanners } from "./promo-banners";
import { QuickReorder } from "./quick-reorder";
import { RestaurantsNearYou } from "./restaurants-near-you";

export interface ExploreViewProps {
  /** Root class name */
  className?: string;
}

export function ExploreView({ className }: ExploreViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <div className={cn("", className)}>
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <CategoryFilters
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <PromoBanners />
      <QuickReorder />
      <RestaurantsNearYou />
    </div>
  );
}
