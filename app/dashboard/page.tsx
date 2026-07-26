"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

import UserWelcome from "@/components/dashboard/UserWelcome";
import DashboardCard from "@/components/dashboard/DashboardCard";
import RecentOrders from "@/components/dashboard/RecentOrders";
import Notifications from "@/components/dashboard/Notifications";

import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  DollarSign,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-8">

        <UserWelcome />

        {/* Statistics */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <DashboardCard
            title="Total Orders"
            value={12}
            icon={ClipboardList}
            color="bg-blue-600"
          />

          <DashboardCard
            title="Active Orders"
            value={3}
            icon={Clock3}
            color="bg-yellow-500"
          />

          <DashboardCard
            title="Completed"
            value={9}
            icon={CheckCircle2}
            color="bg-green-600"
          />

          <DashboardCard
            title="Pending Payment"
            value="$120"
            icon={DollarSign}
          />

        </div>

        {/* Bottom */}

        <div className="grid gap-6 xl:grid-cols-3">

          <div className="xl:col-span-2">
            <RecentOrders />
          </div>

          <Notifications />

        </div>

      </div>
    </ProtectedRoute>
  );
}