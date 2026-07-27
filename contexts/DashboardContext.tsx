"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import dashboardService from "@/services/dashboardService";

interface DashboardStats {
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  pendingPayments: number;
}

interface DashboardContextType {
  stats: DashboardStats;
  loading: boolean;
  refreshDashboard: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType>(
  {} as DashboardContextType
);

export function DashboardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    activeOrders: 0,
    completedOrders: 0,
    pendingPayments: 0,
  });

  async function refreshDashboard() {
    try {
      setLoading(true);

      const dashboard = await dashboardService.getDashboard();

      setStats({
        totalOrders: dashboard.totalOrders,
        activeOrders: dashboard.activeOrders,
        completedOrders: dashboard.completedOrders,
        pendingPayments: dashboard.pendingPayments,
      });
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshDashboard();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        stats,
        loading,
        refreshDashboard,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}