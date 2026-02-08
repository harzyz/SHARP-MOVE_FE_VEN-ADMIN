import type { AdminUser } from "@/types";

export const MOCK_ADMIN_USER: AdminUser = {
  id: "admin-001",
  email: "admin@sharpmove.ng",
  name: "Adebayo Ogunlesi",
  role: "super_admin",
  lastLoginAt: new Date().toISOString(),
  isActive: true,
  createdAt: "2025-06-15T09:00:00Z",
};
