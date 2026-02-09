import { AdminTicketDetailView } from "@/views/admin/support/ticket-detail";

export default function AdminTicketDetailPage({ params }: { params: Promise<{ ticketId: string }> }) {
  return <AdminTicketDetailView params={params} />;
}
