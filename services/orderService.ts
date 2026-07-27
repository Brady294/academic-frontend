import axios from "@/lib/axios";

export interface Order {
  id: number;
  user_id: number;
  title: string;
  subject: string;
  service_type: string;
  academic_level: string;
  pages: number;
  spacing: string;
  citation_style: string;
  deadline: string;
  instructions: string;
  budget: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CreateOrderPayload {
  title: string;
  subject: string;
  service_type: string;
  academic_level: string;
  pages: number;
  spacing: string;
  citation_style: string;
  deadline: string;
  instructions: string;
  budget: number;
}

const orderService = {
  async getOrders(): Promise<Order[]> {
    const response = await axios.get("/orders");
    return response.data;
  },

  async getOrder(id: string | number): Promise<Order> {
    const response = await axios.get(`/orders/${id}`);
    return response.data;
  },

  async createOrder(data: CreateOrderPayload) {
    const response = await axios.post("/orders", data);
    return response.data;
  },

  async updateOrder(id: string | number, data: Partial<CreateOrderPayload>) {
    const response = await axios.put(`/orders/${id}`, data);
    return response.data;
  },

  async deleteOrder(id: string | number) {
    const response = await axios.delete(`/orders/${id}`);
    return response.data;
  },
};

export default orderService;