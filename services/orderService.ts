import axios from "@/lib/axios";
import type { Order } from "@/types/order";

/* =========================================================
   TIMEZONE
========================================================= */

/**
 * Returns the user's timezone from their device/browser.
 *
 * Examples:
 * Africa/Nairobi
 * Europe/London
 * America/New_York
 * Asia/Dubai
 *
 * This does NOT calculate the price.
 * It only tells the backend which timezone the client is using.
 */
export function getClientTimezone(): string {
  try {
    const timezone =
      Intl.DateTimeFormat().resolvedOptions().timeZone;

    return timezone || "UTC";
  } catch (error) {
    console.warn(
      "Could not detect client timezone. Falling back to UTC.",
      error
    );

    return "UTC";
  }
}

/* =========================================================
   CREATE ORDER PAYLOAD
========================================================= */

/**
 * Payload used when creating an order.
 *
 * IMPORTANT:
 * The frontend does NOT calculate the final price.
 *
 * The backend is responsible for:
 * - calculating the final price
 * - calculating the deposit
 * - determining technical/admin-review pricing
 * - storing the order
 *
 * The timezone is supplied so the backend can correctly
 * interpret/display the client's deadline.
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

  /**
   * Deadline sent by the frontend.
   *
   * This should represent the client's selected date/time.
   */
  deadline: string;

  /**
   * IANA timezone of the client device.
   *
   * Example:
   * Africa/Nairobi
   */
  timezone?: string;

  /**
   * Alias accepted by the backend if your backend uses
   * client_timezone instead of timezone.
   */
  client_timezone?: string;

  instructions: string;

  /**
   * Frontend should normally NOT send this.
   *
   * The backend calculates/assigns the final price.
   *
   * Kept here for compatibility with your existing API.
   */
  budget?: number | null;
}

/* =========================================================
   PRICE PREVIEW PAYLOAD
========================================================= */

/**
 * Payload sent to the backend pricing preview endpoint.
 *
 * The frontend ONLY sends the information required by the
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
   * These allow the backend to determine whether the
   * order is technical/programming work.
   */
  subject?: string;

  service_type?: string;

  /**
   * Client timezone.
   *
   * Example:
   * Africa/Nairobi
   */
  timezone?: string;

  /**
   * Alternative name if your backend expects
   * client_timezone.
   */
  client_timezone?: string;

  currency?: string;
}

/* =========================================================
   PRICE PREVIEW RESPONSE
========================================================= */

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
   * Optional message from backend.
   */
  message?: string | null;

  /**
   * Optional timezone information returned by backend.
   *
   * Useful if the backend returns the timezone it used
   * when processing the request.
   */
  timezone?: string | null;

  client_timezone?: string | null;
}

/* =========================================================
   ORDER SERVICE
========================================================= */

/**
 * Service responsible for communicating with the Orders API.
 */
const orderService = {
  /* =======================================================
     GET ALL ORDERS
  ======================================================= */

  async getOrders(): Promise<Order[]> {
    const response = await axios.get("/orders");

    return response.data;
  },

  /* =======================================================
     GET SINGLE ORDER
  ======================================================= */

  async getOrder(
    id: string | number
  ): Promise<Order> {
    const response = await axios.get(
      `/orders/${id}`
    );

    return response.data;
  },

  /* =======================================================
     CREATE ORDER
  ======================================================= */

  /**
   * IMPORTANT:
   *
   * No price calculation happens here.
   *
   * The backend receives:
   * - order information
   * - deadline
   * - client timezone
   *
   * and determines the appropriate final price.
   */
  async createOrder(
    data: CreateOrderPayload
  ) {
    /**
     * Automatically detect the timezone from the
     * client's device if one was not explicitly provided.
     */
    const detectedTimezone =
      getClientTimezone();

    const timezone =
      data.timezone ||
      data.client_timezone ||
      detectedTimezone;

    /**
     * Send timezone to backend.
     *
     * We preserve the rest of the payload exactly as
     * provided by the CreateOrderForm.
     */
    const payload: CreateOrderPayload = {
      ...data,

      timezone,

      /**
       * Also provide client_timezone for backend
       * compatibility.
       */
      client_timezone: timezone,
    };

    const response = await axios.post(
      "/orders",
      payload
    );

    return response.data;
  },

  /* =======================================================
     UPDATE ORDER
  ======================================================= */

  async updateOrder(
    id: string | number,
    data: Partial<CreateOrderPayload>
  ) {
    /**
     * If this is an order update and no timezone was
     * supplied, use the client's current timezone.
     */
    const timezone =
      data.timezone ||
      data.client_timezone ||
      getClientTimezone();

    const payload: Partial<CreateOrderPayload> = {
      ...data,

      timezone,

      client_timezone: timezone,
    };

    const response = await axios.put(
      `/orders/${id}`,
      payload
    );

    return response.data;
  },

  /* =======================================================
     DELETE ORDER
  ======================================================= */

  async deleteOrder(
    id: string | number
  ) {
    const response = await axios.delete(
      `/orders/${id}`
    );

    return response.data;
  },

  /* =======================================================
     PRICE PREVIEW
  ======================================================= */

  /**
   * PRICE PREVIEW
   *
   * This is NOT the final order price.
   *
   * The backend pricing engine performs the calculation.
   *
   * Normal work:
   *
   * High School = $10/page
   * University  = $12/page
   * Masters     = $18/page
   *
   * Deadline multiplier:
   *
   * < 12 hours  = 2.0
   * <= 24 hours = 1.5
   * <= 72 hours = 1.2
   * > 72 hours  = 1.0
   *
   * Deposit:
   *
   * 60% of total
   *
   * Technical/programming work:
   *
   * requires_admin_review = true
   *
   * and automatic pricing values can be null.
   */
  async previewPrice(
    data: PricePreviewPayload
  ): Promise<PricePreviewResponse> {
    /**
     * Automatically determine the client's timezone
     * from their browser/device.
     */
    const detectedTimezone =
      getClientTimezone();

    const timezone =
      data.timezone ||
      data.client_timezone ||
      detectedTimezone;

    /**
     * Send the timezone along with the pricing
     * information.
     *
     * The backend remains responsible for all
     * calculations.
     */
    const payload: PricePreviewPayload = {
      ...data,

      timezone,

      client_timezone: timezone,
    };

    const response = await axios.post(
      "/assignments/preview-price",
      payload
    );

    return response.data;
  },
};

export default orderService;