"use client";

import {
  BarChart3,
  Bell,
  BookOpen,
  ChevronRight,
  Clock3,
  DollarSign,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Package,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Star,
  Users,
  X,
} from "lucide-react";

import Link from "next/link";

import { useEffect, useState } from "react";

import {
  getAdminDashboard,
  AdminDashboardStatistics,
  AdminRecentOrder,
} from "@/services/adminService";

import { useAuth } from "@/hooks/useAuth";


/*
|--------------------------------------------------------------------------
| ADMIN DASHBOARD PAGE
|--------------------------------------------------------------------------
*/

export default function AdminDashboardPage() {
  /*
  |--------------------------------------------------------------------------
  | AUTH
  |--------------------------------------------------------------------------
  */

  const { logout } = useAuth();

  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [statistics, setStatistics] =
    useState<AdminDashboardStatistics>({
      totalOrders: 0,
      pendingOrders: 0,
      inProgressOrders: 0,
      completedOrders: 0,
      totalRevenue: 0,
      students: 0,
      unreadMessages: 0,
    });

  const [recentOrders, setRecentOrders] =
    useState<AdminRecentOrder[]>([]);


  /*
  |--------------------------------------------------------------------------
  | LOAD DASHBOARD
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let mounted = true;

    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const response =
          await getAdminDashboard();

        if (!mounted) return;

        setStatistics(
          response.statistics
        );

        setRecentOrders(
          response.recentOrders || []
        );
      } catch (err: any) {
        console.error(
          "Failed to load admin dashboard:",
          err
        );

        if (!mounted) return;

        setError(
          err?.response?.data?.error ||
            err?.message ||
            "Failed to load admin dashboard."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);


  /*
  |--------------------------------------------------------------------------
  | SIGN OUT
  |--------------------------------------------------------------------------
  */

  const handleLogout = async () => {
    await logout();
  };


  /*
  |--------------------------------------------------------------------------
  | FORMAT CURRENCY
  |--------------------------------------------------------------------------
  */

  const formatCurrency = (
    value: number
  ) => {
    return new Intl.NumberFormat(
      "en-US",
      {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }
    ).format(value);
  };


  /*
  |--------------------------------------------------------------------------
  | FORMAT DATE
  |--------------------------------------------------------------------------
  */

  const formatDate = (
    date: string | null
  ) => {
    if (!date) {
      return "—";
    }

    const parsedDate =
      new Date(date);

    if (Number.isNaN(
      parsedDate.getTime()
    )) {
      return "—";
    }

    return parsedDate.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };


  /*
  |--------------------------------------------------------------------------
  | STATUS STYLING
  |--------------------------------------------------------------------------
  */

  const getStatusClasses = (
    status: string | null
  ) => {
    const normalized =
      String(status || "")
        .trim()
        .toLowerCase();

    switch (normalized) {
      case "pending":
        return "bg-orange-50 text-orange-600";

      case "in progress":
        return "bg-blue-50 text-blue-600";

      case "completed":
        return "bg-green-50 text-green-600";

      case "cancelled":
      case "canceled":
        return "bg-red-50 text-red-600";

      default:
        return "bg-slate-100 text-slate-500";
    }
  };


  /*
  |--------------------------------------------------------------------------
  | STATISTICS CARDS
  |--------------------------------------------------------------------------
  */

  const stats = [
    {
      title: "Total Orders",
      value: loading
        ? "..."
        : statistics.totalOrders.toLocaleString(),
      description: "All orders",
      icon: ShoppingCart,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },

    {
      title: "Pending Orders",
      value: loading
        ? "..."
        : statistics.pendingOrders.toLocaleString(),
      description: "Need attention",
      icon: Clock3,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },

    {
      title: "Total Revenue",
      value: loading
        ? "..."
        : formatCurrency(
            statistics.totalRevenue
          ),
      description: "All-time revenue",
      icon: DollarSign,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },

    {
      title: "Students",
      value: loading
        ? "..."
        : statistics.students.toLocaleString(),
      description: "Registered students",
      icon: Users,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];


  /*
  |--------------------------------------------------------------------------
  | QUICK ACTIONS
  |--------------------------------------------------------------------------
  */

  const quickActions = [
    {
      title: "Manage Orders",
      description:
        "View and manage student orders",
      icon: Package,
      href: "/admin/orders",
    },

    {
      title: "Manage Users",
      description:
        "View students and administrators",
      icon: Users,
      href: "/admin/users",
    },

    {
      title: "Messages",
      description:
        "Review customer conversations",
      icon: MessageSquare,
      href: "/admin/messages",
    },

    {
      title: "Settings",
      description:
        "Configure platform settings",
      icon: Settings,
      href: "/admin/settings",
    },
  ];


  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-[#f6f9fd] text-[#111827]">

      {/* ================================================================
          MOBILE OVERLAY
      ================================================================= */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() =>
            setSidebarOpen(false)
          }
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

        {/* Logo */}

        <div className="flex h-[86px] items-center justify-between border-b border-slate-100 px-6">

          <Link
            href="/admin"
            className="flex items-center gap-3"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 shadow-sm">
              <BookOpen className="h-6 w-6 text-white" />
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

          </Link>


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


        {/* Navigation */}

        <div className="flex-1 overflow-y-auto px-4 py-6">

          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Main
          </p>


          <nav className="space-y-1">

            <AdminNavItem
              href="/admin"
              label="Dashboard"
              icon={LayoutDashboard}
              active
              onClick={() =>
                setSidebarOpen(false)
              }
            />

            <AdminNavItem
              href="/admin/orders"
              label="Orders"
              icon={ShoppingCart}
              onClick={() =>
                setSidebarOpen(false)
              }
            />

            <AdminNavItem
              href="/admin/users"
              label="Users"
              icon={Users}
              onClick={() =>
                setSidebarOpen(false)
              }
            />

            <AdminNavItem
              href="/admin/messages"
              label="Messages"
              icon={MessageSquare}
              onClick={() =>
                setSidebarOpen(false)
              }
            />

            <AdminNavItem
              href="/admin/revisions"
              label="Revisions"
              icon={FileText}
              onClick={() =>
                setSidebarOpen(false)
              }
            />

            <AdminNavItem
              href="/admin/analytics"
              label="Analytics"
              icon={BarChart3}
              onClick={() =>
                setSidebarOpen(false)
              }
            />

          </nav>


          <p className="mb-3 mt-8 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Management
          </p>


          <nav className="space-y-1">

            <AdminNavItem
              href="/admin/notifications"
              label="Notifications"
              icon={Bell}
              onClick={() =>
                setSidebarOpen(false)
              }
            />

            <AdminNavItem
              href="/admin/settings"
              label="Settings"
              icon={Settings}
              onClick={() =>
                setSidebarOpen(false)
              }
            />

          </nav>

        </div>


        {/* Admin Account */}

        <div className="border-t border-slate-100 p-4">

          <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <ShieldCheck className="h-5 w-5 text-blue-600" />
            </div>

            <div className="min-w-0">

              <p className="truncate text-sm font-semibold text-slate-900">
                Administrator
              </p>

              <p className="text-xs text-slate-500">
                Admin Account
              </p>

            </div>

          </div>


          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>

        </div>

      </aside>


      {/* ================================================================
          MAIN CONTENT
      ================================================================= */}

      <main className="min-h-screen lg:ml-[270px]">

        {/* ================================================================
            TOP BAR
        ================================================================= */}

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

              <h1 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                Dashboard
              </h1>

              <p className="hidden text-xs text-slate-500 sm:block">
                Overview of your TopStudyTutor platform
              </p>

            </div>

          </div>


          <div className="flex items-center gap-3">

            <Link
              href="/admin/messages"
              className="relative rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 transition hover:bg-slate-50"
            >

              <Bell className="h-5 w-5" />

              {statistics.unreadMessages > 0 && (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white" />
              )}

            </Link>


            <div className="hidden h-8 w-px bg-slate-200 sm:block" />


            <div className="hidden items-center gap-3 sm:flex">

              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
                <ShieldCheck className="h-5 w-5 text-blue-600" />
              </div>

              <div>

                <p className="text-sm font-semibold text-slate-900">
                  Admin
                </p>

                <p className="text-[11px] text-slate-500">
                  Administrator
                </p>

              </div>

            </div>

          </div>

        </header>


        {/* ================================================================
            DASHBOARD BODY
        ================================================================= */}

        <div className="p-5 md:p-8">


          {/* ==============================================================
              ERROR
          =============================================================== */}

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">

              <div className="flex items-start justify-between gap-4">

                <div>

                  <p className="text-sm font-semibold text-red-700">
                    Unable to load dashboard
                  </p>

                  <p className="mt-1 text-sm text-red-600">
                    {error}
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    window.location.reload()
                  }
                  className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700"
                >
                  Retry
                </button>

              </div>

            </div>
          )}


          {/* ==============================================================
              WELCOME
          =============================================================== */}

          <section className="mb-7">

            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-sm md:p-8">

              <div className="max-w-2xl">

                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold">

                  <ShieldCheck className="h-4 w-4" />

                  Administrator Dashboard

                </div>


                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                  Welcome to TopStudyTutor Admin
                </h2>


                <p className="mt-2 max-w-xl text-sm leading-6 text-blue-50 md:text-base">
                  Manage orders, students, messages, revisions, payments and
                  platform activity from one central dashboard.
                </p>

              </div>

            </div>

          </section>


          {/* ==============================================================
              PLATFORM STATISTICS
          =============================================================== */}

          <section className="mb-8">

            <div className="mb-4 flex items-center justify-between">

              <div>

                <h2 className="text-lg font-bold text-slate-900">
                  Platform Overview
                </h2>

                <p className="text-sm text-slate-500">
                  Key statistics at a glance
                </p>

              </div>

            </div>


            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

              {stats.map((stat) => {

                const Icon =
                  stat.icon;

                return (
                  <div
                    key={stat.title}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >

                    <div className="flex items-start justify-between">

                      <div>

                        <p className="text-sm font-medium text-slate-500">
                          {stat.title}
                        </p>


                        <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
                          {stat.value}
                        </p>


                        <p className="mt-1 text-xs text-slate-400">
                          {stat.description}
                        </p>

                      </div>


                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg}`}
                      >
                        <Icon
                          className={`h-5 w-5 ${stat.iconColor}`}
                        />
                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          </section>


          {/* ==============================================================
              MAIN GRID
          =============================================================== */}

          <div className="grid gap-6 xl:grid-cols-3">


            {/* ============================================================
                RECENT ORDERS
            ============================================================= */}

            <section className="xl:col-span-2">

              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 md:px-6">

                  <div>

                    <h2 className="font-bold text-slate-900">
                      Recent Orders
                    </h2>

                    <p className="mt-0.5 text-xs text-slate-500">
                      Latest activity on the platform
                    </p>

                  </div>


                  <Link
                    href="/admin/orders"
                    className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    View all
                    <ChevronRight className="h-4 w-4" />
                  </Link>

                </div>


                <div className="overflow-x-auto">

                  <table className="w-full min-w-[750px]">

                    <thead>

                      <tr className="border-b border-slate-100 bg-slate-50/70">

                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Order
                        </th>

                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Student
                        </th>

                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Subject
                        </th>

                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Amount
                        </th>

                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Status
                        </th>

                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Date
                        </th>

                      </tr>

                    </thead>


                    <tbody>

                      {loading ? (

                        <tr>

                          <td
                            colSpan={6}
                            className="px-6 py-12 text-center text-sm text-slate-400"
                          >
                            Loading recent orders...
                          </td>

                        </tr>

                      ) : recentOrders.length === 0 ? (

                        <tr>

                          <td
                            colSpan={6}
                            className="px-6 py-12 text-center"
                          >

                            <div className="flex flex-col items-center">

                              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">

                                <ShoppingCart className="h-5 w-5 text-slate-400" />

                              </div>

                              <p className="text-sm font-semibold text-slate-600">
                                No orders yet
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                New student orders will appear here.
                              </p>

                            </div>

                          </td>

                        </tr>

                      ) : (

                        recentOrders.map(
                          (order) => (
                            <tr
                              key={order.id}
                              className="border-b border-slate-100 transition last:border-0 hover:bg-slate-50/60"
                            >

                              <td className="px-6 py-5">

                                <Link
                                  href={`/admin/orders/${order.id}`}
                                  className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                                >
                                  #{order.id}
                                </Link>

                              </td>


                              <td className="px-6 py-5 text-sm text-slate-500">
                                User #{order.user_id}
                              </td>


                              <td className="max-w-[220px] px-6 py-5">

                                <p className="truncate text-sm font-medium text-slate-700">
                                  {order.subject ||
                                    order.title ||
                                    "—"}
                                </p>

                                {order.title &&
                                  order.subject && (
                                    <p className="mt-1 truncate text-xs text-slate-400">
                                      {order.title}
                                    </p>
                                  )}

                              </td>


                              <td className="px-6 py-5 text-sm font-semibold text-slate-700">

                                {order.budget !== null &&
                                order.budget !== undefined
                                  ? formatCurrency(
                                      Number(
                                        order.budget
                                      )
                                    )
                                  : "—"}

                              </td>


                              <td className="px-6 py-5">

                                <span
                                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                                    order.status
                                  )}`}
                                >
                                  {order.status ||
                                    "Unknown"}
                                </span>

                              </td>


                              <td className="px-6 py-5 text-sm text-slate-500">
                                {formatDate(
                                  order.created_at
                                )}
                              </td>

                            </tr>
                          )
                        )

                      )}

                    </tbody>

                  </table>

                </div>

              </div>

            </section>


            {/* ============================================================
                QUICK ACTIONS
            ============================================================= */}

            <section>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="mb-5">

                  <h2 className="font-bold text-slate-900">
                    Quick Actions
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Frequently used admin tools
                  </p>

                </div>


                <div className="space-y-3">

                  {quickActions.map(
                    (action) => {

                      const Icon =
                        action.icon;

                      return (
                        <Link
                          key={action.title}
                          href={action.href}
                          className="group flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-blue-100 hover:bg-blue-50/50"
                        >

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition group-hover:bg-blue-100">

                            <Icon className="h-5 w-5" />

                          </div>


                          <div className="min-w-0 flex-1">

                            <p className="text-sm font-semibold text-slate-800">
                              {action.title}
                            </p>

                            <p className="mt-0.5 truncate text-xs text-slate-500">
                              {action.description}
                            </p>

                          </div>


                          <ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:text-blue-500" />

                        </Link>
                      );
                    }
                  )}

                </div>

              </div>

            </section>

          </div>


          {/* ==============================================================
              BOTTOM OVERVIEW CARDS
          =============================================================== */}

          <section className="mt-6 grid gap-6 md:grid-cols-3">

            <DashboardInfoCard
              icon={Star}
              title="Customer Rating"
              value="4.9 / 5"
              description="Current platform rating"
              iconClass="text-yellow-500"
              iconBg="bg-yellow-50"
            />


            <DashboardInfoCard
              icon={FileText}
              title="Completed Orders"
              value={
                loading
                  ? "..."
                  : statistics.completedOrders.toLocaleString()
              }
              description="Successfully delivered"
              iconClass="text-green-600"
              iconBg="bg-green-50"
            />


            <DashboardInfoCard
              icon={MessageSquare}
              title="Unread Messages"
              value={
                loading
                  ? "..."
                  : statistics.unreadMessages.toLocaleString()
              }
              description="Require your attention"
              iconClass="text-purple-600"
              iconBg="bg-purple-50"
            />

          </section>


          {/* ==============================================================
              FOOTER
          =============================================================== */}

          <footer className="mt-8 border-t border-slate-200 pt-5">

            <div className="flex flex-col justify-between gap-2 text-xs text-slate-400 sm:flex-row">

              <p>
                © 2026 TopStudyTutor. Admin Portal.
              </p>

              <p>
                Secure Administration •{" "}
                <span className="text-green-600">
                  System Protected
                </span>
              </p>

            </div>

          </footer>

        </div>

      </main>

    </div>
  );
}


