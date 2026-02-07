"use client";

import { cn } from "@/lib/utils";

export interface MobileAppPromotionProps {
  className?: string;
}

export function MobileAppPromotion({ className }: MobileAppPromotionProps) {
  return (
    <section
      id="download"
      className={cn(
        "border-t border-border bg-background-subtle py-16 sm:py-24",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
              Get the Sharp Move App
            </h2>
            <p className="mt-4 text-lg text-foreground-muted">
              Order on the go.
            </p>
            <ul className="mt-6 space-y-3 text-foreground-muted">
              <li className="flex items-center gap-2">
                <span
                  className="size-2 rounded-full bg-primary-500"
                  aria-hidden
                />
                Faster ordering
              </li>
              <li className="flex items-center gap-2">
                <span
                  className="size-2 rounded-full bg-primary-500"
                  aria-hidden
                />
                Exclusive offers
              </li>
              <li className="flex items-center gap-2">
                <span
                  className="size-2 rounded-full bg-primary-500"
                  aria-hidden
                />
                Manage orders easily
              </li>
            </ul>
            {/* App download – uncomment when app is ready */}
            {/* <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#app-store"
                className="inline-flex h-12 items-center rounded-lg border-2 border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-background-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                App Store
              </a>
              <a
                href="#google-play"
                className="inline-flex h-12 items-center rounded-lg border-2 border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-background-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Google Play
              </a>
            </div>
            <div className="mt-6">
              <p className="text-sm text-foreground-muted">
                Or scan to download
              </p>
              <div className="mt-2 flex size-24 items-center justify-center rounded-lg border border-border bg-background text-xs text-foreground-muted">
                QR Code
              </div>
            </div> */}
          </div>
          <div className="relative flex justify-center">
            <div className="aspect-[9/16] w-56 max-w-full overflow-hidden rounded-2xl border border-border bg-background-muted shadow-xl">
              <div className="flex size-full items-center justify-center text-foreground-muted">
                <span className="text-sm">App mockup</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
