export interface NavItem {
  href: string;
  label: string;
  icon: "explore" | "orders" | "favourites" | "account";
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/explore", label: "Explore", icon: "explore" },
  { href: "/orders", label: "Orders", icon: "orders" },
  { href: "/favourites", label: "Favourites", icon: "favourites" },
  { href: "/account", label: "Account", icon: "account" },
];
