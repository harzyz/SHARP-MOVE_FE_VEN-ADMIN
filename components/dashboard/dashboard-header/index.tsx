"use client";

import Link from "next/link";
import { SharpMoveLogo } from "@/components/sharp-move-logo";
import { Badge, ToggleSwitch } from "@/components/ui";
import { useVendor, useVendorOrders } from "@/contexts";
import { cn } from "@/lib/utils";

export interface DashboardHeaderProps {
  className?: string;
}

export function DashboardHeader({ className }: DashboardHeaderProps) {
  const { profile, isStoreOpen, toggleStoreOpen } = useVendor();
  const { newOrderCount } = useVendorOrders();

  return (
    <header
      className={cn(
        "sticky top-0 z-[200] border-b border-border bg-background",
        className
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <SharpMoveLogo className="text-xl sm:text-2xl" />

        {/* Center: Store name + Open/Closed toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden text-sm font-semibold text-foreground sm:inline">
            {profile.name}
          </span>
          <div className="flex items-center gap-1.5">
            <ToggleSwitch
              checked={isStoreOpen}
              onChange={toggleStoreOpen}
              size="sm"
              colorScheme="success"
            />
            <span
              className={cn(
                "text-xs font-medium",
                isStoreOpen ? "text-success-600" : "text-error-600"
              )}
            >
              {isStoreOpen ? "Open" : "Closed"}
            </span>
          </div>
        </div>

        {/* Right: Notifications + Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="relative flex size-8 items-center justify-center rounded-full transition-colors hover:bg-background-muted sm:size-9"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-5 text-foreground sm:size-[22px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            <Badge count={newOrderCount} />
          </button>

          <Link
            href="/settings"
            className="flex size-8 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-800 transition-colors hover:bg-primary-200 sm:size-9 sm:text-sm"
          >
            {profile.name.charAt(0)}
          </Link>
        </div>
      </div>
    </header>
  );
}
