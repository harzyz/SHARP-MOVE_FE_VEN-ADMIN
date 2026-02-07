"use client";

import Link from "next/link";
import { SharpMoveLogo } from "@/components/sharp-move-logo";
import { cn } from "@/lib/utils";

const CUSTOMER_LINKS = [
  { href: "#locations", label: "Locations" },
  { href: "#faq", label: "FAQ" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact Us" },
];

const PARTNER_LINKS = [
  { href: "#vendor-signup", label: "Vendor Sign Up" },
  { href: "#rider-signup", label: "Rider Sign Up" },
];

const LEGAL_LINKS = [
  { href: "#terms", label: "Terms & Conditions" },
  { href: "#privacy", label: "Privacy Policy" },
  { href: "#refund", label: "Refund Policy" },
];

const SOCIAL_LINKS = [
  { href: "#instagram", label: "Instagram" },
  { href: "#twitter", label: "Twitter (X)" },
  { href: "#facebook", label: "Facebook" },
  { href: "#linkedin", label: "LinkedIn" },
];

export interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "border-t border-border bg-background-muted py-12 sm:py-16",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SharpMoveLogo className="text-2xl" asLink />
            <p className="mt-4 max-w-sm text-sm text-foreground-muted">
              Sharp Move is a food delivery service platform bringing your
              favourite meals to your door, fast.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              For Customers
            </h3>
            <ul className="mt-4 space-y-2">
              {CUSTOMER_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-foreground-muted hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              For Partners
            </h3>
            <ul className="mt-4 space-y-2">
              {PARTNER_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-foreground-muted hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              {LEGAL_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-foreground-muted hover:text-primary-600 dark:hover:text-primary-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-foreground-muted">
            © {year} Sharp Move. All rights reserved.
          </p>
          <div className="flex gap-4">
            {SOCIAL_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-foreground-muted hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={label}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
