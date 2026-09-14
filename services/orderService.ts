import axios from "@/lib/axios";
import type { Order } from "@/types/order";

/**
 * Payload used when creating an order.
 *
 * IMPORTANT:
 * The frontend does NOT calculate the final price.
 * The backend is responsible for calculating/assigning
 * the final price.
 *
 * For technical/programming work, budget can remain null
 * until the admin reviews the order.
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

  budget?: number | null;
}

/**
 * Payload sent to the backend pricing preview endpoint.
 *
 * The frontend only sends the information required by the
 * backend pricing engine.
 *
 * The backend calculates:
 * - base price
 * - deadline multiplier
 * - price per page
 * - total
 * - 60% deposit
 * - balance
 * - technical/admin-review status
 */
export interface PricePreviewPayload {
  pages: number;
  academic_level: string;
  deadline_hours: number;

  /**
   * These are included so the backend can determine whether
   * the order is technical/programming work.
   */
  subject?: string;
  service_type?: string;

  currency?: string;
}

/**
 * Response returned by:
 *
 * POST /api/assignments/preview-price
 *
 * The backend should return the calculated values.
 */
export interface PricePreviewResponse {
  currency: string;

  /**
   * Whether this order requires admin pricing.
   *
   * Expected:
   * false = normal automatic pricing
   * true  = technical/programming/admin review
   */
  requires_admin_review?: boolean;

  /**
   * Normal pricing values.
   *
   * These may be null when requires_admin_review === true.
   */
  base_price_per_page_usd?: number | null;
  deadline_multiplier?: number | null;
  price_per_page_usd?: number | null;
  total_usd?: number | null;
  deposit_usd?: number | null;
  balance_usd?: number | null;

  /**
   * Converted currency display values.
   */
  total_converted?: string | null;
  deposit_converted?: string | null;
  balance_converted?: string | null;

  /**
   * Optional message from the backend.
   */
  message?: string | null;
}

/**
 * Service responsible for communicating with the Orders API.
 */
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
  async getOrder(id: string | number): Promise<Order> {
    const response = await axios.get(`/orders/${id}`);

    return response.data;
  },

  /**
   * CREATE ORDER
   *
   * IMPORTANT:
   * No price calculation happens here.
   *
   * The backend receives the order details and determines
   * the appropriate final price.
   */
  async createOrder(data: CreateOrderPayload) {
    const response = await axios.post("/orders", data);

    return response.data;
  },

  /**
   * UPDATE ORDER
   */
  async updateOrder(
    id: string | number,
    data: Partial<CreateOrderPayload>
  ) {
    const response = await axios.put(`/orders/${id}`, data);

    return response.data;
  },

  /**
   * DELETE ORDER
   */
  async deleteOrder(id: string | number) {
    const response = await axios.delete(`/orders/${id}`);

    return response.data;
  },

  /**
   * PRICE PREVIEW
   *
   * This is NOT the final order price.
   *
   * The backend pricing engine performs the calculation.
   *
   * Normal work:
   *
   * High School  = $10/page
   * University   = $12/page
   * Masters      = $18/page
   *
   * Deadline multiplier:
   *
   * < 12 hours = 2.0
   * <= 24 hours = 1.5
   * <= 72 hours = 1.2
   * > 72 hours = 1.0
   *
   * Deposit:
   *
   * 60% of total
   *
   * Technical/programming work:
   *
   * requires_admin_review = true
   * and automatic pricing values can be null.
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