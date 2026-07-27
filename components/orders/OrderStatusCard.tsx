"use client";

import CountdownTimer from "./CountdownTimer";

import { Order } from "@/types/order";

interface Props {
  order: Order;
}

export default function OrderStatusCard({
  order,
}: Props) {
  return (
    <div className="space-y-6">

      <CountdownTimer
        deadline={order.deadline}
      />

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

        <h2 className="text-xl font-bold">
          Order Status
        </h2>

        <div className="mt-6 space-y-4">

          <div className="flex justify-between">

            <span className="text-gray-500">
              Current Status
            </span>

            <span className="font-semibold">
              {order.status}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-500">
              Service
            </span>

            <span className="font-semibold">
              {order.service_type}
            </span>

          </div>

          <div className="flex justify-between">

            <span className="text-gray-500">
              Subject
            </span>

            <span className="font-semibold">
              {order.subject}
            </span>

          </div>

        </div>

      </div>

    </div>
  );
}