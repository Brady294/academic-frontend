"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentOrders from "@/components/dashboard/RecentOrders";
import UpcomingDeadlines from "@/components/dashboard/UpcomingDeadlines";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader />

      <DashboardStats />

      <QuickActions />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <RecentOrders />

        <UpcomingDeadlines />
      </div>
    </div>
  );
}