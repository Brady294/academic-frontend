"use client";

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
    },
    {
      label: "Service Type",
      value: order.service_type,
    },
    {
      label: "Academic Level",
      value: order.academic_level,
    },
    {
      label: "Pages",
      value: order.pages,
    },
    {
      label: "Spacing",
      value: order.spacing,
    },
    {
      label: "Citation Style",
      value: order.citation_style,
    },
    {
      label: "Deadline",
      value: new Date(order.deadline).toLocaleString(),
    },
    {
      label: "Created",
      value: new Date(order.created_at).toLocaleString(),
    },
  ];

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-bold">
        Assignment Details
      </h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2">

        {details.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-gray-100 bg-gray-50 p-4"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
              {item.label}
            </p>

            <p className="mt-1 text-base font-semibold text-gray-900 break-words">
              {item.value}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}