import axios from "@/lib/axios";

export interface DashboardStatOrder {
  id: number;
  title: string;
  subject: string;
  pages?: number;
  budget?: number;
  status: string;
  deadline: string;
  created_at?: string;
}

export interface DashboardResponse {
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  pendingPayments: number;

  recentOrders: DashboardStatOrder[];

  upcomingDeadlines: DashboardStatOrder[];

  recentActivity: any[];

  notifications: any[];
}

const dashboardService = {
  async getDashboard(): Promise<DashboardResponse> {
    const response = await axios.get("/dashboard");

    return response.data;
  },
};

export default dashboardService;