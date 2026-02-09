import { AdminRiderDetailView } from "@/views/admin/riders/rider-detail";

export default function AdminRiderDetailPage({ params }: { params: Promise<{ riderId: string }> }) {
  return <AdminRiderDetailView params={params} />;
}
