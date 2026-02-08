"use client";

import { useState } from "react";
import { SharpmoveInput, SharpmoveButton } from "@/components/ui";
import type { StoreProfile } from "@/types";

interface ServiceSettingsSectionProps {
  profile: StoreProfile;
  onSave: (data: Partial<StoreProfile>) => void;
}

export function ServiceSettingsSection({ profile, onSave }: ServiceSettingsSectionProps) {
  const [deliveryRadius, setDeliveryRadius] = useState(String(profile.deliveryRadius));
  const [minimumOrder, setMinimumOrder] = useState(String(profile.minimumOrder));
  const [defaultPrepTime, setDefaultPrepTime] = useState(String(profile.defaultPrepTime));
  const [saved, setSaved] = useState(false);

  function handleSave() {
    onSave({
      deliveryRadius: Number(deliveryRadius),
      minimumOrder: Number(minimumOrder),
      defaultPrepTime: Number(defaultPrepTime),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
      <h3 className="text-sm font-semibold text-foreground">Service Settings</h3>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <SharpmoveInput
          label="Delivery Radius (km)"
          type="number"
          value={deliveryRadius}
          onChange={(e) => setDeliveryRadius(e.target.value)}
        />
        <SharpmoveInput
          label="Minimum Order (NGN)"
          type="number"
          value={minimumOrder}
          onChange={(e) => setMinimumOrder(e.target.value)}
        />
        <SharpmoveInput
          label="Default Prep Time (min)"
          type="number"
          value={defaultPrepTime}
          onChange={(e) => setDefaultPrepTime(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <SharpmoveButton onClick={handleSave}>
          {saved ? "Saved!" : "Save Settings"}
        </SharpmoveButton>
      </div>
    </div>
  );
}
