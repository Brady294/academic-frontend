import axios from "@/lib/axios";

export interface DashboardResponse {
  totalOrders: number;
  activeOrders: number;
  completedOrders: number;
  pendingPayments: number;
}

const dashboardService = {
  async getDashboard(): Promise<DashboardResponse> {
    const response = await axios.get("/dashboard");

    return response.data;
  },
};

export default dashboardService;