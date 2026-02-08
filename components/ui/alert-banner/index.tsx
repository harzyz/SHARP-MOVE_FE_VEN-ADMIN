import { cn } from "@/lib/utils";

export interface AlertBannerProps {
  severity: "critical" | "warning" | "info";
  title: string;
  message?: string;
  onDismiss?: () => void;
  className?: string;
}

const severityStyles: Record<AlertBannerProps["severity"], { bg: string; border: string; icon: string; title: string }> = {
  critical: { bg: "bg-red-50", border: "border-red-200", icon: "text-red-600", title: "text-red-800" },
  warning: { bg: "bg-amber-50", border: "border-amber-200", icon: "text-amber-600", title: "text-amber-800" },
  info: { bg: "bg-blue-50", border: "border-blue-200", icon: "text-blue-600", title: "text-blue-800" },
};

export function AlertBanner({ severity, title, message, onDismiss, className }: AlertBannerProps) {
  const styles = severityStyles[severity];

  return (
    <div className={cn("rounded-lg border p-3", styles.bg, styles.border, className)}>
      <div className="flex items-start gap-2.5">
        <div className={cn("mt-0.5 shrink-0", styles.icon)}>
          {severity === "critical" && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          )}
          {severity === "warning" && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          )}
          {severity === "info" && (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className={cn("text-sm font-medium", styles.title)}>{title}</p>
          {message && <p className="mt-0.5 text-xs text-foreground-muted">{message}</p>}
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="shrink-0 text-foreground-muted hover:text-foreground"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
