"use client";

import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CalendarDays,
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

import { useEffect, useMemo, useState } from "react";

type Order = {
  id: number;
  user_id: number;

  title: string;
  subject: string;
  service_type: string | null;
  academic_level: string | null;

  pages: number | null;
  spacing: string | null;
  citation_style: string | null;

  deadline: string | null;
  created_at: string;

  budget: number | string | null;

  pricing_status: string | null;

  payment_status: string | null;

  status?: string | null;

  client_timezone?: string | null;
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
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

const PAGE_SIZE = 10;

export default function AdminOrdersPage() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [pricingFilter, setPricingFilter] =
    useState("all");

  const [sortDirection, setSortDirection] =
    useState<"desc" | "asc">("desc");

  const [page, setPage] = useState(1);

  const [totalOrders, setTotalOrders] =
    useState(0);

  const [totalPages, setTotalPages] =
    useState(1);

  /*
  |--------------------------------------------------------------------------
  | Load orders
  |--------------------------------------------------------------------------
  */

  async function loadOrders(
    showRefresh = false
  ) {
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

      if (search.trim()) {
        params.set(
          "search",
          search.trim()
        );
      }

      if (statusFilter !== "all") {
        params.set(
          "status",
          statusFilter
        );
      }

      if (pricingFilter !== "all") {
        params.set(
          "pricing_status",
          pricingFilter
        );
      }

      params.set(
        "sort",
        sortDirection
      );

      const response = await fetch(
        `${API_URL}/api/admin/orders?${params.toString()}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      let data:
        | OrdersResponse
        | {
            error?: string;
            message?: string;
          }
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
          ("error" in data ||
            "message" in data)
            ? String(
                "error" in data
                  ? data.error
                  : data.message
              )
            : `Failed to load orders (${response.status})`;

        throw new Error(message);
      }

      const result =
        data as OrdersResponse;

      setOrders(result.orders || []);

      setTotalOrders(
        result.pagination?.total ??
          result.orders?.length ??
          0
      );

      setTotalPages(
        result.pagination?.totalPages ??
          1
      );
    } catch (err) {
      console.error(
        "ADMIN ORDERS ERROR:",
        err
      );

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
  | Initial / filter loading
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
  | Search debounce
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      loadOrders();
    }, 450);

    return () => clearTimeout(timer);
  }, [search]);

  /*
  |--------------------------------------------------------------------------
  | Helpers
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

    return `$${amount.toLocaleString(
      undefined,
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    )}`;
  }

  function formatDate(
    value: string | null
  ) {
    if (!value) return "—";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
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

  function formatStatus(
    status: string | null | undefined
  ) {
    if (!status) {
      return "Unknown";
    }

    return status
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
  }

  function getOrderStatus(
    order: Order
  ) {
    if (order.status) {
      return order.status;
    }

    if (
      order.pricing_status ===
      "pending_review"
    ) {
      return "pending";
    }

    if (
      order.payment_status ===
      "fully_paid"
    ) {
      return "paid";
    }

    return (
      order.pricing_status ||
      "submitted"
    );
  }

  function getStatusClass(
    status: string | null | undefined
  ) {
    const normalized =
      String(status || "").toLowerCase();

    if (
      normalized ===
        "pending_review" ||
      normalized === "pending"
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

    if (
      normalized === "submitted"
    ) {
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
    if (
      status === "pending_review"
    ) {
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

  /*
  |--------------------------------------------------------------------------
  | Client-side safety sorting
  |--------------------------------------------------------------------------
  */

  const visibleOrders =
    useMemo(() => {
      return [...orders].sort(
        (a, b) => {
          const first =
            new Date(
              a.created_at
            ).getTime();

          const second =
            new Date(
              b.created_at
            ).getTime();

          return sortDirection ===
            "desc"
            ? second - first
            : first - second;
        }
      );
    }, [orders, sortDirection]);

  /*
  |--------------------------------------------------------------------------
  | Statistics
  |--------------------------------------------------------------------------
  */

  const pendingReviewCount =
    orders.filter(
      (order) =>
        order.pricing_status ===
        "pending_review"
    ).length;

  const inProgressCount =
    orders.filter(
      (order) =>
        order.status ===
          "in_progress" ||
        order.pricing_status ===
          "in_progress"
    ).length;

  const completedCount =
    orders.filter(
      (order) =>
        order.status ===
          "completed" ||
        order.pricing_status ===
          "completed"
    ).length;

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-[#f6f9fd] text-slate-900">
      {/* Mobile overlay */}
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

      {/* =========================
          SIDEBAR
      ========================== */}

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
              <ShoppingCart className="h-5 w-5 text-white" />
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

        <div className="border-t border-slate-100 p-4">
          <div className="rounded-xl bg-slate-50 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <User className="h-5 w-5 text-blue-600" />
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

      {/* =========================
          MAIN
      ========================== */}

      <main className="min-h-screen lg:ml-[270px]">
        {/* Header */}
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
            onClick={() =>
              loadOrders(true)
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

        <div className="p-5 md:p-8">
          {/* Page heading */}
          <div className="mb-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                  <Package className="h-3.5 w-3.5" />
                  Order Management
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  All Orders
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Review, filter and manage student orders.
                </p>
              </div>
            </div>
          </div>

          {/* Statistics */}
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

          {/* Error */}
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

          {/* Filters */}
          <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
            <div className="mb-4 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-blue-600" />

              <h3 className="text-sm font-bold text-slate-900">
                Filters
              </h3>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {/* Search */}
              <div className="relative xl:col-span-2">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search by order, title, subject or user ID..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Status */}
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

              {/* Pricing */}
              <div className="relative">
                <DollarIcon />

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

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <p className="text-xs text-slate-500">
                Showing{" "}
                <span className="font-semibold text-slate-700">
                  {visibleOrders.length}
                </span>{" "}
                orders on this page
              </p>

              <button
                type="button"
                onClick={() =>
                  setSortDirection(
                    (current) =>
                      current ===
                      "desc"
                        ? "asc"
                        : "desc"
                  )
                }
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                {sortDirection ===
                "desc" ? (
                  <ArrowDown className="h-3.5 w-3.5" />
                ) : (
                  <ArrowUp className="h-3.5 w-3.5" />
                )}

                Newest first
              </button>
            </div>
          </section>

          {/* Orders table */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 md:px-6">
              <div>
                <h3 className="font-bold text-slate-900">
                  Orders
                </h3>

                <p className="mt-0.5 text-xs text-slate-500">
                  Review order details and take action.
                </p>
              </div>

              <div className="hidden items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500 sm:flex">
                <CalendarDays className="h-3.5 w-3.5" />
                {totalOrders} total
              </div>
            </div>

            {loading ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center">
                <Loader2 className="h-7 w-7 animate-spin text-blue-600" />

                <p className="mt-3 text-sm font-medium text-slate-600">
                  Loading orders...
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Fetching the latest order data
                </p>
              </div>
            ) : visibleOrders.length === 0 ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">
                  <ShoppingCart className="h-6 w-6 text-slate-400" />
                </div>

                <h3 className="mt-4 text-sm font-bold text-slate-800">
                  No orders found
                </h3>

                <p className="mt-1 max-w-sm text-xs leading-5 text-slate-400">
                  Try changing your search or filters.
                </p>

                {(search ||
                  statusFilter !==
                    "all" ||
                  pricingFilter !==
                    "all") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setStatusFilter(
                        "all"
                      );
                      setPricingFilter(
                        "all"
                      );
                      setPage(1);
                    }}
                    className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1050px]">
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
                      {visibleOrders.map(
                        (order) => {
                          const status =
                            getOrderStatus(
                              order
                            );

                          return (
                            <tr
                              key={order.id}
                              className="border-b border-slate-100 transition hover:bg-slate-50/60"
                            >
                              {/* Order */}
                              <td className="px-5 py-5">
                                <div>
                                  <p className="text-sm font-bold text-slate-800">
                                    #
                                    {order.id}
                                  </p>

                                  <p className="mt-1 text-[11px] text-slate-400">
                                    {formatDate(
                                      order.created_at
                                    )}
                                  </p>
                                </div>
                              </td>

                              {/* Student */}
                              <td className="px-5 py-5">
                                <div className="flex items-center gap-2.5">
                                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50">
                                    <User className="h-4 w-4 text-blue-600" />
                                  </div>

                                  <div>
                                    <p className="text-sm font-semibold text-slate-700">
                                      User #
                                      {
                                        order.user_id
                                      }
                                    </p>

                                    <p className="mt-0.5 text-[11px] text-slate-400">
                                      Student
                                    </p>
                                  </div>
                                </div>
                              </td>

                              {/* Assignment */}
                              <td className="max-w-[250px] px-5 py-5">
                                <p className="truncate text-sm font-semibold text-slate-800">
                                  {order.title ||
                                    "Untitled Order"}
                                </p>

                                <p className="mt-1 truncate text-xs text-slate-500">
                                  {order.subject ||
                                    "No subject"}
                                </p>

                                <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-400">
                                  {order.service_type && (
                                    <span>
                                      {
                                        order.service_type
                                      }
                                    </span>
                                  )}

                                  {order.pages && (
                                    <>
                                      <span>
                                        •
                                      </span>

                                      <span>
                                        {
                                          order.pages
                                        }{" "}
                                        pages
                                      </span>
                                    </>
                                  )}
                                </div>
                              </td>

                              {/* Deadline */}
                              <td className="px-5 py-5">
                                <div className="flex items-center gap-2">
                                  <Clock3 className="h-4 w-4 text-slate-400" />

                                  <div>
                                    <p className="text-sm font-medium text-slate-700">
                                      {formatDate(
                                        order.deadline
                                      )}
                                    </p>

                                    {order.client_timezone && (
                                      <p className="mt-0.5 text-[10px] text-slate-400">
                                        {
                                          order.client_timezone
                                        }
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </td>

                              {/* Amount */}
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

                              {/* Pricing */}
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

                              {/* Status */}
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

                              {/* Action */}
                              <td className="px-5 py-5">
                                <a
                                  href={`/admin/orders/${order.id}`}
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                  View
                                </a>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
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

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={page <= 1}
                      onClick={() =>
                        setPage(
                          (current) =>
                            Math.max(
                              1,
                              current -
                                1
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
                              current +
                                1
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

/* ==========================================================================
   NAV ITEM
============================================================================ */

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

/* ==========================================================================
   STAT CARD
============================================================================ */

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

/* ==========================================================================
   TABLE HEADER
============================================================================ */

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

/* ==========================================================================
   DOLLAR ICON
============================================================================ */

function DollarIcon() {
  return (
    <span className="pointer-events-none absolute left-3 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center text-xs font-bold text-slate-400">
      $
    </span>
  );
}