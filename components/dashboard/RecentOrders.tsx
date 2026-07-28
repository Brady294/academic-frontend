"use client";

import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  FileText,
} from "lucide-react";

import { useDashboard } from "@/contexts/DashboardContext";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  assigned: "bg-blue-100 text-blue-700",
  "in progress": "bg-indigo-100 text-indigo-700",
  revision: "bg-orange-100 text-orange-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function RecentOrders() {
  const {
    recentOrders,
    loading,
  } = useDashboard();

  return (
    <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

        <div>

          <h2 className="text-xl font-bold">
            Recent Orders
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Your latest academic orders
          </p>

        </div>

        <Link
          href="/dashboard/orders"
          className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          View All
        </Link>

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

      ) : recentOrders.length === 0 ? (

        <div className="flex flex-col items-center justify-center px-8 py-20 text-center">

          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">

            <FileText
              className="text-blue-600"
              size={28}
            />

          </div>

          <h3 className="text-lg font-semibold">
            No Recent Orders
          </h3>

          <p className="mt-2 max-w-sm text-gray-500">
            Your recently created orders will appear here for quick access.
          </p>

          <Link
            href="/dashboard/orders/new"
            className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Create Order
          </Link>

        </div>

      ) : (

        <div className="divide-y divide-gray-100">

          {recentOrders.map((order) => (

            <Link
              key={order.id}
              href={`/dashboard/orders/${order.id}`}
              className="flex items-center justify-between px-6 py-5 transition hover:bg-gray-50"
            >

              <div className="min-w-0 flex-1">

                <div className="flex items-center gap-3">

                  <h3 className="truncate font-semibold text-gray-900">
                    {order.title}
                  </h3>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      statusColors[
                        order.status.toLowerCase()
                      ] ??
                      "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>

                </div>

                <p className="mt-2 text-sm text-gray-500">
                  {order.subject}
                </p>

                <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">

                  <Calendar size={15} />

                  {new Date(order.deadline).toLocaleDateString()}

                </div>

              </div>

              <ArrowRight
                size={20}
                className="ml-6 text-gray-400"
              />

            </Link>

          ))}

        </div>

      )}

    </section>
  );
}