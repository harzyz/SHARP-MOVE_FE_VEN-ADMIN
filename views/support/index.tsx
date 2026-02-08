"use client";

import { MOCK_FAQ_ITEMS } from "@/lib/mock-data";
import { FAQSection } from "./faq-section";
import { SupportForm } from "./support-form";

export function SupportView() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-foreground">Help & Support</h1>
      <p className="mt-1 text-sm text-foreground-muted">
        Find answers or contact our support team
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <FAQSection items={MOCK_FAQ_ITEMS} />
        <SupportForm />
      </div>

      {/* Resource Links */}
      <div className="mt-6 rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
        <h3 className="text-sm font-semibold text-foreground">Resources</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border p-3 text-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="mx-auto size-6 text-primary-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
            <p className="mt-2 text-sm font-medium text-foreground">Vendor Guide</p>
            <p className="mt-0.5 text-xs text-foreground-muted">Getting started tips</p>
          </div>
          <div className="rounded-lg border border-border p-3 text-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="mx-auto size-6 text-primary-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            <p className="mt-2 text-sm font-medium text-foreground">Help Center</p>
            <p className="mt-0.5 text-xs text-foreground-muted">Browse all articles</p>
          </div>
          <div className="rounded-lg border border-border p-3 text-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="mx-auto size-6 text-primary-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <p className="mt-2 text-sm font-medium text-foreground">Call Support</p>
            <p className="mt-0.5 text-xs text-foreground-muted">+234 800 123 4567</p>
          </div>
        </div>
      </div>
    </div>
  );
}
