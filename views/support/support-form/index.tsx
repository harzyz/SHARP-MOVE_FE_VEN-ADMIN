"use client";

import { useState } from "react";
import { SharpmoveInput, SharpmoveSelect, SharpmoveButton } from "@/components/ui";

const categoryOptions = [
  { value: "orders", label: "Orders" },
  { value: "payments", label: "Payments & Payouts" },
  { value: "menu", label: "Menu Management" },
  { value: "account", label: "Account Settings" },
  { value: "technical", label: "Technical Issue" },
  { value: "other", label: "Other" },
];

export function SupportForm() {
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("");
  const [orderId, setOrderId] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!subject.trim()) next.subject = "Subject is required";
    if (!category) next.category = "Select a category";
    if (!message.trim()) next.message = "Message is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    // Reset after showing confirmation
    setTimeout(() => {
      setSubmitted(false);
      setSubject("");
      setCategory("");
      setOrderId("");
      setMessage("");
    }, 3000);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-success-200 bg-success-50 p-6 text-center shadow-xs">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="mx-auto size-10 text-success-500"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-sm font-semibold text-success-800">Ticket Submitted</h3>
        <p className="mt-1 text-sm text-success-700">
          We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
      <h3 className="text-sm font-semibold text-foreground">Submit a Support Ticket</h3>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4" noValidate>
        <SharpmoveInput
          label="Subject"
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
            if (errors.subject) setErrors((prev) => ({ ...prev, subject: "" }));
          }}
          error={errors.subject}
        />

        <SharpmoveSelect
          label="Category"
          options={categoryOptions}
          value={category}
          onChange={(val) => {
            setCategory(val);
            if (errors.category) setErrors((prev) => ({ ...prev, category: "" }));
          }}
          error={errors.category}
        />

        <SharpmoveInput
          label="Order ID (optional)"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          hint="If this is about a specific order"
        />

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Message</label>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (errors.message) setErrors((prev) => ({ ...prev, message: "" }));
            }}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-ring/20"
            placeholder="Describe your issue..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-error-600">{errors.message}</p>
          )}
        </div>

        <SharpmoveButton type="submit" fullWidth>
          Submit Ticket
        </SharpmoveButton>
      </form>
    </div>
  );
}
