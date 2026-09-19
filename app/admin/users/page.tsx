"use client";

import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Menu,
  RefreshCw,
  Search,
  ShieldCheck,
  User,
  Users,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";

type AdminUser = {
  id: number;
  name: string | null;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  country: string | null;
  timezone: string | null;
  university: string | null;
  academic_level: string | null;
  avatar: string | null;
  is_admin: boolean;
  is_verified: boolean;
  created_at: string;
};

type UsersResponse = {
  success: boolean;
  users: AdminUser[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

const PAGE_SIZE = 10;

export default function AdminUsersPage() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [users, setUsers] =
    useState<AdminUser[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [search, setSearch] =
    useState("");

  const [roleFilter, setRoleFilter] =
    useState("all");

  const [page, setPage] =
    useState(1);

  const [totalUsers, setTotalUsers] =
    useState(0);

  const [totalPages, setTotalPages] =
    useState(1);

  /*
  |--------------------------------------------------------------------------
  | LOAD USERS
  |--------------------------------------------------------------------------
  */

  async function loadUsers(
    showRefresh = false
  ) {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError(null);

      const params =
        new URLSearchParams();

      params.set(
        "page",
        String(page)
      );

      params.set(
        "limit",
        String(PAGE_SIZE)
      );

      if (search.trim()) {
        params.set(
          "search",
          search.trim()
        );
      }

      if (roleFilter !== "all") {
        params.set(
          "role",
          roleFilter
        );
      }

      const response =
        await fetch(
          `${API_URL}/api/admin/users?${params.toString()}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type":
                "application/json",
            },
            cache: "no-store",
          }
        );

      let data:
        | UsersResponse
        | {
            error?: string;
            message?: string;
          }
        | null = null;

      try {
        data =
          await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        const message =
          data &&
          typeof data === "object" &&
          ("error" in data ||
            "message" in data)
            ? String(
                "error" in data
                  ? data.error
                  : data.message
              )
            : `Failed to load users (${response.status})`;

        throw new Error(message);
      }

      const result =
        data as UsersResponse;

      setUsers(
        result.users || []
      );

      setTotalUsers(
        result.pagination?.total ??
          result.users?.length ??
          0
      );

      setTotalPages(
        result.pagination?.totalPages ??
          1
      );
    } catch (err) {
      console.error(
        "ADMIN USERS ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load users."
      );

      setUsers([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | LOAD WHEN PAGE / ROLE CHANGES
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    loadUsers();
  }, [page, roleFilter]);

  /*
  |--------------------------------------------------------------------------
  | SEARCH DEBOUNCE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const timer =
      setTimeout(() => {
        setPage(1);
        loadUsers();
      }, 450);

    return () =>
      clearTimeout(timer);
  }, [search]);

  /*
  |--------------------------------------------------------------------------
  | HELPERS
  |--------------------------------------------------------------------------
  */

  function formatDate(
    value: string | null
  ) {
    if (!value) {
      return "—";
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "—";
    }

    return date.toLocaleDateString(
      undefined,
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  }

  function getDisplayName(
    user: AdminUser
  ) {
    const fullName =
      [
        user.first_name,
        user.last_name,
      ]
        .filter(Boolean)
        .join(" ");

    return (
      fullName ||
      user.name ||
      "Unnamed User"
    );
  }

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-[#f6f9fd] text-slate-900">

      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-[270px] flex-col border-r border-slate-200 bg-white transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        {/* LOGO */}

        <div className="flex h-[86px] items-center justify-between border-b border-slate-100 px-6">

          <a
            href="/admin"
            className="flex items-center gap-3"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
              <Users className="h-5 w-5 text-white" />
            </div>

            <div>

              <div className="text-[19px] font-extrabold tracking-tight text-slate-900">
                TopStudy
                <span className="text-blue-600">
                  Tutor
                </span>
              </div>

              <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-400">
                Admin Portal
              </div>

            </div>

          </a>

          <button
            type="button"
            onClick={() =>
              setSidebarOpen(false)
            }
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* NAVIGATION */}

        <div className="flex-1 overflow-y-auto px-4 py-6">

          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Main
          </p>

          <nav className="space-y-1">

            <AdminNavItem
              href="/admin"
              label="Dashboard"
            />

            <AdminNavItem
              href="/admin/orders"
              label="Orders"
            />

            <AdminNavItem
              href="/admin/users"
              label="Users"
              active
            />

            <AdminNavItem
              href="/admin/messages"
              label="Messages"
            />

            <AdminNavItem
              href="/admin/revisions"
              label="Revisions"
            />

            <AdminNavItem
              href="/admin/analytics"
              label="Analytics"
            />

          </nav>

          <p className="mb-3 mt-8 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Management
          </p>

          <nav className="space-y-1">

            <AdminNavItem
              href="/admin/notifications"
              label="Notifications"
            />

            <AdminNavItem
              href="/admin/settings"
              label="Settings"
            />

          </nav>

        </div>

        {/* ADMIN ACCOUNT */}

        <div className="border-t border-slate-100 p-4">

          <div className="rounded-xl bg-slate-50 p-3">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <ShieldCheck className="h-5 w-5 text-blue-600" />
              </div>

              <div>

                <p className="text-sm font-semibold text-slate-900">
                  Administrator
                </p>

                <p className="text-xs text-slate-500">
                  Admin Account
                </p>

              </div>

            </div>

          </div>

        </div>

      </aside>

      {/* MAIN */}

      <main className="min-h-screen lg:ml-[270px]">

        {/* HEADER */}

        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur md:px-8">

          <div className="flex items-center gap-4">

            <button
              type="button"
              onClick={() =>
                setSidebarOpen(true)
              }
              className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div>

              <h1 className="text-xl font-bold tracking-tight md:text-2xl">
                Users
              </h1>

              <p className="hidden text-xs text-slate-500 sm:block">
                Manage registered users and administrators
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              loadUsers(true)
            }
            disabled={refreshing}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >

            {refreshing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}

            <span className="hidden sm:inline">
              Refresh
            </span>

          </button>

        </header>

        {/* BODY */}

        <div className="p-5 md:p-8">

          {/* PAGE HEADING */}

          <div className="mb-6">

            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">

              <Users className="h-3.5 w-3.5" />

              User Management

            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              All Users
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View registered students and administrators.
            </p>

          </div>

          {/* STATISTICS */}

          <div className="mb-6 grid gap-4 sm:grid-cols-3">

            <UserStatCard
              title="Total Users"
              value={totalUsers}
              icon={Users}
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
            />

            <UserStatCard
              title="Students"
              value={
                users.filter(
                  (user) =>
                    !user.is_admin
                ).length
              }
              icon={User}
              iconBg="bg-purple-50"
              iconColor="text-purple-600"
            />

            <UserStatCard
              title="Administrators"
              value={
                users.filter(
                  (user) =>
                    user.is_admin
                ).length
              }
              icon={ShieldCheck}
              iconBg="bg-orange-50"
              iconColor="text-orange-600"
            />

          </div>

          {/* ERROR */}

          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

              <div>

                <p className="font-semibold">
                  Unable to load users
                </p>

                <p className="mt-0.5 text-xs">
                  {error}
                </p>

              </div>

            </div>
          )}

          {/* FILTERS */}

          <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">

            <div className="grid gap-3 md:grid-cols-2">

              {/* SEARCH */}

              <div className="relative">

                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search by name, email, phone or ID..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* ROLE */}

              <select
                value={roleFilter}
                onChange={(event) => {
                  setRoleFilter(
                    event.target.value
                  );

                  setPage(1);
                }}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              >

                <option value="all">
                  All users
                </option>

                <option value="student">
                  Students
                </option>

                <option value="admin">
                  Administrators
                </option>

              </select>

            </div>

          </section>

          {/* USERS TABLE */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 md:px-6">

              <div>

                <h3 className="font-bold text-slate-900">
                  Users
                </h3>

                <p className="mt-0.5 text-xs text-slate-500">
                  Registered accounts
                </p>

              </div>

              <div className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500">
                {totalUsers} total
              </div>

            </div>

            {loading ? (

              <div className="flex min-h-[320px] flex-col items-center justify-center">

                <Loader2 className="h-7 w-7 animate-spin text-blue-600" />

                <p className="mt-3 text-sm font-medium text-slate-600">
                  Loading users...
                </p>

              </div>

            ) : users.length === 0 ? (

              <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">
                  <Users className="h-6 w-6 text-slate-400" />
                </div>

                <h3 className="mt-4 text-sm font-bold text-slate-800">
                  No users found
                </h3>

                <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
                  Try changing your search or role filter.
                </p>

              </div>

            ) : (

              <>

                <div className="overflow-x-auto">

                  <table className="w-full min-w-[950px]">

                    <thead>

                      <tr className="border-b border-slate-100 bg-slate-50/70">

                        <TableHeader>
                          User
                        </TableHeader>

                        <TableHeader>
                          Contact
                        </TableHeader>

                        <TableHeader>
                          University
                        </TableHeader>

                        <TableHeader>
                          Academic Level
                        </TableHeader>

                        <TableHeader>
                          Role
                        </TableHeader>

                        <TableHeader>
                          Verified
                        </TableHeader>

                        <TableHeader>
                          Joined
                        </TableHeader>

                      </tr>

                    </thead>

                    <tbody>

                      {users.map(
                        (user) => (

                          <tr
                            key={user.id}
                            className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50/60"
                          >

                            {/* USER */}

                            <td className="px-5 py-5">

                              <div className="flex items-center gap-3">

                                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-50">

                                  {user.avatar ? (
                                    <img
                                      src={
                                        user.avatar
                                      }
                                      alt=""
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <User className="h-5 w-5 text-blue-600" />
                                  )}

                                </div>

                                <div>

                                  <p className="text-sm font-semibold text-slate-800">
                                    {getDisplayName(
                                      user
                                    )}
                                  </p>

                                  <p className="mt-0.5 text-[11px] text-slate-400">
                                    User #
                                    {user.id}
                                  </p>

                                </div>

                              </div>

                            </td>

                            {/* CONTACT */}

                            <td className="px-5 py-5">

                              <p className="text-sm text-slate-700">
                                {user.email}
                              </p>

                              {user.phone && (
                                <p className="mt-1 text-xs text-slate-400">
                                  {user.phone}
                                </p>
                              )}

                            </td>

                            {/* UNIVERSITY */}

                            <td className="px-5 py-5">

                              <p className="max-w-[200px] truncate text-sm text-slate-700">
                                {user.university ||
                                  "—"}
                              </p>

                              {user.country && (
                                <p className="mt-1 text-xs text-slate-400">
                                  {user.country}
                                </p>
                              )}

                            </td>

                            {/* ACADEMIC LEVEL */}

                            <td className="px-5 py-5 text-sm text-slate-600">
                              {user.academic_level ||
                                "—"}
                            </td>

                            {/* ROLE */}

                            <td className="px-5 py-5">

                              <span
                                className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                                  user.is_admin
                                    ? "bg-orange-50 text-orange-700"
                                    : "bg-blue-50 text-blue-700"
                                }`}
                              >

                                {user.is_admin
                                  ? "Administrator"
                                  : "Student"}

                              </span>

                            </td>

                            {/* VERIFIED */}

                            <td className="px-5 py-5">

                              {user.is_verified ? (

                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600">

                                  <CheckCircle2 className="h-4 w-4" />

                                  Verified

                                </span>

                              ) : (

                                <span className="text-xs font-medium text-slate-400">
                                  Not verified
                                </span>

                              )}

                            </td>

                            {/* JOINED */}

                            <td className="px-5 py-5 text-sm text-slate-500">
                              {formatDate(
                                user.created_at
                              )}
                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

                {/* PAGINATION */}

                <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">

                  <p className="text-xs text-slate-500">

                    Page{" "}

                    <span className="font-semibold text-slate-700">
                      {page}
                    </span>

                    {" "}of{" "}

                    <span className="font-semibold text-slate-700">
                      {totalPages}
                    </span>

                  </p>

                  <div className="flex items-center gap-2">

                    <button
                      type="button"
                      disabled={
                        page <= 1
                      }
                      onClick={() =>
                        setPage(
                          (current) =>
                            Math.max(
                              1,
                              current - 1
                            )
                        )
                      }
                      className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >

                      <ChevronLeft className="h-4 w-4" />

                      Previous

                    </button>

                    <button
                      type="button"
                      disabled={
                        page >=
                        totalPages
                      }
                      onClick={() =>
                        setPage(
                          (current) =>
                            Math.min(
                              totalPages,
                              current + 1
                            )
                        )
                      }
                      className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >

                      Next

                      <ChevronRight className="h-4 w-4" />

                    </button>

                  </div>

                </div>

              </>

            )}

          </section>

        </div>

      </main>

    </div>
  );
}

/*
|--------------------------------------------------------------------------
| NAV ITEM
|--------------------------------------------------------------------------
*/

function AdminNavItem({
  href,
  label,
  active = false,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <a
      href={href}
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
        active
          ? "bg-blue-600 text-white shadow-sm"
          : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
      }`}
    >

      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active
            ? "bg-white"
            : "bg-slate-300"
        }`}
      />

      {label}

      {active && (
        <ChevronRight className="ml-auto h-4 w-4 text-blue-100" />
      )}

    </a>
  );
}

/*
|--------------------------------------------------------------------------
| STAT CARD
|--------------------------------------------------------------------------
*/

function UserStatCard({
  title,
  value,
  icon: Icon,
  iconBg,
  iconColor,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
            {value.toLocaleString()}
          </p>

        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}
        >

          <Icon
            className={`h-5 w-5 ${iconColor}`}
          />

        </div>

      </div>

    </div>
  );
}

/*
|--------------------------------------------------------------------------
| TABLE HEADER
|--------------------------------------------------------------------------
*/

function TableHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400">
      {children}
    </th>
  );
}