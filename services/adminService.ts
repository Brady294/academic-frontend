// frontend/services/adminService.ts

import api from "@/lib/axios";

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

export type AdminDashboardStatistics = {
  totalOrders: number;
  pendingOrders: number;
  inProgressOrders: number;
  completedOrders: number;
  totalRevenue: number;
  students: number;
  unreadMessages: number;
};

export type AdminRecentOrder = {
  id: number;
  user_id: number;

  title: string;
  subject: string;
  service_type: string;
  academic_level: string;

  pages: number | null;
  spacing: string | null;
  citation_style: string | null;

  deadline: string | null;
  instructions: string | null;

  budget: number | string | null;

  status: string | null;
  pricing_status: string | null;

  client_timezone: string | null;
  assigned_admin_id: number | null;

  created_at: string;
  updated_at: string;
};

export type AdminDashboardResponse = {
  success: boolean;

  statistics: AdminDashboardStatistics;

  recentOrders: AdminRecentOrder[];
};

/*
|--------------------------------------------------------------------------
| GET ADMIN DASHBOARD
|--------------------------------------------------------------------------
|
| GET /api/admin/dashboard
|
| Authentication is handled by the existing Axios interceptor.
|
| The interceptor automatically adds:
|
| Authorization: Bearer <accessToken>
|
|--------------------------------------------------------------------------
*/

export async function getAdminDashboard(): Promise<AdminDashboardResponse> {
  const response =
    await api.get<AdminDashboardResponse>(
      "/admin/dashboard"
    );

  return response.data;
}