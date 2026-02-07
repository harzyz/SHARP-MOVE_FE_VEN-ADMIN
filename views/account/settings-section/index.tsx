"use client";

import Link from "next/link";
import { SharpmoveButton } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface SettingsSectionProps {
  className?: string;
}

export function SettingsSection({ className }: SettingsSectionProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-background p-4 sm:p-5", className)}>
      <h3 className="mb-4 text-sm font-semibold text-foreground sm:text-base">
        Settings
      </h3>

      <div className="space-y-3">
        <Link href="/login">
          <SharpmoveButton variant="outline" colorScheme="error" className="w-full">
            Sign Out
          </SharpmoveButton>
        </Link>

        <p className="text-center text-xs text-foreground-muted">
          Kia Kia v1.0.0
        </p>
      </div>
    </div>
  );
}
