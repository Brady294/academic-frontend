"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  DollarSign,
  Plus,
} from "lucide-react";

import { useOrders } from "@/contexts/OrderContext";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  assigned: "bg-blue-100 text-blue-700",
  "in progress": "bg-indigo-100 text-indigo-700",
  revision: "bg-orange-100 text-orange-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function OrdersPage() {
  const { orders, loading } = useOrders();

  return (
    <div className="space-y-8">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-4xl font-bold tracking-tight">
            My Orders
          </h1>

          <p className="mt-2 text-gray-500">
            Track every order, monitor deadlines and manage your academic work.
          </p>

        </div>

        <Link
          href="/dashboard/orders/new"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          New Order
        </Link>

      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

        {loading ? (

          <div className="flex justify-center py-24">

            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

          </div>

        ) : orders.length === 0 ? (

          <div className="flex flex-col items-center justify-center px-8 py-24 text-center">

            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">

              <BookOpen
                size={36}
                className="text-blue-600"
              />

            </div>

            <h2 className="text-2xl font-bold">
              No Orders Yet
            </h2>

            <p className="mt-3 max-w-md text-gray-500">
              Once you create your first order it will appear here together
              with its deadline, status and payment information.
            </p>

            <Link
              href="/dashboard/orders/new"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              <Plus size={18} />
              Create Order
            </Link>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="min-w-full">

              <thead className="border-b bg-gray-50">

                <tr>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Order
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Subject
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Deadline
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Budget
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {orders.map((order) => (

                  <tr
                    key={order.id}
                    className="border-b transition hover:bg-gray-50"
                  >

                    <td className="px-6 py-5">

                      <Link
                        href={`/dashboard/orders/${order.id}`}
                        className="font-semibold text-blue-600 hover:underline"
                      >
                        #{order.id}
                      </Link>

                      <p className="mt-1 font-medium text-gray-900">
                        {order.title}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {order.pages} Pages • {order.service_type}
                      </p>

                    </td>

                    <td className="px-6 py-5 text-gray-700">
                      {order.subject}
                    </td>

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-2 text-gray-700">

                        <Calendar size={16} />

                        {new Date(order.deadline).toLocaleDateString()}

                      </div>

                    </td>

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-1 font-semibold text-green-600">

                        <DollarSign size={16} />

                        {order.budget}

                      </div>

                    </td>

                    <td className="px-6 py-5">

                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold capitalize ${
                          statusColors[
                            order.status.toLowerCase()
                          ] ??
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status}
                      </span>

                    </td>

                    <td className="px-6 py-5 text-right">

                      <Link
                        href={`/dashboard/orders/${order.id}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        View
                        <ArrowRight size={16} />
                      </Link>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}