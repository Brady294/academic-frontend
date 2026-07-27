export interface Conversation {
  id: number;
  student_id: number;
  subject: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: number;
  conversation_id: number;
  sender: "student" | "admin";
  message: string;
  attachment: string | null;
  is_read: boolean;
  created_at: string;
}