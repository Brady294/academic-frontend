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
      value: new Date(
        order.deadline
      ).toLocaleString(),
    },
    {
      label: "Created",
      value: new Date(
        order.created_at
      ).toLocaleString(),
    },
  ];

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">

      <h2 className="text-2xl font-bold">
        Assignment Details
      </h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2">

        {details.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl bg-gray-50 p-5"
          >
            <p className="text-sm uppercase tracking-wide text-gray-500">
              {item.label}
            </p>

            <h3 className="mt-2 text-lg font-semibold">
              {item.value}
            </h3>
          </div>
        ))}

      </div>

    </section>
  );
}