/*
|--------------------------------------------------------------------------
| ADMIN NAVIGATION ITEM
|--------------------------------------------------------------------------
*/

interface AdminNavItemProps {
  href: string;
  label: string;
  icon: React.ElementType;
  active?: boolean;
  onClick?: () => void;
}

function AdminNavItem({
  href,
  label,
  icon: Icon,
  active = false,
  onClick,
}: AdminNavItemProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
        active
          ? "bg-blue-600 text-white shadow-sm"
          : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
      }`}
    >

      <Icon
        className={`h-[18px] w-[18px] ${
          active
            ? "text-white"
            : "text-slate-400 group-hover:text-blue-600"
        }`}
      />


      <span>
        {label}
      </span>


      {active && (
        <ChevronRight className="ml-auto h-4 w-4 text-blue-100" />
      )}

    </Link>
  );
}


/*
|--------------------------------------------------------------------------
| DASHBOARD INFO CARD
|--------------------------------------------------------------------------
*/

interface DashboardInfoCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
  iconClass: string;
  iconBg: string;
}

function DashboardInfoCard({
  icon: Icon,
  title,
  value,
  description,
  iconClass,
  iconBg,
}: DashboardInfoCardProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
      >
        <Icon
          className={`h-5 w-5 ${iconClass}`}
        />
      </div>


      <div>

        <p className="text-xs font-medium text-slate-500">
          {title}
        </p>


        <p className="mt-1 text-xl font-extrabold text-slate-900">
          {value}
        </p>


        <p className="mt-0.5 text-xs text-slate-400">
          {description}
        </p>

      </div>

    </div>
  );
}