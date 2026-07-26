import { ReactNode } from "react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";

import { DashboardProvider } from "@/contexts/DashboardContext";
import { OrderProvider } from "@/contexts/OrderContext";

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DashboardProvider>
      <OrderProvider>
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </OrderProvider>
    </DashboardProvider>
  );
}