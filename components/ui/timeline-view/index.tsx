import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/utils";

export interface TimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  actor?: string;
  actorRole?: string;
}

export interface TimelineViewProps {
  events: TimelineEvent[];
  className?: string;
}

const roleColors: Record<string, string> = {
  system: "bg-blue-500",
  customer: "bg-green-500",
  vendor: "bg-purple-500",
  rider: "bg-amber-500",
  admin: "bg-red-500",
};

export function TimelineView({ events, className }: TimelineViewProps) {
  if (events.length === 0) {
    return (
      <div className="py-6 text-center text-sm text-foreground-muted">No events</div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {events.map((event, index) => (
        <div key={event.id} className="relative flex gap-3 pb-5 last:pb-0">
          {/* Vertical line */}
          {index < events.length - 1 && (
            <div className="absolute left-[7px] top-4 h-full w-px bg-border" />
          )}

          {/* Dot */}
          <div className={cn(
            "relative z-10 mt-1 size-[15px] shrink-0 rounded-full border-2 border-background",
            event.actorRole ? (roleColors[event.actorRole] || "bg-gray-400") : "bg-primary"
          )} />

          {/* Content */}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground">{event.title}</p>
            {event.description && (
              <p className="mt-0.5 text-xs text-foreground-muted">{event.description}</p>
            )}
            <div className="mt-1 flex items-center gap-2 text-xs text-foreground-muted">
              <span>{formatRelativeTime(event.timestamp)}</span>
              {event.actor && (
                <>
                  <span>&middot;</span>
                  <span>{event.actor}</span>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
