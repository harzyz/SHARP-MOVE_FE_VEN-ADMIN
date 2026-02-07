"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export interface SharpMoveLogoProps {
  /** Optional class name */
  className?: string;
  /** When true, render as link to home; otherwise render span */
  asLink?: boolean;
}

export function SharpMoveLogo({
  className,
  asLink = true,
}: SharpMoveLogoProps) {
  const text = (
    <span
      className={cn(
        "font-display font-bold text-primary-800 dark:text-primary-100",
        className
      )}
      aria-hidden
    >
      Sharp Move
    </span>
  );

  if (asLink) {
    return (
      <Link
        href="/"
        className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
      >
        {text}
      </Link>
    );
  }

  return text;
}
