"use client";

import Link from "next/link";
import {
  CalendarClock,
  ChevronRight,
  Clock,
} from "lucide-react";

import { useDashboard } from "@/contexts/DashboardContext";

function getRemaining(deadline: string) {
  const today = new Date();

  const due = new Date(deadline);

  const diff = due.getTime() - today.getTime();

  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days < 0) {
    return {
      text: "Overdue",
      color: "text-red-600",
      badge: "bg-red-100 text-red-700",
    };
  }

  if (days === 0) {
    return {
      text: "Today",
      color: "text-red-600",
      badge: "bg-red-100 text-red-700",
    };
  }

  if (days === 1) {
    return {
      text: "Tomorrow",
      color: "text-orange-600",
      badge: "bg-orange-100 text-orange-700",
    };
  }

  if (days <= 3) {
    return {
      text: `${days} Days Left`,
      color: "text-orange-600",
      badge: "bg-orange-100 text-orange-700",
    };
  }

  if (days <= 7) {
    return {
      text: `${days} Days Left`,
      color: "text-blue-600",
      badge: "bg-blue-100 text-blue-700",
    };
  }

  return {
    text: `${days} Days Left`,
    color: "text-green-600",
    badge: "bg-green-100 text-green-700",
  };
}

export default function UpcomingDeadlines() {
  const {
    upcomingDeadlines,
    loading,
  } = useDashboard();

  return (
    <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

        <div>

          <h2 className="text-xl font-bold">
            Upcoming Deadlines
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Keep track of assignments that require your attention.
          </p>

        </div>

      </div>

      {loading ? (

        <div className="space-y-4 p-6">

          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="h-20 animate-pulse rounded-2xl bg-gray-100"
            />
          ))}

        </div>

      ) : upcomingDeadlines.length === 0 ? (

        <div className="flex flex-col items-center justify-center px-8 py-20 text-center">

          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">

            <CalendarClock
              size={30}
              className="text-green-600"
            />

          </div>

          <h3 className="text-lg font-semibold">
            No Upcoming Deadlines
          </h3>

          <p className="mt-2 max-w-sm text-gray-500">
            You're all caught up. Future assignment deadlines will appear here.
          </p>

        </div>

      ) : (

        <div className="divide-y divide-gray-100">

          {upcomingDeadlines.map((order) => {
            const remaining = getRemaining(order.deadline);

            return (
              <Link
                key={order.id}
                href={`/dashboard/orders/${order.id}`}
                className="flex items-center justify-between px-6 py-5 transition hover:bg-gray-50"
              >

                <div className="min-w-0 flex-1">

                  <div className="flex flex-wrap items-center gap-3">

                    <h3 className="truncate font-semibold text-gray-900">
                      {order.title}
                    </h3>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${remaining.badge}`}
                    >
                      {remaining.text}
                    </span>

                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    {order.subject}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">

                    <Clock size={15} />

                    {new Date(order.deadline).toLocaleString()}

                  </div>

                </div>

                <ChevronRight
                  size={20}
                  className="ml-6 text-gray-400"
                />

              </Link>
            );
          })}

        </div>

      )}

    </section>
  );
}