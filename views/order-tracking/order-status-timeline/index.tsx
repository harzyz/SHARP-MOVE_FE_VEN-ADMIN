"use client";

import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types/ordering";

const STEPS: { status: OrderStatus; label: string; sublabel: string }[] = [
  { status: "pending", label: "Order Placed", sublabel: "We've received your order" },
  { status: "confirmed", label: "Confirmed", sublabel: "Restaurant accepted your order" },
  { status: "preparing", label: "Preparing", sublabel: "Your food is being prepared" },
  { status: "on-the-way", label: "On the Way", sublabel: "Rider is heading to you" },
  { status: "delivered", label: "Delivered", sublabel: "Enjoy your meal!" },
];

export interface OrderStatusTimelineProps {
  currentStatus: OrderStatus;
  estimatedDelivery: string;
  className?: string;
}

export function OrderStatusTimeline({
  currentStatus,
  estimatedDelivery,
  className,
}: OrderStatusTimelineProps) {
  const currentIndex = STEPS.findIndex((s) => s.status === currentStatus);

  return (
    <div className={cn("rounded-xl border border-border bg-background p-4 sm:p-5", className)}>
      <h3 className="mb-4 text-sm font-semibold text-foreground sm:text-base">
        Order Status
      </h3>

      <div className="space-y-0">
        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isFuture = idx > currentIndex;

          return (
            <div key={step.status} className="flex gap-3">
              {/* Indicator column */}
              <div className="flex flex-col items-center">
                {/* Circle */}
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full",
                    isCompleted && "bg-green-600",
                    isCurrent && "bg-green-600 ring-4 ring-green-100",
                    isFuture && "bg-neutral-200"
                  )}
                >
                  {isCompleted ? (
                    <svg viewBox="0 0 20 20" fill="currentColor" className="size-4 text-white">
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : isCurrent ? (
                    <div className="size-3 rounded-full bg-white" />
                  ) : (
                    <div className="size-3 rounded-full bg-neutral-400" />
                  )}
                </div>

                {/* Connector line (skip for last step) */}
                {idx < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "w-0.5 flex-1 min-h-8",
                      idx < currentIndex
                        ? "bg-green-600"
                        : "border-l-2 border-dashed border-neutral-300"
                    )}
                  />
                )}
              </div>

              {/* Label column */}
              <div className="pb-6">
                <p
                  className={cn(
                    "text-sm font-medium",
                    isFuture ? "text-foreground-muted" : "text-foreground"
                  )}
                >
                  {step.label}
                </p>
                <p className="mt-0.5 text-xs text-foreground-muted">
                  {step.sublabel}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Estimated delivery */}
      <div className="mt-2 rounded-lg bg-background-muted px-3 py-2 text-center text-sm text-foreground-muted">
        Estimated delivery: <span className="font-medium text-foreground">{estimatedDelivery}</span>
      </div>
    </div>
  );
}
