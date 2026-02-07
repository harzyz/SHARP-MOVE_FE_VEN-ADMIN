import { DashboardLayout } from "@/components/dashboard";
import { CartProvider, OrdersProvider } from "@/contexts";

export default function DashboardRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <OrdersProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </OrdersProvider>
    </CartProvider>
  );
}
