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

  /**
   * Deadline stored by the backend.
   *
   * The deadline should represent an absolute point in time
   * (preferably an ISO timestamp).
   */
  deadline: string;

  /**
   * IANA timezone selected or detected when the order
   * was created.
   *
   * Examples:
   * Africa/Nairobi
   * America/New_York
   * Europe/London
   * Asia/Dubai
   */
  timezone: string | null;

  instructions: string;

  /**
   * Automatically calculated price for normal orders.
   *
   * Technical/programming orders may have no price yet,
   * because the admin must review them first.
   */
  budget: number | null;

  status: string;

  created_at: string;
  updated_at: string;
}