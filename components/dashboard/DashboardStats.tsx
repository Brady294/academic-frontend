"use client";

import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Clock3,
} from "lucide-react";

import { useDashboard } from "@/contexts/DashboardContext";

export default function DashboardStats() {
  const { stats, loading } = useDashboard();

  /*
   * pendingOrders is calculated from the values already provided
   * by DashboardContext.
   *
   * This prevents TypeScript errors if DashboardStats does not
   * currently define a pendingOrders property.
   */
  const pendingOrders = Math.max(
    0,
    stats.totalOrders -
      stats.activeOrders -
      stats.completedOrders
  );

  const cards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      description: "All orders you've submitted",
      icon: BookOpen,
      iconClass: "bg-blue-50 text-blue-600",
      borderClass: "hover:border-blue-200",
    },
    {
      title: "In Progress",
      value: stats.activeOrders,
      description: "Orders currently being worked on",
      icon: Clock3,
      iconClass: "bg-orange-50 text-orange-500",
      borderClass: "hover:border-orange-200",
    },
    {
      title: "Completed",
      value: stats.completedOrders,
      description: "Orders successfully completed",
      icon: CheckCircle2,
      iconClass: "bg-green-50 text-green-600",
      borderClass: "hover:border-green-200",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      description: "Orders awaiting progress",
      icon: ClipboardList,
      iconClass: "bg-purple-50 text-purple-600",
      borderClass: "hover:border-purple-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`
              group
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-5
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-md
              sm:rounded-3xl
              sm:p-6
              ${card.borderClass}
            `}
          >
            <div className="flex items-start justify-between">
              <div
                className={`
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  sm:h-12
                  sm:w-12
                  sm:rounded-2xl
                  ${card.iconClass}
                `}
              >
                <Icon
                  size={22}
                  strokeWidth={2}
                />
              </div>

              <ArrowUpRight
                size={18}
                className="
                  text-gray-300
                  transition-colors
                  duration-200
                  group-hover:text-blue-500
                "
              />
            </div>

            <div className="mt-6">
              {loading ? (
                <>
                  <div className="h-9 w-16 animate-pulse rounded-lg bg-gray-100" />

                  <div className="mt-2 h-5 w-28 animate-pulse rounded bg-gray-100" />

                  <div className="mt-3 h-4 w-40 animate-pulse rounded bg-gray-100" />
                </>
              ) : (
                <>
                  <p className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                    {card.value}
                  </p>

                  <h3 className="mt-1 text-sm font-semibold text-gray-900 sm:text-base">
                    {card.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-gray-500 sm:text-sm">
                    {card.description}
                  </p>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}