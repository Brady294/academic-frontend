"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Hash,
  Pencil,
  BookOpen,
} from "lucide-react";

import { Order } from "@/types/order";

interface Props {
  order: Order;
}

const statusColors: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700 border-amber-200",
  "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
  Assigned: "bg-blue-100 text-blue-700 border-blue-200",
  Revision: "bg-purple-100 text-purple-700 border-purple-200",
  Completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Cancelled: "bg-red-100 text-red-700 border-red-200",
};

export default function OrderHeader({ order }: Props) {
  const statusClass =
    statusColors[order.status] ??
    "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">

        <Link
          href="/dashboard/orders"
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-blue-600"
        >
          <ArrowLeft size={16} />
          Back to Orders
        </Link>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusClass}`}
        >
          {order.status}
        </span>

      </div>

      <div className="p-5">

        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">

          <div className="min-w-0 flex-1">

            <h1 className="truncate text-2xl font-bold text-gray-900">
              {order.title}
            </h1>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">

                  <Hash
                    size={18}
                    className="text-blue-600"
                  />

                </div>

                <div>

                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Order ID
                  </p>

                  <p className="font-semibold text-gray-900">
                    #{order.id}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">

                  <BookOpen
                    size={18}
                    className="text-green-600"
                  />

                </div>

                <div className="min-w-0">

                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Subject
                  </p>

                  <p className="truncate font-semibold text-gray-900">
                    {order.subject}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">

                  <CalendarDays
                    size={18}
                    className="text-indigo-600"
                  />

                </div>

                <div>

                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Created
                  </p>

                  <p className="font-semibold text-gray-900">
                    {new Date(
                      order.created_at
                    ).toLocaleDateString()}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">

                  <Clock3
                    size={18}
                    className="text-orange-600"
                  />

                </div>

                <div>

                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Deadline
                  </p>

                  <p className="font-semibold text-gray-900">
                    {new Date(
                      order.deadline
                    ).toLocaleDateString()}
                  </p>

                </div>

              </div>

            </div>

          </div>

          <div className="flex shrink-0 gap-3">

            <button
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <Pencil size={17} />
              Edit
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}