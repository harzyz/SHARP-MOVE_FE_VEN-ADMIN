# SharpmoveButton

Button component with multiple variants, color schemes, and sizes. Uses design system tokens for all colors (theme and dark mode aware).

## Import

```tsx
import { SharpmoveButton } from "@/components/ui";
```

## Props

| Prop          | Type                                                                                               | Default     | Description                                                  |
| ------------- | -------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------ |
| `variant`     | `"solid" \| "outline" \| "ghost" \| "link" \| "soft"`                                              | `"solid"`   | Visual style of the button                                   |
| `colorScheme` | `"primary" \| "secondary" \| "accent" \| "neutral" \| "success" \| "error" \| "warning" \| "info"` | `"primary"` | Color scheme                                                 |
| `size`        | `"sm" \| "md" \| "lg"`                                                                             | `"md"`      | Size (height, padding, text, icon)                           |
| `isLoading`   | `boolean`                                                                                          | `false`     | When true, show loading spinner and optionally `loadingText` |
| `loadingText` | `string`                                                                                           | —           | Text shown next to spinner when `isLoading`                  |
| `leftIcon`    | `React.ReactNode`                                                                                  | —           | Icon or element before the label                             |
| `rightIcon`   | `React.ReactNode`                                                                                  | —           | Icon or element after the label                              |
| `fullWidth`   | `boolean`                                                                                          | `false`     | Stretch button to full width of container                    |
| `className`   | `string`                                                                                           | —           | Additional class name                                        |
| `children`    | `React.ReactNode`                                                                                  | —           | Button content                                               |
| `disabled`    | `boolean`                                                                                          | —           | Disables the button                                          |
| `type`        | `"button" \| "submit" \| "reset"`                                                                  | `"button"`  | Native button type                                           |
| …             | —                                                                                                  | —           | All other native `<button>` props                            |

Ref is forwarded to the underlying `<button>`.

## Variants

- **solid** — Filled background (default)
- **outline** — Border, transparent background
- **ghost** — No border, transparent background, hover fill
- **link** — Text with underline, no padding/height emphasis
- **soft** — Light background tint (e.g. primary-100)

## Color schemes

Primary, secondary, accent, neutral, success, error, warning, info. All use design tokens and respect light/dark theme.

## Sizes

- **sm** — `h-8`, smaller text and icon
- **md** — `h-10`, default
- **lg** — `h-12`, larger text and icon

## Examples

### Basic

```tsx
<SharpmoveButton>Save</SharpmoveButton>
<SharpmoveButton variant="outline" colorScheme="primary">Cancel</SharpmoveButton>
<SharpmoveButton variant="soft" colorScheme="success">Approve</SharpmoveButton>
```

### Size and full width

```tsx
<SharpmoveButton size="lg">Continue</SharpmoveButton>
<SharpmoveButton fullWidth>Full width</SharpmoveButton>
```

### Loading

```tsx
<SharpmoveButton isLoading>Saving...</SharpmoveButton>
<SharpmoveButton isLoading loadingText="Saving...">Save</SharpmoveButton>
```

When `isLoading` is true and `loadingText` is not set, the label is hidden but the button keeps its width (invisible placeholder). When `loadingText` is set, it is shown next to the spinner.

### Icons

```tsx
<SharpmoveButton leftIcon={<PlusIcon />}>Add</SharpmoveButton>
<SharpmoveButton rightIcon={<ChevronRightIcon />}>Next</SharpmoveButton>
```

Icons are scaled by `size` (sm/md/lg). Use any `React.ReactNode` (e.g. SVG or icon library components).

### Submit button

```tsx
<SharpmoveButton type="submit">Submit</SharpmoveButton>
```

### Disabled

```tsx
<SharpmoveButton disabled>Disabled</SharpmoveButton>
```

Button is also effectively disabled when `isLoading` is true.
