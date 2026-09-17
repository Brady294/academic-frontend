"use client";

import Link from "next/link";
import {
  Calendar,
  FileText,
  ArrowRight,
} from "lucide-react";

import { Order } from "@/types/order";

interface Props {
  order: Order;
}

function formatDeadline(
  deadline: string,
  timezone: string | null
) {
  const date = new Date(deadline);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  try {
    return new Intl.DateTimeFormat(undefined, {
      timeZone: timezone || undefined,
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  } catch (error) {
    console.error(
      "Invalid order timezone:",
      timezone,
      error
    );

    return date.toLocaleDateString();
  }
}

export default function OrderCard({
  order,
}: Props) {
  const deadline = formatDeadline(
    order.deadline,
    order.timezone
  );

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0">

          <h3 className="text-xl font-bold text-gray-900">
            {order.title}
          </h3>

          <p className="mt-1 text-gray-500">
            {order.subject}
          </p>

        </div>

        <span className="shrink-0 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold capitalize text-blue-700">
          {order.status}
        </span>

      </div>

      {/* Order information */}

      <div className="mt-6 grid gap-4 md:grid-cols-3">

        {/* Pages */}

        <div className="flex items-center gap-2 text-gray-600">

          <FileText
            size={18}
            className="shrink-0"
          />

          <span>
            {order.pages}{" "}
            {order.pages === 1 ? "Page" : "Pages"}
          </span>

        </div>

        {/* Deadline */}

        <div className="flex items-center gap-2 text-gray-600">

          <Calendar
            size={18}
            className="shrink-0"
          />

          <span>
            {deadline}
          </span>

        </div>

        {/* Price */}

        <div className="font-semibold text-orange-600">
          {order.budget === null
            ? "Pending pricing"
            : `$${Number(order.budget).toFixed(2)}`}
        </div>

      </div>

      {/* View order */}

      <Link
        href={`/dashboard/orders/${order.id}`}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
      >
        View Details

        <ArrowRight size={18} />
      </Link>

    </div>
  );
}