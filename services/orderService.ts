import api from "@/lib/axios";

export interface OrderData {
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

export const createOrder = async (
  data: OrderData
) => {
  const response = await api.post(
    "/orders",
    data
  );

  return response.data;
};

export const getOrders = async () => {
  const response = await api.get(
    "/orders"
  );

  return response.data;
};

export const getOrder = async (
  id: number
) => {
  const response = await api.get(
    `/orders/${id}`
  );

  return response.data;
};

export const updateOrder = async (
  id: number,
  data: Partial<OrderData>
) => {
  const response = await api.put(
    `/orders/${id}`,
    data
  );

  return response.data;
};

export const deleteOrder = async (
  id: number
) => {
  const response = await api.delete(
    `/orders/${id}`
  );

  return response.data;
};