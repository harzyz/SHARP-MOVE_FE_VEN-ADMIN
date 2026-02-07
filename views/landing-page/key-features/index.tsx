"use client";

import { cn } from "@/lib/utils";

const FEATURES = [
  {
    title: "Fast",
    description: "Lightning-fast delivery so your food arrives hot and fresh.",
    icon: (
      <svg
        className="size-full"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "Variety",
    description: "Hundreds of restaurant and cuisine partners to choose from.",
    icon: (
      <svg
        className="size-full"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    ),
  },
  {
    title: "Track Live",
    description:
      "Real-time order tracking so you know exactly when to expect your meal.",
    icon: (
      <svg
        className="size-full"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
        />
      </svg>
    ),
  },
  {
    title: "Secure Payment",
    description: "Multiple, safe payment options for your peace of mind.",
    icon: (
      <svg
        className="size-full"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 14v.01"
        />
      </svg>
    ),
  },
] as const;

export interface KeyFeaturesProps {
  className?: string;
}

export function KeyFeatures({ className }: KeyFeaturesProps) {
  return (
    <section
      className={cn(
        "border-t border-border bg-background-subtle py-16 sm:py-24",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          Why use Sharp Move?
        </h2>
        <p className="mt-2 text-lg text-foreground-muted">
          Delivered with care.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ title, description, icon }) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-background p-6 shadow-sm"
            >
              <div
                className="flex size-12 items-center justify-center rounded-lg bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200"
                aria-hidden
              >
                <div className="size-6">{icon}</div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm text-foreground-muted">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
