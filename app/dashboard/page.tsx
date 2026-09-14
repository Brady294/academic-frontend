"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentOrders from "@/components/dashboard/RecentOrders";
import UpcomingDeadlines from "@/components/dashboard/UpcomingDeadlines";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader />

      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Your Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            A quick look at your current order activity.
          </p>
        </div>

        <DashboardStats />
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Your Academic Work
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Track your latest orders and upcoming deadlines.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          <RecentOrders />
          <UpcomingDeadlines />
        </div>
      </section>
    </div>
  );
}