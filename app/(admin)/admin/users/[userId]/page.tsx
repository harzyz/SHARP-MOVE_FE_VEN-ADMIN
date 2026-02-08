import { AdminUserDetailView } from "@/views/admin/users/user-detail";

export default function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  return <AdminUserDetailView params={params} />;
}
