"use client";

import { useState } from "react";
import { SharpmoveInput, SharpmoveButton } from "@/components/ui";

interface VendorCommissionSettingsProps {
  currentRate: number;
  onUpdate: (rate: number) => void;
}

export function VendorCommissionSettings({ currentRate, onUpdate }: VendorCommissionSettingsProps) {
  const [rate, setRate] = useState(String(currentRate));
  const [saved, setSaved] = useState(false);

  function handleSave() {
    const numRate = Number(rate);
    if (isNaN(numRate) || numRate < 0 || numRate > 100) return;
    onUpdate(numRate);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
      <h3 className="text-sm font-semibold text-foreground">Commission Settings</h3>
      <div className="mt-3">
        <SharpmoveInput
          label="Commission Rate (%)"
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
        <SharpmoveButton
          size="sm"
          className="mt-2 w-full"
          onClick={handleSave}
        >
          {saved ? "Saved!" : "Update Commission"}
        </SharpmoveButton>
      </div>
    </div>
  );
}
