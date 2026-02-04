# SharpmoveSelect

Custom select (dropdown) with a floating label. Not a native `<select>`: uses a trigger button and a custom dropdown panel. Optional search input filters options when `searchable` is true.

## Import

```tsx
import { SharpmoveSelect, type SharpmoveSelectOption } from "@/components/ui";
```

## Props

| Prop                | Type                                               | Default       | Description                                                               |
| ------------------- | -------------------------------------------------- | ------------- | ------------------------------------------------------------------------- |
| `label`             | `string`                                           | —             | **Required.** Visible label; floats when open or when a value is selected |
| `options`           | `SharpmoveSelectOption[]`                          | —             | **Required.** Options: `{ value: string; label: string }[]`               |
| `placeholder`       | `string`                                           | `"Select..."` | Placeholder when nothing is selected                                      |
| `searchable`        | `boolean`                                          | `false`       | When true, show a search input in the dropdown to filter options          |
| `searchPlaceholder` | `string`                                           | `"Search..."` | Placeholder for the search input when searchable                          |
| `value`             | `string`                                           | `""`          | Current value (controlled)                                                |
| `onChange`          | `(value: string) => void`                          | —             | Called when selection changes                                             |
| `name`              | `string`                                           | —             | Name for the hidden input (form submission)                               |
| `id`                | `string`                                           | —             | Id for the trigger (for label and a11y; auto-generated if not provided)   |
| `hint`              | `string`                                           | —             | Optional hint below the select                                            |
| `error`             | `string`                                           | —             | Error message; when set, select and label use error styling               |
| `variant`           | `"outline" \| "filled" \| "flushed" \| "unstyled"` | `"outline"`   | Visual style (matches SharpmoveInput)                                     |
| `size`              | `"sm" \| "md" \| "lg"`                             | `"md"`        | Size of the select and label                                              |
| `disabled`          | `boolean`                                          | `false`       | Disables the select                                                       |
| `required`          | `boolean`                                          | `false`       | Whether a value is required                                               |
| `className`         | `string`                                           | —             | Root wrapper class name                                                   |

Ref is forwarded to the hidden `<input>` (for form submission).

## Behavior

- **Floating label** — Label sits in the middle when nothing is selected and closed; floats when the dropdown is open or when a value is selected.
- **Outside click** — Closes the dropdown when clicking outside.
- **Escape** — Closes the dropdown.
- **Search** — When `searchable` is true, options are filtered by label (case-insensitive) as the user types.

## Examples

### Basic

```tsx
const options = [
  { value: "ng", label: "Nigeria" },
  { value: "gh", label: "Ghana" },
];
<SharpmoveSelect
  label="Country"
  placeholder="Choose a country"
  options={options}
  value={country}
  onChange={(value) => setCountry(value)}
/>;
```

### Searchable

```tsx
<SharpmoveSelect
  label="Country"
  options={countries}
  value={country}
  onChange={setCountry}
  searchable
  searchPlaceholder="Type to filter..."
/>
```

### With error and hint

```tsx
<SharpmoveSelect
  label="Role"
  options={roles}
  error="Required"
/>
<SharpmoveSelect
  label="Region"
  options={regions}
  hint="We'll use this for delivery"
/>
```

### Form submission

A hidden input with `name` and `value` is rendered so the selected value is submitted with forms. Use `name` to set the field name.

```tsx
<SharpmoveSelect
  name="country"
  label="Country"
  options={options}
  value={country}
  onChange={setCountry}
/>
```
