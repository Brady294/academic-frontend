"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import orderService from "@/services/orderService";
import { Order } from "@/types/order";

import OrderHeader from "@/components/orders/OrderHeader";
import OrderStatusCard from "@/components/orders/OrderStatusCard";
import OrderDetailsCard from "@/components/orders/OrderDetailsCard";
import OrderInstructions from "@/components/orders/OrderInstructions";
import OrderFiles from "@/components/orders/OrderFiles";
import PaymentSummary from "@/components/orders/PaymentSummary";
import SubmissionCard from "@/components/orders/SubmissionCard";
import ActivityTimeline from "@/components/orders/ActivityTimeline";
import SupportChat from "@/components/orders/SupportChat";

export default function OrderDetailsPage() {
  const params = useParams();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);

  const [order, setOrder] = useState<Order | null>(null);

  async function loadOrder() {
    try {
      setLoading(true);

      const data = await orderService.getOrder(id);

      setOrder(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">

        <div className="text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

          <p className="mt-4 text-gray-500">
            Loading order...
          </p>

        </div>

      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex h-[60vh] items-center justify-center">

        <div className="rounded-3xl border bg-white p-12 text-center">

          <h2 className="text-3xl font-bold">
            Order Not Found
          </h2>

          <p className="mt-3 text-gray-500">
            The requested order could not be found.
          </p>

        </div>

      </div>
    );
  }

  const activities = [
    {
      title: "Order Created",
      date: new Date(order.created_at).toLocaleString(),
      completed: true,
    },
    {
      title: "Files Uploaded",
      date: "Waiting for uploads",
      completed: false,
    },
    {
      title: "Work Started",
      date: "Pending",
      completed: false,
    },
    {
      title: "Quality Review",
      date: "Pending",
      completed: false,
    },
    {
      title: "Delivered",
      date: "Pending",
      completed: false,
    },
  ];

  return (
    <div className="space-y-8">

      <OrderHeader order={order} />

      <div className="grid gap-8 xl:grid-cols-3">

        {/* LEFT */}

        <div className="space-y-8 xl:col-span-2">

          <OrderDetailsCard order={order} />

          <OrderInstructions
            instructions={order.instructions}
          />

          <OrderFiles
            orderId={order.id}
          />

          <SubmissionCard
            submissions={[]}
          />

          <ActivityTimeline
            activities={activities}
          />

          <SupportChat />

        </div>

        {/* RIGHT */}

        <div className="space-y-8">

          <OrderStatusCard
            order={order}
          />

          <PaymentSummary
            order={order}
          />

        </div>

      </div>

    </div>
  );
}