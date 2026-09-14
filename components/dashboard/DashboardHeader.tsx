"use client";

import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

import { useAuthContext } from "@/contexts/AuthContext";

export default function DashboardHeader() {
  const { user } = useAuthContext();

  const firstName =
    user?.name?.trim().split(" ")[0] || "Student";

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good morning"
      : hour < 17
      ? "Good afternoon"
      : "Good evening";

  return (
    <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 px-6 py-7 text-white shadow-lg shadow-blue-900/10 sm:px-8 sm:py-8 lg:px-10">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />

      <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-blue-100">
            {greeting}, {firstName}
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back.
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-blue-100 sm:text-base sm:leading-7">
            Manage your assignments, follow order progress, check deadlines,
            and stay connected with your academic support team.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/dashboard/orders/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow-sm transition hover:bg-blue-50"
          >
            <Plus size={18} />
            New Order
          </Link>

          <Link
            href="/dashboard/orders"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
          >
            My Orders
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}