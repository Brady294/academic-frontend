"use client";

import Link from "next/link";
import { useOrders } from "@/contexts/OrderContext";

export default function OrdersPage() {
  const {
    orders,
    loading,
    removeOrder,
  } = useOrders();

  async function handleDelete(id: number) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    try {
      await removeOrder(id);

      alert("Order deleted successfully.");
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Failed to delete order."
      );
    }
  }

  function badgeColor(status: string) {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading orders...
      </div>
    );
  }

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            My Orders
          </h1>

          <p className="text-gray-500 mt-1">
            View and manage all your assignments.
          </p>

        </div>

        <Link
          href="/dashboard/orders/new"
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg font-medium"
        >
          + New Order
        </Link>

      </div>

      <div className="bg-white rounded-xl shadow border overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">
                Title
              </th>

              <th className="text-left p-4">
                Subject
              </th>

              <th className="text-left p-4">
                Pages
              </th>

              <th className="text-left p-4">
                Budget
              </th>

              <th className="text-left p-4">
                Deadline
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-left p-4">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {orders.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="text-center py-12 text-gray-500"
                >
                  No orders found.
                </td>

              </tr>

            ) : (

              orders.map((order) => (

                <tr
                  key={order.id}
                  className="border-t"
                >

                  <td className="p-4">
                    {order.title}
                  </td>

                  <td className="p-4">
                    {order.subject}
                  </td>

                  <td className="p-4">
                    {order.pages}
                  </td>

                  <td className="p-4">
                    ${order.budget}
                  </td>

                  <td className="p-4">
                    {new Date(
                      order.deadline
                    ).toLocaleString()}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${badgeColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>

                  </td>

                  <td className="p-4 flex gap-2">

                    <Link
                      href={`/dashboard/orders/${order.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>

                    <Link
                      href={`/dashboard/orders/${order.id}/edit`}
                      className="text-green-600 hover:underline"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(order.id)
                      }
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}