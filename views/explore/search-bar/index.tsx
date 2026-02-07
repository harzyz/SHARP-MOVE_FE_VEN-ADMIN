"use client";

import { cn } from "@/lib/utils";

export interface SearchBarProps {
  /** Current search value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Root class name */
  className?: string;
}

export function SearchBar({ value, onChange, className }: SearchBarProps) {
  return (
    <section className={cn("mx-auto max-w-7xl px-4 pt-4 sm:pt-6 sm:px-6 lg:px-8", className)}>
      <div className="relative">
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-foreground-muted sm:size-5"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="search"
          placeholder="Search restaurants, dishes..."
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="h-10 w-full rounded-xl border border-border bg-background-muted pl-9 pr-4 text-sm text-foreground placeholder:text-foreground-muted focus:border-primary-500 focus:bg-background focus:outline-none focus:ring-2 focus:ring-ring/20 sm:h-11 sm:pl-10 sm:text-base"
        />
      </div>
    </section>
  );
}
