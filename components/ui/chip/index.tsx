"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ChipProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Chip label text */
  children: React.ReactNode;
  /** Whether this chip is currently selected/active */
  isActive?: boolean;
  /** Optional icon (left side) */
  icon?: React.ReactNode;
  /** Root class name */
  className?: string;
}

const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ children, isActive = false, icon, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
          isActive
            ? "bg-primary-800 text-primary-50"
            : "bg-background-muted text-foreground hover:bg-neutral-200",
          className
        )}
        {...props}
      >
        {icon && <span className="size-4 shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

Chip.displayName = "Chip";

export { Chip };
