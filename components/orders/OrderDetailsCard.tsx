"use client";

import {
  CalendarDays,
  BookOpen,
  GraduationCap,
  FileText,
  AlignLeft,
  Quote,
  Clock3,
  Calendar,
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
      icon: BookOpen,
      label: "Subject",
      value: order.subject,
    },
    {
      icon: FileText,
      label: "Service Type",
      value: order.service_type,
    },
    {
      icon: GraduationCap,
      label: "Academic Level",
      value: order.academic_level,
    },
    {
      icon: FileText,
      label: "Pages",
      value: `${order.pages} Page${order.pages > 1 ? "s" : ""}`,
    },
    {
      icon: AlignLeft,
      label: "Spacing",
      value: order.spacing,
    },
    {
      icon: Quote,
      label: "Citation Style",
      value: order.citation_style,
    },
    {
      icon: Clock3,
      label: "Deadline",
      value: new Date(order.deadline).toLocaleString(),
    },
    {
      icon: Calendar,
      label: "Created",
      value: new Date(order.created_at).toLocaleString(),
    },
  ];

  return (
    <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-gray-100 px-6 py-5">

        <h2 className="text-xl font-semibold text-gray-900">
          Assignment Details
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Overview of the assignment requirements.
        </p>

      </div>

      {/* Details */}

      <div className="grid gap-4 p-6 md:grid-cols-2">

        {details.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.label}
              className="flex items-start gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 transition hover:border-blue-200 hover:bg-blue-50"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">

                <Icon
                  size={18}
                  className="text-blue-600"
                />

              </div>

              <div className="min-w-0 flex-1">

                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">

                  {item.label}

                </p>

                <p className="mt-1 break-words text-sm font-semibold text-gray-900">

                  {item.value}

                </p>

              </div>

            </div>

          );

        })}

      </div>

    </section>
  );
}