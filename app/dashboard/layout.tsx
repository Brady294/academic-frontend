import { ReactNode } from "react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";

import { DashboardProvider } from "@/contexts/DashboardContext";

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DashboardProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </DashboardProvider>
  );
}