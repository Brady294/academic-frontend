import api from "@/lib/axios";

/*
|--------------------------------------------------------------------------
| TYPES
|--------------------------------------------------------------------------
*/

export type AdminConversation = {
  id: number;
  student_id: number;

  subject: string | null;

  student_name?: string | null;
  student_email?: string | null;

  created_at: string;
  updated_at: string;
};

export type AdminMessage = {
  id: number;
  conversation_id: number;

  sender: string;
  message: string;
  attachment: string | null;

  created_at: string;
};

/*
|--------------------------------------------------------------------------
| GET ADMIN CONVERSATIONS
|--------------------------------------------------------------------------
|
| GET /api/admin/messages
|
*/

export async function getAdminConversations(): Promise<
  AdminConversation[]
> {
  const response =
    await api.get<AdminConversation[]>(
      "/admin/messages"
    );

  return response.data;
}

/*
|--------------------------------------------------------------------------
| GET CONVERSATION MESSAGES
|--------------------------------------------------------------------------
|
| GET /api/admin/messages/:id
|
*/

export async function getAdminMessages(
  conversationId: number
): Promise<AdminMessage[]> {
  const response =
    await api.get<AdminMessage[]>(
      `/admin/messages/${conversationId}`
    );

  return response.data;
}

/*
|--------------------------------------------------------------------------
| SEND ADMIN MESSAGE
|--------------------------------------------------------------------------
|
| POST /api/admin/messages/:id
|
*/

export async function sendAdminMessage(
  conversationId: number,
  message: string,
  attachment: string | null = null
): Promise<AdminMessage> {
  const response =
    await api.post<AdminMessage>(
      `/admin/messages/${conversationId}`,
      {
        message,
        attachment,
      }
    );

  return response.data;
}