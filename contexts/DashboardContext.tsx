"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { getDashboard } from "@/services/dashboardService";

interface DashboardContextType {
  dashboard: any;
  loading: boolean;
  refreshDashboard: () => Promise<void>;
}

const DashboardContext =
  createContext<DashboardContextType | null>(null);

export function DashboardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [dashboard, setDashboard] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  async function refreshDashboard() {
    try {
      const data = await getDashboard();

      setDashboard(data);
    } catch (err) {
      console.error(err);
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
        dashboard,
        loading,
        refreshDashboard,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "useDashboard must be used inside DashboardProvider."
    );
  }

  return context;
}