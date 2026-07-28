import axios from "axios";

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export interface OrderMessage {
    id: number;
    order_id: number;
    sender_id: number;

    message: string;

    attachment_url: string | null;
    attachment_name: string | null;
    attachment_size: number | null;

    is_read: boolean;
    created_at: string;

    name: string;
    email: string;
    is_admin: boolean;
}

export async function getMessages(orderId: number): Promise<OrderMessage[]> {

    const { data } = await API.get(
        `/order-messages/orders/${orderId}/messages`
    );

    return data.messages;
}

export async function sendMessage(
    orderId: number,
    payload: {
        message: string;
        attachmentUrl?: string;
        attachmentName?: string;
        attachmentSize?: number;
    }
): Promise<OrderMessage> {

    const { data } = await API.post(
        `/order-messages/orders/${orderId}/messages`,
        payload
    );

    return data.message;
}

export async function markMessageRead(
    messageId: number
): Promise<void> {

    await API.put(
        `/order-messages/messages/${messageId}/read`
    );
}

const orderMessageService = {
    getMessages,
    sendMessage,
    markMessageRead,
};

export default orderMessageService;