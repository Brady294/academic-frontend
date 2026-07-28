"use client";

import {
  BookOpen,
  CheckCircle2,
  Clock3,
  FileText,
} from "lucide-react";

import CountdownTimer from "./CountdownTimer";

import { Order } from "@/types/order";

interface Props {
  order: Order;
}

const statusMap: Record<
  string,
  {
    color: string;
    progress: number;
  }
> = {
  Pending: {
    color: "bg-amber-100 text-amber-700",
    progress: 20,
  },
  Assigned: {
    color: "bg-sky-100 text-sky-700",
    progress: 40,
  },
  "In Progress": {
    color: "bg-blue-100 text-blue-700",
    progress: 65,
  },
  Revision: {
    color: "bg-violet-100 text-violet-700",
    progress: 85,
  },
  Completed: {
    color: "bg-emerald-100 text-emerald-700",
    progress: 100,
  },
  Delivered: {
    color: "bg-emerald-100 text-emerald-700",
    progress: 100,
  },
  Cancelled: {
    color: "bg-red-100 text-red-700",
    progress: 0,
  },
};

export default function OrderStatusCard({
  order,
}: Props) {
  const current =
    statusMap[order.status] ?? {
      color: "bg-gray-100 text-gray-700",
      progress: 15,
    };

  return (
    <div className="space-y-5">

      <CountdownTimer
        deadline={order.deadline}
      />

      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-100 px-5 py-4">

          <h2 className="text-lg font-bold text-gray-900">
            Order Progress
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Current workflow status.
          </p>

        </div>

        <div className="space-y-5 p-5">

          <div>

            <div className="mb-3 flex items-center justify-between">

              <span className="text-sm font-medium text-gray-600">
                Progress
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${current.color}`}
              >
                {order.status}
              </span>

            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-100">

              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                style={{
                  width: `${current.progress}%`,
                }}
              />

            </div>

            <p className="mt-2 text-right text-xs font-semibold text-blue-600">
              {current.progress}% Complete
            </p>

          </div>

          <div className="space-y-3">

            <div className="flex items-center justify-between rounded-xl border border-gray-200 p-3">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">

                  <FileText
                    size={18}
                    className="text-blue-600"
                  />

                </div>

                <div>

                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Service
                  </p>

                  <p className="text-sm font-semibold text-gray-900">
                    {order.service_type}
                  </p>

                </div>

              </div>

            </div>

            <div className="flex items-center justify-between rounded-xl border border-gray-200 p-3">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">

                  <BookOpen
                    size={18}
                    className="text-indigo-600"
                  />

                </div>

                <div>

                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Subject
                  </p>

                  <p className="text-sm font-semibold text-gray-900">
                    {order.subject}
                  </p>

                </div>

              </div>

            </div>

            <div className="flex items-center justify-between rounded-xl border border-gray-200 p-3">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">

                  <Clock3
                    size={18}
                    className="text-orange-600"
                  />

                </div>

                <div>

                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Deadline
                  </p>

                  <p className="text-sm font-semibold text-gray-900">
                    {new Date(
                      order.deadline
                    ).toLocaleString()}
                  </p>

                </div>

              </div>

            </div>

            <div className="flex items-center justify-between rounded-xl border border-gray-200 p-3">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">

                  <CheckCircle2
                    size={18}
                    className="text-emerald-600"
                  />

                </div>

                <div>

                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Academic Level
                  </p>

                  <p className="text-sm font-semibold text-gray-900">
                    {order.academic_level}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}