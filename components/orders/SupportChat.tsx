"use client";

import { useState } from "react";
import {
  Send,
  Headphones,
} from "lucide-react";

interface Message {
  sender: "support" | "user";
  text: string;
}

export default function SupportChat() {
  const [messages, setMessages] =
    useState<Message[]>([
      {
        sender: "support",
        text: "Welcome to TopStudyTutor Support. How can we help you today?",
      },
    ]);

  const [message, setMessage] =
    useState("");

  function sendMessage() {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: message,
      },
    ]);

    setMessage("");
  }

  return (
    <section className="rounded-3xl border border-gray-200 bg-white shadow-sm">

      <div className="flex items-center gap-3 border-b p-6">

        <Headphones className="text-blue-600" />

        <h2 className="text-xl font-bold">
          Support
        </h2>

      </div>

      <div className="h-96 space-y-4 overflow-y-auto p-6">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

      </div>

      <div className="flex gap-3 border-t p-6">

        <input
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Type your message..."
          className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
        />

        <button
          onClick={sendMessage}
          className="rounded-xl bg-blue-600 px-5 text-white hover:bg-blue-700"
        >
          <Send size={18} />
        </button>

      </div>

    </section>
  );
}