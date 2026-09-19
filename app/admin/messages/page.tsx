"use client";

import {
  ArrowLeft,
  Loader2,
  MessageSquare,
  RefreshCw,
  Send,
  User,
} from "lucide-react";

import { useEffect, useState } from "react";

import {
  getAdminConversations,
  getAdminMessages,
  sendAdminMessage,
  type AdminConversation,
  type AdminMessage,
} from "@/services/adminMessageService";

export default function AdminMessagesPage() {
  const [conversations, setConversations] =
    useState<AdminConversation[]>([]);

  const [messages, setMessages] =
    useState<AdminMessage[]>([]);

  const [selectedConversation, setSelectedConversation] =
    useState<AdminConversation | null>(null);

  const [message, setMessage] =
    useState("");

  const [loadingConversations, setLoadingConversations] =
    useState(true);

  const [loadingMessages, setLoadingMessages] =
    useState(false);

  const [sending, setSending] =
    useState(false);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  /*
  |--------------------------------------------------------------------------
  | LOAD CONVERSATIONS
  |--------------------------------------------------------------------------
  */

  async function loadConversations(
    showRefresh = false
  ) {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoadingConversations(true);
      }

      setError(null);

      const data =
        await getAdminConversations();

      setConversations(data || []);

      /*
      |----------------------------------------------------------------------
      | Automatically select first conversation
      |----------------------------------------------------------------------
      */

      if (
        !selectedConversation &&
        data &&
        data.length > 0
      ) {
        setSelectedConversation(data[0]);
      }

    } catch (err) {
      console.error(
        "ADMIN CONVERSATIONS ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load conversations."
      );
    } finally {
      setLoadingConversations(false);
      setRefreshing(false);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | LOAD MESSAGES
  |--------------------------------------------------------------------------
  */

  async function loadMessages(
    conversation: AdminConversation
  ) {
    try {
      setLoadingMessages(true);
      setError(null);

      const data =
        await getAdminMessages(
          conversation.id
        );

      setMessages(data || []);

    } catch (err) {
      console.error(
        "ADMIN MESSAGES ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load messages."
      );

      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | INITIAL LOAD
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    loadConversations();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | LOAD SELECTED CONVERSATION
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!selectedConversation) {
      setMessages([]);
      return;
    }

    loadMessages(
      selectedConversation
    );
  }, [selectedConversation]);

  /*
  |--------------------------------------------------------------------------
  | SEND MESSAGE
  |--------------------------------------------------------------------------
  */

  async function handleSendMessage() {
    if (
      !selectedConversation ||
      !message.trim() ||
      sending
    ) {
      return;
    }

    try {
      setSending(true);
      setError(null);

      const newMessage =
        await sendAdminMessage(
          selectedConversation.id,
          message.trim()
        );

      setMessages((current) => [
        ...current,
        newMessage,
      ]);

      setMessage("");

      /*
      |----------------------------------------------------------------------
      | Refresh conversation ordering
      |----------------------------------------------------------------------
      */

      const updatedConversations =
        await getAdminConversations();

      setConversations(
        updatedConversations
      );

    } catch (err) {
      console.error(
        "SEND ADMIN MESSAGE ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Unable to send message."
      );
    } finally {
      setSending(false);
    }
  }

  /*
  |--------------------------------------------------------------------------
  | ENTER KEY
  |--------------------------------------------------------------------------
  */

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      handleSendMessage();
    }
  }

  /*
  |--------------------------------------------------------------------------
  | FORMAT DATE
  |--------------------------------------------------------------------------
  */

  function formatDate(
    value: string
  ) {
    const date = new Date(value);

    if (
      Number.isNaN(date.getTime())
    ) {
      return "";
    }

    return date.toLocaleString(
      undefined,
      {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }
    );
  }

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-[#f6f9fd] text-slate-900">

      {/* =========================================================
          HEADER
      ========================================================== */}

      <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur md:px-8">

        <div className="flex items-center gap-3">

          <a
            href="/admin"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </a>

          <div>
            <h1 className="text-xl font-bold tracking-tight md:text-2xl">
              Messages
            </h1>

            <p className="hidden text-xs text-slate-500 sm:block">
              Manage student conversations
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={() =>
            loadConversations(true)
          }
          disabled={refreshing}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {refreshing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}

          <span className="hidden sm:inline">
            Refresh
          </span>
        </button>

      </header>

      {/* =========================================================
          CONTENT
      ========================================================== */}

      <main className="p-4 md:p-8">

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <section className="grid min-h-[calc(100vh-150px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[330px_1fr]">

          {/* =====================================================
              CONVERSATIONS
          ====================================================== */}

          <aside
            className={`border-r border-slate-200 ${
              selectedConversation
                ? "hidden lg:block"
                : "block"
            }`}
          >

            <div className="border-b border-slate-100 px-5 py-4">

              <div className="flex items-center justify-between">

                <div>
                  <h2 className="font-bold text-slate-900">
                    Conversations
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {conversations.length} conversations
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                </div>

              </div>

            </div>

            <div className="max-h-[calc(100vh-230px)] overflow-y-auto">

              {loadingConversations ? (

                <div className="flex min-h-[250px] items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                </div>

              ) : conversations.length === 0 ? (

                <div className="px-6 py-12 text-center">

                  <MessageSquare className="mx-auto h-8 w-8 text-slate-300" />

                  <p className="mt-3 text-sm font-semibold text-slate-700">
                    No conversations
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Student conversations will appear here.
                  </p>

                </div>

              ) : (

                conversations.map(
                  (conversation) => {

                    const active =
                      selectedConversation?.id ===
                      conversation.id;

                    return (
                      <button
                        key={conversation.id}
                        type="button"
                        onClick={() =>
                          setSelectedConversation(
                            conversation
                          )
                        }
                        className={`w-full border-b border-slate-100 px-5 py-4 text-left transition ${
                          active
                            ? "bg-blue-50"
                            : "hover:bg-slate-50"
                        }`}
                      >

                        <div className="flex items-start gap-3">

                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                              active
                                ? "bg-blue-600"
                                : "bg-slate-100"
                            }`}
                          >
                            <User
                              className={`h-4 w-4 ${
                                active
                                  ? "text-white"
                                  : "text-slate-500"
                              }`}
                            />
                          </div>

                          <div className="min-w-0 flex-1">

                            <div className="flex items-center justify-between gap-2">

                              <p className="truncate text-sm font-semibold text-slate-800">
                                {conversation.student_name ||
                                  `Student #${conversation.student_id}`}
                              </p>

                              <span className="shrink-0 text-[10px] text-slate-400">
                                {formatDate(
                                  conversation.updated_at
                                )}
                              </span>

                            </div>

                            <p className="mt-1 truncate text-xs text-slate-500">
                              {conversation.subject ||
                                "No subject"}
                            </p>

                            {conversation.student_email && (
                              <p className="mt-1 truncate text-[10px] text-slate-400">
                                {conversation.student_email}
                              </p>
                            )}

                          </div>

                        </div>

                      </button>
                    );
                  }
                )

              )}

            </div>

          </aside>

          {/* =====================================================
              CHAT
          ====================================================== */}

          <section
            className={`flex min-h-[600px] flex-col ${
              selectedConversation
                ? "flex"
                : "hidden lg:flex"
            }`}
          >

            {!selectedConversation ? (

              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                  <MessageSquare className="h-7 w-7 text-blue-600" />
                </div>

                <h2 className="mt-4 text-lg font-bold text-slate-800">
                  Select a conversation
                </h2>

                <p className="mt-1 max-w-sm text-sm text-slate-400">
                  Select a student conversation to view messages.
                </p>

              </div>

            ) : (

              <>

                {/* =================================================
                    CHAT HEADER
                ================================================== */}

                <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedConversation(
                        null
                      )
                    }
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>

                  <div className="min-w-0">

                    <h2 className="truncate text-sm font-bold text-slate-900">
                      {selectedConversation.student_name ||
                        `Student #${selectedConversation.student_id}`}
                    </h2>

                    <p className="truncate text-xs text-slate-500">
                      {selectedConversation.subject ||
                        "No subject"}
                    </p>

                  </div>

                </div>

                {/* =================================================
                    MESSAGES
                ================================================== */}

                <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50/60 p-5">

                  {loadingMessages ? (

                    <div className="flex h-full min-h-[300px] items-center justify-center">
                      <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                    </div>

                  ) : messages.length === 0 ? (

                    <div className="flex min-h-[300px] items-center justify-center text-center">

                      <div>
                        <MessageSquare className="mx-auto h-8 w-8 text-slate-300" />

                        <p className="mt-3 text-sm font-semibold text-slate-600">
                          No messages yet
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          Send the first message.
                        </p>
                      </div>

                    </div>

                  ) : (

                    messages.map(
                      (item) => {

                        const isAdmin =
                          item.sender ===
                          "admin";

                        return (
                          <div
                            key={item.id}
                            className={`flex ${
                              isAdmin
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >

                            <div
                              className={`max-w-[80%] md:max-w-[65%]`}
                            >

                              <div
                                className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                                  isAdmin
                                    ? "rounded-br-md bg-blue-600 text-white"
                                    : "rounded-bl-md bg-white text-slate-700 shadow-sm"
                                }`}
                              >
                                {item.message}
                              </div>

                              <p
                                className={`mt-1 text-[10px] text-slate-400 ${
                                  isAdmin
                                    ? "text-right"
                                    : "text-left"
                                }`}
                              >
                                {formatDate(
                                  item.created_at
                                )}
                              </p>

                            </div>

                          </div>
                        );
                      }
                    )

                  )}

                </div>

                {/* =================================================
                    COMPOSER
                ================================================== */}

                <div className="border-t border-slate-100 bg-white p-4">

                  <div className="flex items-end gap-3">

                    <textarea
                      value={message}
                      onChange={(event) =>
                        setMessage(
                          event.target.value
                        )
                      }
                      onKeyDown={
                        handleKeyDown
                      }
                      rows={2}
                      placeholder="Type your message..."
                      className="min-h-[52px] flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />

                    <button
                      type="button"
                      onClick={
                        handleSendMessage
                      }
                      disabled={
                        sending ||
                        !message.trim()
                      }
                      className="flex h-[52px] items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                      {sending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}

                      <span className="hidden sm:inline">
                        Send
                      </span>

                    </button>

                  </div>

                  <p className="mt-2 text-[10px] text-slate-400">
                    Press Enter to send. Shift + Enter for a new line.
                  </p>

                </div>

              </>

            )}

          </section>

        </section>

      </main>

    </div>
  );
}