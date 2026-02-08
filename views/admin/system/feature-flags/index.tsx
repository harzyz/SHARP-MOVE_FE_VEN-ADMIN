"use client";

import type { FeatureFlag } from "@/types";
import { formatRelativeTime } from "@/lib/utils";
import { MOCK_FEATURE_FLAGS } from "@/lib/mock-data";

function ToggleIndicator({ enabled }: { enabled: boolean }) {
  return (
    <div
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
        enabled ? "bg-success-500" : "bg-neutral-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </div>
  );
}

function FeatureFlagRow({ flag }: { flag: FeatureFlag }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-border bg-background p-4 shadow-xs">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-bold text-foreground">{flag.label}</h3>
          <code className="rounded bg-surface px-1.5 py-0.5 text-xs text-foreground-muted">
            {flag.key}
          </code>
        </div>
        <p className="mt-1 text-sm text-foreground-muted">{flag.description}</p>
        <p className="mt-2 text-xs text-foreground-muted">
          Updated {formatRelativeTime(flag.updatedAt)} by {flag.updatedBy}
        </p>
      </div>
      <div className="shrink-0 pt-0.5">
        <ToggleIndicator enabled={flag.isEnabled} />
      </div>
    </div>
  );
}

export function FeatureFlagsList() {
  const flags = MOCK_FEATURE_FLAGS;

  const enabledCount = flags.filter((f) => f.isEnabled).length;
  const disabledCount = flags.length - enabledCount;

  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-foreground-muted">
          <span className="font-semibold text-success-700">{enabledCount}</span> enabled
        </span>
        <span className="text-sm text-foreground-muted">
          <span className="font-semibold text-neutral-600">{disabledCount}</span> disabled
        </span>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {flags.map((flag) => (
          <FeatureFlagRow key={flag.id} flag={flag} />
        ))}
      </div>
    </div>
  );
}
