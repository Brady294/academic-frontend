"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Pencil,
  Hash,
} from "lucide-react";

import { Order } from "@/types/order";

interface Props {
  order: Order;
}

const badgeColors: Record<string, string> = {
  Pending:
    "bg-yellow-100 text-yellow-700 border-yellow-200",

  "In Progress":
    "bg-blue-100 text-blue-700 border-blue-200",

  Completed:
    "bg-green-100 text-green-700 border-green-200",

  Revision:
    "bg-purple-100 text-purple-700 border-purple-200",

  Cancelled:
    "bg-red-100 text-red-700 border-red-200",
};

export default function OrderHeader({
  order,
}: Props) {

  const statusClass =
    badgeColors[order.status] ??
    "bg-gray-100 text-gray-700 border-gray-200";

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-gray-100 px-6 py-4">

        <Link
          href="/dashboard/orders"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700"
        >
          <ArrowLeft size={16} />

          Back to Orders

        </Link>

      </div>

      {/* Body */}

      <div className="flex flex-col justify-between gap-8 p-6 lg:flex-row lg:items-start">

        {/* Left */}

        <div className="flex-1">

          <h1 className="text-3xl font-bold text-gray-900">

            {order.title}

          </h1>

          <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">

            <div className="flex items-center gap-2">

              <Hash
                size={16}
                className="text-gray-400"
              />

              Order #{order.id}

            </div>

            <div className="flex items-center gap-2">

              <CalendarDays
                size={16}
                className="text-blue-600"
              />

              Created{" "}
              {new Date(
                order.created_at
              ).toLocaleDateString()}

            </div>

            <div className="flex items-center gap-2">

              <Clock3
                size={16}
                className="text-orange-600"
              />

              Due{" "}
              {new Date(
                order.deadline
              ).toLocaleString()}

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-col items-stretch gap-4 lg:items-end">

          <span
            className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold ${statusClass}`}
          >

            {order.status}

          </span>

          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >

            <Pencil size={18} />

            Edit Order

          </button>

        </div>

      </div>

    </section>
  );
}