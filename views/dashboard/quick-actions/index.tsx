"use client";

import Link from "next/link";
import { SharpmoveButton } from "@/components/ui";

export function QuickActions() {
  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs">
      <h3 className="text-sm font-semibold text-foreground">Quick Actions</h3>
      <div className="mt-3 flex flex-col gap-2">
        <Link href="/orders">
          <SharpmoveButton variant="soft" colorScheme="primary" fullWidth>
            View Orders
          </SharpmoveButton>
        </Link>
        <Link href="/menu">
          <SharpmoveButton variant="soft" colorScheme="accent" fullWidth>
            Manage Menu
          </SharpmoveButton>
        </Link>
        <Link href="/finance">
          <SharpmoveButton variant="soft" colorScheme="secondary" fullWidth>
            View Payouts
          </SharpmoveButton>
        </Link>
      </div>
    </div>
  );
}
