"use client";

import { Chip } from "@/components/ui";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/mock-data";

export interface CategoryFiltersProps {
  /** Currently active category id */
  activeCategory?: string;
  /** Change handler */
  onCategoryChange?: (id: string) => void;
  /** Root class name */
  className?: string;
}

export function CategoryFilters({
  activeCategory = "all",
  onCategoryChange,
  className,
}: CategoryFiltersProps) {
  return (
    <section className={cn("mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8", className)}>
      <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => (
          <Chip
            key={cat.id}
            isActive={activeCategory === cat.id}
            onClick={() => onCategoryChange?.(cat.id)}
          >
            {cat.label}
          </Chip>
        ))}
      </div>
    </section>
  );
}
