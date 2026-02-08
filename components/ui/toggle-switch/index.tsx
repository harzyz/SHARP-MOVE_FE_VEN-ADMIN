"use client";

import { cn } from "@/lib/utils";

export interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: "sm" | "md";
  colorScheme?: "success" | "primary";
  disabled?: boolean;
  className?: string;
  label?: string;
}

export function ToggleSwitch({
  checked,
  onChange,
  size = "md",
  colorScheme = "success",
  disabled = false,
  className,
  label,
}: ToggleSwitchProps) {
  const trackSize = size === "sm" ? "h-5 w-9" : "h-6 w-11";
  const thumbSize = size === "sm" ? "size-3.5" : "size-4.5";
  const thumbTranslate = size === "sm"
    ? (checked ? "translate-x-4" : "translate-x-0.5")
    : (checked ? "translate-x-5" : "translate-x-0.5");

  const activeColor = colorScheme === "success" ? "bg-success-500" : "bg-primary-500";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        trackSize,
        checked ? activeColor : "bg-neutral-300",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <span
        className={cn(
          "inline-block rounded-full bg-white shadow-sm transition-transform duration-200",
          thumbSize,
          thumbTranslate
        )}
      />
    </button>
  );
}
