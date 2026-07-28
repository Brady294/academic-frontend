"use client";

import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";

import { useAuthContext } from "@/contexts/AuthContext";

export default function DashboardHeader() {
  const { user } = useAuthContext();

  const firstName =
    user?.name?.trim().split(" ")[0] || "Student";

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 p-8 text-white">

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        <div className="max-w-3xl">

          <p className="text-sm font-medium text-blue-100">
            {greeting},
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            {firstName}
          </h1>

          <p className="mt-4 max-w-2xl text-blue-100 leading-7">
            Welcome back to your dashboard. Track your assignments,
            communicate with your writer, upload files, monitor deadlines,
            and manage payments from one place.
          </p>

        </div>

        <div className="flex flex-wrap gap-4">

          <Link
            href="/dashboard/orders/new"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            <Plus size={18} />
            New Order
          </Link>

          <Link
            href="/dashboard/orders"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
          >
            View Orders
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>

    </section>
  );
}