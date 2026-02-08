"use client";

import { useState } from "react";
import { SharpmoveInput, SharpmoveButton } from "@/components/ui";
import type { StoreProfile } from "@/types";

interface StoreInfoSectionProps {
  profile: StoreProfile;
  onSave: (data: Partial<StoreProfile>) => void;
}

export function StoreInfoSection({ profile, onSave }: StoreInfoSectionProps) {
  const [name, setName] = useState(profile.name);
  const [description, setDescription] = useState(profile.description);
  const [phone, setPhone] = useState(profile.phone);
  const [email, setEmail] = useState(profile.email);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    onSave({ name, description, phone, email });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
      <h3 className="text-sm font-semibold text-foreground">Store Information</h3>

      {/* Logo placeholder */}
      <div className="mt-4 flex items-center gap-4">
        <div className="flex size-16 items-center justify-center rounded-xl bg-primary-100 text-2xl font-bold text-primary-700">
          {profile.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{profile.name}</p>
          <p className="text-xs text-foreground-muted">Logo upload coming soon</p>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <SharpmoveInput
          label="Store Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <SharpmoveInput
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <SharpmoveInput
            label="Phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <SharpmoveInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <p className="text-sm text-foreground-muted">Cuisine:</p>
          <div className="flex flex-wrap gap-1.5">
            {profile.cuisineTypes.map((c) => (
              <span
                key={c}
                className="rounded-full bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-700"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <SharpmoveButton onClick={handleSave}>
          {saved ? "Saved!" : "Save Changes"}
        </SharpmoveButton>
      </div>
    </div>
  );
}
