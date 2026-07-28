"use client";

import {
  AlignLeft,
  BookOpen,
 CalendarClock,
  FileText,
  GraduationCap,
 Quote,
  Ruler,
} from "lucide-react";

import { Order } from "@/types/order";

interface Props {
  order: Order;
}

export default function OrderDetailsCard({
  order,
}: Props) {
  const details = [
    {
      label: "Subject",
      value: order.subject,
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Service",
      value: order.service_type,
      icon: FileText,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      label: "Academic Level",
      value: order.academic_level,
      icon: GraduationCap,
      color: "bg-emerald-100 text-emerald-600",
    },
    {
      label: "Pages",
      value: `${order.pages} ${
        order.pages === 1 ? "Page" : "Pages"
      }`,
      icon: FileText,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Spacing",
      value: order.spacing,
      icon: Ruler,
      color: "bg-orange-100 text-orange-600",
    },
    {
      label: "Citation Style",
      value: order.citation_style,
      icon: Quote,
      color: "bg-pink-100 text-pink-600",
    },
  ];

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">

        <div>

          <h2 className="text-lg font-bold text-gray-900">
            Assignment Details
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Academic requirements and specifications.
          </p>

        </div>

      </div>

      {/* Main Content */}

      <div className="space-y-5 p-5">

        {/* Information Grid */}

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">

          {details.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="group rounded-xl border border-gray-200 p-3 transition-all duration-200 hover:border-blue-200 hover:shadow-sm"
              >
                <div className="flex items-start gap-3">

                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.color}`}
                  >
                    <Icon size={18} />
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {item.label}
                    </p>

                    <p className="mt-1 break-words text-sm font-semibold leading-5 text-gray-900">
                      {item.value}
                    </p>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

        {/* Dates */}

        <div className="grid gap-3 md:grid-cols-2">

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">

                <CalendarClock
                  size={18}
                  className="text-blue-600"
                />

              </div>

              <div>

                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Deadline
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {new Date(
                    order.deadline
                  ).toLocaleString()}
                </p>

              </div>

            </div>

          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">

                <CalendarClock
                  size={18}
                  className="text-emerald-600"
                />

              </div>

              <div>

                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Order Created
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {new Date(
                    order.created_at
                  ).toLocaleString()}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Quick Summary */}

        <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50 p-4">

          <div className="flex items-start justify-between gap-6">

            <div>

              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                Assignment Summary
              </p>

              <h3 className="mt-1 text-base font-bold text-gray-900">
                {order.service_type}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                This order requires a{" "}
                <span className="font-semibold text-gray-900">
                  {order.pages}-page
                </span>{" "}
                {order.subject} assignment written at the{" "}
                <span className="font-semibold text-gray-900">
                  {order.academic_level}
                </span>{" "}
                level using{" "}
                <span className="font-semibold text-gray-900">
                  {order.citation_style}
                </span>{" "}
                formatting.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}