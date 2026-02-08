import { DashboardLayout } from "@/components/dashboard";
import { VendorProvider, VendorOrdersProvider, MenuProvider } from "@/contexts";

export default function DashboardRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <VendorProvider>
      <VendorOrdersProvider>
        <MenuProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </MenuProvider>
      </VendorOrdersProvider>
    </VendorProvider>
  );
}
