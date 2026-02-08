import { cn } from "@/lib/utils";

export interface ChartPlaceholderProps {
  title: string;
  className?: string;
}

export function ChartPlaceholder({ title, className }: ChartPlaceholderProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-background p-4 shadow-xs", className)}>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <div className="mt-3 flex h-48 items-center justify-center rounded-lg border-2 border-dashed border-neutral-300">
        <div className="text-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="mx-auto size-8 text-neutral-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
          <p className="mt-2 text-sm text-neutral-400">Chart coming soon</p>
        </div>
      </div>
    </div>
  );
}
