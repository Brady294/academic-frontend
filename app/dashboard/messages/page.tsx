"use client";

import { useEffect, useState } from "react";

import ConversationSidebar from "@/components/messages/ConversationSidebar";
import ChatWindow from "@/components/messages/ChatWindow";
import NewConversationModal from "@/components/messages/NewConversationModal";

import messageService from "@/services/messageService";

import {
  Conversation,
  Message,
} from "@/types/message";

export default function MessagesPage() {
  const [loading, setLoading] = useState(true);

  const [sending, setSending] =
    useState(false);

  const [conversations, setConversations] =
    useState<Conversation[]>([]);

  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [showModal, setShowModal] =
    useState(false);

  useEffect(() => {
    loadConversations();
  }, []);

  async function loadConversations() {
    try {
      setLoading(true);

      const data =
        await messageService.getConversations();

      setConversations(data);

      if (data.length > 0) {
        await selectConversation(data[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function selectConversation(
    conversation: Conversation
  ) {
    try {
      setSelectedConversation(
        conversation
      );

      const data =
        await messageService.getMessages(
          conversation.id
        );

      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function createConversation(
    subject: string
  ) {
    try {
      const conversation =
        await messageService.createConversation(
          subject
        );

      setConversations((prev) => [
        conversation,
        ...prev,
      ]);

      setShowModal(false);

      await selectConversation(
        conversation
      );
    } catch (err) {
      console.error(err);
    }
  }

  async function sendMessage(
    text: string,
    attachment?: File | null
  ) {
    if (!selectedConversation) return;

    try {
      setSending(true);

      /**
       * File upload integration can
       * replace this later.
       */

      const uploadedFile = attachment
        ? attachment.name
        : undefined;

      const newMessage =
        await messageService.sendMessage(
          selectedConversation.id,
          text,
          uploadedFile
        );

      setMessages((prev) => [
        ...prev,
        newMessage,
      ]);

      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id ===
          selectedConversation.id
            ? {
                ...conversation,
                updated_at:
                  new Date().toISOString(),
              }
            : conversation
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  }

  return (
    <>

      <div className="mb-8">

        <h1 className="text-4xl font-bold">

          Messages

        </h1>

        <p className="mt-2 text-gray-500">

          Chat with support regarding
          assignments, revisions,
          payments and account issues.

        </p>

      </div>

      <div className="h-[calc(100vh-220px)] overflow-hidden rounded-3xl border bg-white shadow-sm">

        <div className="flex h-full">

          <ConversationSidebar
            loading={loading}
            conversations={
              conversations
            }
            selectedConversation={
              selectedConversation
            }
            onSelect={
              selectConversation
            }
            onNewConversation={() =>
              setShowModal(true)
            }
          />

          <ChatWindow
            conversation={
              selectedConversation
            }
            messages={messages}
            sending={sending}
            onSend={sendMessage}
          />

        </div>

      </div>

      <NewConversationModal
        open={showModal}
        onClose={() =>
          setShowModal(false)
        }
        onCreate={
          createConversation
        }
      />

    </>
  );
}