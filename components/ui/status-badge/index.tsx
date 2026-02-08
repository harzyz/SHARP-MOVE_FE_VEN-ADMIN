import { cn } from "@/lib/utils";

export interface StatusBadgeProps {
  label: string;
  colorScheme: "info" | "warning" | "success" | "error" | "neutral";
  className?: string;
}

const colorMap: Record<StatusBadgeProps["colorScheme"], string> = {
  info: "bg-info-100 text-info-700",
  warning: "bg-warning-100 text-warning-700",
  success: "bg-success-100 text-success-700",
  error: "bg-error-100 text-error-700",
  neutral: "bg-neutral-100 text-neutral-700",
};

export function StatusBadge({ label, colorScheme, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold",
        colorMap[colorScheme],
        className
      )}
    >
      {label}
    </span>
  );
}
