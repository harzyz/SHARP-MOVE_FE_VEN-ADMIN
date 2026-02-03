/**
 * KIA KIA Design System - TypeScript Types
 */

// ============================================
// COLOR TYPES
// ============================================

export type ColorScale =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "950";

export type PrimaryColor = `primary-${ColorScale}` | "primary";
export type SecondaryColor = `secondary-${ColorScale}` | "secondary";
export type AccentColor = `accent-${ColorScale}` | "accent";
export type NeutralColor = `neutral-${ColorScale}`;

export type SemanticColor =
  | `success-${ColorScale}`
  | "success"
  | `error-${ColorScale}`
  | "error"
  | `warning-${ColorScale}`
  | "warning"
  | `info-${ColorScale}`
  | "info";

export type ThemeColor =
  | PrimaryColor
  | SecondaryColor
  | AccentColor
  | NeutralColor
  | SemanticColor
  | "background"
  | "foreground"
  | "background-subtle"
  | "background-muted"
  | "foreground-muted"
  | "border"
  | "border-muted"
  | "border-strong"
  | "ring";

// ============================================
// SIZE TYPES
// ============================================

export type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type ComponentSize = "sm" | "md" | "lg";

export type SpacingScale =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "12"
  | "14"
  | "16"
  | "20"
  | "24"
  | "28"
  | "32";

// ============================================
// TYPOGRAPHY TYPES
// ============================================

export type FontFamily = "sans" | "display";

export type FontSize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl";

export type FontWeight =
  | "thin"
  | "extralight"
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold"
  | "black";

export type LineHeight =
  | "none"
  | "tight"
  | "snug"
  | "normal"
  | "relaxed"
  | "loose";

export type LetterSpacing =
  | "tighter"
  | "tight"
  | "normal"
  | "wide"
  | "wider"
  | "widest";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

// ============================================
// BORDER & SHADOW TYPES
// ============================================

export type BorderRadius =
  | "none"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "full";

export type Shadow =
  | "none"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "inner";

// ============================================
// COMPONENT VARIANT TYPES
// ============================================

export type ButtonVariant =
  | "solid"
  | "outline"
  | "ghost"
  | "link"
  | "soft";

export type ButtonColorScheme =
  | "primary"
  | "secondary"
  | "accent"
  | "neutral"
  | "success"
  | "error"
  | "warning"
  | "info";

export type InputVariant = "outline" | "filled" | "flushed" | "unstyled";

export type AlertVariant = "subtle" | "solid" | "left-accent" | "top-accent";

export type BadgeVariant = "solid" | "subtle" | "outline";

// ============================================
// COMMON COMPONENT PROPS
// ============================================

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface PolymorphicComponentProps<T extends React.ElementType> {
  as?: T;
}

export interface DisableableProps {
  disabled?: boolean;
}

export interface LoadingProps {
  isLoading?: boolean;
  loadingText?: string;
}

// ============================================
// Z-INDEX TYPES
// ============================================

export type ZIndex =
  | "auto"
  | "0"
  | "10"
  | "20"
  | "30"
  | "40"
  | "50"
  | "dropdown"
  | "sticky"
  | "fixed"
  | "modal-backdrop"
  | "modal"
  | "popover"
  | "tooltip"
  | "toast";

// ============================================
// TRANSITION TYPES
// ============================================

export type Duration =
  | "75"
  | "100"
  | "150"
  | "200"
  | "300"
  | "500"
  | "700"
  | "1000";

export type Easing = "linear" | "in" | "out" | "in-out";

// ============================================
// BREAKPOINT TYPES
// ============================================

export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

// ============================================
// THEME TYPES
// ============================================

export type ThemeMode = "light" | "dark" | "system";

export interface ThemeConfig {
  mode: ThemeMode;
  colors: Record<string, string>;
  fonts: {
    sans: string;
    display: string;
  };
}

// ============================================
// UTILITY TYPES
// ============================================

/**
 * Makes specific properties required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Makes specific properties optional
 */
export type OptionalBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Extracts the props type from a component
 */
export type PropsOf<C extends React.ElementType> =
  React.ComponentPropsWithoutRef<C>;

/**
 * Props for polymorphic components with ref forwarding
 */
export type PolymorphicPropsWithRef<
  C extends React.ElementType,
  Props = object
> = Props &
  Omit<React.ComponentPropsWithRef<C>, keyof Props | "as"> & {
    as?: C;
  };

/**
 * Ref type for polymorphic components
 */
export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];
