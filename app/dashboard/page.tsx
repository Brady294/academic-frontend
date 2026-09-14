"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentOrders from "@/components/dashboard/RecentOrders";
import UpcomingDeadlines from "@/components/dashboard/UpcomingDeadlines";

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-10">
      {/* Welcome */}
      <DashboardHeader />

      {/* Account Overview */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            Your Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            A quick look at your academic orders and payments.
          </p>
        </div>

        <DashboardStats />
      </section>

      {/* Main Workspace */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold tracking-tight text-gray-900">
            Your Academic Work
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Track your latest orders and upcoming deadlines.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 2xl:grid-cols-[1.35fr_1fr]">
          <RecentOrders />

          <UpcomingDeadlines />
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <QuickActions />
      </section>
    </div>
  );
}