"use client";

import { useState } from "react";
import { SharpmoveInput, SharpmoveButton } from "@/components/ui";
import { cn, generateId } from "@/lib/utils";

export interface Address {
  id: string;
  label: string;
  address: string;
}

export interface AddressesSectionProps {
  addresses: Address[];
  onAdd: (address: Address) => void;
  onDelete: (id: string) => void;
  className?: string;
}

export function AddressesSection({
  addresses,
  onAdd,
  onDelete,
  className,
}: AddressesSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [label, setLabel] = useState("");
  const [address, setAddress] = useState("");

  const handleAdd = () => {
    if (!label.trim() || !address.trim()) return;
    onAdd({ id: generateId("addr"), label: label.trim(), address: address.trim() });
    setLabel("");
    setAddress("");
    setShowForm(false);
  };

  return (
    <div className={cn("rounded-xl border border-border bg-background p-4 sm:p-5", className)}>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground sm:text-base">
          Saved Addresses
        </h3>
        {!showForm && (
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="text-xs font-medium text-primary-600 hover:text-primary-700 sm:text-sm"
          >
            + Add Address
          </button>
        )}
      </div>

      {/* Address list */}
      {addresses.length === 0 && !showForm && (
        <p className="text-sm text-foreground-muted">No saved addresses.</p>
      )}

      <div className="space-y-2">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="flex items-start justify-between gap-3 rounded-lg border border-border p-3"
          >
            <div className="min-w-0">
              <span className="block text-xs font-semibold uppercase text-foreground-muted">
                {addr.label}
              </span>
              <span className="block text-sm text-foreground">{addr.address}</span>
            </div>
            <button
              type="button"
              onClick={() => onDelete(addr.id)}
              className="shrink-0 text-xs text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Add form */}
      {showForm && (
        <div className="mt-3 space-y-3 rounded-lg border border-dashed border-border p-3">
          <SharpmoveInput
            label="Label (e.g. Home, Office)"
            placeholder=" "
            size="sm"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          <SharpmoveInput
            label="Address"
            placeholder=" "
            size="sm"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="flex gap-2">
            <SharpmoveButton size="sm" colorScheme="primary" onClick={handleAdd}>
              Save
            </SharpmoveButton>
            <SharpmoveButton
              size="sm"
              variant="ghost"
              colorScheme="primary"
              onClick={() => {
                setShowForm(false);
                setLabel("");
                setAddress("");
              }}
            >
              Cancel
            </SharpmoveButton>
          </div>
        </div>
      )}
    </div>
  );
}
