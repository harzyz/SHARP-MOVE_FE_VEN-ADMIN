"use client";

import Link from "next/link";
import { Modal, SharpmoveButton } from "@/components/ui";

export interface OrderSuccessModalProps {
  open: boolean;
  orderId: string;
  estimatedDelivery: string;
}

export function OrderSuccessModal({
  open,
  orderId,
  estimatedDelivery,
}: OrderSuccessModalProps) {
  return (
    <Modal open={open} onClose={() => {}}>
      <div className="flex flex-col items-center text-center">
        {/* Check icon */}
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-green-100">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="size-8 text-green-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        <h2 className="text-lg font-bold text-foreground sm:text-xl">
          Order Placed!
        </h2>
        <p className="mt-1 text-sm text-foreground-muted">
          Your order <span className="font-medium text-foreground">#{orderId}</span> has been confirmed.
        </p>
        <p className="mt-2 text-sm text-foreground-muted">
          Estimated delivery: <span className="font-medium text-foreground">{estimatedDelivery}</span>
        </p>

        <div className="mt-6 flex w-full flex-col gap-2 sm:flex-row">
          <Link href={`/orders/${orderId}`} className="flex-1">
            <SharpmoveButton colorScheme="primary" className="w-full">
              Track Order
            </SharpmoveButton>
          </Link>
          <Link href="/explore" className="flex-1">
            <SharpmoveButton variant="outline" colorScheme="primary" className="w-full">
              Back to Explore
            </SharpmoveButton>
          </Link>
        </div>
      </div>
    </Modal>
  );
}
