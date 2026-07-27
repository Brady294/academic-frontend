"use client";

import Link from "next/link";
import { Calendar, FileText, ArrowRight } from "lucide-react";

import { Order } from "@/types/order";

interface Props {
  order: Order;
}

export default function OrderCard({
  order,
}: Props) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-xl font-bold">
            {order.title}
          </h3>

          <p className="mt-1 text-gray-500">
            {order.subject}
          </p>

        </div>

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 capitalize">
          {order.status}
        </span>

      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">

        <div className="flex items-center gap-2 text-gray-600">
          <FileText size={18} />
          {order.pages} Pages
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Calendar size={18} />
          {new Date(order.deadline).toLocaleDateString()}
        </div>

        <div className="font-semibold text-orange-600">
          ${order.budget}
        </div>

      </div>

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