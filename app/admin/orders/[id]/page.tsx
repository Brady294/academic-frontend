"use client";

import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Loader2,
  Menu,
  MessageSquare,
  Package,
  RefreshCw,
  User,
  X,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Order = {
  id: number;
  user_id: number;

  title: string;
  subject: string;
  service_type: string;
  academic_level: string;

  pages: number;
  spacing: string;
  citation_style: string | null;

  deadline: string;
  instructions: string | null;

  budget: number | string;

  status: string;
  pricing_status: string;

  assigned_admin_id: number | null;

  client_timezone: string | null;

  created_at: string;
  updated_at: string;
};

type OrderResponse = {
  success: boolean;
  order: Order;
};

type AdminUser = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

const ORDER_STATUSES = [
  "Pending",
  "In Progress",
  "Completed",
  "Cancelled",
];

export default function AdminOrderDetailsPage() {
  const params = useParams();

  const orderId = params?.id;

  const [order, setOrder] =
    useState<Order | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [updatingStatus, setUpdatingStatus] =
    useState(false);

  const [assigningAdmin, setAssigningAdmin] =
    useState(false);

  const [admins, setAdmins] =
    useState<AdminUser[]>([]);

  const [actionMessage, setActionMessage] =
    useState<string | null>(null);

  const [actionError, setActionError] =
    useState<string | null>(null);

  useEffect(() => {
    if (!orderId) return;

    loadOrder();
    loadAdmins();
  }, [orderId]);

  /*
  |--------------------------------------------------------------------------
  | LOAD ORDER
  |--------------------------------------------------------------------------
  */

  async function loadOrder(
    showRefresh = false
  ) {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError(null);

      const response = await fetch(
        `${API_URL}/api/admin/orders/${orderId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to load order."
        );
      }

      const result =
        data as OrderResponse;

      setOrder(result.order);
    } catch (err) {
      console.error(
        "ADMIN ORDER DETAILS ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load order."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | LOAD ADMINISTRATORS
  |--------------------------------------------------------------------------
  */

  async function loadAdmins() {
    try {
      const response = await fetch(
        `${API_URL}/api/admin/order-actions/admins`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to load administrators."
        );
      }

      setAdmins(data.admins || []);
    } catch (err) {
      console.error(
        "LOAD ADMINS ERROR:",
        err
      );
    }
  }

  /*
  |--------------------------------------------------------------------------
  | UPDATE STATUS
  |--------------------------------------------------------------------------
  */

  async function updateStatus(
    newStatus: string
  ) {
    if (!order) return;

    if (
      !ORDER_STATUSES.includes(
        newStatus
      )
    ) {
      setActionError(
        "Invalid order status."
      );

      return;
    }

    if (newStatus === order.status) {
      return;
    }

    try {
      setUpdatingStatus(true);

      setActionMessage(null);
      setActionError(null);

      const response = await fetch(
        `${API_URL}/api/admin/order-actions/${order.id}/status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to update order status."
        );
      }

      setOrder((current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,
          status:
            data.order?.status ||
            newStatus,

          updated_at:
            data.order?.updated_at ||
            current.updated_at,
        };
      });

      setActionMessage(
        "Order status updated successfully."
      );
    } catch (err) {
      console.error(
        "UPDATE STATUS ERROR:",
        err
      );

      setActionError(
        err instanceof Error
          ? err.message
          : "Failed to update order status."
      );
    } finally {
      setUpdatingStatus(false);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | ASSIGN ADMIN
  |--------------------------------------------------------------------------
  */

  async function assignAdmin(
    adminId: string
  ) {
    if (!order) return;

    try {
      setAssigningAdmin(true);

      setActionMessage(null);
      setActionError(null);

      const parsedAdminId =
        adminId === ""
          ? null
          : Number(adminId);

      if (
        parsedAdminId !== null &&
        !Number.isInteger(
          parsedAdminId
        )
      ) {
        throw new Error(
          "Invalid administrator ID."
        );
      }

      const response = await fetch(
        `${API_URL}/api/admin/order-actions/${order.id}/assign`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            admin_id: parsedAdminId,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to assign administrator."
        );
      }

      setOrder((current) => {
        if (!current) {
          return current;
        }

        return {
          ...current,

          assigned_admin_id:
            data.order
              ?.assigned_admin_id ??
            parsedAdminId,

          updated_at:
            data.order?.updated_at ||
            current.updated_at,
        };
      });

      setActionMessage(
        parsedAdminId === null
          ? "Order unassigned successfully."
          : "Order assigned successfully."
      );
    } catch (err) {
      console.error(
        "ASSIGN ADMIN ERROR:",
        err
      );

      setActionError(
        err instanceof Error
          ? err.message
          : "Failed to assign administrator."
      );
    } finally {
      setAssigningAdmin(false);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | FORMAT DATE
  |--------------------------------------------------------------------------
  */

  function formatDate(
    value: string | null
  ) {
    if (!value) return "—";

    const date = new Date(value);

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

  /*
  |--------------------------------------------------------------------------
  | FORMAT DATE/TIME
  |--------------------------------------------------------------------------
  */

  function formatDateTime(
    value: string | null
  ) {
    if (!value) return "—";

    const date = new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "—";
    }

    return date.toLocaleString(
      undefined,
      {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }
    );
  }

  /*
  |--------------------------------------------------------------------------
  | FORMAT CURRENCY
  |--------------------------------------------------------------------------
  */

  function formatCurrency(
    value:
      | number
      | string
      | null
      | undefined
  ) {
    if (
      value === null ||
      value === undefined
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

  /*
  |--------------------------------------------------------------------------
  | FORMAT LABEL
  |--------------------------------------------------------------------------
  */

  function formatLabel(
    value:
      | string
      | null
      | undefined
  ) {
    if (!value) return "—";

    return value
      .replace(/_/g, " ")
      .replace(
        /\b\w/g,
        (char) =>
          char.toUpperCase()
      );
  }

  /*
  |--------------------------------------------------------------------------
  | STATUS CLASS
  |--------------------------------------------------------------------------
  */

  function getStatusClass(
    status: string
  ) {
    const normalized =
      status.toLowerCase();

    if (
      normalized === "pending"
    ) {
      return "bg-orange-50 text-orange-700";
    }

    if (
      normalized === "in progress" ||
      normalized === "in_progress"
    ) {
      return "bg-blue-50 text-blue-700";
    }

    if (
      normalized === "completed"
    ) {
      return "bg-green-50 text-green-700";
    }

    if (
      normalized === "cancelled" ||
      normalized === "canceled"
    ) {
      return "bg-red-50 text-red-700";
    }

    return "bg-slate-100 text-slate-600";
  }

  /*
  |--------------------------------------------------------------------------
  | PRICING CLASS
  |--------------------------------------------------------------------------
  */

  function getPricingClass(
    status: string
  ) {
    if (
      status ===
      "pending_review"
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
  | ADMIN NAME
  |--------------------------------------------------------------------------
  */

  function getAdminName(
    adminId: number | null
  ) {
    if (!adminId) {
      return "Unassigned";
    }

    const adminUser =
      admins.find(
        (item) =>
          item.id === adminId
      );

    if (!adminUser) {
      return `Admin #${adminId}`;
    }

    const name = [
      adminUser.first_name,
      adminUser.last_name,
    ]
      .filter(Boolean)
      .join(" ");

    return name || adminUser.email;
  }

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f6f9fd]">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600" />

          <p className="mt-4 text-sm font-semibold text-slate-700">
            Loading order...
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Retrieving order information
          </p>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | ERROR
  |--------------------------------------------------------------------------
  */

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#f6f9fd]">
        <div className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-6">
          <div className="w-full rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <X className="h-6 w-6 text-red-500" />
            </div>

            <h1 className="mt-5 text-lg font-bold text-slate-900">
              Unable to load order
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {error ||
                "The requested order could not be found."}
            </p>

            <div className="mt-6 flex justify-center gap-3">
              <a
                href="/admin/orders"
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Back to Orders
              </a>

              <button
                type="button"
                onClick={() =>
                  loadOrder()
                }
                className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f9fd] text-slate-900">
      {/* ================================================================
          MOBILE OVERLAY
      ================================================================= */}

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

      {/* ================================================================
          SIDEBAR
      ================================================================= */}

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
              <div className="text-[19px] font-extrabold tracking-tight">
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

      {/* ================================================================
          MAIN
      ================================================================= */}

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
              <div className="flex items-center gap-2">
                <a
                  href="/admin/orders"
                  className="text-sm font-medium text-slate-400 hover:text-blue-600"
                >
                  Orders
                </a>

                <span className="text-slate-300">
                  /
                </span>

                <span className="text-sm font-semibold text-slate-700">
                  #{order.id}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              loadOrder(true)
            }
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
          {/* Back */}

          <a
            href="/admin/orders"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </a>

          {/* ============================================================
              ORDER HEADER
          ============================================================= */}

          <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
            <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-blue-600">
                    ORDER #{order.id}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {formatLabel(
                      order.status
                    )}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold ${getPricingClass(
                      order.pricing_status
                    )}`}
                  >
                    Pricing:{" "}
                    {formatLabel(
                      order.pricing_status
                    )}
                  </span>
                </div>

                <h1 className="max-w-3xl text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl">
                  {order.title}
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                  {order.subject}
                </p>

                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                  <span>
                    Created{" "}
                    <strong className="text-slate-700">
                      {formatDateTime(
                        order.created_at
                      )}
                    </strong>
                  </span>

                  <span>
                    Updated{" "}
                    <strong className="text-slate-700">
                      {formatDateTime(
                        order.updated_at
                      )}
                    </strong>
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5 lg:min-w-[190px]">
                <p className="text-xs font-medium text-slate-500">
                  Current Budget
                </p>

                <p className="mt-1 text-3xl font-extrabold tracking-tight text-slate-900">
                  {formatCurrency(
                    order.budget
                  )}
                </p>

                <p className="mt-1 text-[11px] text-slate-400">
                  Order budget
                </p>
              </div>
            </div>
          </section>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
            {/* ==========================================================
                LEFT COLUMN
            =========================================================== */}

            <div className="space-y-6">
              {/* Assignment information */}

              <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <SectionHeader
                  icon={FileText}
                  title="Assignment Details"
                />

                <div className="grid gap-px bg-slate-100 sm:grid-cols-2 lg:grid-cols-3">
                  <InfoItem
                    label="Service"
                    value={order.service_type}
                  />

                  <InfoItem
                    label="Academic Level"
                    value={order.academic_level}
                  />

                  <InfoItem
                    label="Pages"
                    value={`${order.pages} pages`}
                  />

                  <InfoItem
                    label="Spacing"
                    value={order.spacing}
                  />

                  <InfoItem
                    label="Citation Style"
                    value={
                      order.citation_style ||
                      "Not specified"
                    }
                  />

                  <InfoItem
                    label="Order ID"
                    value={`#${order.id}`}
                  />
                </div>
              </section>

              {/* Deadline */}

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-50">
                    <CalendarDays className="h-5 w-5 text-orange-500" />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Deadline
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {formatDateTime(
                        order.deadline
                      )}
                    </p>

                    {order.client_timezone && (
                      <p className="mt-1 text-xs text-slate-400">
                        Client timezone:{" "}
                        {order.client_timezone}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              {/* Instructions */}

              <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <SectionHeader
                  icon={MessageSquare}
                  title="Student Instructions"
                />

                <div className="p-5 md:p-6">
                  {order.instructions ? (
                    <div className="whitespace-pre-wrap rounded-xl bg-slate-50 p-5 text-sm leading-7 text-slate-700">
                      {order.instructions}
                    </div>
                  ) : (
                    <div className="rounded-xl bg-slate-50 p-5 text-sm text-slate-400">
                      No additional instructions were provided.
                    </div>
                  )}
                </div>
              </section>

              {/* Files */}

              <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <SectionHeader
                  icon={FileText}
                  title="Order Files"
                />

                <div className="p-5 md:p-6">
                  <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                    <FileText className="mx-auto h-7 w-7 text-slate-300" />

                    <p className="mt-3 text-sm font-semibold text-slate-700">
                      File management will appear here
                    </p>

                    <p className="mx-auto mt-1 max-w-md text-xs leading-5 text-slate-400">
                      We will connect this section to the existing upload and download system separately.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* ==========================================================
                RIGHT COLUMN
            =========================================================== */}

            <aside className="space-y-6">
              {/* Student */}

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-sm font-bold text-slate-900">
                  Student
                </h2>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      User #{order.user_id}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      Student account
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-4">
                  <InfoRow
                    label="User ID"
                    value={String(
                      order.user_id
                    )}
                  />

                  <InfoRow
                    label="Timezone"
                    value={
                      order.client_timezone ||
                      "Not provided"
                    }
                  />
                </div>
              </section>

              {/* Order status */}

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-sm font-bold text-slate-900">
                  Order Status
                </h2>

                <div className="mt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                      <Clock3 className="h-5 w-5 text-blue-600" />
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">
                        Current status
                      </p>

                      <span
                        className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${getStatusClass(
                          order.status
                        )}`}
                      >
                        {formatLabel(
                          order.status
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-4">
                  <InfoRow
                    label="Pricing"
                    value={formatLabel(
                      order.pricing_status
                    )}
                  />

                  <InfoRow
                    label="Assigned Admin"
                    value={getAdminName(
                      order.assigned_admin_id
                    )}
                  />
                </div>
              </section>

              {/* ========================================================
                  QUICK ACTIONS
              ========================================================= */}

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-sm font-bold text-slate-900">
                  Quick Actions
                </h2>

                {/* Success */}

                {actionMessage && (
                  <div
                    role="status"
                    className="mt-4 flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-xs font-medium text-green-700"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />

                    <span>
                      {actionMessage}
                    </span>
                  </div>
                )}

                {/* Error */}

                {actionError && (
                  <div
                    role="alert"
                    className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700"
                  >
                    <X className="mt-0.5 h-4 w-4 shrink-0" />

                    <span>
                      {actionError}
                    </span>
                  </div>
                )}

                {/* ======================================================
                    UPDATE STATUS
                ======================================================= */}

                <div className="mt-5">
                  <label
                    htmlFor="order-status"
                    className="mb-2 block text-xs font-semibold text-slate-500"
                  >
                    Update Status
                  </label>

                  <div className="relative">
                    <select
                      id="order-status"
                      value={order.status}
                      disabled={
                        updatingStatus
                      }
                      onChange={(event) =>
                        updateStatus(
                          event.target.value
                        )
                      }
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                    >
                      {ORDER_STATUSES.map(
                        (status) => (
                          <option
                            key={status}
                            value={status}
                          >
                            {status}
                          </option>
                        )
                      )}
                    </select>

                    {updatingStatus && (
                      <Loader2 className="absolute right-3 top-3.5 h-4 w-4 animate-spin text-blue-600" />
                    )}
                  </div>
                </div>

                {/* ======================================================
                    ASSIGN ADMIN
                ======================================================= */}

                <div className="mt-5">
                  <label
                    htmlFor="assigned-admin"
                    className="mb-2 block text-xs font-semibold text-slate-500"
                  >
                    Assign Administrator
                  </label>

                  <div className="relative">
                    <select
                      id="assigned-admin"
                      value={
                        order.assigned_admin_id ??
                        ""
                      }
                      disabled={
                        assigningAdmin
                      }
                      onChange={(event) =>
                        assignAdmin(
                          event.target.value
                        )
                      }
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm font-semibold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-50"
                    >
                      <option value="">
                        Unassigned
                      </option>

                      {admins.map(
                        (adminUser) => {
                          const name = [
                            adminUser.first_name,
                            adminUser.last_name,
                          ]
                            .filter(Boolean)
                            .join(" ");

                          return (
                            <option
                              key={
                                adminUser.id
                              }
                              value={
                                adminUser.id
                              }
                            >
                              {name ||
                                adminUser.email}
                            </option>
                          );
                        }
                      )}
                    </select>

                    {assigningAdmin && (
                      <Loader2 className="absolute right-3 top-3.5 h-4 w-4 animate-spin text-blue-600" />
                    )}
                  </div>

                  {admins.length === 0 && (
                    <p className="mt-2 text-[11px] text-slate-400">
                      No administrators available.
                    </p>
                  )}
                </div>

                {/* ======================================================
                    MESSAGE STUDENT
                ======================================================= */}

                <button
                  type="button"
                  disabled
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-500 opacity-50"
                >
                  <MessageSquare className="h-4 w-4" />
                  Message Student
                </button>

                <p className="mt-3 text-center text-[10px] leading-4 text-slate-400">
                  Status changes and administrator assignment are connected to the admin API.
                </p>
              </section>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ==========================================================================
   NAVIGATION
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
        <span className="ml-auto text-xs text-blue-100">
          →
        </span>
      )}
    </a>
  );
}

/* ==========================================================================
   SECTION HEADER
============================================================================ */

function SectionHeader({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 md:px-6">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
        <Icon className="h-4 w-4 text-blue-600" />
      </div>

      <h2 className="text-sm font-bold text-slate-900">
        {title}
      </h2>
    </div>
  );
}

/* ==========================================================================
   INFO ITEM
============================================================================ */

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white p-5">
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1.5 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

/* ==========================================================================
   INFO ROW
============================================================================ */

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <span className="text-xs text-slate-400">
        {label}
      </span>

      <span className="text-right text-xs font-semibold text-slate-700">
        {value}
      </span>
    </div>
  );
}