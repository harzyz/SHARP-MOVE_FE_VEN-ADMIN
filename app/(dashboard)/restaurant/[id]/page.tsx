import { RestaurantView } from "@/views/restaurant";

export default function RestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <RestaurantView params={params} />;
}
