export interface NavItem {
  href: string;
  label: string;
  icon: "dashboard" | "orders" | "menu" | "analytics" | "more";
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/orders", label: "Orders", icon: "orders" },
  { href: "/menu", label: "Menu", icon: "menu" },
  { href: "/analytics", label: "Analytics", icon: "analytics" },
  { href: "/more", label: "More", icon: "more" },
];

export interface SidebarExtraItem {
  href: string;
  label: string;
  icon: "finance" | "settings" | "support";
}

export const SIDEBAR_EXTRA_ITEMS: SidebarExtraItem[] = [
  { href: "/finance", label: "Finance", icon: "finance" },
  { href: "/settings", label: "Settings", icon: "settings" },
  { href: "/support", label: "Support", icon: "support" },
];
