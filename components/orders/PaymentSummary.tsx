"use client";

import {
  DollarSign,
  CreditCard,
  BadgeDollarSign,
  ArrowRight,
} from "lucide-react";

import { Order } from "@/types/order";

interface Props {
  order: Order;
}

export default function PaymentSummary({
  order,
}: Props) {
  const amount = Number(order.budget ?? 0);

  const paid = false;

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-gray-100 px-6 py-5">

        <h2 className="text-xl font-semibold text-gray-900">
          Payment Summary
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Review your order payment details.
        </p>

      </div>

      {/* Body */}

      <div className="space-y-5 p-6">

        {/* Amount */}

        <div className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 p-5 text-white">

          <div className="flex items-center gap-3">

            <BadgeDollarSign size={22} />

            <span className="text-sm font-medium opacity-90">
              Total Budget
            </span>

          </div>

          <h3 className="mt-3 text-3xl font-bold">
            ${amount.toFixed(2)}
          </h3>

        </div>

        {/* Status */}

        <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">

          <div className="flex items-center gap-3">

            <CreditCard
              size={20}
              className="text-blue-600"
            />

            <div>

              <p className="text-sm font-medium text-gray-900">
                Payment Status
              </p>

              <p className="text-xs text-gray-500">
                Current payment progress
              </p>

            </div>

          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              paid
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {paid ? "Paid" : "Pending"}
          </span>

        </div>

        {/* Due */}

        <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">

          <div className="flex items-center gap-3">

            <DollarSign
              size={18}
              className="text-green-600"
            />

            <span className="text-sm font-medium">
              Amount Due
            </span>

          </div>

          <span className="text-lg font-bold text-gray-900">
            ${paid ? "0.00" : amount.toFixed(2)}
          </span>

        </div>

        {/* Button */}

        <button
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >

          <CreditCard size={18} />

          {paid ? "View Receipt" : "Make Payment"}

          <ArrowRight size={16} />

        </button>

      </div>

    </section>
  );
}