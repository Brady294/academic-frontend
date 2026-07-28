"use client";

import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  CreditCard,
  Wallet,
} from "lucide-react";

import { Order } from "@/types/order";

interface Props {
  order: Order;
}

export default function PaymentSummary({
  order,
}: Props) {
  const total = Number(order.budget ?? 0);

  // Replace later with real payment status
  const paid = false;

  const due = paid ? 0 : total;

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="border-b border-gray-100 px-5 py-4">

        <h2 className="text-lg font-bold text-gray-900">
          Payment
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Billing overview for this order.
        </p>

      </div>

      <div className="space-y-4 p-5">

        <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-5 text-white">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs uppercase tracking-wider text-blue-100">
                Total Budget
              </p>

              <h3 className="mt-2 text-3xl font-bold">
                ${total.toFixed(2)}
              </h3>

            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">

              <BadgeDollarSign size={24} />

            </div>

          </div>

        </div>

        <div className="rounded-xl border border-gray-200 p-4">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">

                <Wallet
                  size={18}
                  className="text-green-600"
                />

              </div>

              <div>

                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Amount Due
                </p>

                <p className="text-lg font-bold text-gray-900">
                  ${due.toFixed(2)}
                </p>

              </div>

            </div>

          </div>

        </div>

        <div className="rounded-xl border border-gray-200 p-4">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  paid
                    ? "bg-green-100"
                    : "bg-amber-100"
                }`}
              >

                <CheckCircle2
                  size={18}
                  className={
                    paid
                      ? "text-green-600"
                      : "text-amber-600"
                  }
                />

              </div>

              <div>

                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Status
                </p>

                <p className="font-semibold text-gray-900">
                  {paid
                    ? "Payment Completed"
                    : "Awaiting Payment"}
                </p>

              </div>

            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                paid
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {paid ? "Paid" : "Pending"}
            </span>

          </div>

        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700">

          <CreditCard size={18} />

          {paid ? "View Receipt" : "Pay Now"}

          <ArrowRight size={16} />

        </button>

      </div>

    </section>
  );
}