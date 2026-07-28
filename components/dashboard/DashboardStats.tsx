"use client";

import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  CreditCard,
} from "lucide-react";

import { useDashboard } from "@/contexts/DashboardContext";

export default function DashboardStats() {
  const { stats, loading } = useDashboard();

  const cards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      description: "Orders submitted",
      icon: BookOpen,
      iconClass: "bg-blue-100 text-blue-600",
      borderClass: "hover:border-blue-200",
    },
    {
      title: "Active Orders",
      value: stats.activeOrders,
      description: "Currently in progress",
      icon: Clock3,
      iconClass: "bg-orange-100 text-orange-600",
      borderClass: "hover:border-orange-200",
    },
    {
      title: "Completed",
      value: stats.completedOrders,
      description: "Successfully delivered",
      icon: CheckCircle2,
      iconClass: "bg-green-100 text-green-600",
      borderClass: "hover:border-green-200",
    },
    {
      title: "Pending Payments",
      value: stats.pendingPayments,
      description: "Awaiting payment",
      icon: CreditCard,
      iconClass: "bg-purple-100 text-purple-600",
      borderClass: "hover:border-purple-200",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${card.borderClass}`}
          >
            <div className="flex items-start justify-between">

              <div className="space-y-3">

                <p className="text-sm font-medium text-gray-500">
                  {card.title}
                </p>

                {loading ? (
                  <div className="h-10 w-20 animate-pulse rounded-lg bg-gray-200" />
                ) : (
                  <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                    {card.value}
                  </h2>
                )}

                <p className="text-sm text-gray-500">
                  {card.description}
                </p>

              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${card.iconClass}`}
              >
                <Icon size={26} />
              </div>

            </div>

            <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-4">

              <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Dashboard
              </span>

              <ArrowUpRight
                size={18}
                className="text-gray-400 transition-colors group-hover:text-blue-600"
              />

            </div>

          </div>
        );
      })}
    </div>
  );
}