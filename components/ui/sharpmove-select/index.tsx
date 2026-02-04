"use client";

import {
  forwardRef,
  useId,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { cn } from "@/lib/utils";
import type { ComponentSize, InputVariant } from "@/types/design-system";

export interface SharpmoveSelectOption {
  value: string;
  label: string;
}

export interface SharpmoveSelectProps {
  /** Visible label; floats when open or when a value is selected */
  label: string;
  /** Options for the select */
  options: SharpmoveSelectOption[];
  /** Placeholder text when nothing is selected */
  placeholder?: string;
  /** When true, show a search input in the dropdown to filter options */
  searchable?: boolean;
  /** Placeholder for the search input when searchable */
  searchPlaceholder?: string;
  /** Current value (controlled) */
  value?: string;
  /** Called when selection changes */
  onChange?: (value: string) => void;
  /** Name for the hidden input (form submission) */
  name?: string;
  /** Id for the trigger (for label htmlFor and a11y) */
  id?: string;
  /** Optional hint or helper text below the select */
  hint?: string;
  /** Error message; when set, select and label use error styling */
  error?: string;
  /** Visual style (matches SharpmoveInput) */
  variant?: InputVariant;
  /** Size of the select and label */
  size?: ComponentSize;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether a value is required */
  required?: boolean;
  /** Root wrapper class name */
  className?: string;
}

const sizeClasses = {
  sm: {
    trigger: "h-9 text-sm rounded-md pt-3 pb-1.5 px-3 pr-8",
    label:
      "left-3 top-1/2 -translate-y-1/2 text-sm text-foreground-muted group-focus-within:top-1.5 group-focus-within:translate-y-0 group-focus-within:text-xs group-focus-within:text-foreground group-[.has-value]:top-1.5 group-[.has-value]:translate-y-0 group-[.has-value]:text-xs group-[.has-value]:text-foreground",
  },
  md: {
    trigger: "h-11 text-base rounded-lg pt-4 pb-2 px-3 pr-8",
    label:
      "left-3 top-1/2 -translate-y-1/2 text-base text-foreground-muted group-focus-within:top-2.5 group-focus-within:translate-y-0 group-focus-within:text-xs group-focus-within:text-foreground group-[.has-value]:top-2.5 group-[.has-value]:translate-y-0 group-[.has-value]:text-xs group-[.has-value]:text-foreground",
  },
  lg: {
    trigger: "h-12 text-lg rounded-lg pt-5 pb-2.5 px-4 pr-8",
    label:
      "left-4 top-1/2 -translate-y-1/2 text-lg text-foreground-muted group-focus-within:top-3 group-focus-within:translate-y-0 group-focus-within:text-sm group-focus-within:text-foreground group-[.has-value]:top-3 group-[.has-value]:translate-y-0 group-[.has-value]:text-sm group-[.has-value]:text-foreground",
  },
} as const;

const variantClasses = {
  outline: {
    trigger:
      "bg-background border border-border text-foreground focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-ring/20",
    triggerError:
      "border-error-500 focus:border-error-500 focus:ring-error-500/20",
  },
  filled: {
    trigger:
      "bg-background-muted border border-transparent text-foreground focus:bg-background focus:border-border focus:outline-none focus:ring-2 focus:ring-ring/20",
    triggerError: "focus:border-error-500 focus:ring-error-500/20",
  },
  flushed: {
    trigger:
      "bg-transparent border-0 border-b border-border rounded-none pt-4 pb-1 px-0 text-foreground focus:border-primary-500 focus:outline-none focus:ring-0 focus:border-b-2",
    triggerError: "border-error-500 focus:border-error-500",
  },
  unstyled: {
    trigger: "bg-transparent border-0 text-foreground focus:outline-none",
    triggerError: "text-error-600",
  },
} as const;

const SharpmoveSelect = forwardRef<HTMLInputElement, SharpmoveSelectProps>(
  (
    {
      label,
      options,
      placeholder = "Select...",
      searchable = false,
      searchPlaceholder = "Search...",
      hint,
      error,
      variant = "outline",
      size = "md",
      className,
      id: idProp,
      disabled = false,
      required = false,
      value = "",
      onChange,
      name,
    },
    ref
  ) => {
    const reactId = useId();
    const id = idProp ?? `sharpmove-select-${reactId.replace(/:/g, "")}`;
    const hasError = Boolean(error);
    const variantStyles = variantClasses[variant];
    const sizeStyles = sizeClasses[size];

    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const hasValue = Boolean(value);
    const selectedOption = options.find((o) => o.value === value);
    const displayLabel = selectedOption?.label ?? "";

    const filteredOptions = searchable
      ? options.filter((opt) =>
          opt.label.toLowerCase().includes(searchQuery.toLowerCase().trim())
        )
      : options;

    const openDropdown = useCallback(() => {
      if (disabled) return;
      setIsOpen(true);
      setSearchQuery("");
      if (searchable) {
        requestAnimationFrame(() => searchInputRef.current?.focus());
      }
    }, [disabled, searchable]);

    const closeDropdown = useCallback(() => {
      setIsOpen(false);
      setSearchQuery("");
    }, []);

    const selectOption = useCallback(
      (opt: SharpmoveSelectOption) => {
        onChange?.(opt.value);
        closeDropdown();
      },
      [onChange, closeDropdown]
    );

    useEffect(() => {
      if (!isOpen) return;
      const onDocClick = (e: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(e.target as Node)
        ) {
          closeDropdown();
        }
      };
      document.addEventListener("click", onDocClick);
      return () => document.removeEventListener("click", onDocClick);
    }, [isOpen, closeDropdown]);

    useEffect(() => {
      if (!isOpen) return;
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeDropdown();
      };
      document.addEventListener("keydown", onKeyDown);
      return () => document.removeEventListener("keydown", onKeyDown);
    }, [isOpen, closeDropdown]);

    return (
      <div className={cn("w-full", className)}>
        <div
          ref={wrapperRef}
          className={cn("relative group", hasValue && "has-value")}
          aria-invalid={hasError}
        >
          <input
            ref={ref}
            type="hidden"
            name={name}
            value={value}
            required={required}
            aria-hidden
            tabIndex={-1}
          />
          <button
            type="button"
            id={id}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-describedby={
              [error && `${id}-error`, hint && `${id}-hint`]
                .filter(Boolean)
                .join(" ") || undefined
            }
            disabled={disabled}
            onClick={openDropdown}
            className={cn(
              "w-full text-left transition-colors duration-150 cursor-pointer",
              sizeStyles.trigger,
              hasError ? variantStyles.triggerError : variantStyles.trigger,
              disabled && "cursor-not-allowed opacity-60",
              !displayLabel && "text-foreground-muted"
            )}
          >
            {displayLabel || placeholder}
          </button>
          <label
            htmlFor={id}
            className={cn(
              "pointer-events-none absolute z-[1] origin-left transition-all duration-200",
              sizeStyles.label,
              hasError &&
                "!text-error-600 group-focus-within:!text-error-600 group-[.has-value]:!text-error-600",
              disabled && "opacity-60"
            )}
          >
            {label}
          </label>
          {variant !== "unstyled" && variant !== "flushed" && (
            <span
              className={cn(
                "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted transition-transform duration-200",
                isOpen && "rotate-180",
                disabled && "opacity-60"
              )}
              aria-hidden
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="stroke-current"
              >
                <path
                  d="M2.5 4.5L6 8L9.5 4.5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
          {isOpen && (
            <div
              role="listbox"
              aria-labelledby={id}
              className="absolute left-0 right-0 top-full mt-1 max-h-60 overflow-hidden rounded-lg border border-border bg-background shadow-lg"
              style={{ zIndex: "var(--z-dropdown)" }}
            >
              {searchable && (
                <div className="border-b border-border p-2">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.stopPropagation()}
                    placeholder={searchPlaceholder}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-ring/20"
                    aria-label={searchPlaceholder}
                  />
                </div>
              )}
              <ul className="max-h-52 overflow-auto py-1">
                {filteredOptions.length === 0 ? (
                  <li className="px-3 py-2 text-sm text-foreground-muted">
                    No results
                  </li>
                ) : (
                  filteredOptions.map((opt) => (
                    <li
                      key={opt.value}
                      role="option"
                      aria-selected={opt.value === value}
                    >
                      <button
                        type="button"
                        onClick={() => selectOption(opt)}
                        className={cn(
                          "w-full px-3 py-2 text-left text-sm transition-colors",
                          opt.value === value
                            ? "bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100"
                            : "text-foreground hover:bg-background-muted"
                        )}
                      >
                        {opt.label}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
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

SharpmoveSelect.displayName = "SharpmoveSelect";

export { SharpmoveSelect };
