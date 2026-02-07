"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type {
  ButtonVariant,
  ButtonColorScheme,
  ComponentSize,
} from "@/types/design-system";

export interface SharpmoveButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "color" | "children"
  > {
  /** Visual style of the button */
  variant?: ButtonVariant;
  /** Color scheme */
  colorScheme?: ButtonColorScheme;
  /** Size of the button */
  size?: ComponentSize;
  /** When true, show loading spinner and optional loadingText */
  isLoading?: boolean;
  /** Text shown next to spinner when isLoading */
  loadingText?: string;
  /** Optional icon or element before the label */
  leftIcon?: React.ReactNode;
  /** Optional icon or element after the label */
  rightIcon?: React.ReactNode;
  /** Stretch button to full width of container */
  fullWidth?: boolean;
  /** Root class name */
  className?: string;
  /** Button content */
  children?: React.ReactNode;
}

const sizeClasses: Record<ComponentSize, { base: string; icon: string }> = {
  sm: { base: "h-8 gap-1.5 rounded-md px-3 text-sm", icon: "size-3.5" },
  md: { base: "h-10 gap-2 rounded-lg px-4 text-base", icon: "size-4" },
  lg: { base: "h-12 gap-2.5 rounded-lg px-6 text-lg", icon: "size-5" },
};

type SchemeClasses = Record<ButtonColorScheme, string>;

const solidClasses: SchemeClasses = {
  primary:
    "bg-primary-800 text-primary-50 hover:bg-primary-700 focus:ring-primary-500/30 disabled:bg-primary-200 disabled:text-primary-700",
  secondary:
    "bg-secondary-500 text-secondary-950 hover:bg-secondary-600 focus:ring-secondary-500/30 disabled:bg-secondary-200 disabled:text-secondary-800",
  accent:
    "bg-accent-600 text-accent-50 hover:bg-accent-700 focus:ring-accent-500/30 disabled:bg-accent-200 disabled:text-accent-800",
  neutral:
    "bg-neutral-700 text-neutral-50 hover:bg-neutral-600 focus:ring-neutral-500/30 disabled:bg-neutral-200 disabled:text-neutral-700",
  success:
    "bg-success-600 text-success-50 hover:bg-success-700 focus:ring-success-500/30 disabled:bg-success-200 disabled:text-success-800",
  error:
    "bg-error-600 text-error-50 hover:bg-error-700 focus:ring-error-500/30 disabled:bg-error-200 disabled:text-error-800",
  warning:
    "bg-warning-500 text-warning-950 hover:bg-warning-600 focus:ring-warning-500/30 disabled:bg-warning-200 disabled:text-warning-800",
  info: "bg-info-600 text-info-50 hover:bg-info-700 focus:ring-info-500/30 disabled:bg-info-200 disabled:text-info-800",
};

const outlineClasses: SchemeClasses = {
  primary:
    "border-2 border-primary-500 text-primary-600 bg-transparent hover:bg-primary-50 focus:ring-primary-500/20 disabled:border-primary-200 disabled:text-primary-400",
  secondary:
    "border-2 border-secondary-500 text-secondary-700 bg-transparent hover:bg-secondary-50 focus:ring-secondary-500/20 disabled:border-secondary-200 disabled:text-secondary-400",
  accent:
    "border-2 border-accent-500 text-accent-600 bg-transparent hover:bg-accent-50 focus:ring-accent-500/20 disabled:border-accent-200 disabled:text-accent-400",
  neutral:
    "border-2 border-neutral-500 text-neutral-700 bg-transparent hover:bg-neutral-50 focus:ring-neutral-500/20 disabled:border-neutral-200 disabled:text-neutral-400",
  success:
    "border-2 border-success-500 text-success-700 bg-transparent hover:bg-success-50 focus:ring-success-500/20 disabled:border-success-200 disabled:text-success-400",
  error:
    "border-2 border-error-500 text-error-600 bg-transparent hover:bg-error-50 focus:ring-error-500/20 disabled:border-error-200 disabled:text-error-400",
  warning:
    "border-2 border-warning-500 text-warning-700 bg-transparent hover:bg-warning-50 focus:ring-warning-500/20 disabled:border-warning-200 disabled:text-warning-400",
  info: "border-2 border-info-500 text-info-600 bg-transparent hover:bg-info-50 focus:ring-info-500/20 disabled:border-info-200 disabled:text-info-400",
};

