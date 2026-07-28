"use client";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    MessageCircle,
    X,
    Send,
    Paperclip,
    Smile,
    Check,
    CheckCheck,
    Circle,
    MoreVertical,
} from "lucide-react";

import orderMessageService, {
    OrderMessage,
} from "@/services/orderMessageService";

import {
    useSocket,
} from "@/contexts/SocketContext";

import socketService from "@/services/socket";

interface Attachment {
    id: number;
    name: string;
    size: string;
}

interface Message {

    id: number;

    sender: "client" | "writer" | "admin";

    senderName: string;

    message: string;

    createdAt: string;

    read: boolean;

    attachments?: Attachment[];

}

interface SupportChatProps {

    orderId: number;

}

export default function SupportChat({

    orderId,

}: SupportChatProps) {

    const { socket } = useSocket();

    const [open, setOpen] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    const [sending, setSending] =
        useState(false);

    const [typing, setTyping] =
        useState(false);

    const [message, setMessage] =
    useState("");

const [messages, setMessages] =
    useState<Message[]>([]);

const typingTimeout =
    useRef<NodeJS.Timeout | null>(null);

const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

    function convertMessage(
        msg: OrderMessage
    ): Message {

        return {

            id: msg.id,

            sender: msg.is_admin
                ? "admin"
                : "client",

            senderName: msg.name,

            message: msg.message,

            createdAt: new Date(
                msg.created_at
            ).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            }),

            read: msg.is_read,

            attachments:
                msg.attachment_name
                    ? [
                          {
                              id: 1,
                              name: msg.attachment_name,
                              size:
                                  msg.attachment_size?.toString() ??
                                  "",
                          },
                      ]
                    : [],

        };

    }

    async function loadMessages() {

        try {

            setLoading(true);

            const data =
                await orderMessageService.getMessages(
                    orderId
                );

            setMessages(
                data.map(convertMessage)
            );

        } catch (error) {

            console.error(
                "Failed to load messages",
                error
            );

        } finally {

            setLoading(false);

        }

    }
        async function sendMessage() {

        if (!message.trim() || sending) {
            return;
        }

        try {

            setSending(true);

            await orderMessageService.sendMessage(
                orderId,
                {
                    message: message.trim(),
                }
            );

            setMessage("");

            socketService.emitStopTyping(
                orderId
            );

        } catch (error) {

            console.error(
                "Unable to send message",
                error
            );

        } finally {

            setSending(false);

        }

    }

    /**
     * Join the room when chat opens
     */
    useEffect(() => {

        if (!socket || !open) {
            return;
        }

        socketService.joinOrderRoom(
            orderId
        );

        loadMessages();

        return () => {

            socketService.leaveOrderRoom(
                orderId
            );

        };

    }, [
        socket,
        open,
        orderId,
    ]);

    /**
     * Listen for new incoming messages
     */
    useEffect(() => {

        if (!socket) {
            return;
        }

        const handleNewMessage = (
            incoming: OrderMessage
        ) => {

            if (
                incoming.order_id !== orderId
            ) {
                return;
            }

            setMessages((prev) => {

                const exists = prev.some(
                    (m) =>
                        m.id === incoming.id
                );

                if (exists) {
                    return prev;
                }

                return [
                    ...prev,
                    convertMessage(
                        incoming
                    ),
                ];

            });

        };

        socket.on(
            "new-message",
            handleNewMessage
        );

        return () => {

            socket.off(
                "new-message",
                handleNewMessage
            );

        };

    }, [
        socket,
        orderId,
    ]);

    /**
     * Read receipts
     */
    useEffect(() => {

        if (!socket) {
            return;
        }

        const handleRead = ({
            orderId: roomId,
        }: {
            orderId: number;
            readerId: number;
        }) => {

            if (
                roomId !== orderId
            ) {
                return;
            }

            setMessages((prev) =>
                prev.map((msg) => ({
                    ...msg,
                    read: true,
                }))
            );

        };

        socket.on(
            "messages-read",
            handleRead
        );

        return () => {

            socket.off(
                "messages-read",
                handleRead
            );

        };

    }, [
        socket,
        orderId,
    ]);

    /**
     * Typing indicator
     */
    useEffect(() => {

        if (!socket) {
            return;
        }

        const handleTyping = () => {

            setTyping(true);

        };

        const handleStopTyping = () => {

            setTyping(false);

        };

        socket.on(
            "typing",
            handleTyping
        );

        socket.on(
            "stop-typing",
            handleStopTyping
        );

        return () => {

            socket.off(
                "typing",
                handleTyping
            );

            socket.off(
                "stop-typing",
                handleStopTyping
            );

        };

    }, [socket]);

    /**
     * Auto scroll
     */
    useEffect(() => {

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [messages]);

    return (
        <>
            {/* Floating Chat Button */}

            <button
                onClick={() =>
                    setOpen(true)
                }
                className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-blue-300"
            >

                <MessageCircle
                    size={28}
                />

                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">

                    {
                        messages.filter(
                            (m) =>
                                !m.read
                        ).length
                    }

                </span>

            </button>

            {/* Drawer */}

            <div
                className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md transform flex-col border-l border-gray-200 bg-white shadow-2xl transition-transform duration-300 ${
                    open
                        ? "translate-x-0"
                        : "translate-x-full"
                }`}
            >
                {/* Header */}

                <div className="border-b border-gray-200 bg-white px-5 py-4">

                    <div className="flex items-start justify-between">

                        <div className="flex gap-3">

                            <div className="relative">

                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-lg font-semibold text-white">

                                    TS

                                </div>

                                <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500"></span>

                            </div>

                            <div>

                                <h2 className="text-lg font-bold text-gray-900">

                                    Order Chat

                                </h2>

                                <p className="text-sm font-medium text-gray-700">

                                    TopStudyTutor Support

                                </p>

                                <div className="mt-1 flex items-center gap-2">

                                    <Circle
                                        size={8}
                                        className="fill-green-500 text-green-500"
                                    />

                                    <span className="text-xs text-gray-500">

                                        Online

                                    </span>

                                </div>

                            </div>

                        </div>

                        <div className="flex items-center gap-2">

                            <button className="rounded-lg p-2 transition hover:bg-gray-100">

                                <MoreVertical size={18} />

                            </button>

                            <button
                                onClick={() =>
                                    setOpen(false)
                                }
                                className="rounded-lg p-2 transition hover:bg-gray-100"
                            >

                                <X size={20} />

                            </button>

                        </div>

                    </div>

                </div>
                                {/* Messages */}

                <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white px-5 py-6">

                    {loading ? (

                        <div className="flex h-full items-center justify-center">

                            <div className="flex flex-col items-center">

                                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

                                <p className="mt-4 text-sm text-gray-500">

                                    Loading conversation...

                                </p>

                            </div>

                        </div>

                    ) : (

                        <>

                            <div className="mx-auto mb-6 w-fit rounded-full bg-gray-200 px-4 py-1 text-xs font-medium text-gray-600">

                                Conversation

                            </div>

                            <div className="space-y-6">

                                {messages.length === 0 && (

                                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">

                                        <MessageCircle
                                            size={36}
                                            className="mx-auto mb-3 text-gray-300"
                                        />

                                        <h3 className="font-semibold text-gray-900">

                                            No Messages Yet

                                        </h3>

                                        <p className="mt-2 text-sm text-gray-500">

                                            Start the conversation with your
                                            writer or support team.

                                        </p>

                                    </div>

                                )}

                                {messages.map((msg) => {

                                    const isClient =
                                        msg.sender === "client";

                                    const isWriter =
                                        msg.sender === "writer";

                                    const isAdmin =
                                        msg.sender === "admin";

                                    return (

                                        <div
                                            key={msg.id}
                                            className={`flex ${
                                                isClient
                                                    ? "justify-end"
                                                    : "justify-start"
                                            }`}
                                        >

                                            {!isClient && (

                                                <div className="mr-3 flex-shrink-0">

                                                    <div
                                                        className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold text-white ${
                                                            isWriter
                                                                ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                                                                : "bg-gradient-to-r from-purple-600 to-fuchsia-600"
                                                        }`}
                                                    >

                                                        {isWriter ? "W" : "A"}

                                                    </div>

                                                </div>

                                            )}

                                            <div
                                                className={`flex max-w-[78%] flex-col ${
                                                    isClient
                                                        ? "items-end"
                                                        : "items-start"
                                                }`}
                                            >

                                                {!isClient && (

                                                    <span className="mb-1 text-xs font-semibold text-gray-500">

                                                        {msg.senderName}

                                                    </span>

                                                )}

                                                <div
                                                    className={`rounded-3xl px-5 py-3 shadow-sm ${
                                                        isClient
                                                            ? "rounded-br-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                                                            : isAdmin
                                                            ? "rounded-bl-md border border-purple-200 bg-purple-50 text-gray-800"
                                                            : "rounded-bl-md border border-gray-200 bg-white text-gray-800"
                                                    }`}
                                                >

                                                    <p className="whitespace-pre-wrap text-[15px] leading-7">

                                                        {msg.message}

                                                    </p>
                                                                                                        {msg.attachments &&
                                                        msg.attachments.length >
                                                            0 && (

                                                            <div className="mt-4 space-y-2">

                                                                {msg.attachments.map(
                                                                    (
                                                                        attachment
                                                                    ) => (

                                                                        <div
                                                                            key={
                                                                                attachment.id
                                                                            }
                                                                            className={`flex items-center justify-between rounded-xl border px-3 py-2 ${
                                                                                isClient
                                                                                    ? "border-blue-400 bg-blue-500/20"
                                                                                    : "border-gray-200 bg-gray-100"
                                                                            }`}
                                                                        >

                                                                            <div className="flex items-center gap-3">

                                                                                <Paperclip
                                                                                    size={
                                                                                        16
                                                                                    }
                                                                                />

                                                                                <div>

                                                                                    <p className="text-sm font-medium">

                                                                                        {
                                                                                            attachment.name
                                                                                        }

                                                                                    </p>

                                                                                    <p
                                                                                        className={`text-xs ${
                                                                                            isClient
                                                                                                ? "text-blue-100"
                                                                                                : "text-gray-500"
                                                                                        }`}
                                                                                    >

                                                                                        {
                                                                                            attachment.size
                                                                                        }

                                                                                    </p>

                                                                                </div>

                                                                            </div>

                                                                            <button
                                                                                className={`rounded-lg px-3 py-1 text-xs font-medium transition ${
                                                                                    isClient
                                                                                        ? "bg-white/20 hover:bg-white/30"
                                                                                        : "bg-blue-600 text-white hover:bg-blue-700"
                                                                                }`}
                                                                            >

                                                                                Download

                                                                            </button>

                                                                        </div>

                                                                    )
                                                                )}

                                                            </div>

                                                        )}

                                                </div>

                                                <div
                                                    className={`mt-2 flex items-center gap-2 text-xs ${
                                                        isClient
                                                            ? "justify-end"
                                                            : "justify-start"
                                                    }`}
                                                >

                                                    <span className="text-gray-500">

                                                        {msg.createdAt}

                                                    </span>

                                                    {isClient && (

                                                        msg.read ? (

                                                            <CheckCheck
                                                                size={15}
                                                                className="text-blue-600"
                                                            />

                                                        ) : (

                                                            <Check
                                                                size={15}
                                                                className="text-gray-400"
                                                            />

                                                        )

                                                    )}

                                                </div>

                                            </div>

                                        </div>

                                    );

                                })}

                                {typing && (

                                    <div className="flex justify-start">

                                        <div className="mr-3">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold text-white">

                                                TS

                                            </div>

                                        </div>

                                        <div className="rounded-3xl rounded-bl-md border border-gray-200 bg-white px-5 py-4 shadow-sm">

                                            <div className="flex items-center gap-1">

                                                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></span>

                                                <span
                                                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                                                    style={{
                                                        animationDelay:
                                                            ".2s",
                                                    }}
                                                ></span>

                                                <span
                                                    className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                                                    style={{
                                                        animationDelay:
                                                            ".4s",
                                                    }}
                                                ></span>

                                            </div>

                                        </div>

                                    </div>

                                )}

                                <div ref={messagesEndRef} />

                            </div>

                        </>

                    )}

                </div>
                                {/* Composer */}

                <div className="border-t border-gray-200 bg-white p-4">

                    <div className="rounded-2xl border border-gray-300 bg-white shadow-sm">

                        <textarea
                            rows={2}
                            value={message}
                            onChange={(e) => {

                                setMessage(e.target.value);

                                socketService.emitTyping(orderId, {
    id: 0,
    name: "Client",
});

                                if (typingTimeout.current) {
                                    clearTimeout(
                                        typingTimeout.current
                                    );
                                }

                                typingTimeout.current =
                                    setTimeout(() => {

                                        socketService.emitStopTyping(
                                            orderId
                                        );

                                    }, 1000);

                            }}
                            onKeyDown={(e) => {

                                if (
                                    e.key === "Enter" &&
                                    !e.shiftKey
                                ) {

                                    e.preventDefault();

                                    sendMessage();

                                }

                            }}
                            placeholder="Type your message..."
                            className="w-full resize-none rounded-t-2xl border-0 bg-transparent px-4 py-4 text-sm outline-none focus:ring-0"
                        />

                        <div className="flex items-center justify-between border-t border-gray-200 px-3 py-2">

                            <div className="flex items-center gap-2">

                                <button
                                    type="button"
                                    className="rounded-lg p-2 transition hover:bg-gray-100"
                                >

                                    <Paperclip
                                        size={18}
                                    />

                                </button>

                                <button
                                    type="button"
                                    className="rounded-lg p-2 transition hover:bg-gray-100"
                                >

                                    <Smile
                                        size={18}
                                    />

                                </button>

                            </div>

                            <button
                                type="button"
                                onClick={sendMessage}
                                disabled={
                                    sending ||
                                    !message.trim()
                                }
                                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 text-sm font-medium text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                            >

                                {sending ? (

                                    <>

                                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />

                                        Sending...

                                    </>

                                ) : (

                                    <>

                                        <Send
                                            size={16}
                                        />

                                        Send

                                    </>

                                )}

                            </button>

                        </div>

                    </div>

                    <p className="mt-2 text-center text-xs text-gray-500">

                        Press <strong>Enter</strong> to send •
                        <strong> Shift + Enter</strong> for a new line

                    </p>

                </div>

            </div>

        </>

    );

}