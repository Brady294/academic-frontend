"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { getOrder } from "@/services/orderService";

import FileUpload from "@/components/orders/FileUpload";
import FileList from "@/components/orders/FileList";

interface Order {
  id: number;
  title: string;
  subject: string;
  service_type: string;
  academic_level: string;
  pages: number;
  spacing: string;
  citation_style: string;
  deadline: string;
  instructions: string;
  budget: number;
  status: string;
  created_at: string;
}

export default function OrderDetailsPage() {
  const params = useParams();

  const [loading, setLoading] = useState(true);

  const [order, setOrder] = useState<Order | null>(null);

  const [refreshKey, setRefreshKey] = useState(0);

  async function loadOrder() {
    try {
      const data = await getOrder(Number(params.id));

      setOrder(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrder();
  }, [params.id]);

  function handleUploadSuccess() {
    setRefreshKey((prev) => prev + 1);
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
        Loading order...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        Order not found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Order Details
          </h1>

          <p className="text-gray-500 mt-2">
            View your assignment information.
          </p>

        </div>

        <Link
          href={`/dashboard/orders/${order.id}/edit`}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg"
        >
          Edit Order
        </Link>

      </div>

      <div className="bg-white rounded-xl border shadow p-8 space-y-8">

        <div className="grid md:grid-cols-2 gap-6">

          <Detail
            label="Assignment Title"
            value={order.title}
          />

          <Detail
            label="Subject"
            value={order.subject}
          />

          <Detail
            label="Service Type"
            value={order.service_type}
          />

          <Detail
            label="Academic Level"
            value={order.academic_level}
          />

          <Detail
            label="Pages"
            value={String(order.pages)}
          />

          <Detail
            label="Spacing"
            value={order.spacing}
          />

          <Detail
            label="Citation Style"
            value={order.citation_style}
          />

          <Detail
            label="Budget"
            value={`$${order.budget}`}
          />

          <Detail
            label="Deadline"
            value={new Date(order.deadline).toLocaleString()}
          />

          <Detail
            label="Created"
            value={new Date(order.created_at).toLocaleString()}
          />

        </div>

        <div>

          <h3 className="font-semibold text-lg mb-3">
            Status
          </h3>

          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${badgeColor(
              order.status
            )}`}
          >
            {order.status}
          </span>

        </div>

        <div>

          <h3 className="font-semibold text-lg mb-3">
            Instructions
          </h3>

          <div className="border rounded-lg p-5 whitespace-pre-wrap">
            {order.instructions ||
              "No instructions provided."}
          </div>

        </div>

      </div>

      <div className="mt-8">

        <FileUpload
          orderId={order.id}
          onUploadSuccess={handleUploadSuccess}
        />

      </div>

      <FileList
        orderId={order.id}
        refreshKey={refreshKey}
      />

    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>

      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-semibold">
        {value}
      </p>

    </div>
  );
}