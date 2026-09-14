import axios from "@/lib/axios";

/**
 * Order returned by the backend.
 */
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

  /**
   * Price calculated by the backend.
   *
   * This may be 0/null for technical orders
   * until an administrator provides the final price.
   */
  budget: number | null;

  /**
   * Optional backend pricing fields.
   */
  deposit?: number | null;
  price_per_page?: number | null;
  is_technical?: boolean;

  status: string;

  created_at: string;
  updated_at: string;
}

/**
 * Payload sent from the frontend when creating
 * an order.
 *
 * IMPORTANT:
 * There is intentionally NO budget field here.
 *
 * The backend is responsible for calculating
 * the price.
 */
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
}

/**
 * Payload used by the public homepage
 * price calculator.
 *
 * Keep this only if your homepage still uses
 * the public price preview endpoint.
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
   *
   * IMPORTANT:
   * No budget is sent from the frontend.
   *
   * The backend calculates the price.
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
   * This is separate from creating an order.
   *
   * If you want the backend to be the ONLY place
   * calculating prices, you can remove this method
   * from the frontend entirely.
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