"use client";

import { Chip } from "@/components/ui";
import type { DateRangePreset } from "@/types";

interface DateRangeSelectorProps {
  activePreset: DateRangePreset;
  onPresetChange: (preset: DateRangePreset) => void;
}

const presets: { key: DateRangePreset; label: string }[] = [
  { key: "today", label: "Today" },
  { key: "yesterday", label: "Yesterday" },
  { key: "last7days", label: "Last 7 Days" },
  { key: "thisMonth", label: "This Month" },
];

export function DateRangeSelector({ activePreset, onPresetChange }: DateRangeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {presets.map((p) => (
        <Chip key={p.key} isActive={activePreset === p.key} onClick={() => onPresetChange(p.key)}>
          {p.label}
        </Chip>
      ))}
    </div>
  );
}
