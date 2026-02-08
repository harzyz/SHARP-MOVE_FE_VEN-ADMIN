import { AdminDashboardLayout } from "@/components/admin-dashboard";
import {
  AdminAuthProvider,
  AdminUsersProvider,
  AdminOrdersProvider,
  AdminVendorsProvider,
  AdminRidersProvider,
  AdminSupportProvider,
  AdminPromotionsProvider,
} from "@/contexts";

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
            <AdminRidersProvider>
              <AdminSupportProvider>
                <AdminPromotionsProvider>
                  <AdminDashboardLayout>{children}</AdminDashboardLayout>
                </AdminPromotionsProvider>
              </AdminSupportProvider>
            </AdminRidersProvider>
          </AdminVendorsProvider>
        </AdminOrdersProvider>
      </AdminUsersProvider>
    </AdminAuthProvider>
  );
}
