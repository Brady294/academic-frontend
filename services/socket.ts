import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

const SOCKET_URL =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

/**
 * Create (or return) the singleton socket connection.
 */
export const connectSocket = (): Socket => {
    if (socket && socket.connected) {
        return socket;
    }

    if (!socket) {
        socket = io(SOCKET_URL, {
            transports: ["websocket"],
            withCredentials: true,
            autoConnect: false,
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
        });
    }

    if (!socket.connected) {
        socket.connect();
    }

    return socket;
};

/**
 * Get the existing socket instance.
 */
export const getSocket = (): Socket | null => {
    return socket;
};

/**
 * Disconnect the socket.
 */
export const disconnectSocket = (): void => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

/**
 * Join an order room.
 */
export const joinOrderRoom = (orderId: number | string): void => {
    if (!socket) return;

    socket.emit("join-order", orderId);
};

/**
 * Leave an order room.
 */
export const leaveOrderRoom = (orderId: number | string): void => {
    if (!socket) return;

    socket.emit("leave-order", orderId);
};

/**
 * Emit typing event.
 */
export const emitTyping = (
    orderId: number | string,
    user: {
        id: number;
        name: string;
    }
): void => {
    if (!socket) return;

    socket.emit("typing", {
        orderId,
        user,
    });
};

/**
 * Emit stop typing event.
 */
export const emitStopTyping = (
    orderId: number | string
): void => {
    if (!socket) return;

    socket.emit("stop-typing", {
        orderId,
    });
};

export default {
    connectSocket,
    getSocket,
    disconnectSocket,
    joinOrderRoom,
    leaveOrderRoom,
    emitTyping,
    emitStopTyping,
};