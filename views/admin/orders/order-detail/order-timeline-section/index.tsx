import { TimelineView, type TimelineEvent } from "@/components/ui";
import type { AdminOrderTimelineEvent } from "@/types";

interface OrderTimelineSectionProps {
  events: AdminOrderTimelineEvent[];
}

export function OrderTimelineSection({ events }: OrderTimelineSectionProps) {
  const timelineEvents: TimelineEvent[] = events.map((e) => ({
    id: e.id,
    title: e.event,
    description: e.description,
    timestamp: e.timestamp,
    actor: e.actor,
    actorRole: e.actorRole,
  }));

  return (
    <div className="rounded-xl border border-border bg-background p-4 shadow-xs sm:p-6">
      <h3 className="text-sm font-semibold text-foreground">Order Timeline</h3>
      <div className="mt-3">
        <TimelineView events={timelineEvents} />
      </div>
    </div>
  );
}
