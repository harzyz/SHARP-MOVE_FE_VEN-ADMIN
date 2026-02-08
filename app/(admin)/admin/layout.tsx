import { AdminDashboardLayout } from "@/components/admin-dashboard";
import { AdminAuthProvider, AdminUsersProvider, AdminOrdersProvider, AdminVendorsProvider } from "@/contexts";

export default function AdminRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <AdminUsersProvider>
        <AdminOrdersProvider>
          <AdminVendorsProvider>
            <AdminDashboardLayout>{children}</AdminDashboardLayout>
          </AdminVendorsProvider>
        </AdminOrdersProvider>
      </AdminUsersProvider>
    </AdminAuthProvider>
  );
}
