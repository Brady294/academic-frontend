"use client";

import { useOrders } from "@/contexts/OrderContext";

import OrderCard from "@/components/orders/OrderCard";

export default function OrdersPage() {
  const {
    orders,
    loading,
  } = useOrders();

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          My Orders
        </h1>

        <p className="mt-2 text-gray-500">
          View and manage all your academic orders.
        </p>

      </div>

      {loading ? (

        <div className="text-center py-20">
          Loading...
        </div>

      ) : orders.length === 0 ? (

        <div className="rounded-3xl border bg-white py-24 text-center">

          <h2 className="text-2xl font-bold">
            No Orders Yet
          </h2>

          <p className="mt-3 text-gray-500">
            Create your first order to get started.
          </p>

        </div>

      ) : (

        <div className="grid gap-6">

          {orders.map((order) => (

            <OrderCard
              key={order.id}
              order={order}
            />

          ))}

        </div>

      )}

    </div>
  );
}