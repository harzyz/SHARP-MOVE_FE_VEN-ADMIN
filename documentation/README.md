# Kia Kia UI Components

Documentation for the Sharpmove UI component library. All components use the Kia Kia design system tokens (colors, spacing, typography) and support light/dark theme.

## Components

| Component                                | Description                            |
| ---------------------------------------- | -------------------------------------- |
| [SharpmoveInput](./sharpmove-input.md)   | Text input with floating label         |
| [SharpmoveSelect](./sharpmove-select.md) | Custom select with optional search     |
| [SharpmoveButton](./sharpmove-button.md) | Button with variants and color schemes |

## Import

```tsx
import {
  SharpmoveInput,
  SharpmoveSelect,
  SharpmoveButton,
} from "@/components/ui";
```

Or import individually:

```tsx
import { SharpmoveInput } from "@/components/ui/sharpmove-input";
import { SharpmoveSelect } from "@/components/ui/sharpmove-select";
import { SharpmoveButton } from "@/components/ui/sharpmove-button";
```

## Suggested components (roadmap)

**Form & data entry**

- Checkbox
- Radio / RadioGroup
- Textarea
- Switch / Toggle
- DatePicker / DateInput
- FileInput

**Feedback & overlay**

- Alert
- Toast
- Modal / Dialog
- Drawer / Sheet
- Popover
- Tooltip

**Layout & structure**

- Card
- Tabs
- Accordion
- Divider
- Badge

**Navigation**

- Link
- Breadcrumb

**Data display**

- Avatar
- Skeleton
- Spinner (standalone)
- Table

**Utility**

- Progress
- Pagination
