"use client";

import { use, useState } from "react";
import Link from "next/link";
import { StatusBadge, SharpmoveButton } from "@/components/ui";
import { useAdminSupport } from "@/contexts";
import { formatRelativeTime } from "@/lib/utils";
import type { TicketStatus } from "@/types";

interface AdminTicketDetailViewProps {
  params: Promise<{ ticketId: string }>;
}

const statusColorMap: Record<string, "success" | "warning" | "error" | "info" | "neutral"> = {
  open: "info",
  in_progress: "warning",
  awaiting_response: "neutral",
  resolved: "success",
  closed: "neutral",
};

const priorityColorMap: Record<string, "success" | "warning" | "error" | "info"> = {
  urgent: "error",
  high: "error",
  medium: "warning",
  low: "info",
};

function formatStatus(status: string): string {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function AdminTicketDetailView({ params }: AdminTicketDetailViewProps) {
  const { ticketId } = use(params);
  const { getTicket, updateStatus, addMessage } = useAdminSupport();
  const [replyText, setReplyText] = useState("");

  const ticket = getTicket(ticketId);

  if (!ticket) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <p className="text-sm text-foreground-muted">Ticket not found</p>
        <Link href="/admin/support" className="mt-2 text-sm text-primary hover:underline">
          Back to Support
        </Link>
      </div>
    );
  }

  function handleSendReply() {
    if (!replyText.trim()) return;
    addMessage(ticketId, replyText.trim(), "Admin");
    setReplyText("");
  }

  function handleStatusChange(newStatus: TicketStatus) {
    updateStatus(ticketId, newStatus);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      {/* Back link */}
      <Link
        href="/admin/support"
        className="inline-flex items-center gap-1 text-sm text-foreground-muted hover:text-foreground"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        Back to Support
      </Link>

      <div className="mt-4 grid gap-5 lg:grid-cols-3">
        {/* Left column: Messages */}
        <div className="space-y-5 lg:col-span-2">
          {/* Ticket header */}
          <div className="rounded-xl border border-border bg-background p-4 shadow-xs">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="font-mono text-xs text-foreground-muted">{ticket.ticketNumber}</span>
                <h2 className="mt-1 text-base font-bold text-foreground">{ticket.subject}</h2>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge
                  label={formatStatus(ticket.priority)}
                  colorScheme={priorityColorMap[ticket.priority] || "neutral"}
                />
                <StatusBadge
                  label={formatStatus(ticket.status)}
                  colorScheme={statusColorMap[ticket.status] || "neutral"}
                />
              </div>
            </div>
            <p className="mt-2 text-sm text-foreground-muted">{ticket.description}</p>
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-foreground-muted">
              <span>Customer: <span className="font-medium text-foreground">{ticket.customerName}</span></span>
              <span>Category: <span className="font-medium text-foreground">{ticket.category.replace(/_/g, " ")}</span></span>
              {ticket.assignedTo && (
                <span>Assigned to: <span className="font-medium text-foreground">{ticket.assignedTo}</span></span>
              )}
              <span>Created: {formatRelativeTime(ticket.createdAt)}</span>
            </div>
          </div>

          {/* Message thread */}
          <div className="rounded-xl border border-border bg-background shadow-xs">
            <div className="border-b border-border px-4 py-3">
              <h3 className="text-sm font-bold text-foreground">Messages ({ticket.messages.length})</h3>
            </div>
            <div className="divide-y divide-border">
              {ticket.messages.map((msg) => (
                <div key={msg.id} className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{msg.sender}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                          msg.senderRole === "admin"
                            ? "bg-primary/10 text-primary"
                            : "bg-surface text-foreground-muted"
                        }`}
                      >
                        {msg.senderRole}
                      </span>
                    </div>
                    <span className="text-xs text-foreground-muted">{formatRelativeTime(msg.timestamp)}</span>
                  </div>
                  <p className="mt-1.5 text-sm text-foreground">{msg.message}</p>
                </div>
              ))}
            </div>

            {/* Reply form */}
            {ticket.status !== "closed" && (
              <div className="border-t border-border p-4">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  rows={3}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <div className="mt-2 flex justify-end">
                  <SharpmoveButton colorScheme="primary" onClick={handleSendReply}>
                    Send Reply
                  </SharpmoveButton>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Actions */}
        <div className="space-y-5">
          {/* Status actions */}
          <div className="rounded-xl border border-border bg-background p-4 shadow-xs">
            <h3 className="text-sm font-bold text-foreground">Actions</h3>
            <div className="mt-3 flex flex-col gap-2">
              {ticket.status === "open" && (
                <SharpmoveButton colorScheme="primary" onClick={() => handleStatusChange("in_progress")}>
                  Start Working
                </SharpmoveButton>
              )}
              {ticket.status === "in_progress" && (
                <SharpmoveButton colorScheme="warning" onClick={() => handleStatusChange("awaiting_response")}>
                  Await Response
                </SharpmoveButton>
              )}
              {(ticket.status === "in_progress" || ticket.status === "awaiting_response") && (
                <SharpmoveButton colorScheme="success" onClick={() => handleStatusChange("resolved")}>
                  Resolve Ticket
                </SharpmoveButton>
              )}
              {ticket.status === "resolved" && (
                <SharpmoveButton colorScheme="neutral" onClick={() => handleStatusChange("closed")}>
                  Close Ticket
                </SharpmoveButton>
              )}
              {ticket.status !== "closed" && ticket.status !== "resolved" && (
                <SharpmoveButton colorScheme="error" onClick={() => handleStatusChange("closed")}>
                  Close Without Resolving
                </SharpmoveButton>
              )}
            </div>
          </div>

          {/* Ticket info */}
          <div className="rounded-xl border border-border bg-background p-4 shadow-xs">
            <h3 className="text-sm font-bold text-foreground">Ticket Info</h3>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-foreground-muted">Customer Email</dt>
                <dd className="font-medium text-foreground">{ticket.customerEmail}</dd>
              </div>
              {ticket.relatedOrderId && (
                <div className="flex justify-between">
                  <dt className="text-foreground-muted">Related Order</dt>
                  <dd>
                    <Link
                      href={`/admin/orders/${ticket.relatedOrderId}`}
                      className="font-medium text-primary hover:underline"
                    >
                      View Order
                    </Link>
                  </dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-foreground-muted">Updated</dt>
                <dd className="text-foreground">{formatRelativeTime(ticket.updatedAt)}</dd>
              </div>
              {ticket.resolvedAt && (
                <div className="flex justify-between">
                  <dt className="text-foreground-muted">Resolved</dt>
                  <dd className="text-foreground">{formatRelativeTime(ticket.resolvedAt)}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
