"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ADMIN_PRIMARY_NAV, ADMIN_SECONDARY_NAV } from "../admin-nav-items";
import { AdminNavIconComponent } from "../admin-nav-icon";

export interface AdminSidebarProps {
  className?: string;
}

export function AdminSidebar({ className }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "sticky top-16 h-[calc(100vh-4rem)] w-60 shrink-0 border-r border-border bg-background overflow-y-auto xl:w-64",
        className
      )}
    >
      <nav className="flex flex-col gap-1 p-4">
        {ADMIN_PRIMARY_NAV.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "border-l-2 border-primary-500 bg-primary-50 text-primary-800"
                  : "text-foreground-muted hover:bg-background-muted hover:text-foreground"
              )}
            >
              <AdminNavIconComponent icon={item.icon} className="size-5" />
              {item.label}
            </Link>
          );
        })}

        <hr className="my-2 border-border" />

        {ADMIN_SECONDARY_NAV.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "border-l-2 border-primary-500 bg-primary-50 text-primary-800"
                  : "text-foreground-muted hover:bg-background-muted hover:text-foreground"
              )}
            >
              <AdminNavIconComponent icon={item.icon} className="size-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
