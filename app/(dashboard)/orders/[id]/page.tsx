import { OrderTrackingView } from "@/views/order-tracking";

export default function OrderTrackingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <OrderTrackingView params={params} />;
}
