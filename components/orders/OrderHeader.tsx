"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock3,
  Pencil,
} from "lucide-react";

import { Order } from "@/types/order";

interface Props {
  order: Order;
}

const badgeColors: Record<string, string> = {
  Pending:
    "bg-yellow-100 text-yellow-800 border-yellow-200",

  "In Progress":
    "bg-blue-100 text-blue-800 border-blue-200",

  Completed:
    "bg-green-100 text-green-800 border-green-200",

  Revision:
    "bg-purple-100 text-purple-800 border-purple-200",

  Cancelled:
    "bg-red-100 text-red-800 border-red-200",
};

export default function OrderHeader({
  order,
}: Props) {
  const statusClass =
    badgeColors[order.status] ??
    "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

        <div>

          <Link
            href="/dashboard/orders"
            className="mb-5 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={18} />

            Back to Orders
          </Link>

          <h1 className="text-3xl font-bold">
            {order.title}
          </h1>

          <p className="mt-2 text-gray-500">
            Order #{order.id}
          </p>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600">

            <div className="flex items-center gap-2">

              <Calendar size={18} />

              Created{" "}
              {new Date(
                order.created_at
              ).toLocaleDateString()}

            </div>

            <div className="flex items-center gap-2">

              <Clock3 size={18} />

              Deadline{" "}
              {new Date(
                order.deadline
              ).toLocaleString()}

            </div>

          </div>

        </div>

        <div className="flex flex-col items-end gap-4">

          <span
            className={`rounded-full border px-5 py-2 font-semibold ${statusClass}`}
          >
            {order.status}
          </span>

          <button
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
          >
            <Pencil size={18} />

            Edit Order
          </button>

        </div>

      </div>

    </section>
  );
}