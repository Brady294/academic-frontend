"use client";

const orders = [
  {
    id: 1,
    title: "Business Management Essay",
    status: "In Progress",
    deadline: "Jul 28",
  },
  {
    id: 2,
    title: "Accounting Assignment",
    status: "Pending",
    deadline: "Jul 30",
  },
];

export default function RecentOrders() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Recent Orders
      </h2>

      <div className="space-y-4">

        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between rounded-xl border p-4"
          >

            <div>

              <h3 className="font-semibold">
                {order.title}
              </h3>

              <p className="text-sm text-gray-500">
                Deadline: {order.deadline}
              </p>

            </div>

            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
              {order.status}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}