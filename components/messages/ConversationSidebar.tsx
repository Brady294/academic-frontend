"use client";

import { useMemo, useState } from "react";

import {
  Search,
  Plus,
  MessageSquare,
  Clock,
} from "lucide-react";

import { Conversation } from "@/types/message";

interface Props {
  loading: boolean;
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  onSelect: (conversation: Conversation) => void;
  onNewConversation: () => void;
}

export default function ConversationSidebar({
  loading,
  conversations,
  selectedConversation,
  onSelect,
  onNewConversation,
}: Props) {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return conversations.filter((conversation) =>
      conversation.subject
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [conversations, search]);

  return (
    <div className="flex w-[360px] flex-col border-r bg-white">

      {/* Header */}

      <div className="border-b p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Messages
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your conversations
            </p>

          </div>

          <button
            onClick={onNewConversation}
            className="rounded-xl bg-blue-600 p-3 text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />
          </button>

        </div>

        <div className="relative mt-6">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border py-3 pl-11 pr-4 outline-none transition focus:border-blue-500"
          />

        </div>

      </div>

      {/* Conversation List */}

      <div className="flex-1 overflow-y-auto">

        {loading && (

          <div className="flex h-full items-center justify-center text-gray-500">

            Loading conversations...

          </div>

        )}

        {!loading &&
          filtered.length === 0 && (

            <div className="flex h-full flex-col items-center justify-center px-8 text-center">

              <MessageSquare
                size={52}
                className="text-gray-300"
              />

              <h3 className="mt-5 text-lg font-semibold">

                No Conversations

              </h3>

              <p className="mt-2 text-sm text-gray-500">

                Click the + button to start a conversation.

              </p>

            </div>

          )}

        {!loading &&
          filtered.map((conversation) => {
            const active =
              selectedConversation?.id ===
              conversation.id;

            return (

              <button
                key={conversation.id}
                onClick={() =>
                  onSelect(conversation)
                }
                className={`w-full border-b px-5 py-5 text-left transition ${
                  active
                    ? "bg-blue-50 border-l-4 border-l-blue-600"
                    : "hover:bg-gray-50"
                }`}
              >

                <div className="flex items-start justify-between">

                  <div className="min-w-0 flex-1">

                    <h3 className="truncate font-semibold">

                      {conversation.subject}

                    </h3>

                    <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">

                      <Clock size={14} />

                      {new Date(
                        conversation.updated_at
                      ).toLocaleDateString()}

                    </div>

                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      conversation.status ===
                      "open"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {conversation.status}
                  </span>

                </div>

              </button>

            );
          })}

      </div>

      {/* Footer */}

      <div className="border-t p-5">

        <div className="text-center text-sm text-gray-500">

          {filtered.length} Conversation
          {filtered.length !== 1 && "s"}

        </div>

      </div>

    </div>
  );
}