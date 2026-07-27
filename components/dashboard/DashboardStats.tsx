"use client";

import {
  BookOpen,
  Clock3,
  CheckCircle2,
  CreditCard,
} from "lucide-react";
import { useDashboard } from "@/contexts/DashboardContext";

export default function DashboardStats() {
  const {
    stats,
    loading,
  } = useDashboard();

  const cards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: BookOpen,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active Orders",
      value: stats.activeOrders,
      icon: Clock3,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Completed",
      value: stats.completedOrders,
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Pending Payments",
      value: stats.pendingPayments,
      icon: CreditCard,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => {

        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-3xl border bg-white shadow-sm p-6"
          >

            <div className="flex justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-3">

                  {loading ? "..." : card.value}

                </h2>

              </div>

              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.color}`}>

                <Icon size={26} />

              </div>

            </div>

          </div>
        );

      })}

    </div>
  );
}