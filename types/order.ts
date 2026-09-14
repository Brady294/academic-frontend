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