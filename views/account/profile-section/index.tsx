"use client";

import { SharpmoveInput, SharpmoveButton } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface ProfileSectionProps {
  name: string;
  email: string;
  phone: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onSave: () => void;
  saved: boolean;
  className?: string;
}

export function ProfileSection({
  name,
  email,
  phone,
  onNameChange,
  onEmailChange,
  onPhoneChange,
  onSave,
  saved,
  className,
}: ProfileSectionProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-background p-4 sm:p-5", className)}>
      {/* Avatar + name */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex size-14 items-center justify-center rounded-full bg-primary-100 text-xl font-bold text-primary-800 sm:size-16 sm:text-2xl">
          {name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground sm:text-lg">{name}</h2>
          <p className="text-xs text-foreground-muted sm:text-sm">{email}</p>
        </div>
      </div>

      {/* Form fields */}
      <div className="space-y-4">
        <SharpmoveInput
          label="Full Name"
          placeholder=" "
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
        />
        <SharpmoveInput
          label="Email"
          type="email"
          placeholder=" "
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
        />
        <SharpmoveInput
          label="Phone"
          type="tel"
          placeholder=" "
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
        />
      </div>

      <div className="mt-5 flex items-center gap-3">
        <SharpmoveButton colorScheme="primary" onClick={onSave}>
          Save Changes
        </SharpmoveButton>
        {saved && (
          <span className="text-sm font-medium text-green-600">Changes saved!</span>
        )}
      </div>
    </div>
  );
}
