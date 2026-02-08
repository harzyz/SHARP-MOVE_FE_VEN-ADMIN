"use client";

import { cn } from "@/lib/utils";

export interface TabItem {
  key: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (key: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onTabChange, className }: TabsProps) {
  return (
    <div className={cn("flex gap-1 overflow-x-auto", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onTabChange(tab.key)}
          className={cn(
            "shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
            activeTab === tab.key
              ? "bg-primary text-white"
              : "text-foreground-muted hover:bg-surface hover:text-foreground"
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={cn(
              "ml-1.5 inline-flex min-w-[18px] items-center justify-center rounded-full px-1 text-xs",
              activeTab === tab.key
                ? "bg-white/20 text-white"
                : "bg-surface text-foreground-muted"
            )}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
