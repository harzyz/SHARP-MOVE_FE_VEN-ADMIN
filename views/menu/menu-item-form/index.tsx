"use client";

import { useState, useEffect } from "react";
import {
  Modal,
  SharpmoveInput,
  SharpmoveSelect,
  SharpmoveButton,
} from "@/components/ui";
import type { VendorMenuItem, VendorMenuCategory } from "@/types";

interface MenuItemFormProps {
  open: boolean;
  onClose: () => void;
  categories: VendorMenuCategory[];
  editingItem?: VendorMenuItem | null;
  onSave: (item: Omit<VendorMenuItem, "id" | "sortOrder">) => void;
  onUpdate: (item: VendorMenuItem) => void;
}

export function MenuItemForm({
  open,
  onClose,
  categories,
  editingItem,
  onSave,
  onUpdate,
}: MenuItemFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEditing = Boolean(editingItem);

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setDescription(editingItem.description);
      setPrice(String(editingItem.price));
      setCategoryId(editingItem.categoryId);
      setPrepTime(String(editingItem.prepTime));
    } else {
      setName("");
      setDescription("");
      setPrice("");
      setCategoryId(categories[0]?.id ?? "");
      setPrepTime("");
    }
    setErrors({});
  }, [editingItem, open, categories]);

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Name is required";
    if (!description.trim()) next.description = "Description is required";
    const parsedPrice = Number(price);
    if (!price || isNaN(parsedPrice) || parsedPrice <= 0) next.price = "Enter a valid price";
    if (!categoryId) next.categoryId = "Select a category";
    const parsedPrep = Number(prepTime);
    if (!prepTime || isNaN(parsedPrep) || parsedPrep <= 0) next.prepTime = "Enter prep time";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const data = {
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      categoryId,
      prepTime: Number(prepTime),
      isAvailable: editingItem?.isAvailable ?? true,
      modifierGroups: editingItem?.modifierGroups ?? [],
    };

    if (editingItem) {
      onUpdate({
        ...editingItem,
        ...data,
      });
    } else {
      onSave(data);
    }
    onClose();
  }

  const categoryOptions = categories.map((c) => ({ value: c.id, label: c.name }));

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">
          {isEditing ? "Edit Item" : "Add New Item"}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-foreground-muted hover:bg-neutral-100"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4" noValidate>
        <SharpmoveInput
          label="Item Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
          }}
          error={errors.name}
        />

        <SharpmoveInput
          label="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (errors.description) setErrors((prev) => ({ ...prev, description: "" }));
          }}
          error={errors.description}
        />

        <div className="grid grid-cols-2 gap-3">
          <SharpmoveInput
            label="Price (NGN)"
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              if (errors.price) setErrors((prev) => ({ ...prev, price: "" }));
            }}
            error={errors.price}
          />

          <SharpmoveInput
            label="Prep Time (min)"
            type="number"
            value={prepTime}
            onChange={(e) => {
              setPrepTime(e.target.value);
              if (errors.prepTime) setErrors((prev) => ({ ...prev, prepTime: "" }));
            }}
            error={errors.prepTime}
          />
        </div>

        <SharpmoveSelect
          label="Category"
          options={categoryOptions}
          value={categoryId}
          onChange={(val) => {
            setCategoryId(val);
            if (errors.categoryId) setErrors((prev) => ({ ...prev, categoryId: "" }));
          }}
          error={errors.categoryId}
        />

        {/* Image placeholder */}
        <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-neutral-300">
          <p className="text-xs text-neutral-400">Image upload coming soon</p>
        </div>

        <SharpmoveButton type="submit" fullWidth>
          {isEditing ? "Update Item" : "Add Item"}
        </SharpmoveButton>
      </form>
    </Modal>
  );
}
