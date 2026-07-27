"use client";

import { useState } from "react";

import {
    MessageCircle,
    X,
    Send,
} from "lucide-react";

export default function SupportChat() {

    const [open, setOpen] = useState(false);

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([
        {
            sender: "Support",
            text: "Hello! How can we assist you today?",
        },
    ]);

    function sendMessage() {

        if (!message.trim()) return;

        setMessages((prev) => [
            ...prev,
            {
                sender: "You",
                text: message,
            },
        ]);

        setMessage("");

    }

    return (
        <>

            {/* Compact Card */}

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">

                        <MessageCircle
                            size={18}
                            className="text-blue-600"
                        />

                    </div>

                    <div>

                        <h3 className="font-semibold">

                            Need Help?

                        </h3>

                        <p className="text-sm text-gray-500">

                            Chat directly with our support team.

                        </p>

                    </div>

                </div>

                <button
                    onClick={() => setOpen(true)}
                    className="mt-5 w-full rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
                >
                    Open Chat
                </button>

            </div>

            {/* Modal */}

            {open && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

                    <div className="flex h-[600px] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

                        {/* Header */}

                        <div className="flex items-center justify-between border-b p-5">

                            <div>

                                <h2 className="text-lg font-bold">

                                    Support Chat

                                </h2>

                                <p className="text-sm text-gray-500">

                                    Average response: 5–10 minutes

                                </p>

                            </div>

                            <button
                                onClick={() => setOpen(false)}
                            >

                                <X size={22} />

                            </button>

                        </div>

                        {/* Messages */}

                        <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-5">

                            {messages.map((msg, index) => (

                                <div
                                    key={index}
                                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                                        msg.sender === "You"
                                            ? "ml-auto bg-blue-600 text-white"
                                            : "bg-white border"
                                    }`}
                                >

                                    <p className="text-xs font-semibold mb-1">

                                        {msg.sender}

                                    </p>

                                    <p>

                                        {msg.text}

                                    </p>

                                </div>

                            ))}

                        </div>

                        {/* Input */}

                        <div className="border-t p-4">

                            <div className="flex gap-3">

                                <input
                                    value={message}
                                    onChange={(e) =>
                                        setMessage(e.target.value)
                                    }
                                    placeholder="Type your message..."
                                    className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                                />

                                <button
                                    onClick={sendMessage}
                                    className="rounded-xl bg-blue-600 px-5 text-white hover:bg-blue-700"
                                >

                                    <Send size={18} />

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </>
    );
}