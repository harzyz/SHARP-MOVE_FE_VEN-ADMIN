"use client";

import { cn } from "@/lib/utils";

interface ChartPlaceholderProps {
  title: string;
  height?: string;
}

export function ChartPlaceholder({ title, height = "h-64" }: ChartPlaceholderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-xl border-2 border-dashed border-border",
        height
      )}
    >
      <div className="text-center">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="mt-1 text-xs text-foreground-muted">Chart coming soon</p>
      </div>
    </div>
  );
}
