"use client";

import Link from "next/link";
import { SharpMoveLogo } from "@/components/sharp-move-logo";
import { Badge } from "@/components/ui";
import { useCart } from "@/contexts";
import { cn } from "@/lib/utils";

export interface DashboardHeaderProps {
  className?: string;
}

function CartLink() {
  const { itemCount } = useCart();
  return (
    <Link href="/cart" className="relative flex size-8 items-center justify-center rounded-full transition-colors hover:bg-background-muted sm:size-9">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-5 text-foreground sm:size-[22px]">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
      <Badge count={itemCount} />
    </Link>
  );
}

export function DashboardHeader({ className }: DashboardHeaderProps) {
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

        {/* Center: Location */}
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-full bg-background-muted px-2.5 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-neutral-200 sm:gap-1.5 sm:px-3 sm:text-sm"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-3.5 text-primary-600 sm:size-4"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="max-w-[120px] truncate sm:max-w-none">Lekki, Lagos</span>
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-3.5 text-foreground-muted sm:size-4"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Right: Cart + Avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          <CartLink />
          <Link
            href="/account"
            className="flex size-8 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-800 transition-colors hover:bg-primary-200 sm:size-9 sm:text-sm"
          >
            U
          </Link>
        </div>
      </div>
    </header>
  );
}
