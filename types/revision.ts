export interface Revision {
  id: number;
  order_id: number;
  order_title: string;
  title: string;
  instructions: string;
  status: string;
  admin_response: string | null;
  due_date: string | null;
  created_at: string;
}