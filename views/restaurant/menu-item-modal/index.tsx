"use client";

import { useState } from "react";
import { Modal, QuantityStepper, SharpmoveButton } from "@/components/ui";
import { useCart } from "@/contexts";
import { formatCurrency } from "@/lib/utils";
import type { MenuItem } from "@/types/ordering";

export interface MenuItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export function MenuItemModal({ item, onClose }: MenuItemModalProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState("");

  const handleAdd = () => {
    if (!item) return;
    addItem(item, quantity, instructions || undefined);
    setQuantity(1);
    setInstructions("");
    onClose();
  };

  const handleClose = () => {
    setQuantity(1);
    setInstructions("");
    onClose();
  };

  return (
    <Modal open={!!item} onClose={handleClose}>
      {item && (
        <>
          {/* Image placeholder */}
          <div className="mb-4 flex h-40 items-center justify-center rounded-xl bg-background-muted text-2xl font-bold text-foreground-muted sm:h-48">
            {item.name.charAt(0)}
          </div>

          <h2 className="text-lg font-bold text-foreground sm:text-xl">
            {item.name}
          </h2>
          <p className="mt-1 text-sm text-foreground-muted">{item.description}</p>
          <p className="mt-2 text-lg font-bold text-foreground">
            {formatCurrency(item.price)}
          </p>

          {/* Special instructions */}
          <div className="mt-4">
            <label
              htmlFor="instructions"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Special instructions
            </label>
            <textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. No onions, extra spicy..."
              rows={2}
              className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>

          {/* Quantity + Add to cart */}
          <div className="mt-5 flex items-center justify-between gap-3">
            <QuantityStepper value={quantity} onChange={setQuantity} />
            <SharpmoveButton
              colorScheme="primary"
              className="flex-1"
              onClick={handleAdd}
            >
              Add to Cart · {formatCurrency(item.price * quantity)}
            </SharpmoveButton>
          </div>
        </>
      )}
    </Modal>
  );
}
