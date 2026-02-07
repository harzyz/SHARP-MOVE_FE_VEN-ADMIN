"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";
import type { ComponentSize, InputVariant } from "@/types/design-system";

export interface SharpmoveInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "placeholder"
  > {
  /** Visible label; floats above input when focused or when value is present */
  label: string;
  /** Optional hint or helper text below the input */
  hint?: string;
  /** Error message; when set, input and label use error styling */
  error?: string;
  /** Visual style of the input */
  variant?: InputVariant;
  /** Size of the input and label */
  size?: ComponentSize;
  /** Optional placeholder when label is floated (default: single space for float behavior) */
  placeholder?: string;
  /** Root wrapper class name */
  className?: string;
}

const floated =
  "peer-focus:top-0 peer-focus:px-1 peer-focus:bg-background peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-background";

const sizeClasses = {
  sm: {
    input: "h-9 text-sm rounded-md px-3 py-2",
    label: `text-sm left-2 top-1/2 -translate-y-1/2 peer-focus:text-xs ${floated} peer-[:not(:placeholder-shown)]:text-xs`,
  },
  md: {
    input: "h-11 text-base rounded-lg px-3 py-2",
    label: `text-base left-2 top-1/2 -translate-y-1/2 peer-focus:text-xs ${floated} peer-[:not(:placeholder-shown)]:text-xs`,
  },
  lg: {
    input: "h-12 text-lg rounded-lg px-4 py-2",
    label: `text-lg left-3 top-1/2 -translate-y-1/2 peer-focus:text-sm ${floated} peer-[:not(:placeholder-shown)]:text-sm`,
  },
} as const;

const variantClasses = {
  outline: {
    input:
      "bg-background border border-border text-foreground placeholder:text-foreground-muted focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-ring/20",
    inputError:
      "border-error-500 focus:border-error-500 focus:ring-error-500/20",
  },
  filled: {
    input:
      "bg-background-muted border border-transparent text-foreground placeholder:text-foreground-muted focus:bg-background focus:border-border focus:outline-none focus:ring-2 focus:ring-ring/20",
    inputError: "focus:border-error-500 focus:ring-error-500/20",
  },
  flushed: {
    input:
      "bg-transparent border-0 border-b border-border rounded-none pt-4 pb-1 px-0 text-foreground placeholder:text-foreground-muted focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-b-2",
    inputError: "border-error-500 focus:border-error-500",
  },
  unstyled: {
    input:
      "bg-transparent border-0 text-foreground placeholder:text-foreground-muted focus:outline-none",
    inputError: "text-error-600",
  },
} as const;

const SharpmoveInput = forwardRef<HTMLInputElement, SharpmoveInputProps>(
  (
    {
      label,
      hint,
      error,
      variant = "outline",
      size = "md",
      placeholder = " ",
      className,
      id: idProp,
      disabled,
      ...inputProps
    },
    ref
  ) => {
    const reactId = useId();
    const id = idProp ?? `sharpmove-input-${reactId.replace(/:/g, "")}`;
    const hasError = Boolean(error);
    const variantStyles = variantClasses[variant];
    const sizeStyles = sizeClasses[size];

    return (
      <div className={cn("w-full", className)}>
        <div className="relative">
          <input
            ref={ref}
            id={id}
            aria-invalid={hasError}
            aria-describedby={
              [error && `${id}-error`, hint && `${id}-hint`]
                .filter(Boolean)
                .join(" ") || undefined
            }
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "peer w-full transition-colors duration-150",
              sizeStyles.input,
              variantStyles.input,
              hasError && variantStyles.inputError,
              disabled && "cursor-not-allowed opacity-60"
            )}
            {...inputProps}
          />
          <label
            htmlFor={id}
            className={cn(
              "pointer-events-none absolute z-[1] origin-left transition-all duration-200 text-foreground-muted peer-focus:text-foreground peer-[:not(:placeholder-shown)]:text-foreground",
              sizeStyles.label,
              hasError && "text-error-600 peer-focus:text-error-600",
              disabled && "opacity-60"
            )}
          >
            {label}
          </label>
        </div>
        {hint && !error && (
          <p id={`${id}-hint`} className="mt-1.5 text-sm text-foreground-muted">
            {hint}
          </p>
        )}
        {error && (
          <p
            id={`${id}-error`}
            role="alert"
            className="mt-1.5 text-sm text-error-600"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

SharpmoveInput.displayName = "SharpmoveInput";

export { SharpmoveInput };
