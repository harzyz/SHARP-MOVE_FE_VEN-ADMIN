"use client";

import { Chip } from "@/components/ui";
import { cn } from "@/lib/utils";
import type { MenuCategory } from "@/types/ordering";

export interface MenuCategoriesProps {
  categories: MenuCategory[];
  activeCategory: string;
  onSelect: (categoryId: string) => void;
  className?: string;
}

export function MenuCategories({
  categories,
  activeCategory,
  onSelect,
  className,
}: MenuCategoriesProps) {
  return (
    <div
      className={cn(
        "sticky top-14 z-[100] border-b border-border bg-background sm:top-16",
        className
      )}
    >
      <div className="scrollbar-hide mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
        {categories.map((cat) => (
          <Chip
            key={cat.id}
            isActive={activeCategory === cat.id}
            onClick={() => onSelect(cat.id)}
          >
            {cat.label}
          </Chip>
        ))}
      </div>
    </div>
  );
}
