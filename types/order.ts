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