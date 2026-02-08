"use client";

import { useState } from "react";
import { ToggleSwitch, SharpmoveButton } from "@/components/ui";
import type { OperatingHours } from "@/types";

interface HoursSectionProps {
  hours: OperatingHours[];
  onSave: (hours: OperatingHours[]) => void;
}

export function HoursSection({ hours, onSave }: HoursSectionProps) {
  const [localHours, setLocalHours] = useState<OperatingHours[]>(hours);
  const [saved, setSaved] = useState(false);

  function toggleDay(index: number) {
    setLocalHours((prev) =>
      prev.map((h, i) => (i === index ? { ...h, isOpen: !h.isOpen } : h))
    );
  }

  function updateTime(index: number, field: "openTime" | "closeTime", value: string) {
    setLocalHours((prev) =>
      prev.map((h, i) => (i === index ? { ...h, [field]: value } : h))
    );
  }

  function handleSave() {
    onSave(localHours);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
      <h3 className="text-sm font-semibold text-foreground">Operating Hours</h3>
      <div className="mt-4 space-y-3">
        {localHours.map((h, i) => (
          <div key={h.day} className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-sm text-foreground">{h.day}</span>
            <ToggleSwitch checked={h.isOpen} onChange={() => toggleDay(i)} size="sm" />
            {h.isOpen ? (
              <div className="flex items-center gap-2">
                <input
                  type="time"
                  value={h.openTime}
                  onChange={(e) => updateTime(i, "openTime", e.target.value)}
                  className="rounded-md border border-border bg-background px-2 py-1 text-sm text-foreground focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
                <span className="text-xs text-foreground-muted">to</span>
                <input
                  type="time"
                  value={h.closeTime}
                  onChange={(e) => updateTime(i, "closeTime", e.target.value)}
                  className="rounded-md border border-border bg-background px-2 py-1 text-sm text-foreground focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
            ) : (
              <span className="text-sm text-foreground-muted">Closed</span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <SharpmoveButton onClick={handleSave}>
          {saved ? "Saved!" : "Save Hours"}
        </SharpmoveButton>
      </div>
    </div>
  );
}
