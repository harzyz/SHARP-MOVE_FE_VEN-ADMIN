"use client";

import Link from "next/link";
import { SharpMoveLogo } from "@/components/sharp-move-logo";
import { useAdminAuth } from "@/contexts";
import { cn } from "@/lib/utils";

export interface AdminHeaderProps {
  className?: string;
}

export function AdminHeader({ className }: AdminHeaderProps) {
  const { admin } = useAdminAuth();

  return (
    <header
      className={cn(
        "sticky top-0 z-[200] border-b border-border bg-background",
        className
      )}
    >
      <div className="flex h-14 items-center justify-between gap-3 px-4 sm:h-16 sm:px-6 lg:px-8">
        {/* Left: Logo + Admin badge */}
        <div className="flex items-center gap-2">
          <SharpMoveLogo className="text-xl sm:text-2xl" />
          <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
            Admin
          </span>
        </div>

        {/* Right: Notifications + Admin avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="relative flex size-8 items-center justify-center rounded-full transition-colors hover:bg-background-muted sm:size-9"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-5 text-foreground sm:size-[22px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </button>

          <Link
            href="/admin/system"
            className="flex size-8 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-800 transition-colors hover:bg-primary-200 sm:size-9 sm:text-sm"
          >
            {admin?.name.charAt(0) ?? "A"}
          </Link>
        </div>
      </div>
    </header>
  );
}
