"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { FAQItem } from "@/types";

interface FAQSectionProps {
  items: FAQItem[];
}

function FAQAccordionItem({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-3 text-left"
      >
        <span className="text-sm font-medium text-foreground">{item.question}</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className={cn("size-4 shrink-0 text-foreground-muted transition-transform duration-200", isOpen && "rotate-180")}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-40 pb-3" : "max-h-0"
        )}
      >
        <p className="text-sm text-foreground-muted">{item.answer}</p>
      </div>
    </div>
  );
}

export function FAQSection({ items }: FAQSectionProps) {
  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
      <h3 className="text-sm font-semibold text-foreground">Frequently Asked Questions</h3>
      <div className="mt-3">
        {items.map((item) => (
          <FAQAccordionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