const ghostClasses: SchemeClasses = {
  primary:
    "text-primary-600 bg-transparent hover:bg-primary-50 focus:ring-primary-500/20 disabled:text-primary-300",
  secondary:
    "text-secondary-700 bg-transparent hover:bg-secondary-50 focus:ring-secondary-500/20 disabled:text-secondary-400",
  accent:
    "text-accent-600 bg-transparent hover:bg-accent-50 focus:ring-accent-500/20 disabled:text-accent-400",
  neutral:
    "text-neutral-700 bg-transparent hover:bg-neutral-50 focus:ring-neutral-500/20 disabled:text-neutral-400",
  success:
    "text-success-700 bg-transparent hover:bg-success-50 focus:ring-success-500/20 disabled:text-success-400",
  error:
    "text-error-600 bg-transparent hover:bg-error-50 focus:ring-error-500/20 disabled:text-error-400",
  warning:
    "text-warning-700 bg-transparent hover:bg-warning-50 focus:ring-warning-500/20 disabled:text-warning-400",
  info: "text-info-600 bg-transparent hover:bg-info-50 focus:ring-info-500/20 disabled:text-info-400",
};

const linkClasses: SchemeClasses = {
  primary:
    "text-primary-600 bg-transparent underline underline-offset-2 hover:text-primary-700 focus:ring-primary-500/20 disabled:text-primary-300",
  secondary:
    "text-secondary-600 bg-transparent underline underline-offset-2 hover:text-secondary-700 focus:ring-secondary-500/20 disabled:text-secondary-400",
  accent:
    "text-accent-600 bg-transparent underline underline-offset-2 hover:text-accent-700 focus:ring-accent-500/20 disabled:text-accent-400",
  neutral:
    "text-neutral-700 bg-transparent underline underline-offset-2 hover:text-neutral-800 focus:ring-neutral-500/20 disabled:text-neutral-400",
  success:
    "text-success-600 bg-transparent underline underline-offset-2 hover:text-success-700 focus:ring-success-500/20 disabled:text-success-400",
  error:
    "text-error-600 bg-transparent underline underline-offset-2 hover:text-error-700 focus:ring-error-500/20 disabled:text-error-400",
  warning:
    "text-warning-600 bg-transparent underline underline-offset-2 hover:text-warning-700 focus:ring-warning-500/20 disabled:text-warning-400",
  info: "text-info-600 bg-transparent underline underline-offset-2 hover:text-info-700 focus:ring-info-500/20 disabled:text-info-400",
};

const softClasses: SchemeClasses = {
  primary:
    "bg-primary-100 text-primary-800 hover:bg-primary-200 focus:ring-primary-500/20 disabled:bg-primary-50 disabled:text-primary-400",
  secondary:
    "bg-secondary-100 text-secondary-800 hover:bg-secondary-200 focus:ring-secondary-500/20 disabled:bg-secondary-50 disabled:text-secondary-400",
  accent:
    "bg-accent-100 text-accent-800 hover:bg-accent-200 focus:ring-accent-500/20 disabled:bg-accent-50 disabled:text-accent-400",
  neutral:
    "bg-neutral-100 text-neutral-800 hover:bg-neutral-200 focus:ring-neutral-500/20 disabled:bg-neutral-50 disabled:text-neutral-400",
  success:
    "bg-success-100 text-success-800 hover:bg-success-200 focus:ring-success-500/20 disabled:bg-success-50 disabled:text-success-400",
  error:
    "bg-error-100 text-error-800 hover:bg-error-200 focus:ring-error-500/20 disabled:bg-error-50 disabled:text-error-400",
  warning:
    "bg-warning-100 text-warning-800 hover:bg-warning-200 focus:ring-warning-500/20 disabled:bg-warning-50 disabled:text-warning-400",
  info: "bg-info-100 text-info-800 hover:bg-info-200 focus:ring-info-500/20 disabled:bg-info-50 disabled:text-info-400",
};

const variantSchemeMap: Record<ButtonVariant, SchemeClasses> = {
  solid: solidClasses,
  outline: outlineClasses,
  ghost: ghostClasses,
  link: linkClasses,
  soft: softClasses,
};

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

const SharpmoveButton = forwardRef<HTMLButtonElement, SharpmoveButtonProps>(
  (
    {
      variant = "solid",
      colorScheme = "primary",
      size = "md",
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth,
      className,
      children,
      disabled,
      type,
      ...buttonProps
    },
    ref
  ) => {
    const sizeStyles = sizeClasses[size];
    const schemeStyles = variantSchemeMap[variant][colorScheme];
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type ?? "button"}
        disabled={isDisabled}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
          sizeStyles.base,
          schemeStyles,
          fullWidth && "w-full",
          className
        )}
        {...buttonProps}
      >
        {isLoading ? (
          <>
            <Spinner className={sizeStyles.icon} />
            {loadingText != null ? (
              <span>{loadingText}</span>
            ) : (
              children && <span className="invisible">{children}</span>
            )}
          </>
        ) : (
          <>
            {leftIcon && (
              <span className={cn("shrink-0", sizeStyles.icon)} aria-hidden>
                {leftIcon}
              </span>
            )}
            {children}
            {rightIcon && (
              <span className={cn("shrink-0", sizeStyles.icon)} aria-hidden>
                {rightIcon}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);

SharpmoveButton.displayName = "SharpmoveButton";

export { SharpmoveButton };
