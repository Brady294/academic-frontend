"use client";

import { useEffect, useRef, useState } from "react";

import {
  Conversation,
  Message,
} from "@/types/message";

import {
  Send,
  Paperclip,
  User,
  ShieldCheck,
  MessageSquare,
  Loader2,
  X,
} from "lucide-react";

interface Props {
  conversation: Conversation | null;
  messages: Message[];
  sending: boolean;
  onSend: (
    message: string,
    attachment?: File | null
  ) => void;
}

export default function ChatWindow({
  conversation,
  messages,
  sending,
  onSend,
}: Props) {
  const [message, setMessage] = useState("");

  const [attachment, setAttachment] =
    useState<File | null>(null);

  const bottomRef =
    useRef<HTMLDivElement>(null);

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  function send() {
    if (
      !message.trim() &&
      !attachment
    )
      return;

    onSend(message, attachment);

    setMessage("");

    setAttachment(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  if (!conversation) {
    return (
      <div className="flex flex-1 items-center justify-center bg-gray-50">

        <div className="text-center">

          <MessageSquare
            size={72}
            className="mx-auto text-gray-300"
          />

          <h2 className="mt-6 text-2xl font-bold">

            No Conversation Selected

          </h2>

          <p className="mt-3 text-gray-500">

            Select a conversation or create
            a new one.

          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">

      {/* Header */}

      <div className="border-b bg-white px-8 py-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold">

              {conversation.subject}

            </h2>

            <p className="mt-1 text-sm text-gray-500">

              Support Conversation

            </p>

          </div>

          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${
              conversation.status === "open"
                ? "bg-green-100 text-green-700"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {conversation.status}
          </span>

        </div>

      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto bg-gray-50 px-8 py-8">

        {messages.length === 0 ? (

          <div className="flex h-full items-center justify-center">

            <div className="text-center">

              <MessageSquare
                size={60}
                className="mx-auto text-gray-300"
              />

              <h3 className="mt-5 text-xl font-semibold">

                No Messages Yet

              </h3>

              <p className="mt-2 text-gray-500">

                Send the first message below.

              </p>

            </div>

          </div>

        ) : (

          messages.map((msg) => {
            const mine =
              msg.sender === "student";

            return (

              <div
                key={msg.id}
                className={`mb-6 flex ${
                  mine
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                {!mine && (

                  <div className="mr-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">

                      <ShieldCheck size={18} />

                    </div>

                  </div>

                )}

                <div
                  className={`max-w-[70%] rounded-2xl px-5 py-4 shadow ${
                    mine
                      ? "bg-blue-600 text-white"
                      : "bg-white"
                  }`}
                >

                  <div className="mb-2 flex items-center gap-2">

                    {mine ? (
                      <User size={15} />
                    ) : (
                      <ShieldCheck size={15} />
                    )}

                    <span className="text-sm font-semibold">

                      {mine
                        ? "You"
                        : "Support"}

                    </span>

                  </div>

                  <p className="whitespace-pre-wrap break-words">

                    {msg.message}

                  </p>

                  {msg.attachment && (

                    <div className="mt-4 rounded-lg border border-dashed p-3 text-sm">

                      📎 {msg.attachment}

                    </div>

                  )}

                  <div
                    className={`mt-4 text-xs ${
                      mine
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >

                    {new Date(
                      msg.created_at
                    ).toLocaleString()}

                  </div>

                </div>

                {mine && (

                  <div className="ml-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-white">

                      <User size={18} />

                    </div>

                  </div>

                )}

              </div>

            );
          })

        )}

        <div ref={bottomRef} />

      </div>

      {/* Composer */}

      <div className="border-t bg-white p-6">

        <input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={(e) => {
            if (e.target.files?.length) {
              setAttachment(
                e.target.files[0]
              );
            }
          }}
        />

        {attachment && (

          <div className="mb-4 flex items-center justify-between rounded-xl border bg-gray-50 px-4 py-3">

            <div className="flex items-center gap-2">

              <Paperclip size={18} />

              <span className="text-sm">

                {attachment.name}

              </span>

            </div>

            <button
              onClick={() =>
                setAttachment(null)
              }
            >

              <X
                size={18}
                className="text-red-600"
              />

            </button>

          </div>

        )}

        <div className="flex items-end gap-4">

          <button
            onClick={() =>
              fileInputRef.current?.click()
            }
            className="rounded-xl border p-3 transition hover:bg-gray-100"
          >

            <Paperclip size={20} />

          </button>

          <textarea
            rows={2}
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="Type your message..."
            className="flex-1 resize-none rounded-xl border p-4 outline-none focus:border-blue-600"
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey
              ) {
                e.preventDefault();
                send();
              }
            }}
          />

          <button
            disabled={sending}
            onClick={send}
            className="rounded-xl bg-blue-600 p-4 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >

            {sending ? (

              <Loader2
                className="animate-spin"
                size={20}
              />

            ) : (

              <Send size={20} />

            )}

          </button>

        </div>

      </div>

    </div>
  );
}