"use client";

import {
  CheckCircle2,
  Clock3,
  BookOpen,
  FileText,
} from "lucide-react";

import CountdownTimer from "./CountdownTimer";

import { Order } from "@/types/order";

interface Props {
  order: Order;
}

export default function OrderStatusCard({
  order,
}: Props) {

  const status =
    order.status || "Pending";

  const badgeColor = (() => {

    switch (status.toLowerCase()) {

      case "completed":
      case "delivered":
        return "bg-green-100 text-green-700";

      case "in progress":
      case "assigned":
        return "bg-blue-100 text-blue-700";

      case "revision":
        return "bg-purple-100 text-purple-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";

    }

  })();

  return (
    <div className="space-y-5">

      {/* Countdown */}

      <CountdownTimer
        deadline={order.deadline}
      />

      {/* Status Card */}

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        {/* Header */}

        <div className="border-b border-gray-100 px-6 py-5">

          <h2 className="text-xl font-semibold text-gray-900">
            Order Status
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Current progress of your assignment.
          </p>

        </div>

        {/* Body */}

        <div className="space-y-4 p-6">

          {/* Current Status */}

          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">

            <div className="flex items-center gap-3">

              <CheckCircle2
                size={20}
                className="text-green-600"
              />

              <div>

                <p className="text-sm font-medium text-gray-900">
                  Current Status
                </p>

                <p className="text-xs text-gray-500">
                  Latest workflow stage
                </p>

              </div>

            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeColor}`}
            >
              {status}
            </span>

          </div>

          {/* Service */}

          <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">

            <div className="flex items-center gap-3">

              <FileText
                size={18}
                className="text-blue-600"
              />

              <span className="text-sm font-medium">
                Service
              </span>

            </div>

            <span className="font-semibold text-gray-900">
              {order.service_type}
            </span>

          </div>

          {/* Subject */}

          <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">

            <div className="flex items-center gap-3">

              <BookOpen
                size={18}
                className="text-indigo-600"
              />

              <span className="text-sm font-medium">
                Subject
              </span>

            </div>

            <span className="font-semibold text-gray-900">
              {order.subject}
            </span>

          </div>

          {/* Deadline */}

          <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">

            <div className="flex items-center gap-3">

              <Clock3
                size={18}
                className="text-orange-600"
              />

              <span className="text-sm font-medium">
                Deadline
              </span>

            </div>

            <span className="text-sm font-semibold text-gray-900">
              {new Date(
                order.deadline
              ).toLocaleDateString()}
            </span>

          </div>

        </div>

      </section>

    </div>
  );
}