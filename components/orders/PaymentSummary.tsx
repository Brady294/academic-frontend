"use client";

import {
  DollarSign,
  CreditCard,
} from "lucide-react";

import { Order } from "@/types/order";

interface Props {
  order: Order;
}

export default function PaymentSummary({
  order,
}: Props) {
  const amount = Number(order.budget);

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-bold">
        Payment Summary
      </h2>

      <div className="mt-6 space-y-5">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <DollarSign
              className="text-green-600"
              size={20}
            />

            <span>Total Budget</span>

          </div>

          <span className="font-bold">
            ${amount.toFixed(2)}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <CreditCard
              className="text-blue-600"
              size={20}
            />

            <span>Payment Status</span>

          </div>

          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
            Pending
          </span>

        </div>

        <hr />

        <button className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">
          Make Payment
        </button>

      </div>

    </section>
  );
}