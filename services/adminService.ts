// frontend/services/adminService.ts

export type AdminDashboardStatistics = {
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  students: number;
  completedOrders: number;
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
  budget: number | string | null;
  pricing_status: string | null;
  deadline: string | null;
  created_at: string;
};

export type AdminDashboardResponse = {
  success: boolean;
  statistics: AdminDashboardStatistics;
  recentOrders: AdminRecentOrder[];
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/**
 * Get administrator dashboard data.
 *
 * Authentication is handled by the existing auth cookie.
 */
export async function getAdminDashboard(): Promise<AdminDashboardResponse> {
  const response = await fetch(
    `${API_URL}/api/admin/dashboard`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  let data: AdminDashboardResponse | null = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data &&
      typeof data === "object" &&
      "error" in data
        ? String(
            (data as unknown as { error: string }).error
          )
        : `Failed to load admin dashboard (${response.status})`
    );
  }

  return data as AdminDashboardResponse;
}