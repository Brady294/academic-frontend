"use client";

import { useState } from "react";
import { Headphones, MessageCircle, Send, X } from "lucide-react";

interface Message {
  sender: "support" | "user";
  text: string;
}

export default function SupportChat() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "support",
      text: "Welcome to TopStudyTutor Support. How can we help you today?",
    },
  ]);

  const [message, setMessage] = useState("");

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
    <>
      {/* Compact Support Card */}

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-blue-100 p-2">

            <Headphones
              size={20}
              className="text-blue-600"
            />

          </div>

          <div>

            <h3 className="font-semibold">
              Need Help?
            </h3>

            <p className="text-sm text-gray-500">
              Questions about this order?
            </p>

          </div>

        </div>

        <button
          onClick={() => setOpen(true)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <MessageCircle size={18} />
          Open Chat
        </button>

      </section>

      {/* Modal */}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="flex h-[650px] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

            {/* Header */}

            <div className="flex items-center justify-between border-b p-5">

              <div className="flex items-center gap-3">

                <Headphones
                  className="text-blue-600"
                  size={22}
                />

                <div>

                  <h2 className="font-bold">
                    TopStudyTutor Support
                  </h2>

                  <p className="text-sm text-gray-500">
                    Usually replies within a few minutes
                  </p>

                </div>

              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>

            </div>

            {/* Messages */}

            <div className="flex-1 space-y-4 overflow-y-auto p-5">

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

            {/* Input */}

            <div className="flex gap-3 border-t p-5">

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
                className="rounded-xl bg-blue-600 px-5 text-white transition hover:bg-blue-700"
              >
                <Send size={18} />
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}