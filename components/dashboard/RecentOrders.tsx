"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  FileText,
} from "lucide-react";

import { useDashboard } from "@/contexts/DashboardContext";

const statusConfig: Record<
  string,
  {
    label: string;
    className: string;
  }
> = {
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  },

  assigned: {
    label: "Assigned",
    className: "bg-blue-50 text-blue-700 ring-1 ring-blue-200",
  },

  "in progress": {
    label: "In Progress",
    className: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200",
  },

  revision: {
    label: "Revision",
    className: "bg-orange-50 text-orange-700 ring-1 ring-orange-200",
  },

  completed: {
    label: "Completed",
    className: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  },

  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700 ring-1 ring-red-200",
  },
};

function getStatus(status: string) {
  const normalized = status?.trim().toLowerCase();

  return (
    statusConfig[normalized] ?? {
      label: status || "Unknown",
      className: "bg-gray-50 text-gray-700 ring-1 ring-gray-200",
    }
  );
}

function formatDeadline(deadline: string) {
  if (!deadline) {
    return "No deadline";
  }

  const date = new Date(deadline);

  if (Number.isNaN(date.getTime())) {
    return "Invalid deadline";
  }

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function RecentOrders() {
  const { recentOrders, loading } = useDashboard();

  return (
    <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5 sm:px-6">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
            Your Recent Orders
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            A quick view of your latest assignments.
          </p>
        </div>

        <Link
          href="/dashboard/orders"
          className="hidden items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700 sm:flex"
        >
          View all
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="space-y-3 p-5 sm:p-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="h-[92px] animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      ) : recentOrders.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50">
            <FileText
              size={25}
              className="text-blue-600"
            />
          </div>

          <h3 className="mt-5 text-base font-semibold text-gray-900">
            No orders yet
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
            Your assignments will appear here once you place your first
            order.
          </p>

          <Link
            href="/dashboard/orders/new"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Create your first order
            <ArrowRight size={17} />
          </Link>
        </div>
      ) : (
        <>
          {/* Orders */}
          <div className="divide-y divide-gray-100">
            {recentOrders.map((order) => {
              const status = getStatus(order.status);

              return (
                <Link
                  key={order.id}
                  href={`/dashboard/orders/${order.id}`}
                  className="group block px-5 py-5 transition hover:bg-gray-50 sm:px-6"
                >
                  <div className="flex items-start gap-4">
                    {/* Order icon */}
                    <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 sm:flex">
                      <FileText size={20} />
                    </div>

                    {/* Main information */}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start gap-2">
                        <h3 className="min-w-0 flex-1 truncate text-sm font-semibold text-gray-900 sm:text-base">
                          {order.title}
                        </h3>

                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${status.className}`}
                        >
                          {status.label}
                        </span>
                      </div>

                      <p className="mt-1 truncate text-sm text-gray-500">
                        {order.subject}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays size={14} />

                          Due {formatDeadline(order.deadline)}
                        </span>

                        {order.pages !== undefined &&
                          order.pages !== null && (
                            <span>
                              {order.pages}{" "}
                              {order.pages === 1 ? "page" : "pages"}
                            </span>
                          )}
                      </div>
                    </div>

                    {/* Arrow */}
                    <ChevronRight
                      size={20}
                      className="mt-2 shrink-0 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-blue-600"
                    />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Mobile view-all */}
          <div className="border-t border-gray-100 p-4 sm:hidden">
            <Link
              href="/dashboard/orders"
              className="flex items-center justify-center gap-2 rounded-xl bg-gray-50 px-4 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
            >
              View all orders
              <ArrowRight size={16} />
            </Link>
          </div>
        </>
      )}
    </section>
  );
}