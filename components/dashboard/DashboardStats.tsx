"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  ClipboardList,
} from "lucide-react";

import { useDashboard } from "@/contexts/DashboardContext";

export default function DashboardStats() {
  const { stats, loading } = useDashboard();

  const cards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      description: "All orders you've submitted",
      icon: BookOpen,
      iconClass: "bg-blue-50 text-blue-600",
      href: "/dashboard/orders",
    },
    {
      title: "In Progress",
      value: stats.activeOrders,
      description: "Orders currently being worked on",
      icon: Clock3,
      iconClass: "bg-orange-50 text-orange-600",
      href: "/dashboard/orders",
    },
    {
      title: "Completed",
      value: stats.completedOrders,
      description: "Orders successfully completed",
      icon: CheckCircle2,
      iconClass: "bg-green-50 text-green-600",
      href: "/dashboard/orders",
    },
    {
      title: "Pending Orders",
      value: stats.totalOrders - stats.activeOrders - stats.completedOrders,
      description: "Orders awaiting progress",
      icon: ClipboardList,
      iconClass: "bg-purple-50 text-purple-600",
      href: "/dashboard/orders",
    },
  ];

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">
          Your Overview
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          A quick look at your current order activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.iconClass}`}
                >
                  <Icon size={21} />
                </div>

                <ArrowUpRight
                  size={18}
                  className="text-gray-300 transition-colors group-hover:text-blue-600"
                />
              </div>

              <div className="mt-5">
                {loading ? (
                  <>
                    <div className="h-9 w-16 animate-pulse rounded-lg bg-gray-100" />

                    <div className="mt-3 h-4 w-28 animate-pulse rounded bg-gray-100" />
                  </>
                ) : (
                  <>
                    <p className="text-3xl font-bold tracking-tight text-gray-900">
                      {card.value}
                    </p>

                    <h3 className="mt-1 text-sm font-semibold text-gray-800">
                      {card.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      {card.description}
                    </p>
                  </>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}