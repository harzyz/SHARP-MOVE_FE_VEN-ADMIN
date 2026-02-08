"use client";

import { useRouter } from "next/navigation";
import { DataTable, StatusBadge, type DataTableColumn } from "@/components/ui";
import { formatRelativeTime } from "@/lib/utils";
import type { SupportTicket } from "@/types";

interface TicketTableProps {
  tickets: SupportTicket[];
}

const priorityColorMap: Record<string, "success" | "warning" | "error" | "info" | "neutral"> = {
  urgent: "error",
  high: "error",
  medium: "warning",
  low: "info",
};

const statusColorMap: Record<string, "success" | "warning" | "error" | "info" | "neutral"> = {
  open: "info",
  in_progress: "warning",
  awaiting_response: "neutral",
  resolved: "success",
  closed: "neutral",
};

const categoryLabels: Record<string, string> = {
  order_issue: "Order Issue",
  payment: "Payment",
  account: "Account",
  vendor_complaint: "Vendor Complaint",
  rider_complaint: "Rider Complaint",
  technical: "Technical",
  other: "Other",
};

function formatStatus(status: string): string {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function TicketTable({ tickets }: TicketTableProps) {
  const router = useRouter();

  const columns: DataTableColumn<SupportTicket>[] = [
    {
      key: "ticketNumber",
      header: "Ticket #",
      render: (t) => (
        <span className="font-mono text-xs font-medium">{t.ticketNumber}</span>
      ),
    },
    {
      key: "subject",
      header: "Subject",
      render: (t) => (
        <span className="max-w-[200px] truncate font-medium">{t.subject}</span>
      ),
    },
    {
      key: "customer",
      header: "Customer",
      className: "hidden sm:table-cell",
      render: (t) => t.customerName,
    },
    {
      key: "priority",
      header: "Priority",
      render: (t) => (
        <StatusBadge
          label={t.priority.charAt(0).toUpperCase() + t.priority.slice(1)}
          colorScheme={priorityColorMap[t.priority] || "neutral"}
        />
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (t) => (
        <StatusBadge
          label={formatStatus(t.status)}
          colorScheme={statusColorMap[t.status] || "neutral"}
        />
      ),
    },
    {
      key: "category",
      header: "Category",
      className: "hidden lg:table-cell",
      render: (t) => (
        <span className="text-xs">{categoryLabels[t.category] || t.category}</span>
      ),
    },
    {
      key: "updatedAt",
      header: "Updated",
      className: "hidden sm:table-cell",
      render: (t) => (
        <span className="text-xs text-foreground-muted">
          {formatRelativeTime(t.updatedAt)}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={tickets}
      keyExtractor={(t) => t.id}
      onRowClick={(t) => router.push(`/admin/support/${t.id}`)}
      emptyMessage="No support tickets found"
    />
  );
}
