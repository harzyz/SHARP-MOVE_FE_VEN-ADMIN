"use client";

import { useVendor } from "@/contexts";
import { StoreInfoSection } from "./store-info-section";
import { HoursSection } from "./hours-section";
import { ServiceSettingsSection } from "./service-settings-section";

export function SettingsView() {
  const { profile, updateProfile, updateHours } = useVendor();

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
      <p className="mt-1 text-sm text-foreground-muted">
        Manage your store profile and preferences
      </p>

      <div className="mt-6 space-y-6">
        <StoreInfoSection profile={profile} onSave={updateProfile} />
        <HoursSection hours={profile.operatingHours} onSave={updateHours} />
        <ServiceSettingsSection profile={profile} onSave={updateProfile} />
      </div>
    </div>
  );
}
