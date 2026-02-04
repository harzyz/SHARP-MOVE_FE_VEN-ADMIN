# SharpmoveInput

Text input with a floating label. The label sits inside the field when empty/unfocused and moves above when focused or when the input has a value.

## Import

```tsx
import { SharpmoveInput } from "@/components/ui";
```

## Props

| Prop          | Type                                               | Default     | Description                                                                              |
| ------------- | -------------------------------------------------- | ----------- | ---------------------------------------------------------------------------------------- |
| `label`       | `string`                                           | —           | **Required.** Visible label; floats above input when focused or when value is present    |
| `hint`        | `string`                                           | —           | Optional hint or helper text below the input                                             |
| `error`       | `string`                                           | —           | Error message; when set, input and label use error styling                               |
| `variant`     | `"outline" \| "filled" \| "flushed" \| "unstyled"` | `"outline"` | Visual style of the input                                                                |
| `size`        | `"sm" \| "md" \| "lg"`                             | `"md"`      | Size of the input and label                                                              |
| `placeholder` | `string`                                           | `" "`       | Placeholder when label is floated (default single space for float behavior)              |
| `className`   | `string`                                           | —           | Root wrapper class name                                                                  |
| `id`          | `string`                                           | —           | Id for the input (auto-generated if not provided)                                        |
| `disabled`    | `boolean`                                          | —           | Disables the input                                                                       |
| …             | —                                                  | —           | All other native `<input>` props (`type`, `name`, `value`, `onChange`, `required`, etc.) |

Ref is forwarded to the underlying `<input>`.

## Variants

- **outline** — Bordered input (default)
- **filled** — Filled background, border on focus
- **flushed** — Bottom border only
- **unstyled** — No border or background

## Sizes

- **sm** — Compact height and text
- **md** — Default
- **lg** — Larger height and text

## Examples

### Basic

```tsx
<SharpmoveInput label="Email" type="email" name="email" />
```

### With hint and error

```tsx
<SharpmoveInput label="Password" type="password" error="Password is required" />
<SharpmoveInput label="Username" hint="Choose a unique handle" />
```

### Controlled

```tsx
const [name, setName] = useState("");
<SharpmoveInput
  label="Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>;
```

### Variant and size

```tsx
<SharpmoveInput label="Search" variant="filled" size="lg" />
```

### With ref (e.g. for form libraries)

```tsx
const inputRef = useRef<HTMLInputElement>(null);
<SharpmoveInput ref={inputRef} label="Email" name="email" />;
```
