"use client";

import { cn } from "@/lib/utils";

const STEPS = [
  {
    step: 1,
    title: "Set your location",
    description: "Enter your delivery address.",
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
          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
        />
      </svg>
    ),
  },
  {
    step: 2,
    title: "Choose a restaurant",
    description: "Browse from hundreds of local restaurants.",
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
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 10h.01M15 10h.01M9.5 15a3.5 3.5 0 005 0"
        />
      </svg>
    ),
  },
  {
    step: 3,
    title: "Select your meal",
    description: "Pick your favourite dishes and add to cart.",
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
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    step: 4,
    title: "Get fast delivery",
    description: "Check out and track your delivery in real-time.",
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
] as const;

export interface HowItWorksProps {
  className?: string;
}

export function HowItWorks({ className }: HowItWorksProps) {
  return (
    <section
      className={cn(
        "border-t border-border bg-background py-16 sm:py-24",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
          How Sharp Move works
        </h2>
        <p className="mt-2 text-lg text-foreground-muted">
          Get food in 4 steps.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map(({ step, title, description, icon }) => (
            <div
              key={step}
              className="flex flex-col items-start rounded-xl border border-border bg-background-muted/50 p-6"
            >
              <div
                className="flex size-12 items-center justify-center rounded-lg bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200"
                aria-hidden
              >
                <div className="size-6">{icon}</div>
              </div>
              <p className="mt-4 text-sm font-medium text-primary-600 dark:text-primary-400">
                Step {step}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-foreground">
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
