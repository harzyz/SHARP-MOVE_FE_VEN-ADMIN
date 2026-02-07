"use client";

import { useState } from "react";
import { ProfileSection } from "./profile-section";
import { AddressesSection, type Address } from "./addresses-section";
import { SettingsSection } from "./settings-section";

const INITIAL_ADDRESSES: Address[] = [
  { id: "addr-1", label: "Home", address: "12 Admiralty Way, Lekki Phase 1, Lagos" },
  { id: "addr-2", label: "Office", address: "5 Ozumba Mbadiwe Ave, Victoria Island, Lagos" },
];

export function AccountView() {
  const [name, setName] = useState("Uche Okafor");
  const [email, setEmail] = useState("uche@example.com");
  const [phone, setPhone] = useState("+234 801 234 5678");
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <h1 className="mb-4 text-xl font-bold text-foreground sm:mb-6 sm:text-2xl">
        My Account
      </h1>

      <div className="mx-auto max-w-2xl space-y-4">
        <ProfileSection
          name={name}
          email={email}
          phone={phone}
          onNameChange={setName}
          onEmailChange={setEmail}
          onPhoneChange={setPhone}
          onSave={handleSave}
          saved={saved}
        />

        <AddressesSection
          addresses={addresses}
          onAdd={(addr) => setAddresses((prev) => [...prev, addr])}
          onDelete={(id) => setAddresses((prev) => prev.filter((a) => a.id !== id))}
        />

        <SettingsSection />
      </div>
    </div>
  );
}
