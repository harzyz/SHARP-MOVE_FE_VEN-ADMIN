import { AdminVendorDetailView } from "@/views/admin/vendors/vendor-detail";

export default function AdminVendorDetailPage({
  params,
}: {
  params: Promise<{ vendorId: string }>;
}) {
  return <AdminVendorDetailView params={params} />;
}
