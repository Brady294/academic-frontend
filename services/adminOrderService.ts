// frontend/services/adminOrderService.ts

import api from "@/lib/axios";

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

export interface AdminOrder {
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

  assigned_admin_id: number | null;

  client_timezone: string | null;

  created_at: string;
  updated_at: string;
}

export interface AdminOrdersPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AdminOrdersResponse {
  success: boolean;
  orders: AdminOrder[];
  pagination: AdminOrdersPagination;
}

export interface AdminOrderStatistics {
  totalOrders: number;
  pendingOrders: number;
  inProgressOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  pricingReviewOrders: number;
  totalStudents: number;
  totalBudget: number;
}

export interface AdminOrderStatisticsResponse {
  success: boolean;
  statistics: AdminOrderStatistics;
}

export interface AdminOrderFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  pricing_status?: string;
  sort?: "asc" | "desc";
}

/*
|--------------------------------------------------------------------------
| GET ADMIN ORDERS
|--------------------------------------------------------------------------
|
| GET /api/admin/orders
|
| The Axios interceptor in @/lib/axios is responsible for
| attaching the authentication token.
|
|--------------------------------------------------------------------------
*/

export async function getAdminOrders(
  filters: AdminOrderFilters = {}
): Promise<AdminOrdersResponse> {
  const response =
    await api.get<AdminOrdersResponse>(
      "/admin/orders",
      {
        params: {
          page: filters.page ?? 1,
          limit: filters.limit ?? 10,
          search: filters.search ?? "",
          status: filters.status ?? "",
          pricing_status:
            filters.pricing_status ?? "",
          sort: filters.sort ?? "desc",
        },
      }
    );

  return response.data;
}

/*
|--------------------------------------------------------------------------
| GET ADMIN ORDER STATISTICS
|--------------------------------------------------------------------------
|
| GET /api/admin/orders/statistics
|
|--------------------------------------------------------------------------
*/

export async function getAdminOrderStatistics(): Promise<AdminOrderStatisticsResponse> {
  const response =
    await api.get<AdminOrderStatisticsResponse>(
      "/admin/orders/statistics"
    );

  return response.data;
}

/*
|--------------------------------------------------------------------------
| GET SINGLE ADMIN ORDER
|--------------------------------------------------------------------------
|
| GET /api/admin/orders/:id
|
|--------------------------------------------------------------------------
*/

export async function getAdminOrder(
  id: string | number
): Promise<{
  success: boolean;
  order: AdminOrder;
}> {
  const response =
    await api.get<{
      success: boolean;
      order: AdminOrder;
    }>(`/admin/orders/${id}`);

  return response.data;
}