"use client";

import Link from "next/link";
import { SharpmoveButton } from "@/components/ui/sharpmove-button";
import { cn } from "@/lib/utils";

export interface PersistentCtaProps {
  /** Show sticky download bar (e.g. when on web) */
  showDownloadBar?: boolean;
  /** Show fixed Order Now button */
  showOrderButton?: boolean;
  className?: string;
}

export function PersistentCta({
  showDownloadBar = false, // No app yet – set to true when app is ready
  showOrderButton = true,
  className,
}: PersistentCtaProps) {
  return (
    <>
      {/* Sticky download bar – uncomment / set showDownloadBar when app is ready */}
      {showDownloadBar && (
        <div
          className={cn(
            "fixed bottom-0 left-0 right-0 z-[var(--z-fixed)] border-t border-border bg-background shadow-lg",
            className
          )}
          style={{ zIndex: "var(--z-fixed)" }}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p className="text-sm font-medium text-foreground">
              Get the Sharp Move app for the best experience.
            </p>
            <Link href="#download">
              <SharpmoveButton size="sm" colorScheme="primary">
                Download the App
              </SharpmoveButton>
            </Link>
          </div>
        </div>
      )}

      {showOrderButton && (
        <Link
          href="#order"
          className={cn(
            "fixed bottom-6 right-6 z-[var(--z-fixed)] rounded-full shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            showDownloadBar && "bottom-20 sm:bottom-6",
            className
          )}
          style={{ zIndex: "var(--z-fixed)" }}
          aria-label="Order now"
        >
          <SharpmoveButton
            colorScheme="primary"
            size="lg"
            className="rounded-full px-6"
            type="button"
          >
            Order Now
          </SharpmoveButton>
        </Link>
      )}
    </>
  );
}
