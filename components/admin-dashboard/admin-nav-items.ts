export type AdminNavIcon =
  | "grid"
  | "people"
  | "clipboard"
  | "store"
  | "truck"
  | "banknote"
  | "megaphone"
  | "chart"
  | "headset"
  | "cog"
  | "shield";

export interface AdminNavItem {
  href: string;
  label: string;
  icon: AdminNavIcon;
}

export const ADMIN_PRIMARY_NAV: AdminNavItem[] = [
  { href: "/admin/dashboard", label: "Overview", icon: "grid" },
  { href: "/admin/users", label: "Users", icon: "people" },
  { href: "/admin/orders", label: "Orders", icon: "clipboard" },
  { href: "/admin/vendors", label: "Vendors", icon: "store" },
  { href: "/admin/riders", label: "Riders", icon: "truck" },
];

export const ADMIN_SECONDARY_NAV: AdminNavItem[] = [
  { href: "/admin/finance", label: "Finance", icon: "banknote" },
  { href: "/admin/promotions", label: "Promotions", icon: "megaphone" },
  { href: "/admin/analytics", label: "Analytics", icon: "chart" },
  { href: "/admin/support", label: "Support", icon: "headset" },
  { href: "/admin/system", label: "System", icon: "cog" },
  { href: "/admin/security", label: "Security", icon: "shield" },
];
