import { DashboardLayout } from "@/components/dashboard";
import { CartProvider, OrdersProvider, FavouritesProvider } from "@/contexts";

export default function DashboardRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <OrdersProvider>
        <FavouritesProvider>
          <DashboardLayout>{children}</DashboardLayout>
        </FavouritesProvider>
      </OrdersProvider>
    </CartProvider>
  );
}
