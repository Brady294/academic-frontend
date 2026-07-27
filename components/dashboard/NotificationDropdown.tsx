"use client";

import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";

interface Notification {
  id: number;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Replace this with API data later
  const notifications: Notification[] = [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative rounded-xl p-2 transition hover:bg-gray-100"
      >
        <Bell size={22} />

        {notifications.length > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-semibold text-white">
            {notifications.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-4 w-96 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl z-50">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-bold text-gray-900">
              Notifications
            </h2>
          </div>

          {notifications.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <Bell
                size={40}
                className="mx-auto mb-4 text-gray-300"
              />

              <h3 className="text-lg font-semibold text-gray-800">
                No Notifications
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                You're all caught up.
              </p>
            </div>
          ) : (
            <div className="max-h-[420px] overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`cursor-pointer border-b border-gray-100 px-6 py-4 transition hover:bg-gray-50 ${
                    !notification.read ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-gray-900">
                      {notification.title}
                    </h3>

                    {!notification.read && (
                      <span className="h-2 w-2 rounded-full bg-blue-600" />
                    )}
                  </div>

                  <p className="mt-2 text-sm text-gray-600">
                    {notification.message}
                  </p>

                  <p className="mt-3 text-xs text-gray-400">
                    {notification.createdAt}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}