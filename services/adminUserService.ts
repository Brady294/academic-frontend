import api from "@/lib/axios";

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

export type AdminUser = {
  id: number;

  name: string;
  email: string;

  created_at: string;

  is_admin: boolean;
  is_verified: boolean;

  first_name: string | null;
  last_name: string | null;

  phone: string | null;
  country: string | null;
  timezone: string | null;

  university: string | null;
  academic_level: string | null;

  avatar: string | null;
};

export type AdminUsersPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type AdminUsersResponse = {
  success: boolean;

  users: AdminUser[];

  pagination: AdminUsersPagination;
};

export type AdminUserStatistics = {
  totalUsers: number;
  verifiedUsers: number;
  unverifiedUsers: number;
  adminUsers: number;
  newToday: number;
  newThisWeek: number;
};

export type AdminUserStatisticsResponse = {
  success: boolean;

  statistics: AdminUserStatistics;
};

/*
|--------------------------------------------------------------------------
| GET ADMIN USERS
|--------------------------------------------------------------------------
|
| GET /api/admin/users
|
| Supported parameters:
|
| page
| limit
| search
| verified
| admin
| sort
|
|--------------------------------------------------------------------------
*/

export type GetAdminUsersParams = {
  page?: number;
  limit?: number;

  search?: string;

  verified?: "all" | "true" | "false";

  admin?: "all" | "true" | "false";

  sort?: "asc" | "desc";
};

export async function getAdminUsers(
  params: GetAdminUsersParams = {}
): Promise<AdminUsersResponse> {
  const response =
    await api.get<AdminUsersResponse>(
      "/admin/users",
      {
        params: {
          page: params.page ?? 1,

          limit: params.limit ?? 10,

          ...(params.search?.trim()
            ? {
                search:
                  params.search.trim(),
              }
            : {}),

          ...(params.verified &&
          params.verified !== "all"
            ? {
                verified:
                  params.verified,
              }
            : {}),

          ...(params.admin &&
          params.admin !== "all"
            ? {
                admin:
                  params.admin,
              }
            : {}),

          sort:
            params.sort ?? "desc",
        },
      }
    );

  return response.data;
}

/*
|--------------------------------------------------------------------------
| GET ADMIN USER STATISTICS
|--------------------------------------------------------------------------
|
| GET /api/admin/users/statistics
|
|--------------------------------------------------------------------------
*/

export async function getAdminUserStatistics(): Promise<AdminUserStatisticsResponse> {
  const response =
    await api.get<AdminUserStatisticsResponse>(
      "/admin/users/statistics"
    );

  return response.data;
}