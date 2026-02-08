"use client";

import { useState } from "react";
import { Chip, SharpmoveButton } from "@/components/ui";
import type { VendorMenuCategory } from "@/types";

interface CategorySidebarProps {
  categories: VendorMenuCategory[];
  activeCategoryId: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  onAddCategory: (name: string) => void;
}

export function CategorySidebar({
  categories,
  activeCategoryId,
  onCategoryChange,
  onAddCategory,
}: CategorySidebarProps) {
  const [newName, setNewName] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  function handleAdd() {
    const trimmed = newName.trim();
    if (!trimmed) return;
    onAddCategory(trimmed);
    setNewName("");
    setShowAdd(false);
  }

  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs">
      <h3 className="text-sm font-semibold text-foreground">Categories</h3>

      {/* Desktop: vertical list, Mobile: horizontal chips */}
      <div className="mt-3 flex flex-wrap gap-2 lg:flex-col">
        <Chip isActive={activeCategoryId === null} onClick={() => onCategoryChange(null)}>
          All Items
        </Chip>
        {categories.map((cat) => (
          <Chip
            key={cat.id}
            isActive={activeCategoryId === cat.id}
            onClick={() => onCategoryChange(cat.id)}
          >
            {cat.name}
            <span className="ml-1 text-xs opacity-70">({cat.itemCount})</span>
          </Chip>
        ))}
      </div>

      {/* Add Category */}
      {showAdd ? (
        <div className="mt-3 space-y-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Category name"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-ring/20"
            autoFocus
          />
          <div className="flex gap-2">
            <SharpmoveButton size="sm" onClick={handleAdd}>
              Add
            </SharpmoveButton>
            <SharpmoveButton
              size="sm"
              variant="ghost"
              colorScheme="neutral"
              onClick={() => {
                setShowAdd(false);
                setNewName("");
              }}
            >
              Cancel
            </SharpmoveButton>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowAdd(true)}
          className="mt-3 text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          + Add Category
        </button>
      )}
    </div>
  );
}
