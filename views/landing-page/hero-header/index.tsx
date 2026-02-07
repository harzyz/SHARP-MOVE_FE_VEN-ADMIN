"use client";

import Link from "next/link";
import { SharpMoveLogo } from "@/components/sharp-move-logo";
import { SharpmoveButton } from "@/components/ui/sharpmove-button";
import { SharpmoveSelect } from "@/components/ui/sharpmove-select";
import { SharpmoveInput } from "@/components/ui/sharpmove-input";
import { cn } from "@/lib/utils";

const LOCATION_OPTIONS = [
  { value: "lagos", label: "Lagos" },
  { value: "abuja", label: "Abuja" },
  { value: "port-harcourt", label: "Port Harcourt" },
  { value: "ibadan", label: "Ibadan" },
];

export interface HeroHeaderProps {
  location?: string;
  onLocationChange?: (value: string) => void;
  className?: string;
}

export function HeroHeader({
  location = "",
  onLocationChange,
  className,
}: HeroHeaderProps) {
  return (
    <header className={cn("border-b border-border bg-background", className)}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <SharpMoveLogo className="text-2xl sm:text-3xl" />

        <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4">
          <SharpmoveSelect
            label="Location"
            options={LOCATION_OPTIONS}
            placeholder="Select city"
            value={location}
            onChange={(v) => onLocationChange?.(v)}
            size="sm"
            variant="outline"
            className="hidden w-40 sm:block"
          />
          <Link
            href="#faq"
            className="text-sm font-medium text-foreground hover:text-primary-600 dark:hover:text-primary-400"
          >
            FAQ
          </Link>
          <Link
            href="#vendor-signup"
            className="text-sm font-medium text-foreground hover:text-primary-600 dark:hover:text-primary-400"
          >
            Vendor Sign-up
          </Link>
          {/* Download the App – uncomment when app is ready */}
          {/* <Link href="#download">
            <SharpmoveButton size="sm" colorScheme="primary" type="button">
              Download the App
            </SharpmoveButton>
          </Link> */}
        </div>
      </nav>

      <section
        id="order"
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24"
      >
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Your favourite meals, delivered fast.
            </h1>
            <p className="mt-4 text-lg text-foreground-muted sm:text-xl">
              Enjoy lightning-fast delivery from restaurants near you.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex-1 max-w-sm">
                <SharpmoveInput
                  label="Enter your delivery address"
                  placeholder="e.g. Lekki, Lagos"
                  className="w-full"
                />
              </div>
              <SharpmoveButton
                colorScheme="primary"
                size="lg"
                className="shrink-0"
              >
                Order now
              </SharpmoveButton>
            </div>
            {/* Or download the app – uncomment when app is ready */}
            {/* <p className="mt-4 text-sm text-foreground-muted">
              Or download the app
            </p>
            <div className="mt-2 flex gap-3">
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
            </div> */}
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-background-muted shadow-xl lg:aspect-square">
            {/* Placeholder for app mockup or hero image */}
            <div className="absolute inset-0 flex items-center justify-center text-foreground-muted">
              <span className="text-sm">Hero image / App mockup</span>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}
