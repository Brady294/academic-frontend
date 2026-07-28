"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import dashboardService, {
  DashboardStatOrder,
} from "@/services/dashboardService";

interface DashboardStats {
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  pendingPayments: number;
}

interface DashboardContextType {
  stats: DashboardStats;

  recentOrders: DashboardStatOrder[];

  upcomingDeadlines: DashboardStatOrder[];

  recentActivity: any[];

  notifications: any[];

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

  const [recentOrders, setRecentOrders] = useState<
    DashboardStatOrder[]
  >([]);

  const [upcomingDeadlines, setUpcomingDeadlines] = useState<
    DashboardStatOrder[]
  >([]);

  const [recentActivity, setRecentActivity] = useState<any[]>(
    []
  );

  const [notifications, setNotifications] = useState<any[]>(
    []
  );

  async function refreshDashboard() {
    try {
      setLoading(true);

      const dashboard =
        await dashboardService.getDashboard();

      setStats({
        totalOrders: dashboard.totalOrders,
        activeOrders: dashboard.activeOrders,
        completedOrders: dashboard.completedOrders,
        pendingPayments: dashboard.pendingPayments,
      });

      setRecentOrders(
        dashboard.recentOrders ?? []
      );

      setUpcomingDeadlines(
        dashboard.upcomingDeadlines ?? []
      );

      setRecentActivity(
        dashboard.recentActivity ?? []
      );

      setNotifications(
        dashboard.notifications ?? []
      );
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
        recentOrders,
        upcomingDeadlines,
        recentActivity,
        notifications,
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