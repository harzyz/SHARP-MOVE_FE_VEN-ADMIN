"use client";

import { cn } from "@/lib/utils";
import { AdminHeader } from "../admin-header";
import { AdminSidebar } from "../admin-sidebar";

export interface AdminDashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function AdminDashboardLayout({ children, className }: AdminDashboardLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-background text-foreground", className)}>
      <AdminHeader />
      <div className="flex">
        <AdminSidebar className="hidden lg:flex lg:flex-col" />
        <main className="flex-1 overflow-y-scroll">{children}</main>
      </div>
    </div>
  );
}
