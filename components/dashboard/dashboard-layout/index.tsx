"use client";

import { cn } from "@/lib/utils";
import { DashboardHeader } from "../dashboard-header";
import { DashboardSidebar } from "../dashboard-sidebar";
import { DashboardBottomNav } from "../dashboard-bottom-nav";

export interface DashboardLayoutProps {
  /** Page content */
  children: React.ReactNode;
  /** Root class name */
  className?: string;
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  return (
    <div className={cn("min-h-screen bg-background text-foreground", className)}>
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar className="hidden lg:flex lg:flex-col" />
        <main className="flex-1 pb-18 lg:pb-0">{children}</main>
      </div>
      <DashboardBottomNav className="lg:hidden" />
    </div>
  );
}
