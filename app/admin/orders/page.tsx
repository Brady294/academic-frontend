"use client";

import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  Filter,
  Loader2,
  Menu,
  Package,
  RefreshCw,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  User,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";

type Order = {
  id: number;
  user_id: number;
  title: string;
  subject: string;
  service_type: string | null;
  pages: number | null;
  deadline: string | null;
  created_at: string;
  budget: number | string | null;
  pricing_status: string | null;
  payment_status: string | null;
  status: string | null;
};

type OrdersResponse = {
  success: boolean;
  orders: Order[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const PAGE_SIZE = 10;

export default function AdminOrdersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [pricingFilter, setPricingFilter] = useState("all");

  const [sortDirection, setSortDirection] =
    useState<"desc" | "asc">("desc");

  const [page, setPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  /*
  |--------------------------------------------------------------------------
  | LOAD ORDERS
  |--------------------------------------------------------------------------
  */

  async function loadOrders(showRefresh = false) {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError(null);

      const params = new URLSearchParams();

      params.set("page", String(page));
      params.set("limit", String(PAGE_SIZE));
      params.set("sort", sortDirection);

      if (search.trim()) {
        params.set("search", search.trim());
      }

      if (statusFilter !== "all") {
        params.set("status", statusFilter);
      }

      if (pricingFilter !== "all") {
        params.set("pricing_status", pricingFilter);
      }

      const response = await fetch(
        `${API_URL}/api/admin/orders?${params.toString()}`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );

      let data:
        | OrdersResponse
        | { error?: string; message?: string }
        | null = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        const message =
          data &&
          typeof data === "object" &&
          ("error" in data || "message" in data)
            ? String(
                "error" in data
                  ? data.error
                  : data.message
              )
            : `Failed to load orders (${response.status})`;

        throw new Error(message);
      }

      const result = data as OrdersResponse;

      setOrders(result.orders || []);

      setTotalOrders(
        result.pagination?.total ??
          result.orders?.length ??
          0
      );

      setTotalPages(
        result.pagination?.totalPages ?? 1
      );
    } catch (err) {
      console.error("ADMIN ORDERS ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load orders."
      );

      setOrders([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | LOAD WHEN FILTERS CHANGE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    loadOrders();
  }, [
    page,
    statusFilter,
    pricingFilter,
    sortDirection,
  ]);

  /*
  |--------------------------------------------------------------------------
  | SEARCH
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
    }, 450);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadOrders();
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  /*
  |--------------------------------------------------------------------------
  | HELPERS
  |--------------------------------------------------------------------------
  */

  function formatCurrency(
    value: number | string | null
  ) {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return "—";
    }

    const amount = Number(value);

    if (!Number.isFinite(amount)) {
      return "—";
    }

    return `$${amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  function formatDate(
    value: string | null
  ) {
    if (!value) return "—";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function formatStatus(
    value: string | null
  ) {
    if (!value) return "Unknown";

    return value
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
  }

  function getStatusClass(
    status: string | null
  ) {
    const normalized =
      String(status || "").toLowerCase();

    if (
      normalized === "pending" ||
      normalized === "pending_review"
    ) {
      return "bg-orange-50 text-orange-700";
    }

    if (
      normalized === "completed" ||
      normalized === "paid"
    ) {
      return "bg-green-50 text-green-700";
    }

    if (
      normalized === "in_progress" ||
      normalized === "in progress"
    ) {
      return "bg-blue-50 text-blue-700";
    }

    if (normalized === "submitted") {
      return "bg-purple-50 text-purple-700";
    }

    if (
      normalized === "cancelled" ||
      normalized === "canceled"
    ) {
      return "bg-red-50 text-red-700";
    }

    return "bg-slate-100 text-slate-600";
  }

  function getPricingClass(
    status: string | null
  ) {
    if (status === "pending_review") {
      return "bg-orange-50 text-orange-700";
    }

    if (
      status === "calculated" ||
      status === "priced"
    ) {
      return "bg-green-50 text-green-700";
    }

    return "bg-slate-100 text-slate-600";
  }

  function getOrderStatus(order: Order) {
    if (order.status) {
      return order.status;
    }

    if (
      order.pricing_status ===
      "pending_review"
    ) {
      return "pending";
    }

    return order.pricing_status || "submitted";
  }

  /*
  |--------------------------------------------------------------------------
  | COUNTS
  |--------------------------------------------------------------------------
  */

  const pendingReviewCount = orders.filter(
    (order) =>
      order.pricing_status ===
      "pending_review"
  ).length;

  const inProgressCount = orders.filter(
    (order) =>
      order.status === "in_progress"
  ).length;

  const completedCount = orders.filter(
    (order) =>
      order.status === "completed"
  ).length;

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
          onClick={() => setSidebarOpen(false)}
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

        <div className="flex h-[86px] items-center justify-between border-b border-slate-100 px-6">

          <a
            href="/admin"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
              <Package className="h-5 w-5 text-white" />
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
              active
            />

            <AdminNavItem
              href="/admin/users"
              label="Users"
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
                Orders
              </h1>

              <p className="hidden text-xs text-slate-500 sm:block">
                Manage and monitor all student orders
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => loadOrders(true)}
            disabled={refreshing}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
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

        <div className="p-5 md:p-8">

          {/* PAGE TITLE */}

          <div className="mb-6">

            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
              <ShoppingCart className="h-3.5 w-3.5" />
              Order Management
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              All Orders
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Review, filter and manage student orders.
            </p>

          </div>

          {/* STATISTICS */}

          <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <OrderStatCard
              title="Total Orders"
              value={totalOrders}
              icon={ShoppingCart}
              iconBg="bg-blue-50"
              iconColor="text-blue-600"
            />

            <OrderStatCard
              title="Pending Review"
              value={pendingReviewCount}
              icon={AlertCircle}
              iconBg="bg-orange-50"
              iconColor="text-orange-500"
            />

            <OrderStatCard
              title="In Progress"
              value={inProgressCount}
              icon={Clock3}
              iconBg="bg-purple-50"
              iconColor="text-purple-600"
            />

            <OrderStatCard
              title="Completed"
              value={completedCount}
              icon={CheckCircle2}
              iconBg="bg-green-50"
              iconColor="text-green-600"
            />

          </div>

          {/* ERROR */}

          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">

              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

              <div>
                <p className="font-semibold">
                  Unable to load orders
                </p>

                <p className="mt-0.5 text-xs">
                  {error}
                </p>
              </div>

            </div>
          )}

          {/* FILTERS */}

          <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">

            <div className="mb-4 flex items-center gap-2">

              <SlidersHorizontal className="h-4 w-4 text-blue-600" />

              <h3 className="text-sm font-bold text-slate-900">
                Filters
              </h3>

            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">

              {/* SEARCH */}

              <div className="relative xl:col-span-2">

                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search orders..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 text-sm outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />

              </div>

              {/* STATUS */}

              <div className="relative">

                <Filter className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <select
                  value={statusFilter}
                  onChange={(event) => {
                    setStatusFilter(
                      event.target.value
                    );
                    setPage(1);
                  }}
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-8 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                >

                  <option value="all">
                    All statuses
                  </option>

                  <option value="submitted">
                    Submitted
                  </option>

                  <option value="pending">
                    Pending
                  </option>

                  <option value="in_progress">
                    In Progress
                  </option>

                  <option value="completed">
                    Completed
                  </option>

                  <option value="cancelled">
                    Cancelled
                  </option>

                </select>

              </div>

              {/* PRICING */}

              <div className="relative">

                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                  $
                </span>

                <select
                  value={pricingFilter}
                  onChange={(event) => {
                    setPricingFilter(
                      event.target.value
                    );
                    setPage(1);
                  }}
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-8 text-sm font-medium text-slate-700 outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                >

                  <option value="all">
                    All pricing
                  </option>

                  <option value="pending_review">
                    Needs Review
                  </option>

                  <option value="calculated">
                    Calculated
                  </option>

                  <option value="priced">
                    Priced
                  </option>

                </select>

              </div>

            </div>

            {/* SORT */}

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">

              <p className="text-xs text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-700">
                  {orders.length}
                </span>{" "}
                orders
              </p>

              <button
                type="button"
                onClick={() =>
                  setSortDirection(
                    (current) =>
                      current === "desc"
                        ? "asc"
                        : "desc"
                  )
                }
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >

                {sortDirection === "desc" ? (
                  <ArrowDown className="h-3.5 w-3.5" />
                ) : (
                  <ArrowUp className="h-3.5 w-3.5" />
                )}

                {sortDirection === "desc"
                  ? "Newest first"
                  : "Oldest first"}

              </button>

            </div>

          </section>

          {/* TABLE */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-5 py-4 md:px-6">

              <h3 className="font-bold text-slate-900">
                Orders
              </h3>

              <p className="mt-0.5 text-xs text-slate-500">
                Review order details and take action.
              </p>

            </div>

            {loading ? (

              <div className="flex min-h-[320px] flex-col items-center justify-center">

                <Loader2 className="h-7 w-7 animate-spin text-blue-600" />

                <p className="mt-3 text-sm font-medium text-slate-600">
                  Loading orders...
                </p>

              </div>

            ) : orders.length === 0 ? (

              <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">

                  <ShoppingCart className="h-6 w-6 text-slate-400" />

                </div>

                <h3 className="mt-4 text-sm font-bold text-slate-800">
                  No orders found
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Try changing your search or filters.
                </p>

              </div>

            ) : (

              <>
                <div className="overflow-x-auto">

                  <table className="w-full min-w-[1000px]">

                    <thead>

                      <tr className="border-b border-slate-100 bg-slate-50/70">

                        <TableHeader>
                          Order
                        </TableHeader>

                        <TableHeader>
                          Student
                        </TableHeader>

                        <TableHeader>
                          Assignment
                        </TableHeader>

                        <TableHeader>
                          Deadline
                        </TableHeader>

                        <TableHeader>
                          Amount
                        </TableHeader>

                        <TableHeader>
                          Pricing
                        </TableHeader>

                        <TableHeader>
                          Status
                        </TableHeader>

                        <TableHeader>
                          Action
                        </TableHeader>

                      </tr>

                    </thead>

                    <tbody>

                      {orders.map((order) => {

                        const status =
                          getOrderStatus(order);

                        return (

                          <tr
                            key={order.id}
                            className="border-b border-slate-100 hover:bg-slate-50/60"
                          >

                            {/* ORDER */}

                            <td className="px-5 py-5">

                              <p className="text-sm font-bold text-slate-800">
                                #{order.id}
                              </p>

                              <p className="mt-1 text-[11px] text-slate-400">
                                {formatDate(
                                  order.created_at
                                )}
                              </p>

                            </td>

                            {/* STUDENT */}

                            <td className="px-5 py-5">

                              <div className="flex items-center gap-2.5">

                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">

                                  <User className="h-4 w-4 text-blue-600" />

                                </div>

                                <div>

                                  <p className="text-sm font-semibold text-slate-700">
                                    User #{order.user_id}
                                  </p>

                                  <p className="text-[11px] text-slate-400">
                                    Student
                                  </p>

                                </div>

                              </div>

                            </td>

                            {/* ASSIGNMENT */}

                            <td className="max-w-[250px] px-5 py-5">

                              <p className="truncate text-sm font-semibold text-slate-800">
                                {order.title ||
                                  "Untitled Order"}
                              </p>

                              <p className="mt-1 truncate text-xs text-slate-500">
                                {order.subject ||
                                  "No subject"}
                              </p>

                              {order.service_type && (
                                <p className="mt-1 text-[11px] text-slate-400">
                                  {order.service_type}
                                  {order.pages
                                    ? ` • ${order.pages} pages`
                                    : ""}
                                </p>
                              )}

                            </td>

                            {/* DEADLINE */}

                            <td className="px-5 py-5">

                              <div className="flex items-center gap-2">

                                <Clock3 className="h-4 w-4 text-slate-400" />

                                <span className="text-sm text-slate-700">
                                  {formatDate(
                                    order.deadline
                                  )}
                                </span>

                              </div>

                            </td>

                            {/* AMOUNT */}

                            <td className="px-5 py-5">

                              <p className="text-sm font-bold text-slate-800">
                                {formatCurrency(
                                  order.budget
                                )}
                              </p>

                              <p className="mt-1 text-[11px] text-slate-400">
                                {order.payment_status ||
                                  "Payment pending"}
                              </p>

                            </td>

                            {/* PRICING */}

                            <td className="px-5 py-5">

                              <span
                                className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${getPricingClass(
                                  order.pricing_status
                                )}`}
                              >
                                {formatStatus(
                                  order.pricing_status
                                )}
                              </span>

                            </td>

                            {/* STATUS */}

                            <td className="px-5 py-5">

                              <span
                                className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusClass(
                                  status
                                )}`}
                              >
                                {formatStatus(
                                  status
                                )}
                              </span>

                            </td>

                            {/* VIEW */}

                            <td className="px-5 py-5">

                              <a
                                href={`/admin/orders/${order.id}`}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                              >

                                <Eye className="h-3.5 w-3.5" />

                                View

                              </a>

                            </td>

                          </tr>

                        );

                      })}

                    </tbody>

                  </table>

                </div>

                {/* PAGINATION */}

                <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4 md:px-6">

                  <p className="text-xs text-slate-500">
                    Page{" "}
                    <span className="font-semibold text-slate-700">
                      {page}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-slate-700">
                      {totalPages}
                    </span>
                  </p>

                  <div className="flex gap-2">

                    <button
                      type="button"
                      disabled={page <= 1}
                      onClick={() =>
                        setPage((current) =>
                          Math.max(
                            1,
                            current - 1
                          )
                        )
                      }
                      className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >

                      <ChevronLeft className="h-4 w-4" />

                      Previous

                    </button>

                    <button
                      type="button"
                      disabled={
                        page >= totalPages
                      }
                      onClick={() =>
                        setPage((current) =>
                          Math.min(
                            totalPages,
                            current + 1
                          )
                        )
                      }
                      className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
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
| NAVIGATION ITEM
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

function OrderStatCard({
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