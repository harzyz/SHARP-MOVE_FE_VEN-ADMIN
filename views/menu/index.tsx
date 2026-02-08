"use client";

import { useState, useMemo } from "react";
import { useMenu } from "@/contexts";
import { SharpmoveButton } from "@/components/ui";
import type { VendorMenuItem } from "@/types";
import { CategorySidebar } from "./category-sidebar";
import { MenuItemsTable } from "./menu-items-table";
import { MenuItemForm } from "./menu-item-form";

export function MenuView() {
  const {
    categories,
    items,
    addCategory,
    addItem,
    updateItem,
    deleteItem,
    toggleAvailability,
  } = useMenu();

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<VendorMenuItem | null>(null);

  const filteredItems = useMemo(() => {
    let result = activeCategoryId
      ? items.filter((i) => i.categoryId === activeCategoryId)
      : items;

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (i) => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
      );
    }

    return result.sort((a, b) => a.sortOrder - b.sortOrder);
  }, [items, activeCategoryId, search]);

  function handleEdit(item: VendorMenuItem) {
    setEditingItem(item);
    setFormOpen(true);
  }

  function handleCloseForm() {
    setFormOpen(false);
    setEditingItem(null);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Menu</h1>
          <p className="mt-1 text-sm text-foreground-muted">
            Manage your menu categories and items
          </p>
        </div>
        <SharpmoveButton
          onClick={() => {
            setEditingItem(null);
            setFormOpen(true);
          }}
        >
          + Add Item
        </SharpmoveButton>
      </div>

      {/* Search */}
      <div className="mt-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search menu items..."
          className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-ring/20 sm:max-w-sm"
        />
      </div>

      {/* Content */}
      <div className="mt-4 grid gap-4 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <CategorySidebar
            categories={categories}
            activeCategoryId={activeCategoryId}
            onCategoryChange={setActiveCategoryId}
            onAddCategory={addCategory}
          />
        </div>
        <div className="lg:col-span-3">
          <MenuItemsTable
            items={filteredItems}
            onToggleAvailability={toggleAvailability}
            onEdit={handleEdit}
            onDelete={deleteItem}
          />
        </div>
      </div>

      {/* Form Modal */}
      <MenuItemForm
        open={formOpen}
        onClose={handleCloseForm}
        categories={categories}
        editingItem={editingItem}
        onSave={addItem}
        onUpdate={updateItem}
      />
    </div>
  );
}
