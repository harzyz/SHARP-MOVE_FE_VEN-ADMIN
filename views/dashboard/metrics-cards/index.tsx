"use client";

import { useMemo } from "react";
import { useVendorOrders } from "@/contexts";
import { cn, formatCurrency } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  accentColor: string;
}

function MetricCard({ label, value, icon, accentColor }: MetricCardProps) {
  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs">
      <div className="flex items-center gap-3">
        <div className={cn("flex size-10 items-center justify-center rounded-lg", accentColor)}>
          {icon}
        </div>
        <div className="min-w-0">
          <p className="truncate text-xs text-foreground-muted">{label}</p>
          <p className="text-lg font-bold text-foreground">{value}</p>
        </div>
      </div>
    </div>
  );
}

export function MetricsCards() {
  const { newOrders, preparingOrders, readyOrders, completedOrders } = useVendorOrders();

  const activeCount = newOrders.length + preparingOrders.length + readyOrders.length;

  const todayRevenue = useMemo(() => {
    const today = new Date().toDateString();
    return completedOrders
      .filter((o) => new Date(o.completedAt!).toDateString() === today)
      .reduce((sum, o) => sum + o.total, 0);
  }, [completedOrders]);

  const todayOrderCount = useMemo(() => {
    const today = new Date().toDateString();
    return completedOrders.filter(
      (o) => new Date(o.completedAt!).toDateString() === today
    ).length + activeCount;
  }, [completedOrders, activeCount]);

  const avgPrepTime = useMemo(() => {
    const all = [...preparingOrders, ...readyOrders, ...completedOrders];
    if (all.length === 0) return 0;
    return Math.round(all.reduce((sum, o) => sum + o.estimatedPrepTime, 0) / all.length);
  }, [preparingOrders, readyOrders, completedOrders]);

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      <MetricCard
        label="Active Orders"
        value={String(activeCount)}
        accentColor="bg-info-100 text-info-600"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
      <MetricCard
        label="Today's Revenue"
        value={formatCurrency(todayRevenue)}
        accentColor="bg-success-100 text-success-600"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
          </svg>
        }
      />
      <MetricCard
        label="Total Orders Today"
        value={String(todayOrderCount)}
        accentColor="bg-primary-100 text-primary-600"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
          </svg>
        }
      />
      <MetricCard
        label="Avg Prep Time"
        value={`${avgPrepTime} min`}
        accentColor="bg-warning-100 text-warning-600"
        icon={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
          </svg>
        }
      />
    </div>
  );
}
