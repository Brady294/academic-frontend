"use client";

import { useEffect, useState } from "react";

import {
  Bell,
  BellRing,
  Trash2,
  CheckCircle2,
  CheckCheck,
  Calendar,
} from "lucide-react";

import notificationService from "@/services/notificationService";
import { Notification } from "@/types/notification";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<
    Notification[]
  >([]);

  const [loading, setLoading] = useState(true);

  async function loadNotifications() {
    try {
      setLoading(true);

      const data =
        await notificationService.getAll();

      setNotifications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNotifications();
  }, []);

  async function markRead(id: number) {
    await notificationService.markRead(id);

    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              is_read: true,
            }
          : n
      )
    );
  }

  async function markAll() {
    await notificationService.markAll();

    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        is_read: true,
      }))
    );
  }

  async function remove(id: number) {
    await notificationService.delete(id);

    setNotifications((prev) =>
      prev.filter((n) => n.id !== id)
    );
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">

        <div className="text-lg font-medium">
          Loading notifications...
        </div>

      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex flex-col gap-5 rounded-3xl border bg-white p-8 shadow-sm md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Notifications
          </h1>

          <p className="mt-2 text-gray-500">
            Stay updated with your
            assignments, messages and
            account activity.
          </p>

        </div>

        <button
          onClick={markAll}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
        >
          <CheckCheck size={18} />

          Mark All Read

        </button>

      </div>

      {notifications.length === 0 ? (

        <div className="rounded-3xl border bg-white py-24 text-center shadow-sm">

          <Bell
            className="mx-auto text-gray-300"
            size={70}
          />

          <h2 className="mt-6 text-3xl font-bold">

            No Notifications

          </h2>

          <p className="mt-3 text-gray-500">

            You're all caught up.

          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {notifications.map(
            (notification) => (
              <div
                key={notification.id}
                className={`rounded-3xl border p-6 shadow-sm transition hover:shadow-md ${
                  notification.is_read
                    ? "bg-white"
                    : "border-blue-200 bg-blue-50"
                }`}
              >

                <div className="flex items-start justify-between gap-6">

                  <div className="flex gap-5">

                    <div>

                      {notification.is_read ? (
                        <Bell
                          className="text-gray-500"
                          size={26}
                        />
                      ) : (
                        <BellRing
                          className="text-blue-600"
                          size={26}
                        />
                      )}

                    </div>

                    <div>

                      <div className="flex flex-wrap items-center gap-3">

                        <h2 className="text-xl font-semibold">

                          {notification.title}

                        </h2>

                        {notification.is_read ? (

                          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

                            Read

                          </span>

                        ) : (

                          <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white">

                            New

                          </span>

                        )}

                      </div>

                      <p className="mt-3 text-gray-600">

                        {notification.message}

                      </p>

                      <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">

                        <Calendar
                          size={16}
                        />

                        {new Date(
                          notification.created_at
                        ).toLocaleString()}

                      </div>

                    </div>

                  </div>

                  <div className="flex gap-2">

                    {!notification.is_read && (

                      <button
                        onClick={() =>
                          markRead(
                            notification.id
                          )
                        }
                        className="rounded-lg p-3 text-green-600 transition hover:bg-green-50"
                        title="Mark as read"
                      >

                        <CheckCircle2
                          size={20}
                        />

                      </button>

                    )}

                    <button
                      onClick={() =>
                        remove(
                          notification.id
                        )
                      }
                      className="rounded-lg p-3 text-red-600 transition hover:bg-red-50"
                      title="Delete notification"
                    >

                      <Trash2
                        size={20}
                      />

                    </button>

                  </div>

                </div>

              </div>
            )
          )}

        </div>

      )}

    </div>
  );
}