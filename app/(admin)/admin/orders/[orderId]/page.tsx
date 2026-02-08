import { AdminOrderDetailView } from "@/views/admin/orders/order-detail";

export default function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  return <AdminOrderDetailView params={params} />;
}
