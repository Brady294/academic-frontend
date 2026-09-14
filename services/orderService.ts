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

/**
 * Payload used by the public homepage
 * price calculator.
 */
export interface PricePreviewPayload {
  pages: number;
  deadline_hours: number;
  currency?: string;
}

/**
 * Response returned by:
 *
 * POST /api/assignments/preview-price
 */
export interface PricePreviewResponse {
  currency: string;
  price_per_page_usd: number;
  total_usd: number;
  deposit_usd: number;
  total_converted: string;
  deposit_converted: string;
}

const orderService = {
  /**
   * GET ALL ORDERS
   */
  async getOrders(): Promise<Order[]> {
    const response = await axios.get("/orders");

    return response.data;
  },

  /**
   * GET SINGLE ORDER
   */
  async getOrder(
    id: string | number
  ): Promise<Order> {
    const response = await axios.get(
      `/orders/${id}`
    );

    return response.data;
  },

  /**
   * CREATE ORDER
   */
  async createOrder(
    data: CreateOrderPayload
  ) {
    const response = await axios.post(
      "/orders",
      data
    );

    return response.data;
  },

  /**
   * UPDATE ORDER
   */
  async updateOrder(
    id: string | number,
    data: Partial<CreateOrderPayload>
  ) {
    const response = await axios.put(
      `/orders/${id}`,
      data
    );

    return response.data;
  },

  /**
   * DELETE ORDER
   */
  async deleteOrder(
    id: string | number
  ) {
    const response = await axios.delete(
      `/orders/${id}`
    );

    return response.data;
  },

  /**
   * PUBLIC PRICE PREVIEW
   *
   * This does NOT require login.
   *
   * Used by the homepage calculator.
   */
  async previewPrice(
    data: PricePreviewPayload
  ): Promise<PricePreviewResponse> {
    const response = await axios.post(
      "/assignments/preview-price",
      data
    );

    return response.data;
  },
};

export default orderService;