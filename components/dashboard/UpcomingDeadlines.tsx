"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  Clock,
  FileText,
} from "lucide-react";

import { useDashboard } from "@/contexts/DashboardContext";

function getDeadlineInfo(deadline: string) {
  const now = new Date();
  const dueDate = new Date(deadline);

  const difference =
    dueDate.getTime() - now.getTime();

  const hours = Math.ceil(
    difference / (1000 * 60 * 60)
  );

  if (difference < 0) {
    return {
      label: "Overdue",
      badge:
        "bg-red-50 text-red-700 border-red-100",
      icon: "text-red-600",
    };
  }

  if (hours <= 24) {
    return {
      label: "Due today",
      badge:
        "bg-red-50 text-red-700 border-red-100",
      icon: "text-red-600",
    };
  }

  const days = Math.ceil(hours / 24);

  if (days === 1) {
    return {
      label: "Due tomorrow",
      badge:
        "bg-orange-50 text-orange-700 border-orange-100",
      icon: "text-orange-600",
    };
  }

  if (days <= 3) {
    return {
      label: `${days} days left`,
      badge:
        "bg-orange-50 text-orange-700 border-orange-100",
      icon: "text-orange-600",
    };
  }

  if (days <= 7) {
    return {
      label: `${days} days left`,
      badge:
        "bg-blue-50 text-blue-700 border-blue-100",
      icon: "text-blue-600",
    };
  }

  return {
    label: `${days} days left`,
    badge:
      "bg-green-50 text-green-700 border-green-100",
    icon: "text-green-600",
  };
}

function formatDeadline(
  deadline: string,
  timezone?: string
) {
  const date = new Date(deadline);

  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: timezone || undefined,
  });
}

export default function UpcomingDeadlines() {
  const {
    upcomingDeadlines,
    loading,
  } = useDashboard();

  return (
    <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5 sm:px-6">

        <div className="flex items-start gap-3">

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <CalendarClock size={21} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
              Upcoming Deadlines
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Assignments that need your attention.
            </p>
          </div>

        </div>

        {upcomingDeadlines.length > 0 && (
          <Link
            href="/dashboard/orders"
            className="hidden items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-700 sm:flex"
          >
            View Orders
            <ArrowRight size={16} />
          </Link>
        )}

      </div>

      {/* Loading */}

      {loading ? (

        <div className="space-y-3 p-5 sm:p-6">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-24 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}

        </div>

      ) : upcomingDeadlines.length === 0 ? (

        /* Empty State */

        <div className="px-6 py-14 text-center sm:py-16">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
            <CalendarClock
              size={27}
              className="text-green-600"
            />
          </div>

          <h3 className="mt-4 text-base font-semibold text-gray-900">
            You're all caught up
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
            You don't have any upcoming assignment deadlines.
            New deadlines will appear here automatically.
          </p>

        </div>

      ) : (

        /* Deadline List */

        <div className="divide-y divide-gray-100">

          {upcomingDeadlines.map((order) => {

            const deadline = getDeadlineInfo(
              order.deadline
            );

            return (
              <Link
                key={order.id}
                href={`/dashboard/orders/${order.id}`}
                className="group block px-5 py-5 transition hover:bg-gray-50 sm:px-6"
              >

                <div className="flex items-start gap-4">

                  {/* Assignment Icon */}

                  <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-gray-500 sm:flex">
                    <FileText size={20} />
                  </div>

                  {/* Main Content */}

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">

                      <div className="min-w-0">

                        <h3 className="truncate font-semibold text-gray-900 transition group-hover:text-blue-600">
                          {order.title}
                        </h3>

                        {order.subject && (
                          <p className="mt-1 truncate text-sm text-gray-500">
                            {order.subject}
                          </p>
                        )}

                      </div>

                      {/* Deadline Badge */}

                      <span
                        className={`w-fit shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${deadline.badge}`}
                      >
                        {deadline.label}
                      </span>

                    </div>

                    {/* Deadline Date */}

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 sm:text-sm">

                      <span className="flex items-center gap-1.5">

                        <Clock
                          size={14}
                          className={deadline.icon}
                        />

                        {formatDeadline(
                          order.deadline,
                          order.client_timezone
                        )}

                      </span>

                      <span className="hidden text-gray-300 sm:inline">
                        •
                      </span>

                      <span className="capitalize">
                        {order.status}
                      </span>

                    </div>

                  </div>

                  {/* Arrow */}

                  <ArrowRight
                    size={18}
                    className="mt-1 hidden shrink-0 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-blue-600 sm:block"
                  />

                </div>

              </Link>
            );
          })}

        </div>

      )}

      {/* Mobile View Orders */}

      {!loading && upcomingDeadlines.length > 0 && (
        <div className="border-t border-gray-100 p-4 sm:hidden">

          <Link
            href="/dashboard/orders"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-50 px-4 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            View All Orders
            <ArrowRight size={16} />
          </Link>

        </div>
      )}

    </section>
  );
}